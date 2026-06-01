# HTTPS reverse proxy 오류 해결 회고

## 상황 요약

포트폴리오 앱은 AWS EC2에서 Docker 컨테이너로 실행 중이었다.

- 도메인: `csh-portfolio.com`
- www 도메인: `www.csh-portfolio.com`
- EC2 퍼블릭 IPv4: `3.39.122.146`
- DNS: Cloudflare
- 기존 컨테이너: `portfolio`
- 기존 포트 매핑: `0.0.0.0:80->3000/tcp`, `:::80->3000/tcp`

EC2 내부에서는 앱이 정상 응답했다.

```bash
curl -I http://127.0.0.1
curl -I -H "Host: csh-portfolio.com" http://127.0.0.1
curl -I -H "Host: www.csh-portfolio.com" http://127.0.0.1
```

세 요청 모두 `200 OK`가 나왔으므로 Next.js 앱과 Docker 컨테이너 자체 문제는 아니었다.

## 원인

문제의 핵심은 HTTPS를 처리할 계층이 EC2에 없다는 점이었다.

기존 구조는 다음과 같았다.

```text
사용자 브라우저
-> Cloudflare
-> EC2:80
-> portfolio 컨테이너:3000
```

`portfolio` 컨테이너가 EC2의 80번 포트를 직접 점유하고 있었다.

```bash
docker run -d --name portfolio -p 80:3000 --restart unless-stopped portfolio
```

이 구조에서는 EC2에서 443 포트를 처리하는 Nginx/Caddy 같은 reverse proxy가 없기 때문에 Cloudflare SSL/TLS 모드를 `Full` 또는 `Full (strict)`로 안정적으로 사용할 수 없다.

Cloudflare Flexible은 브라우저와 Cloudflare 사이만 HTTPS이고, Cloudflare와 EC2 사이가 HTTP가 될 수 있으므로 목표 구조에 맞지 않는다.

## 목표 구조

최종 목표는 EC2에서도 HTTPS를 직접 처리하는 구조다.

```text
사용자 브라우저
-> HTTPS
-> Cloudflare
-> HTTPS
-> EC2 Caddy:443
-> Docker network
-> portfolio:3000
```

HTTP 요청은 Caddy가 HTTPS로 리다이렉트한다.

```text
사용자 브라우저
-> HTTP
-> Cloudflare 또는 EC2 Caddy:80
-> HTTPS로 리다이렉트
```

## 프로젝트 확인 결과

작업 전 확인한 내용:

- `docker-compose.yml`은 없었다.
- `Dockerfile`은 `EXPOSE 3000`을 사용하고 있었다.
- `Dockerfile`은 `PORT=3000`, `HOSTNAME=0.0.0.0`을 설정하고 있었다.
- production 실행 명령은 standalone 결과물의 `server.js`를 `node server.js`로 실행하는 방식이었다.
- 기존 배포 문서는 `docker run -p 80:3000` 기준이었다.
- 별도 배포 스크립트는 없었다.

따라서 앱 코드는 수정하지 않고, Docker Compose와 Caddy 설정만 추가하는 방식이 가장 작고 안전했다.

## 선택한 해결 방식

Caddy를 reverse proxy로 사용한다.

선택 이유:

- Caddy는 Let's Encrypt 인증서 발급과 갱신을 자동 처리한다.
- 도메인 기반 HTTPS 설정이 Nginx + Certbot보다 단순하다.
- Docker Compose로 `reverse-proxy`와 `portfolio`를 같은 네트워크에 두면 `portfolio:3000`으로 바로 프록시할 수 있다.
- HTTP to HTTPS 리다이렉트가 기본으로 처리된다.

## 변경 파일

추가한 파일:

- `docker-compose.yml`
- `Caddyfile`

## docker-compose.yml

```yaml
services:
  reverse-proxy:
    image: caddy:2-alpine
    container_name: portfolio-proxy
    restart: unless-stopped
    depends_on:
      - portfolio
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config

  portfolio:
    image: portfolio
    container_name: portfolio
    build:
      context: .
    restart: unless-stopped
    expose:
      - "3000"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: 0.0.0.0

volumes:
  caddy_data:
  caddy_config:
```

중요한 점:

- `reverse-proxy`만 외부에 `80`, `443`을 노출한다.
- `portfolio`는 `ports`를 쓰지 않고 `expose: 3000`만 사용한다.
- `portfolio`의 3000번 포트는 Docker 내부 네트워크에서만 접근된다.
- Caddy 인증서와 설정 상태는 Docker volume에 저장된다.

## Caddyfile

```caddyfile
csh-portfolio.com, www.csh-portfolio.com {
	reverse_proxy portfolio:3000
}
```

Caddy는 이 설정만으로 다음을 처리한다.

- `csh-portfolio.com` HTTPS
- `www.csh-portfolio.com` HTTPS
- Let's Encrypt 인증서 자동 발급
- 인증서 자동 갱신
- HTTP to HTTPS 리다이렉트
- `portfolio:3000` reverse proxy

## EC2 전환 절차

EC2에서 현재 상태를 먼저 확인한다.

```bash
docker ps
docker compose ls
sudo ss -tulpn | grep -E ':80|:443|:3000'
docker image ls | grep portfolio
```

기존 컨테이너가 80번 포트를 직접 잡고 있으면 중지하고 제거한다.

```bash
docker stop portfolio
docker rm portfolio
```

최신 코드를 받고 Compose로 다시 올린다.

