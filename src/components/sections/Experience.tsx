import FadeIn from "@/components/ui/FadeIn";
import ExperienceCard, { ExperienceItem } from "./ExperienceCard";

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "(주)델피콤 (Delphicom)",
      role: "프론트엔드 엔지니어 대리 (Frontend Engineer)",
      period: "2021.05 ~ 현재",
      description:
        "B2B 050 가상번호 통신 플랫폼(BizCall) 관리자 웹, 결제 솔루션(Payking), 운영 시스템 개발 및 리팩토링을 담당했습니다.",
      achievements: [
        "엑셀 생성 책임을 클라이언트로 분산하고 API 병렬 요청, Web Worker 및 분할 ZIP 구조를 적용하여 최대 약 80만 건까지 처리 범위를 확장하고, 20.5만 건 기준 1차 개선 구조 대비 처리 시간을 약 151초에서 91초로 약 40% 단축",
        "Chrome Performance 프로파일링과 가상화를 적용해 3,000건 스크롤 시 발생하는 Long Task를 19건에서 1건으로 감소시켰으며, 초기 UI 렌더링 시간을 4.9초에서 0.14초로 97% 단축하고 DOM Node를 기존 54,458개 대비 2,306~5,103개 수준으로 감소",
        "불필요한 관리자 화면 상태를 줄이기 위해 기획 조직과 조율해 입력 단계를 3단계에서 2단계로 단축하고, JSON 기반 선언적 폼 구조로 개선해 주요 페이지 LOC 평균 약 20% 절감 및 24개 화면 일괄 대응",
        "Next.js 환경에서 RSC 분리와 이미지 용량 최적화(약 85% 축소) 및 레이아웃 시프트(CLS 0.679 → 0.065)를 개선하여 Lighthouse 성능(73 → 95) 및 SEO(91 → 100) 지표 달성 및 Search Console 클릭수 14% 증가",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="font-dohyeon text-3xl sm:text-4xl md:text-5xl text-text mb-4">
              경력 사항.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="font-pretendard text-text-secondary text-sm sm:text-base max-w-md mx-auto">
              기술을 통해 비즈니스 문제를 해결하고, 실제 수치로 개선 결과를 검증해 온 성장 여정입니다.
            </p>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-secondary/30 ml-4 md:ml-12 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <FadeIn key={exp.company} direction="up" delay={index * 0.2}>
              <ExperienceCard exp={exp} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
