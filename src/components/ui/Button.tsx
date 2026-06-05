import { ReactNode, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

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
  loading?: boolean;
  loadingText?: string;
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
  loading = false,
  loadingText,
  children,
  ...props
}: ButtonProps) {
  // Tailwind CSS v4 design token-based styles
  const baseStyles =
    "inline-flex items-center justify-center font-pretendard transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] select-none hover:-translate-y-0.5 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-accent-deep hover:text-white hover:shadow-lg focus:ring-primary/40",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-accent-deep hover:text-white hover:shadow-lg focus:ring-secondary/40",
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

  const disabledClasses = loading || props.disabled ? "opacity-70 cursor-not-allowed hover:-translate-y-0 active:scale-100 pointer-events-none" : "";
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  const renderContent = () => (
    <>
      {loading ? (
        <span className="flex items-center justify-center transition-transform">
          <Loader2 className="animate-spin" size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
        </span>
      ) : icon && iconPosition === "left" ? (
        <span className="flex items-center justify-center transition-transform">{icon}</span>
      ) : null}

      {loading ? (
        <span className="flex items-center dot-loading">
          {loadingText || children}
          <span className="ml-0.5">.</span>
          <span>.</span>
          <span>.</span>
        </span>
      ) : (
        <span>{children}</span>
      )}

      {!loading && icon && iconPosition === "right" && (
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
    <button className={classes} disabled={loading || props.disabled} aria-disabled={loading || props.disabled} {...props}>
      {renderContent()}
    </button>
  );
}
