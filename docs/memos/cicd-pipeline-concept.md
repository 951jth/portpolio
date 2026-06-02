# GitHub Actions 기반 CI/CD 파이프라인 작동 원리

이 문서는 프로젝트에 적용된 CI/CD(지속적 통합/지속적 배포) 파이프라인의 전체적인 흐름과 작동 원리를 설명합니다.

---

## 🌟 전체 흐름 요약
`로컬 컴퓨터(Push)` ➡️ `GitHub(트리거 감지)` ➡️ `GitHub 가상 서버(빌드 및 GHCR 업로드)` ➡️ `AWS EC2(접속 및 다운로드/실행)`

---

## 1단계: 방아쇠 당기기 (Push & Trigger)
**"개발자가 코드를 올리면, GitHub이 이를 감지합니다."**

1. 로컬 환경에서 코드를 수정하고 `git push origin master` (또는 `main`)를 실행합니다.
2. 코드가 GitHub 서버에 도착합니다.
3. GitHub은 프로젝트 내의 `.github/workflows/deploy.yml` 파일을 확인합니다.
4. 파일 내 설정된 이벤트(`on: push: branches: [master]`)를 감지하고, 자동화 로직(Actions)을 실행합니다.

## 2단계: 공장 가동 (Build & Push to GHCR)
**"GitHub이 제공하는 가상 머신(Runner)에서 빌드 작업을 수행합니다."**

1. GitHub은 `ubuntu-latest` 기반의 가상 머신(컴퓨터)을 시작합니다.
2. 가상 머신이 최신 코드를 체크아웃 받아옵니다 (`actions/checkout`).
3. 가상 머신 내부에서 Docker 빌드를 수행합니다. Dockerfile을 기반으로 패키지를 설치하고 코드를 컴파일하여 **하나의 압축된 컨테이너 이미지**를 생성합니다.
4. 빌드된 이미지는 **GHCR(GitHub Container Registry)**에 `latest` 태그를 달아 업로드(Push) 됩니다.

> 💡 **왜 EC2에서 직접 빌드하지 않나요?**
> EC2 내부(특히 무료 티어인 t2.micro)에서 무거운 패키지 설치와 빌드 과정을 직접 수행하면 CPU와 메모리 부족으로 서버가 다운되거나 서비스 장애가 발생할 수 있습니다. 
> 빌드라는 무거운 작업을 리소스가 넉넉한 GitHub Actions 가상 머신에 위임함으로써 **EC2 서버를 안정적이고 쾌적하게 유지**할 수 있습니다.

## 3단계: EC2 원격 제어 (Deploy)
**"GitHub 가상 머신이 배포 대상인 EC2에 안전하게 원격 접속합니다."**

1. 이미지를 GHCR에 업로드한 가상 머신은, GitHub Secrets에 등록된 인증 정보(`EC2_HOST`, `EC2_USERNAME`, `EC2_SSH_KEY`)를 사용하여 **EC2 서버에 SSH로 접속**합니다.
2. 가상 머신은 `deploy.yml`의 `script` 블록에 정의된 배포 명령어들을 EC2의 터미널 환경에서 순차적으로 실행합니다.

## 4단계: 다운로드 및 재가동 (Pull & Run)
**"EC2가 최신 이미지를 가져와 컨테이너를 교체합니다."**

1. **`git pull`**: EC2 내부의 프로젝트 폴더에서 최신 설정 파일(`docker-compose.yml`, `Caddyfile` 등)을 동기화합니다.
2. **`docker pull`**: EC2가 GHCR에 접근하여 방금 빌드된 최신(`latest`) 이미지를 다운로드 받습니다. (이미지가 Public 상태이므로 별도의 인증 없이 다운로드 가능합니다.)
3. **`docker-compose up -d`**: 새로운 이미지를 기반으로 컨테이너를 재시작합니다. Caddy(Reverse Proxy) 설정에 따라 트래픽이 새 컨테이너로 매끄럽게 라우팅됩니다.
4. **`docker image prune -f`**: 더 이상 사용하지 않는 구버전 이미지들을 삭제하여 EC2의 디스크 용량을 최적화합니다.
5. 배포가 완료되면 GitHub 가상 머신은 접속을 종료하고 소멸합니다.

---

**결론:**
개발자는 로컬에서 `git push` 명령어 단 하나만 실행하지만, 클라우드 환경에서는 자동으로 서버가 켜지고, 코드를 빌드하며, 운영 서버에 원격으로 접속해 결과물을 교체하는 복잡한 과정이 2~3분 안에 전자동으로 완료됩니다. 이것이 CI/CD 배포 자동화의 핵심 원리입니다.
