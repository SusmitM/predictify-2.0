'use client';

import { motion } from 'framer-motion';
import { HowToCard } from './how-to-card';
import { Upload, Zap, Download } from 'lucide-react';

const steps = [
  {
    title: "Upload Image",
    description: "Upload the image from which you want to extract the text. Supports multiple formats including JPG, PNG, GIF, and PDF.",
    icon: <Upload className="w-6 h-6 text-purple-400" />,
    step: 1
  },
  {
    title: "Run the Tool",
    description: "The extraction starts automatically the moment you upload the file. Our advanced OCR processes your image instantly.",
    icon: <Zap className="w-6 h-6 text-pink-400" />,
    step: 2
  },
  {
    title: "Download/Copy Text",
    description: "After conversion, get your digital text instantly. Copy to clipboard or download as a text file - it's that simple!",
    icon: <Download className="w-6 h-6 text-purple-400" />,
    step: 3
  }
];

export function HowToSection() {
  return (
    <div className="relative py-32 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Extract text from images in three simple steps
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <HowToCard key={index} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}