# Sehoon Cho Portfolio

Next.js 기반 개인 포트폴리오 프로젝트입니다.
안정적이고 빠른 사용자 경험을 구축하는 데 집중하며, 프론트엔드 성능 병목 현상 및 대용량 데이터 처리 문제를 구조적으로 해결한 6년 차 프론트엔드 엔지니어로서의 경험을 소개합니다.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run fonts:subset
```

- `dev`: 개발 서버 실행
- `build`: 프로덕션 빌드
- `start`: 프로덕션 서버 실행
- `lint`: ESLint 검사
- `fonts:subset`: 현재 소스에 쓰인 글자 기준으로 웹폰트 subset 재생성

## Font Optimization

한글 웹폰트가 Lighthouse LCP 경로를 길게 만들지 않도록, 실제 사이트에 쓰이는
문자만 포함한 subset 폰트를 사용합니다.

- 본문: `public/assets/fonts/PretendardVariableSubset.woff2`
- 제목/로고: `public/assets/fonts/DoHyeonSubset.woff2`
- 원본 폰트: `scripts/font-sources`
- 적용 위치: `src/app/layout.tsx`, `src/app/globals.css`

문구를 추가하거나 수정한 뒤 글자가 fallback 폰트로 섞여 보이면 아래 명령으로
subset을 다시 생성합니다.

```bash
npm run fonts:subset
```

자세한 내용은 [Font Optimization](docs/font-optimization.md)을 참고합니다.

## Performance Notes

Lighthouse 측정은 개발 서버가 아니라 프로덕션 모드에서 확인합니다.

```bash
npm run build
npm run start
```

측정 중에는 브라우저 창을 전면에 두고, 확장 프로그램 영향을 줄이려면 시크릿
창에서 실행하는 것이 좋습니다.

## Project Structure

```txt
src/app
src/components/layout
src/components/sections
src/components/ui
public/assets/fonts
public/assets/images
scripts/font-sources
docs
```

## Docs

- [Font Optimization](docs/font-optimization.md)

## CI/CD Pipeline

이 프로젝트는 **GitHub Actions, GHCR, AWS EC2**를 활용하여 자동화된 무중단 배포(Continuous Deployment) 파이프라인을 구축하고 있습니다.

1. **Trigger**: `master` 또는 `main` 브랜치에 코드가 Push되면 GitHub Actions 워크플로우(`.github/workflows/deploy.yml`)가 자동으로 실행됩니다.
2. **Build & Push (CI)**:
   - 최신 소스 코드를 바탕으로 Docker Image를 빌드합니다.
   - 빌드된 이미지는 **GitHub Container Registry (GHCR)**(`ghcr.io/951jth/portpolio:latest`)에 안전하게 Push됩니다.
   - GitHub Actions Cache를 활용해 빌드 속도를 단축합니다.
3. **Deploy (CD)**:
   - AWS EC2 인스턴스에 SSH로 안전하게 접속합니다.
   - EC2 내부에서 최신 docker-compose 설정을 갱신하고, GHCR에서 최신 Docker 이미지를 다운로드(Pull)합니다.
   - `docker compose up -d` 명령어를 통해 컨테이너를 재기동하여 배포를 완료하며, 미사용 이미지를 자동으로 정리(`prune`)하여 디스크 공간을 효율적으로 관리합니다.
