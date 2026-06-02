<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Project Rules

- 커밋 메시지는 Conventional Commits 형식을 따른다.
- 커밋 메시지의 설명은 한글로 작성한다. 예: `perf: 폰트와 히어로 에셋 최적화`
<!-- END:project-rules -->

<!-- BEGIN:deployment-rules -->
# Deployment Rules

- 배포/EC2 관련 문서는 UTF-8로 읽고 수정한다.
- EC2 작업 기록은 `docs/aws-ec2-setup-notes.md`를 기준으로 확인한다.
- 현재 배포 방향은 AWS ECR이 아니라 GitHub public repository + GitHub Actions + GHCR + EC2이다.
- `docker-compose.yml`의 앱 이미지는 `ghcr.io/951jth/portpolio:latest`를 사용한다.
- EC2에서는 소스 빌드보다 GHCR 이미지를 pull해서 재기동하는 방식을 우선한다.
- Amazon Linux 2023에서는 가능하면 `docker compose`를 우선 사용하고, 서버에 v1만 설치된 경우에만 `docker-compose`를 사용한다.
- 기존 EC2 노트의 `docker-compose up -d --build`는 수동 빌드 방식 기록이므로, 자동 배포 로직을 작성할 때는 `docker compose pull` 후 `docker compose up -d` 흐름으로 맞춘다.
- 배포 workflow를 수정할 때는 `.github/workflows/deploy.yml`, `docker-compose.yml`, `Caddyfile`, `docs/aws-ec2-setup-notes.md`의 경로/브랜치/이미지명이 서로 일치하는지 함께 점검한다.
<!-- END:deployment-rules -->
