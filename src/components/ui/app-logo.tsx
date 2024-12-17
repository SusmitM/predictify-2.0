'use client';

import { ScanText } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AppLogoProps {
  showText?: boolean;
  className?: string;
}

export function AppLogo({ showText = true, className }: AppLogoProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500 blur-lg opacity-50" />
        <div className="relative">
          <ScanText className="w-8 h-8 text-purple-500" />
          <motion.div
            className="absolute inset-0 border-2 border-purple-500 rounded-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
      
      {showText && (
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Predictify
      </span>
      )}
    </div>
  );
}