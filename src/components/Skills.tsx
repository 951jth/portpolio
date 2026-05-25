import FadeIn from "./FadeIn";
import SkillCard, { SkillCategory } from "./SkillCard";
import { Code2, Globe2, Sparkles } from "lucide-react";

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "프론트엔드 코어 (Frontend Core)",
      icon: <Code2 className="text-primary" size={24} />,
      skills: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js (App/Pages)",
        "React Native (CLI)",
        "Tailwind CSS",
      ],
      description: "다양한 대고객 웹 및 앱 제품의 견고한 프론트엔드 아키텍처 설계를 리드합니다.",
    },
    {
      title: "상태 및 데이터 관리 (State & Data)",
      icon: <Globe2 className="text-secondary" size={24} />,
      skills: [
        "Zustand",
        "React Query",
        "Redux",
        "MobX",
        "SQLite",
        "Firebase (Firestore)",
      ],
      description: "일관된 단방향 상태 제어와 데이터 동기화 비용을 최소화하는 Offline-First 로컬 데이터 시스템을 최적화합니다.",
    },
    {
      title: "성능 최적화 및 UI (Performance & UI)",
      icon: <Sparkles className="text-accent-deep" size={24} />,
      skills: [
        "React Virtuoso",
        "Chrome Performance",
        "Web Worker",
        "SheetJS (Excel)",
        "ZIP Compression",
        "MUI / Ant Design",
      ],
      description: "가상 테이블 기법(Virtualization) 및 브라우저 백그라운드 멀티스레드 연산을 통한 렌더링 병목 해소를 지향합니다.",
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-outer/20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="font-dohyeon text-3xl sm:text-4xl md:text-5xl text-text mb-4">
              기술 스택.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="font-pretendard text-text-secondary text-sm sm:text-base max-w-md mx-auto">
              지속적인 학습과 성능 모니터링을 바탕으로 검증된 조합을 사용하여
              프로젝트를 성공시킵니다.
            </p>
          </FadeIn>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <FadeIn
              key={category.title}
              direction="up"
              delay={index * 0.15}
              className="h-full"
            >
              <SkillCard category={category} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
