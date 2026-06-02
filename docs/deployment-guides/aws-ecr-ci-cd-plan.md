# CI/CD 자동화 구현 계획 (GitHub Public + GHCR + EC2)

이 문서는 기존 ECR 중심 계획을 대체합니다. 현재 사이트는 EC2에 이미 배포되어 있으므로, 목표는 AWS 인프라 확장보다 **GitHub 공개 저장소와 GitHub Actions를 통한 배포 자동화 시연**입니다.

## 결정

- Repository: GitHub public
- Container registry: GitHub Container Registry, `ghcr.io`
- Runtime server: 기존 EC2 유지
- Reverse proxy: 기존 Caddy 유지
- Deploy trigger: `main` 브랜치 push
- Deploy 방식: Actions에서 Docker image build/push 후 EC2에서 최신 image pull 및 재기동

## 선택 이유

- 포트폴리오에서 코드와 배포 자동화 흐름을 함께 보여줄 수 있습니다.
- AWS ECR/IAM 설정 없이 GitHub Actions 중심의 CI/CD 경험을 드러낼 수 있습니다.
- EC2 운영 경험은 유지하면서도, 수동 `git pull && docker build` 배포를 자동화로 바꿀 수 있습니다.
- public package는 GitHub Packages 과금 부담이 적고 설정이 단순합니다.

## 사전 준비

- [ ] GitHub 저장소를 public으로 전환
- [ ] GitHub Actions 권한 확인
  - `Settings > Actions > General`
  - Workflow permissions: `Read and write permissions`
- [ ] GHCR package visibility를 public으로 설정
- [ ] EC2에 Docker 및 Docker Compose 사용 가능 상태 확인
- [ ] EC2에서 `ghcr.io` public image pull 가능 여부 확인
- [ ] EC2 배포 디렉터리에 `docker-compose.yml`, `Caddyfile` 유지

## GitHub Secrets

GitHub 저장소의 `Settings > Secrets and variables > Actions`에 등록합니다.

- `EC2_HOST`: EC2 public IP 또는 도메인
- `EC2_USERNAME`: 예: `ec2-user` 또는 `ubuntu`
- `EC2_SSH_KEY`: EC2 접속용 private key 전체 내용
- `EC2_PORT`: 기본값은 `22`, 필요 시 등록

public GHCR image를 사용할 예정이면 EC2 pull 단계에 GitHub token secret은 필요하지 않습니다.

## Workflow 구성

파일 경로: `.github/workflows/deploy.yml`

### Job 1: build-and-push

- repository checkout
- Docker Buildx 설정
- `ghcr.io` 로그인
- image build
- image push

권장 image 이름:

```txt
ghcr.io/<github-owner>/<repo-name>:latest
ghcr.io/<github-owner>/<repo-name>:<commit-sha>
```

### Job 2: deploy

- SSH로 EC2 접속
- 배포 디렉터리로 이동
- 최신 image pull
- `docker compose up -d`로 컨테이너 갱신
- 사용하지 않는 image 정리

## docker-compose.yml 변경 방향

현재 compose는 EC2에서 직접 build하도록 되어 있습니다.

```yaml
portfolio:
  image: portfolio
  build:
    context: .
```

자동화 배포에서는 EC2가 빌드하지 않고 GHCR image를 pull하도록 변경합니다.

```yaml
portfolio:
  image: ghcr.io/<github-owner>/<repo-name>:latest
  container_name: portfolio
  restart: unless-stopped
  expose:
    - "3000"
  environment:
    NODE_ENV: production
    PORT: "3000"
    HOSTNAME: 0.0.0.0
```

Caddy reverse proxy 서비스와 volume 설정은 그대로 유지합니다.

## 배포 흐름

```txt
개발자 push
  -> GitHub Actions 실행
  -> npm lint/build 검증
  -> Docker image build
  -> GHCR public image push
  -> EC2 SSH 접속
  -> docker compose pull
  -> docker compose up -d
  -> Caddy가 새 portfolio 컨테이너로 트래픽 전달
```

## 검증 계획

- [ ] GitHub Actions에서 build job 성공 확인
- [ ] GHCR package가 public으로 노출되는지 확인
- [ ] EC2 deploy job 성공 확인
- [ ] `docker ps`에서 `portfolio`, `portfolio-proxy` 실행 상태 확인
- [ ] 도메인 또는 EC2 public IP로 접속해 최신 변경 반영 확인
- [ ] `docker logs portfolio`에서 Next.js 서버 오류 없음 확인

## 포트폴리오에서 보여줄 포인트

- GitHub Actions 기반 CI/CD workflow
- Docker multi-stage build
- GHCR container image 배포
- EC2 운영 서버와 Caddy reverse proxy
- push 기반 자동 배포
- 수동 배포에서 자동화 배포로 개선한 과정

## 보류한 선택지

- AWS ECR: AWS IAM과 private registry 구성이 필요한 실제 운영 서비스에는 좋지만, 현재 목표인 public 포트폴리오와 자동화 시연에는 설정 대비 이점이 작습니다.
- Docker Hub: 단순하지만 GitHub repository, Actions, package visibility를 한 화면에서 보여주는 포트폴리오 흐름은 GHCR이 더 자연스럽습니다.
