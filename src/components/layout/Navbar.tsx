import MobileMenu from "./MobileMenu";
import NavbarContainer from "./NavbarContainer";

const navLinks = [
  { name: "소개", href: "#hero" },
  { name: "기술 스택", href: "#skills" },
  { name: "경력 사항", href: "#experience" },
  { name: "프로젝트", href: "#projects" },
];

export default function Navbar() {
  return (
    <NavbarContainer>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <a
          href="#hero"
          className="font-dohyeon text-2xl tracking-wide text-text hover:text-primary transition-colors"
        >
          조세훈.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center font-pretendard">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text-secondary font-medium hover:text-primary transition-all relative group text-sm"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-accent-deep transition-all shadow-sm hover:shadow-md"
          >
            커피챗 요청하기
          </a>
        </div>

        {/* Mobile Interactive Area */}
        <MobileMenu navLinks={navLinks} />
      </div>
    </NavbarContainer>
  );
}
