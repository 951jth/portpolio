import { CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";

export interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: string[];
  description: string;
}

export default function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="bg-surface p-8 rounded-3xl border border-outer/60 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-outer/50 rounded-2xl">
            {category.icon}
          </div>
          <h3 className="font-dohyeon text-lg text-text leading-tight">
            {category.title}
          </h3>
        </div>
        <p className="font-pretendard text-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
          {category.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="font-pretendard text-xs bg-outer text-text hover:bg-accent-light/50 hover:text-accent-deep border border-outer/30 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-default"
          >
            <CheckCircle2 size={12} className="text-secondary" />
            <span>{skill}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
