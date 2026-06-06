import FadeIn from "@/components/ui/FadeIn";
import ProjectCard, { ProjectItem } from "./ProjectCard";

const projects: ProjectItem[] = [
  {
    title: "Mozzle (대용량 회원명부 관리 시스템 리팩토링)",
    category: "B2B Enterprise Admin Suite",
    theme: "blue",
    description:
      "대량 회원 데이터를 동시 편집할 때 발생하는 렌더링 지연과 대형 컴포넌트 구조를 개선한 리팩토링 프로젝트입니다. Chrome Performance API 기반으로 Long Task 병목을 분석하고 React Virtuoso 기반 가상화 테이블로 로우를 렌더링 영역에만 격리하여 텍스트 입력 지연을 1860ms에서 28ms로 극대화 개선했습니다.",
    tags: ["React", "CRA (Webpack)", "React Virtuoso", "Chrome Performance"],
    link: "https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2",
    featured: true,
  },
  {
    title: "050 BizCall 관리자 웹 - 대용량 엑셀 다운로드 개선",
    category: "B2B Telecom Back-Office",
    theme: "emerald",
    description:
      "30만 건 이상의 방대한 통화 내역 다운로드 시 발생하는 서버 OOM(메모리 부족) 및 지연 문제를 해결하기 위한 아키텍처 재설계입니다. 생성 책임을 서버에서 클라이언트로 이전하고 Web Worker 기반 백그라운드 스레드에서 SheetJS를 활용해 연속 페이징 수신 방식으로 무중단 60만 건 다운로드 안정화 달성하였습니다.",
    tags: ["React", "SheetJS", "Web Worker", "ZIP Compression"],
    link: "https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2",
    featured: true,
  },
  {
    title: "Payking - PG 결제 링크 서비스 및 통합 관리자",
    category: "Fintech Platform",
    theme: "purple",
    description:
      "소상공인을 위한 비대면 SMS/URL 결제 링크 서비스 및 백오피스 시스템 프론트엔드 아키텍처입니다. 기존 3단계 입력 폼을 2단계 선언적 JSON 폼 구조로 개선하여 폼 관련 LOC 23% 평균 감소를 달성했으며 CSS Grid 기반 반응형 웹 레이아웃으로 디자인 시안 전면 대응 속도를 극대화했습니다.",
    tags: ["React", "Next.js (SSR)", "React Native", "Tailwind CSS"],
    featured: false,
  },
  {
    title: "PandyTalk - AI 비서 오프라인 퍼스트 채팅 앱",
    category: "Personal AI Mobile App",
    theme: "rose",
    description:
      "네트워크 단절 상황에서도 연속성을 완벽히 유지하는 Offline-First 구조의 1인 개발 모바일 애플리케이션입니다. 메시지 순번(SEQ) 기반 데이터 간극 탐지(Data Gap Detection) 로직 및 페이징 동기화를 구현하고 HTTP SSE 엔드포인트 연동으로 실시간 AI 답변 스트리밍 흐름을 단독 구축했습니다.",
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
              기술적 완성도와 더불어 디자인 시스템을 통해 사용자 감동을 이끌어
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
