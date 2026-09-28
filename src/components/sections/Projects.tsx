import FadeIn from "@/components/ui/FadeIn";
import ProjectCard, { ProjectItem } from "./ProjectCard";

const NOTION_PROJECT_URLS = {
  mozzle: "https://app.notion.com/p/3a859549cbc080fb9c18f6c0dc7a1ef4",
  bizCall: "https://app.notion.com/p/3a859549cbc08019aaeffdab0838edd4",
  engineeringImpact: "https://app.notion.com/p/3b759549cbc080238458d6e584edad62",
  pandyTalk: "https://app.notion.com/p/3a859549cbc080c9bf68c1155e975f7d",
} as const;

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
        <strong className="text-text">가상화 기반 렌더링 성능 최적화:</strong> Chrome Performance로 병목을 분석하고 React Virtuoso 기반 가상화를 적용해 3,000건 스크롤 시 발생하는 Long Task를 19건에서 1건으로 감소시켰습니다. 이를 통해 초기 UI 렌더링을 4.9초에서 0.14초, DOM Node를 54,458개에서 2,306~5,103개, 텍스트 입력 지연을 1,330ms에서 29ms로 단축했습니다.
      </>
    ],
    tags: ["React", "CRA (Webpack)", "React Virtuoso", "Chrome Performance"],
    link: NOTION_PROJECT_URLS.mozzle,
    video: "Cj3J-v1gLcI",
    videoRatio: "16:9",
    featured: true,
  },
  {
    title: "050 BizCall 관리자 웹 - 대용량 엑셀 다운로드 개선",
    category: "B2B Telecom Back-Office",
    theme: "emerald",
    description: [
      <>
        <strong className="text-text">대용량 엑셀 다운로드 구조 개선:</strong> 엑셀 생성 책임을 서버에서 클라이언트로 분산하고 API 병렬 요청, Web Worker 및 ZIP 분할 압축을 적용하여 최대 약 80만 건까지 처리 범위 확장. 20.5만 건 기준 1차 개선 구조 대비 처리 시간을 약 151초에서 91초로 약 40% 단축
      </>,
      <>
        <strong className="text-text">랜딩페이지 SEO 및 성능 최적화:</strong> Next.js 환경에서 RSC 분리와 이미지 용량 최적화(약 85% 축소) 및 레이아웃 시프트(CLS 0.679 → 0.065)를 개선하여 Lighthouse 성능(73 → 95) 및 SEO(91 → 100) 지표 달성. Search Console 한 달 비교 기준 노출수 53%, 클릭수 14% 증가
      </>
    ],
    tags: ["React", "SheetJS", "Web Worker", "ZIP Compression"],
    link: NOTION_PROJECT_URLS.bizCall,
    featured: true,
  },
  {
    title: "Payking - PG 결제 링크 서비스 및 통합 관리자",
    category: "Fintech Platform",
    theme: "purple",
    description: [
      <>
        <strong className="text-text">관리자 입력 흐름 3단계 → 2단계 단순화 제안:</strong> 불필요한 화면 상태를 줄이기 위해 기획 조직과 조율하여 입력 단계를 단축하고, JSON 기반 선언적 폼 구조로 개선하여 주요 페이지의 코드(LOC)를 약 20% 절감
      </>,
      <>
        <strong className="text-text">공통 Form 구조를 통한 확장성 확보:</strong> 공통 상태 흐름을 부모가 소유하도록 설계해 개별 화면 수정 범위를 최소화했으며, 공통 요구사항(Enter Submit 등)을 기존 24개 사용 화면에 일괄 대응
      </>
    ],
    tags: ["React", "Next.js (SSR)", "React Native", "Tailwind CSS"],
    link: NOTION_PROJECT_URLS.engineeringImpact,
    featured: false,
  },
  {
    title: "PandyTalk - AI 비서 오프라인 퍼스트 채팅 앱",
    category: "Personal AI Mobile App",
    theme: "rose",
    description: [
      <>
        <strong className="text-text">오프라인 퍼스트(Offline-First) 동기화 아키텍처:</strong> SQLite를 기본 조회 경로(Source of Truth)로 사용하여 네트워크 영향을 최소화. 누적 메시지 구독 비용을 줄이기 위해 실시간 구독을 최신 20건으로 제한하고, 메시지 순번(SEQ) 기반 '데이터 간극 탐지(Data Gap Detection)' 로직으로 부족한 데이터만 보충하는 동기화 흐름 구현
      </>,
      <>
        <strong className="text-text">실시간 AI 스트리밍 구현:</strong> HTTP SSE 엔드포인트를 연동하여 AI 답변을 실시간으로 표시하고, 최종 응답 시에만 원격 DB에 저장하도록 구성해 Write 비용 절감
      </>
    ],
    tags: ["React Native (CLI)", "TypeScript", "SQLite", "Firebase", "OpenAI"],
    link: NOTION_PROJECT_URLS.pandyTalk,
    github: "https://github.com/951jth/pandytalk",
    video: "Kf3jksOo_W4",
    videoRatio: "9:16",
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
            <p className="font-pretendard text-text-secondary text-sm sm:text-base max-w-2xl mx-auto md:whitespace-nowrap">
              성능을 측정하고 구조를 개선하여 사용자 경험을 개선한 핵심 작업들입니다.
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
