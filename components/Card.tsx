import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight";
}

export default function Card({ children, className = "", variant = "default" }: CardProps) {
  const baseStyles = "bg-surface/95 backdrop-blur-xl rounded-2xl shadow-3d border transition-all duration-300";
  const variantStyles = {
    default: "border-white/10 hover:shadow-3d-hover hover:border-accent/30",
    highlight: "border-accent/30 bg-surface/95 ring-1 ring-accent/20 hover:shadow-3d-hover",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} p-6 ${className}`}>
      {children}
    </div>
  );
}
