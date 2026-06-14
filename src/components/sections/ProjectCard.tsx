import Button from "@/components/ui/Button";
import { ArrowUpRight, Github } from "lucide-react";

export type ProjectTheme = "primary" | "secondary" | "blue" | "emerald" | "purple" | "orange" | "rose";

export interface ProjectItem {
  title: string;
  category: string;
  description: React.ReactNode | React.ReactNode[];
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
  theme?: ProjectTheme;
}

const themeClasses: Record<ProjectTheme, { bar: string; badge: string; hoverBorder: string; titleHover: string; marker: string }> = {
  primary: { bar: "bg-primary", badge: "text-primary bg-primary/15", hoverBorder: "hover:border-primary/40", titleHover: "group-hover:text-primary", marker: "text-primary" },
  secondary: { bar: "bg-secondary", badge: "text-secondary bg-secondary/15", hoverBorder: "hover:border-secondary/40", titleHover: "group-hover:text-secondary", marker: "text-secondary" },
  blue: { bar: "bg-sky-700", badge: "text-sky-700 bg-sky-700/15", hoverBorder: "hover:border-sky-700/40", titleHover: "group-hover:text-sky-700", marker: "text-sky-600" },
  emerald: { bar: "bg-teal-700", badge: "text-teal-800 bg-teal-700/15", hoverBorder: "hover:border-teal-700/40", titleHover: "group-hover:text-teal-700", marker: "text-teal-600" },
  purple: { bar: "bg-indigo-700", badge: "text-indigo-800 bg-indigo-700/15", hoverBorder: "hover:border-indigo-700/40", titleHover: "group-hover:text-indigo-700", marker: "text-indigo-600" },
  orange: { bar: "bg-amber-700", badge: "text-amber-800 bg-amber-700/15", hoverBorder: "hover:border-amber-700/40", titleHover: "group-hover:text-amber-700", marker: "text-amber-600" },
  rose: { bar: "bg-rose-700", badge: "text-rose-800 bg-rose-700/15", hoverBorder: "hover:border-rose-700/40", titleHover: "group-hover:text-rose-700", marker: "text-rose-600" },
};

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const currentTheme = project.theme || (project.featured ? "primary" : "secondary");
  const styles = themeClasses[currentTheme];

  return (
    <div className={`group bg-surface rounded-3xl border border-outer/60 shadow-sm hover:shadow-xl ${styles.hoverBorder} transition-all duration-300 h-full flex flex-col justify-between overflow-hidden relative font-pretendard`}>
      {/* Visual Top Bar Accent */}
      <div className={`h-2.5 w-full ${styles.bar}`} />

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Label */}
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${styles.badge}`}>
              {project.category}
            </span>
            {/* {project.featured && (
              <span className="text-[10px] text-accent-deep bg-accent-light px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Heart size={10} fill="currentColor" />
                <span>대표 프로젝트</span>
              </span>
            )} */}
          </div>

          {/* Title */}
          <h3 className={`font-dohyeon text-xl sm:text-2xl text-text mb-3 ${styles.titleHover} transition-colors flex items-center gap-2`}>
            <span>{project.title}</span>
          </h3>

          {/* Description */}
          <div className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
            {Array.isArray(project.description) ? (
              <ul className={`list-disc pl-4 space-y-1.5 marker:${styles.marker}`}>
                {project.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            ) : (
              project.description
            )}
          </div>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs text-text-secondary bg-outer/60 px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 items-center border-t border-outer/30 pt-6">
            {project.link && <Button
              href={project.link}
              target="_blank"
              variant="outline"
              size="sm"
              icon={<ArrowUpRight size={14} />}
              iconPosition="right"
              aria-label={`${project.title} 상세 이력서 및 엔지니어링 로그 방문 (새 창 이동)`}
            >
              상세 로그 보기
            </Button>}
            {project.github && <Button
              href={project.github}
              target="_blank"
              variant="ghost"
              size="sm"
              icon={<Github size={14} />}
              aria-label={`${project.title} 깃허브 저장소 방문 (새 창 이동)`}
            >
              GitHub
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

