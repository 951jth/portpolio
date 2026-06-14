import FadeIn from "@/components/ui/FadeIn";
import ExperienceCard, { ExperienceItem } from "./ExperienceCard";

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "(주)델피콤 (Delphicom)",
      role: "프론트엔드 엔지니어 대리 (Frontend Engineer)",
      period: "2021.05 ~ 현재",
      description:
        "B2B 050 가상번호 통신 플랫폼(BizCall) 관리자 웹, 결제 솔루션(Payking), 운영 시스템 개발 및 리팩토링을 전담했습니다.",
      achievements: [
        "Web Worker와 SheetJS를 연동한 엑셀 클라이언트 스트리밍 구조 제안 및 최대 60만 건 대용량 통화 로그 다운로드 비용 절감 및 안정화",
        "Chrome Performance 프로파일링 및 가상 테이블(React Virtuoso) 컴포넌트화 도입으로 초기 렌더링 속도 90% 단축(2.8s ➡️ 0.3s) 및 DOM Node 97% 감소",
        "반복적인 폼 레이아웃 복잡성을 해소하기 위해 JSON 설정 기반의 선언적 폼 디자인 패턴 구축, LOC 평균 23% 개선",
        "Next.js 기반 메타데이터, 시맨틱 마크업 및 LCP 이미지 로딩 구조를 개선하여 Lighthouse 성능(59 → 91) 및 SEO(91 → 100) 대폭 향상, 자연 검색 노출수 53% 및 클릭수 14% 증가",
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
              기술을 통해 비즈니스 문제를 해결하고, 실제 수치로 성과를 입증해 온 저의 성장 여정입니다.
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
