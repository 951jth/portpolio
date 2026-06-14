import FadeIn from "@/components/ui/FadeIn";
import ProjectCard, { ProjectItem } from "./ProjectCard";

const projects: ProjectItem[] = [
  {
    title: "Mozzle (대용량 회원명부 관리 시스템 리팩토링)",
    category: "B2B Enterprise Admin Suite",
    theme: "blue",
    description: [
      <>
        <strong className="text-text">대규모 렌더링 지연 및 구조 리팩토링:</strong> 대량의 회원 데이터를 동시 편집할 때 발생하는 렌더링 지연 문제와 비대해진 컴포넌트 구조 개선
      </>,
      <>
        <strong className="text-text">가상화 기반 렌더링 성능 최적화:</strong> Chrome Performance API로 Long Task 병목을 분석하고, React Virtuoso 기반 가상화 테이블을 적용하여 텍스트 입력 지연을 1860ms에서 28ms로 대폭 단축
      </>
    ],
    tags: ["React", "CRA (Webpack)", "React Virtuoso", "Chrome Performance"],
    link: "https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2",
    featured: true,
  },
  {
    title: "050 BizCall 관리자 웹 - 대용량 엑셀 다운로드 개선",
    category: "B2B Telecom Back-Office",
    theme: "emerald",
    description: [
      <>
        <strong className="text-text">대용량 엑셀 다운로드 구조 개선:</strong> 엑셀 생성 책임을 서버에서 클라이언트로 이관하여 서버 부하 및 API 지연 문제 해결. Web Worker 및 ZIP 분할 압축 적용으로 80만 건 다운로드 처리 시간 33% 단축 (27분 → 18분)
      </>,
      <>
        <strong className="text-text">랜딩페이지 SEO 및 성능 최적화:</strong> Next.js 기반 메타데이터, 시맨틱 마크업 및 LCP 이미지 로딩 구조를 개선하여 Lighthouse 성능(59 → 91) 및 SEO(91 → 100) 지표 대폭 향상. 결과적으로 자연 검색 노출수 53%, 클릭수 14% 증가 달성
      </>
    ],
    tags: ["React", "SheetJS", "Web Worker", "ZIP Compression"],
    link: "https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2",
    featured: true,
  },
  {
    title: "Payking - PG 결제 링크 서비스 및 통합 관리자",
    category: "Fintech Platform",
    theme: "purple",
    description: [
      <>
        <strong className="text-text">관리자 입력 폼 공통 컴포넌트 구조 제안:</strong> 기존 단순 JSX 나열 방식에서 JSON 기반의 선언적 스키마 폼 구조로 개선하여 폼 관련 코드(LOC) 23% 감소
      </>,
      <>
        <strong className="text-text">반응형 웹 레이아웃 최적화:</strong> CSS Grid 기반 구조를 도입하여 다양한 기기와 디자인 시안에 대한 프론트엔드 대응 속도 극대화
      </>
    ],
    tags: ["React", "Next.js (SSR)", "React Native", "Tailwind CSS"],
    featured: false,
  },
  {
    title: "PandyTalk - AI 비서 오프라인 퍼스트 채팅 앱",
    category: "Personal AI Mobile App",
    theme: "rose",
    description: [
      <>
        <strong className="text-text">오프라인 퍼스트(Offline-First) 동기화:</strong> 네트워크 단절 시에도 연속성을 보장하기 위해 메시지 순번(SEQ) 기반 데이터 간극 탐지(Data Gap Detection) 및 로컬 페이징 동기화 구현
      </>,
      <>
        <strong className="text-text">실시간 AI 스트리밍 구축:</strong> HTTP SSE 엔드포인트 연동을 통해 끊김 없는 실시간 AI 답변 스트리밍 통신 흐름 단독 구축
      </>
    ],
    tags: ["React Native (CLI)", "TypeScript", "SQLite", "Firebase", "OpenAI"],
    link: "https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2",
    github: "https://github.com/951jth/pandytalk",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-outer/10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="font-dohyeon text-3xl sm:text-4xl md:text-5xl text-text mb-4">
              프로젝트.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="font-pretendard text-text-secondary text-sm sm:text-base max-w-md mx-auto">
              기술적 완성도와 더불어 디자인 시스템을 통해 사용자 경험을 이끌어
              낸 핵심 작업들입니다.
            </p>
          </FadeIn>
        </div>

        {/* Project Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <FadeIn
              key={project.title}
              direction="up"
              delay={index * 0.2}
              className="h-full"
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
