import type { Metadata } from "next";
import { Do_Hyeon } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const doHyeon = Do_Hyeon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dohyeon",
  display: "swap",
});

const pretendard = localFont({
  src: "../../public/assets/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "조세훈 | 프론트엔드 엔지니어 포트폴리오",
  description: "무거운 성능 병목을 해결하고 사용자 경험을 가볍게 띄우는 6년 차 프론트엔드 엔지니어 조세훈의 포트폴리오입니다. React, Next.js, React Native, Web Worker, 대용량 최적화 설계 역량을 소개합니다.",
  keywords: ["조세훈", "프론트엔드", "엔지니어", "개발자", "포트폴리오", "React", "Next.js", "TypeScript", "React Native", "성능최적화", "대용량데이터"],
  authors: [{ name: "조세훈" }],
  openGraph: {
    title: "조세훈 | 프론트엔드 엔지니어 포트폴리오",
    description: "무거운 성능 병목을 해결하고 사용자 경험을 가볍게 띄우는 프론트엔드 엔지니어 조세훈의 포트폴리오 웹사이트입니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`scroll-smooth ${doHyeon.variable} ${pretendard.variable}`}>
      <body className="bg-background text-text font-pretendard min-h-screen">
        {children}
      </body>
    </html>
  );
}
