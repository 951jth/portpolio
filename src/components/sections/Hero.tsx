import Float from "@/components/ui/Float";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight, Download, Sparkles, ExternalLink } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-6 md:px-12 bg-gradient-to-b from-background to-outer/30"
    >
      {/* Background Floating Elements (Antigravity Concept) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Float
          duration={6}
          yOffset={25}
          className="absolute top-[20%] left-[10%] opacity-20 md:opacity-40"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 blur-xl" />
        </Float>
        <Float
          duration={8}
          yOffset={35}
          className="absolute bottom-[25%] right-[12%] opacity-30 md:opacity-50"
        >
          <div className="w-36 h-36 rounded-full bg-secondary/25 blur-2xl" />
        </Float>
        <Float
          duration={5}
          yOffset={15}
          className="absolute top-[60%] left-[80%] opacity-20"
        >
          <div className="w-16 h-16 rounded-full bg-accent-deep/15 blur-lg" />
        </Float>
        <Float
          duration={7}
          yOffset={20}
          className="absolute top-[30%] right-[30%] opacity-25"
        >
          <div className="w-20 h-20 rounded-full bg-accent-light blur-xl" />
        </Float>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
          <FadeIn direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light/50 text-accent-deep font-semibold text-xs border border-primary/20 w-fit mx-auto lg:mx-0">
              <Sparkles size={14} className="animate-pulse" />
              <span>성능 병목을 해결하는 6년 차 프론트엔드 엔지니어</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="font-dohyeon text-4xl sm:text-5xl md:text-6xl text-text leading-[1.2] tracking-tight">
              사용자와 기술 사이,{" "}
              <span className="text-primary block sm:inline">
                부드러운 경험
              </span>
              을 만듭니다.
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="font-pretendard text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              안녕하세요, 조세훈입니다. 제품과 비즈니스의 무게를 가중시키는
              대용량 데이터 처리 문제와 프론트엔드 병목을 구조적으로 해결해 온
              6년 차 엔지니어입니다.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-4 w-full">
              <Button
                href="#projects"
                variant="primary"
                size="md"
                className="w-full sm:w-auto group"
                icon={
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                }
                iconPosition="right"
                aria-label="포트폴리오 프로젝트 섹션으로 이동"
              >
                프로젝트 보기
              </Button>
              <Button
                href="https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2"
                variant="outline"
                size="md"
                target="_blank"
                className="w-full sm:w-auto"
                icon={<ExternalLink size={18} />}
                aria-label="조세훈 노션 문제해결 상세 엔지니어링 로그 방문 (새 창 이동)"
              >
                문제해결 상세
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mt-6 w-full">
              <Button
                href="/docs/조세훈_이력서_20260507.pdf"
                download
                variant="ghost"
                size="sm"
                className="w-full sm:w-auto"
                icon={<Download size={14} />}
                aria-label="조세훈 이력서 PDF 다운로드"
              >
                이력서 다운로드
              </Button>
              <Button
                href="/docs/조세훈_경력기술서_20260419.pdf"
                download
                variant="ghost"
                size="sm"
                className="w-full sm:w-auto"
                icon={<Download size={14} />}
                aria-label="조세훈 경력기술서 PDF 다운로드"
              >
                경력기술서 다운로드
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Visual Graphic Element (Floating Card Mockup) */}
        <div className="lg:col-span-5 flex justify-center items-start md:items-center relative min-h-[520px] md:h-[450px] md:min-h-0">
          <Float
            duration={6}
            yOffset={20}
            className="w-full max-w-[320px] md:max-w-[360px] relative z-10 mt-5"
          >
            {/* Main Interactive Card */}
            <div className="bg-surface p-6 sm:p-8 rounded-3xl shadow-xl border border-outer/60 relative overflow-hidden backdrop-blur-sm bg-white/95">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-light/30 rounded-bl-full -z-10" />
              <div className="hidden lg:flex absolute top-4 left-4 z-20 bg-secondary text-secondary-foreground px-3 py-2 rounded-2xl shadow-lg border border-secondary-foreground/20 text-xs font-semibold items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-foreground animate-ping" />
                <span>대용량 최적화 전문</span>
              </div>
              {/* Profile Image - Large and prominent! */}
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-6 border border-outer/40 shadow-sm bg-outer/30">
                <Image
                  src="/assets/images/profile.webp"
                  alt="조세훈 프로필 사진"
                  fill
                  priority
                  sizes="(min-width: 768px) 296px, calc(100vw - 96px)"
                  className="object-cover"
                />
              </div>

              <div className="font-dohyeon text-2xl text-text mb-1">
                Sehoon Cho
              </div>
              <p className="font-pretendard text-text-secondary text-xs sm:text-sm mb-4">
                Frontend Engineer & Performance Optimizer
              </p>
              <div className="space-y-3 font-pretendard text-xs text-text-secondary">
                <div className="flex justify-between border-b border-outer/40 pb-2">
                  <span>Stack</span>
                  <span className="text-secondary font-semibold">
                    Next.js / TS / Web Worker
                  </span>
                </div>
                <div className="flex justify-between border-b border-outer/40 pb-2">
                  <span>Focus</span>
                  <span className="text-primary font-semibold">
                    Virtualization & Rendering Speed
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>Motto</span>
                  <span className="italic text-text font-medium leading-relaxed">
                    &quot;무거운 성능 병목을 해결하고 사용자 경험을 가볍게
                    띄웁니다.&quot;
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <span className="text-[10px] uppercase tracking-wider text-text-secondary bg-outer px-3 py-1 rounded-full font-semibold animate-pulse">
                  Active & Floating
                </span>
              </div>
            </div>
          </Float>
        </div>
      </div>
    </section>
  );
}
