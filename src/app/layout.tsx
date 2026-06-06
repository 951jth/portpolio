import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/assets/fonts/PretendardVariableSubset.woff2",
  display: "swap",
  preload: true,
  variable: "--font-pretendard",
  fallback: [
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "맑은 고딕",
    "sans-serif",
  ],
});

const doHyeon = localFont({
  src: "../../public/assets/fonts/DoHyeonSubset.woff2",
  display: "swap",
  preload: true,
  variable: "--font-dohyeon",
  fallback: [
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "맑은 고딕",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "조세훈 | 프론트엔드 엔지니어 포트폴리오",
  description: "성능 최적화와 사용자 경험 개선에 집중하는 6년 차 프론트엔드 엔지니어 조세훈의 포트폴리오입니다. React, Next.js 등의 기술 스택과 대용량 데이터 처리 경험을 소개합니다.",
  keywords: ["조세훈", "프론트엔드", "엔지니어", "개발자", "포트폴리오", "React", "Next.js", "TypeScript", "React Native", "성능최적화", "대용량데이터"],
  authors: [{ name: "조세훈" }],
  openGraph: {
    title: "조세훈 | 프론트엔드 엔지니어 포트폴리오",
    description: "성능 최적화와 사용자 경험 개선에 집중하는 프론트엔드 엔지니어 조세훈의 포트폴리오 웹사이트입니다.",
    type: "website",
    locale: "ko_KR",
  },
};

const customToastOptions = {
  classNames: {
    toast: "font-pretendard border rounded-2xl shadow-sm w-full p-4 flex items-center gap-3",
    success: "bg-secondary/10 border-secondary/30 text-secondary",
    error: "bg-primary/10 border-primary/30 text-primary",
    title: "text-sm font-bold",
    description: "text-xs",
    icon: "w-5 h-5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`scroll-smooth ${pretendard.variable} ${doHyeon.variable}`}
    >
      <body className="bg-background text-text font-pretendard min-h-screen">
        {children}
        <Toaster 
          position="top-center" 
          toastOptions={customToastOptions}
        />
      </body>
    </html>
  );
}
