'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HowToCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  step: number;
}

export function HowToCard({ title, description, icon, step }: HowToCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
      
      <div className="relative p-8 bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-800 group-hover:border-purple-500/50 transition-colors">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
          {step}
        </div>
        
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        </div>
        
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}