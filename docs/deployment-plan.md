# 배포 플랜 — AWS EC2 + Docker

## 아키텍처

```
[사용자] → [EC2 (서울 리전)] → [Nginx :80/:443] → [Docker Container (Next.js standalone :3000)]
```

---

## Phase 1: Next.js standalone 빌드 설정

- [ ] `next.config.ts`에 `output: "standalone"` 추가
- [ ] `npm run build`로 로컬 빌드 확인 (`.next/standalone/` 생성 여부)

## Phase 2: Docker 설정

- [ ] 프로젝트 루트에 `Dockerfile` 작성 (멀티스테이지 빌드)
- [ ] `.dockerignore` 작성
- [ ] 로컬에서 `docker build -t portfolio .` 빌드 성공 확인
- [ ] `docker run -p 3000:3000 portfolio`로 http://localhost:3000 동작 확인

### Dockerfile 구조

```
Stage 1 (deps)    : node:22-alpine — npm ci
Stage 2 (builder) : node:22-alpine — npm run build
Stage 3 (runner)  : node:22-alpine — standalone 실행 (server.js)
```

## Phase 3: AWS 인프라 준비

- [ ] AWS 계정 생성 (프리 티어)
- [ ] EC2 인스턴스 생성
  - 리전: `ap-northeast-2` (서울)
  - AMI: Amazon Linux 2023 또는 Ubuntu 24.04
  - 타입: `t2.micro` (프리 티어)
  - 스토리지: 20GB
  - 키 페어 생성 → `.pem` 파일 보관
- [ ] 보안 그룹 인바운드 규칙 설정
  - SSH (22): 내 IP만
  - HTTP (80): 0.0.0.0/0
  - HTTPS (443): 0.0.0.0/0
- [ ] 탄력적 IP(Elastic IP) 할당 & 연결

## Phase 4: EC2 서버 세팅

- [ ] SSH 접속: `ssh -i key.pem ec2-user@<IP>`
- [ ] 시스템 업데이트
- [ ] Docker 설치 & 서비스 시작
- [ ] 현재 사용자를 docker 그룹에 추가

### Amazon Linux 2023

```bash
sudo dnf update -y
sudo dnf install docker git -y
sudo systemctl start docker && sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### Ubuntu 24.04

```bash
sudo apt update && sudo apt install docker.io git -y
sudo systemctl start docker && sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## Phase 5: 배포

### 방법 A — EC2에서 직접 빌드

- [ ] `git clone <repo-url> portfolio`
- [ ] `cd portfolio && docker build -t portfolio .`
- [ ] `docker run -d --name portfolio -p 80:3000 --restart unless-stopped portfolio`
- [ ] `http://<EC2-Public-IP>` 접속 확인

### 방법 B — Docker Hub 경유

- [ ] Docker Hub 계정 생성
- [ ] 로컬: `docker build -t <user>/portfolio:latest .`
- [ ] 로컬: `docker push <user>/portfolio:latest`
- [ ] EC2: `docker pull <user>/portfolio:latest`
- [ ] EC2: `docker run -d --name portfolio -p 80:3000 --restart unless-stopped <user>/portfolio:latest`

## Phase 6: (선택) 도메인 + HTTPS

- [ ] 도메인 구매 (Route 53 또는 외부 등록 업체)
- [ ] DNS A 레코드 → EC2 탄력적 IP
- [ ] Nginx 설치 & 리버스 프록시 설정

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] Let's Encrypt SSL 인증서 발급

```bash
sudo certbot --nginx -d your-domain.com
```

---

## 비용 참고

| 항목 | 비용 |
|------|------|
| EC2 t2.micro | 프리 티어 12개월 무료, 이후 ~$8/월 |
| 탄력적 IP | EC2 연결 시 무료, 미연결 시 과금 |
| 도메인 (.com) | ~$12/년 |
| Docker Hub | 무료 (public repo) |

> ⚠️ **사용하지 않을 때 인스턴스를 중지**해야 불필요 과금 방지

---

## 업데이트 배포 (재배포)

```bash
# EC2에서
cd portfolio
git pull origin main
docker build -t portfolio .
docker stop portfolio && docker rm portfolio
docker run -d --name portfolio -p 80:3000 --restart unless-stopped portfolio
```
