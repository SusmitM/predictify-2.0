"use client";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export const Spotlight = ({ children, className = "" }: SpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && divRef.current) {
      const handleMouseMove = (event: MouseEvent) => {
        if (divRef.current) {
          const div = divRef.current;
          const rect = div.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          setPosition({ x, y });
          setOpacity(1);
        }
      };

      const handleMouseLeave = () => {
        setOpacity(0);
      };

      const element = divRef.current;
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isMounted]);

  return (
    <div
      ref={divRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124,58,237,0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};