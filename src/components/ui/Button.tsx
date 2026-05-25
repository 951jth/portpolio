"use client";

import { ReactNode, ComponentPropsWithoutRef } from "react";
import Link from "next/link";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  download?: boolean | string;
  target?: string;
  rel?: string;
  className?: string;
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  download,
  target,
  rel,
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Tailwind CSS v4 design token-based styles
  const baseStyles =
    "inline-flex items-center justify-center font-pretendard transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] select-none hover:-translate-y-0.5 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-accent-deep hover:shadow-lg focus:ring-primary/40",
    secondary:
      "bg-secondary text-white hover:bg-accent-deep hover:shadow-lg focus:ring-secondary/40",
    accent:
      "bg-accent-light/50 border border-primary/20 text-accent-deep hover:bg-accent-light hover:shadow-md focus:ring-accent-deep/40",
    outline:
      "bg-white border border-outer text-text hover:bg-outer/50 hover:shadow-md focus:ring-outer/60",
    ghost:
      "bg-outer border border-outer/60 text-text hover:text-primary hover:bg-outer/80 focus:ring-outer/60",
  };

  const sizes = {
    sm: "px-6 py-2.5 rounded-full text-xs font-semibold gap-1.5",
    md: "px-8 py-3.5 rounded-full text-sm font-semibold gap-2",
    lg: "px-10 py-4 rounded-full text-base font-semibold gap-2.5",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const renderContent = () => (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex items-center justify-center transition-transform">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex items-center justify-center transition-transform">{icon}</span>
      )}
    </>
  );

  // Link vs Button Polymorphism
  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    
    if (isExternal || download) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={isExternal && target === "_blank" ? "noreferrer " + (rel || "") : rel}
          className={classes}
        >
          {renderContent()}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {renderContent()}
    </button>
  );
}
