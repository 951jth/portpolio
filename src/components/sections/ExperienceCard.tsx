import { Briefcase, Calendar, Check } from "lucide-react";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="relative">
      {/* Timeline Icon Node */}
      <span className="absolute -left-[38px] md:-left-[54px] top-1.5 flex items-center justify-center bg-secondary text-secondary-foreground w-8 h-8 rounded-full border-4 border-background shadow-sm">
        <Briefcase size={14} />
      </span>

      {/* Experience Card */}
      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-outer/60 shadow-sm hover:shadow-md transition-shadow">
        {/* Period Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent-deep text-xs font-semibold mb-4">
          <Calendar size={12} />
          <span>{exp.period}</span>
        </div>

        <h3 className="font-dohyeon text-lg sm:text-xl text-text mb-1">
          {exp.company}
        </h3>
        <p className="font-pretendard text-sm text-primary font-semibold mb-4">
          {exp.role}
        </p>

        <p className="font-pretendard text-text-secondary text-xs sm:text-sm leading-relaxed mb-6 border-l-2 border-outer pl-3">
          {exp.description}
        </p>

        {/* Achievements */}
        <div className="space-y-3 font-pretendard">
          <h4 className="font-bold text-xs text-text uppercase tracking-wider">
            주요 업무 및 성과
          </h4>
          <ul className="space-y-2.5">
            {exp.achievements.map((ach) => (
              <li
                key={ach}
                className="text-xs sm:text-sm text-text-secondary leading-relaxed flex gap-2.5 items-start"
              >
                <span className="mt-1 flex-shrink-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-secondary/10 text-secondary">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
