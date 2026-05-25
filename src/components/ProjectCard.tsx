import { ArrowUpRight, Github, Heart } from "lucide-react";
import Button from "./Button";

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  featured: boolean;
}

export default function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group bg-surface rounded-3xl border border-outer/60 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden relative font-pretendard">
      {/* Visual Top Bar Accent */}
      <div
        className={`h-2.5 w-full ${
          project.featured ? "bg-primary" : "bg-secondary"
        }`}
      />

      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Label */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider bg-outer px-2.5 py-1 rounded-md">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[10px] text-accent-deep bg-accent-light px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Heart size={10} fill="currentColor" />
                <span>대표 프로젝트</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-dohyeon text-xl sm:text-2xl text-text mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
            <span>{project.title}</span>
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
            {project.description}
          </p>
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
            <Button
              href={project.link}
              target="_blank"
              variant="outline"
              size="sm"
              icon={<ArrowUpRight size={14} />}
              iconPosition="right"
              aria-label={`${project.title} 상세 이력서 및 엔지니어링 로그 방문 (새 창 이동)`}
            >
              상세 로그 보기
            </Button>
            <Button
              href={project.github}
              target="_blank"
              variant="ghost"
              size="sm"
              icon={<Github size={14} />}
              aria-label={`${project.title} 깃허브 저장소 방문 (새 창 이동)`}
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

