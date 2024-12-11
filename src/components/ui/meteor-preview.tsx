'use client';

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface MeteorProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className = "" }: MeteorProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<{ top: string; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate meteor styles on the client side only
    const styles = Array.from({ length: number }, () => ({
      top: Math.floor(Math.random() * 100) + '%',
      left: Math.floor(Math.random() * 100) + '%',
      delay: (Math.random() * (0.8 - 0.2) + 0.2).toFixed(2) + 's',
      duration: (Math.floor(Math.random() * (10 - 2) + 2)).toFixed(0) + 's'
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[rgba(255,255,255,0.01)] before:to-[rgba(255,255,255,0.15)]",
            className
          )}
          style={{
            top: style.top,
            left: style.left,
            animationDelay: style.delay,
            animationDuration: style.duration,
          }}
        />
      ))}
    </>
  );
};