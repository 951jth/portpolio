"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export default function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-text hover:text-primary transition-colors focus:outline-none"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface shadow-lg border-t border-outer py-6 px-6 flex flex-col gap-4 animate-fadeIn font-pretendard">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-text font-medium py-2 border-b border-outer/50 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-white text-center font-semibold py-3 rounded-full hover:bg-accent-deep transition-all mt-2"
          >
            커피챗 요청하기
          </a>
        </div>
      )}
    </>
  );
}
