'use client';

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
}: MovingBorderProps) => {
  return (
    <div
      className={cn(
        "relative p-[1px] overflow-hidden group",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "w-[200%] h-[200%] animate-[spin_4s_linear_infinite]",
          borderClassName
        )}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
        }}
      />
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};