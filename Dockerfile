# Stage 1: 의존성 설치 전용 단계입니다.
# package-lock.json을 기준으로 정확히 같은 버전의 패키지를 설치합니다.
FROM node:22-alpine AS deps
WORKDIR /app

# package.json과 package-lock.json만 먼저 복사하면,
# 소스 코드가 바뀌어도 의존성이 바뀌지 않은 경우 Docker 캐시를 재사용할 수 있습니다.
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Next.js 프로덕션 빌드를 만드는 단계입니다.
# 이 단계에서 `next.config.ts`의 output: "standalone" 설정이 적용됩니다.
FROM node:22-alpine AS builder
WORKDIR /app

# deps 단계에서 설치한 node_modules를 가져와 빌드에 사용합니다.
COPY --from=deps /app/node_modules ./node_modules

# 앱 전체 소스를 복사한 뒤 프로덕션 빌드를 실행합니다.
COPY . .

RUN npm run build

# Stage 3: 실제 운영 컨테이너입니다.
# 빌드 도구와 개발 의존성을 제외하고, 실행에 필요한 standalone 결과물만 복사합니다.
FROM node:22-alpine AS runner
WORKDIR /app

# Next.js 서버를 프로덕션 모드로 실행합니다.
# HOSTNAME=0.0.0.0은 컨테이너 외부에서 접근 가능하게 만드는 설정입니다.
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# public 폴더에는 이미지, favicon 같은 정적 파일이 들어갑니다.
COPY --from=builder /app/public ./public

# .next/standalone에는 server.js와 실행에 필요한 최소 node_modules가 포함됩니다.
COPY --from=builder /app/.next/standalone ./

# .next/static에는 빌드된 JS/CSS 정적 에셋이 들어가므로 함께 복사해야 합니다.
COPY --from=builder /app/.next/static ./.next/static

# 컨테이너가 내부적으로 사용할 포트입니다.
EXPOSE 3000

# standalone 빌드가 생성한 최소 서버를 실행합니다.
CMD ["node", "server.js"]
