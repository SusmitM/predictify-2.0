'use client';

import { MovingBorder } from '@/components/ui/moving-border';
import { Meteors } from '@/components/ui/meteor-preview';
import { FileText, Upload, Zap } from 'lucide-react';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Spotlight } from '@/components/ui/spotlight';


import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/feature-card';
import { Hero } from '@/components/hero';
import { HowToSection } from '@/components/how-to-section';
import { FeatureSection } from '@/components/feature-section';





const Page = () => {
  const words = [
    { text: "Transform", className: "text-purple-400" },
    { text: "your", className: "text-gray-100" },
    { text: "images", className: "text-gray-100" },
    { text: "into", className: "text-gray-100" },
    { text: "text", className: "text-pink-400" },
    { text: "instantly.", className: "text-gray-100" },
  ];

  const features: { icon:any; title: string; description: string; borderColor: "purple" | "pink" | "blue"; }[] = [
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Lightning Fast",
      description: "Get your results in seconds with our optimized processing engine",
      borderColor: "purple",
    },
    {
      icon: <FileText className="w-6 h-6 text-pink-400" />,
      title: "High Accuracy",
      description: "Advanced AI ensures precise text extraction from any image format",
      borderColor: "pink",
    },
    {
      icon: <Upload className="w-6 h-6 text-blue-400" />,
      title: "Bulk Processing",
      description: "Process multiple images simultaneously with our batch upload feature",
      borderColor: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
     <Hero />
      <HowToSection />
      <FeatureSection />
    </div>
  );
}

export default Page