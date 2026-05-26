import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/EC2 같은 자체 호스팅 환경에서 실행에 필요한 최소 파일만
  // `.next/standalone`에 모아 배포할 수 있게 합니다.
  // Docker 배포 이미지를 가볍게 함.
  output: "standalone",
};

export default nextConfig;
