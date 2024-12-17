'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BackgroundGradient({ 
  children, 
  className,
  ...props
}: BackgroundGradientProps) {
  return (
    <div className="relative group">
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"
      />
      <div
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}