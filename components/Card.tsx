import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight";
}

export default function Card({ children, className = "", variant = "default" }: CardProps) {
  const baseStyles = "rounded-lg border p-6";
  const variantStyles = {
    default: "border-slate-800 bg-background-card",
    highlight: "border-accent-orange/20 bg-background-card ring-1 ring-accent-orange/10",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