```bash
cd ~/portfolio
git pull origin master
docker compose build portfolio
docker compose up -d
```

컨테이너 상태를 확인한다.

```bash
docker ps
docker logs portfolio --tail=100
docker logs portfolio-proxy --tail=100
```

## Cloudflare 설정

DNS 레코드는 다음처럼 둔다.

```text
Type: A
Name: @
Content: 3.39.122.146
Proxy status: Proxied
```

```text
Type: A
Name: www
Content: 3.39.122.146
Proxy status: Proxied
```

SSL/TLS 설정:

```text
SSL/TLS encryption mode: Full (strict)
```

`Full (strict)`를 쓰려면 EC2 origin이 유효한 인증서를 제공해야 한다. Caddy가 Let's Encrypt 인증서를 정상 발급하면 이 조건을 만족한다.

주의:

- `Flexible`은 사용하지 않는다.
- Caddy가 인증서를 발급하려면 도메인이 EC2로 정상 라우팅되어야 한다.
- EC2 보안그룹에서 80, 443 인바운드가 열려 있어야 한다.

## 보안그룹 확인

AWS 콘솔에서 확인할 값:

```text
HTTP  TCP  80   0.0.0.0/0
HTTPS TCP  443  0.0.0.0/0
SSH   TCP  22   내 IP/32
```

IPv6를 사용한다면 `::/0` 규칙도 확인한다.

EC2에서 현재 리스닝 포트를 확인한다.

```bash
sudo ss -tulpn | grep -E ':80|:443|:3000'
```

정상 구조에서는 다음처럼 보여야 한다.

- 80: Caddy 또는 Docker proxy
- 443: Caddy 또는 Docker proxy
- 3000: 외부 공개 포트가 아니라 Docker 내부에서만 사용

## 검증 명령어

컨테이너 확인:

```bash
docker ps
```

포트 확인:

```bash
sudo ss -tulpn | grep -E ':80|:443|:3000'
```

로컬 HTTP 확인:

```bash
curl -I http://127.0.0.1
curl -I -H "Host: csh-portfolio.com" http://127.0.0.1
curl -I -H "Host: www.csh-portfolio.com" http://127.0.0.1
```

도메인 HTTPS 확인:

```bash
curl -I https://csh-portfolio.com
curl -I https://www.csh-portfolio.com
```

HTTP 리다이렉트 확인:

```bash
curl -I http://csh-portfolio.com
curl -I http://www.csh-portfolio.com
```

정상이라면 HTTP 요청은 `301` 또는 `308`로 HTTPS 위치를 가리켜야 한다.

## 자주 볼 수 있는 실패와 원인

### Caddy 로그에 인증서 발급 실패가 나온다

가능한 원인:

- DNS가 아직 EC2 IP를 가리키지 않는다.
- Cloudflare DNS 레코드가 잘못되었다.
- EC2 보안그룹에서 80 또는 443이 막혀 있다.
- 기존 컨테이너나 프로세스가 80/443을 이미 점유하고 있다.

확인:

```bash
docker logs portfolio-proxy --tail=200
sudo ss -tulpn | grep -E ':80|:443'
```

### `docker compose up -d`가 포트 충돌로 실패한다

기존 `portfolio` 컨테이너가 `80:3000`을 계속 잡고 있을 가능성이 높다.

확인:

```bash
docker ps
```

해결:

```bash
docker stop portfolio
docker rm portfolio
docker compose up -d
```

### Cloudflare에서 525 또는 526 오류가 난다

가능한 원인:

- Cloudflare는 origin HTTPS를 기대하지만 EC2에서 HTTPS가 아직 정상 동작하지 않는다.
- `Full (strict)`인데 origin 인증서 검증에 실패한다.
- Caddy 인증서 발급이 아직 완료되지 않았다.

확인:

```bash
curl -Iv https://csh-portfolio.com
docker logs portfolio-proxy --tail=200
```

### 앱은 뜨는데 HTTPS만 안 된다

이 경우 앱 문제가 아니라 reverse proxy, DNS, 보안그룹, 인증서 중 하나일 가능성이 높다.

확인 순서:

```bash
docker ps
sudo ss -tulpn | grep -E ':80|:443|:3000'
docker logs portfolio-proxy --tail=200
curl -I -H "Host: csh-portfolio.com" http://127.0.0.1
curl -Iv https://csh-portfolio.com
```

## 롤백 방법

Compose 구조를 내리고 기존 방식으로 되돌릴 수 있다.

```bash
docker compose down
docker run -d --name portfolio -p 80:3000 --restart unless-stopped portfolio
```

이 롤백은 HTTPS 구조를 포기하고 HTTP 직접 노출 방식으로 되돌리는 것이다. 임시 복구용으로만 사용한다.

## 결론

이번 오류는 Next.js 앱이나 Docker 이미지 문제가 아니라, EC2에서 HTTPS를 처리하는 reverse proxy 계층이 없어서 발생한 인프라 구조 문제였다.

해결 방향은 `portfolio` 컨테이너가 80번 포트를 직접 점유하지 않게 하고, Caddy가 80/443을 담당하도록 분리하는 것이다.

최종 구조:

```text
Cloudflare Full (strict)
-> EC2 Caddy 80/443
-> Docker internal network
-> portfolio:3000
```

이 구조에서는 Cloudflare Flexible 없이도 브라우저부터 EC2 origin까지 HTTPS 경로를 유지할 수 있다.
