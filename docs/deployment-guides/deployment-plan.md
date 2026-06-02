# 배포 플랜: GitHub Actions + GHCR + AWS EC2

## 목표

현재 EC2에 배포된 포트폴리오 사이트를 유지하면서, 배포 과정을 GitHub Actions로 자동화합니다. 저장소와 컨테이너 이미지는 공개 가능한 포트폴리오 자산으로 다루고, AWS ECR 대신 GitHub Container Registry를 사용합니다.

## 아키텍처

```txt
GitHub public repo
  -> GitHub Actions
  -> GHCR public Docker image
  -> EC2 Docker Compose
  -> Caddy :80/:443
  -> Next.js standalone container :3000
```

## Phase 1: 현재 EC2 배포 상태 정리

- [ ] EC2 접속 정보 확인
- [ ] 배포 디렉터리 확인
- [ ] `docker compose ps`로 `portfolio`, `portfolio-proxy` 상태 확인
- [ ] Caddyfile과 도메인/HTTPS 설정 유지 여부 확인
- [ ] 기존 수동 배포 명령 기록

## Phase 2: GitHub public 저장소 준비

- [ ] 저장소를 public으로 전환
- [ ] 민감 정보가 커밋되어 있지 않은지 확인
- [ ] `.env`, SSH key, 인증서, 개인 토큰이 repository에 없는지 확인
- [ ] README에 배포 자동화 구조를 간단히 정리

## Phase 3: Docker image 배포 방식을 GHCR로 전환

- [ ] image 이름 결정: `ghcr.io/<github-owner>/<repo-name>:latest`
- [ ] GitHub Actions에서 build할 수 있도록 Dockerfile 유지
- [ ] EC2의 `docker-compose.yml`에서 `build` 대신 `image`를 사용하도록 변경
- [ ] GHCR package visibility를 public으로 설정

## Phase 4: GitHub Actions workflow 추가

파일 경로: `.github/workflows/deploy.yml`

- [ ] `main` 브랜치 push 시 실행
- [ ] checkout
- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Docker image build
- [ ] GHCR push
- [ ] SSH로 EC2 접속
- [ ] `docker compose pull`
- [ ] `docker compose up -d`
- [ ] 이전 image 정리

## Phase 5: GitHub Secrets 등록

- [ ] `EC2_HOST`
- [ ] `EC2_USERNAME`
- [ ] `EC2_SSH_KEY`
- [ ] `EC2_PORT` 필요 시

public GHCR image를 pull하는 구조라면 EC2 배포 단계에서 별도의 registry token은 필요하지 않습니다.

## Phase 6: 검증

- [ ] Actions build job 성공 확인
- [ ] Actions deploy job 성공 확인
- [ ] GHCR package가 public인지 확인
- [ ] EC2에서 `docker ps` 확인
- [ ] 사이트 접속 후 최신 변경사항 반영 확인
- [ ] `docker logs portfolio` 오류 확인
- [ ] HTTPS 인증서와 Caddy reverse proxy 정상 동작 확인

## 수동 배포에서 자동 배포로 바뀌는 점

### 기존 수동 배포

```bash
cd portfolio
git pull origin main
docker compose build
docker compose up -d
```

### 변경 후 자동 배포

```txt
git push origin main
  -> GitHub Actions가 build/test/image push/deploy 실행
```

EC2는 더 이상 소스 코드를 빌드하지 않고, 검증된 GHCR image만 pull해서 실행합니다.

## 포트폴리오 어필 포인트

- GitHub Actions workflow로 CI/CD 구현
- Docker multi-stage build와 Next.js standalone 배포
- GHCR public registry 사용
- EC2 + Docker Compose 운영
- Caddy를 이용한 HTTPS reverse proxy
- 수동 배포를 push 기반 자동 배포로 개선

## 다음 작업 후보

- [ ] `.github/workflows/deploy.yml` 작성
- [ ] `docker-compose.yml`의 `portfolio.image`를 GHCR 주소로 변경
- [ ] README에 배포 자동화 섹션 추가
- [ ] 첫 Actions 실행 후 실패 로그 기준으로 보정
