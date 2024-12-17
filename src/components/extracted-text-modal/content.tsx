'use client';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { motion } from 'framer-motion';

interface ContentProps {
  page:"home" | "history";
  text: string;
  isGenerating?: boolean;
}

export function Content({page, text, isGenerating }: ContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-4 h-[300px] overflow-auto "
    >
      {page==="home" ? <TextGenerateEffect words={text} className="text-gray-200" />:
      <p className="text-gray-200">{text}</p>};
      
    </motion.div>
  );
}