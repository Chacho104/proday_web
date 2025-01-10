// Layout utility component that ensures uniform padding across the application

"use client";

import { cn } from "@/app/lib/util";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto p-2 sm:p-4 md:p-6", className)}>
      {children}
    </div>
  );
};

export default Container;
