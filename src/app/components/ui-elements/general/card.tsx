// Reusable card component with a set background color and rounded corners
// Accepts children and className prop. className prop for further customization from where it's used

"use client";

import { cn } from "@/app/lib/util";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("bg-cards-background rounded-md shadow-md", className)}>
      {children}
    </div>
  );
};

export default Card;
