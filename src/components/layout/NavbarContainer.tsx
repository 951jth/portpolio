"use client";

import { ReactNode } from "react";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";

export default function NavbarContainer({ children }: { children: ReactNode }) {
  const scrolled = useNavbarScroll();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-outer/80 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      {children}
    </nav>
  );
}
