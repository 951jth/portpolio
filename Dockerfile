# Dockerfile을 쓰는 이유:
# - EC2 같은 서버에서도 로컬과 같은 Node.js 실행 환경을 재현하기 위해서입니다.
# - Next.js standalone 빌드 결과물만 최종 이미지에 담아 배포 이미지를 가볍게 만들기 위해서입니다.
# - 서버에서 직접 npm install/build/start를 반복하지 않고, Docker 이미지 단위로 일관되게 배포하기 위해서입니다.

# Stage 1: 의존성 설치 전용 단계입니다.
FROM node:22-alpine AS deps
WORKDIR /app

# COPY package.json package-lock.json ./ :
# 로컬 프로젝트의 package.json과 package-lock.json을
# 컨테이너 이미지 안의 현재 작업 폴더(/app)로 복사합니다.
COPY package.json package-lock.json ./

# RUN npm ci :
# package-lock.json에 기록된 버전을 기준으로 node_modules를 설치합니다.
# package.json과 package-lock.json이 맞지 않으면 설치를 멈춰서,
# 로컬, Docker, EC2 어디서 빌드하든 같은 의존성 결과가 나오게 합니다.
RUN npm ci

# Stage 2: Next.js 프로덕션 빌드를 만드는 단계입니다.
# 이 단계가 필요한 이유는 TypeScript/React/Next.js 소스 코드를
# 실제 서버에서 실행 가능한 최적화된 결과물로 바꾸기 위해서입니다.
FROM node:22-alpine AS builder
WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules :
# deps 단계의 /app/node_modules 폴더를
# 현재 builder 단계의 /app/node_modules 위치로 복사합니다.
COPY --from=deps /app/node_modules ./node_modules

# COPY . . :
# 로컬 프로젝트의 전체 파일을
# 현재 builder 단계의 작업 폴더(/app)로 복사합니다.
COPY . .

# RUN npm run build :
# package.json의 build 스크립트를 실행해서 Next.js 프로덕션 빌드를 만듭니다.
# next.config.ts의 output: "standalone" 설정에 따라
# .next/standalone 폴더와 .next/static 폴더가 생성됩니다.
RUN npm run build

# Stage 3: 실제 운영 컨테이너입니다.
# 빌드에만 필요한 파일과 개발 의존성을 최종 이미지에서 빼고,
# 실행에 필요한 standalone 결과물만 담아 이미지를 작고 단순하게 만들기 위해 분리합니다.
FROM node:22-alpine AS runner
WORKDIR /app

# NODE_ENV=production은 Next.js를 운영 모드로 실행하기 위해 필요합니다.
# PORT=3000은 컨테이너 내부에서 Next.js 서버가 사용할 포트입니다.
# HOSTNAME=0.0.0.0은 컨테이너 외부에서 앱에 접근할 수 있게 하기 위해 필요합니다.
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# COPY --from=builder /app/public ./public :
# builder 단계의 /app/public 폴더를
# 현재 runner 단계의 /app/public 위치로 복사합니다.
COPY --from=builder /app/public ./public

# COPY --from=builder /app/.next/standalone ./ :
# builder 단계의 /app/.next/standalone 폴더 안의 내용을
# 현재 runner 단계의 작업 폴더(/app)로 복사합니다.
# 이 안에 node server.js로 실행 가능한 최소 Next.js 서버가 들어 있습니다.
COPY --from=builder /app/.next/standalone ./

# COPY --from=builder /app/.next/static ./.next/static :
# builder 단계의 /app/.next/static 폴더를
# 현재 runner 단계의 /app/.next/static 위치로 복사합니다.
# 이 안에 빌드된 JS/CSS 정적 에셋이 들어 있습니다.
COPY --from=builder /app/.next/static ./.next/static

# 이 컨테이너가 내부적으로 3000번 포트를 사용한다는 표시입니다.
# 실제 외부 포트 연결은 docker run -p 3000:3000 같은 명령에서 정합니다.
EXPOSE 3000

# CMD ["node", "server.js"] :
# 컨테이너가 시작될 때 /app/server.js 파일을 node로 실행합니다.
# 이 server.js는 .next/standalone에서 복사된 Next.js 실행 서버입니다.
CMD ["node", "server.js"]
