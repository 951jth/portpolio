import FadeIn from "@/components/ui/FadeIn";
import { Github, Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact() {
  const contactInfos = [
    {
      icon: <Mail className="text-primary" size={20} />,
      label: "이메일",
      value: "tpgnsjth@gmail.com",
      href: "mailto:tpgnsjth@gmail.com",
    },
    {
      icon: <Phone className="text-secondary" size={20} />,
      label: "전화번호",
      value: "+82 10-8968-9274",
      href: "tel:+821089689274",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute right-[-10%] bottom-[-10%] w-72 h-72 bg-accent-light/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="font-dohyeon text-3xl sm:text-4xl md:text-5xl text-text mb-4">
              연락처.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="font-pretendard text-text-secondary text-sm sm:text-base max-w-md mx-auto">
              새로운 제안이나 가벼운 커피챗 모두 환영합니다. 언제든 편하게 연락해 주세요.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeIn direction="left" delay={0.2} className="h-full">
              <div className="bg-surface p-8 rounded-3xl border border-outer/60 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-dohyeon text-xl text-text mb-6">소통 채널</h3>
                  <div className="space-y-6">
                    {contactInfos.map((info) => (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex gap-4 items-center group cursor-pointer"
                      >
                        <div className="p-3.5 bg-outer rounded-2xl group-hover:bg-accent-light/50 transition-colors">
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-pretendard text-xs text-text-secondary font-medium">
                            {info.label}
                          </p>
                          <p className="font-pretendard text-sm text-text font-bold group-hover:text-primary transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outer/40 pt-8 mt-8 flex gap-4 justify-start">
                  <a
                    href="https://github.com/951jth/pandytalk"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-outer hover:bg-primary hover:text-white rounded-full text-text-secondary transition-all"
                    aria-label="조세훈 깃허브 방문 (새 창 이동)"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Simple Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn direction="right" delay={0.3} className="h-full">
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-5xl mx-auto border-t border-outer/40 mt-20 pt-8 pb-12 flex flex-col items-center gap-3 text-center">
        <a 
          href="https://github.com/951jth/portpolio" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1.5 text-text hover:text-primary transition-colors font-pretendard text-xs group"
          aria-label="포트폴리오 소스코드 깃허브 방문 (새 창 이동)"
        >
          <Github size={14} className="group-hover:scale-110 transition-transform" />
          <span>Portfolio Source Code</span>
        </a>
        <p className="font-pretendard text-[11px] text-text">
          © {new Date().getFullYear()} 조세훈. Designed and Coded with Natural Warm Theme. All rights reserved.
        </p>
      </div>
    </section>
  );
}
