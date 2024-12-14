'use client';

import { MovingBorder } from '@/components/ui/moving-border';
import { Meteors } from '@/components/ui/meteor-preview';
import { FileText, Upload, Zap } from 'lucide-react';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Spotlight } from '@/components/ui/spotlight';
import { FeatureCard } from '@/components/ui/feature-card';

import { Button } from '@/components/ui/button';





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
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <div className="relative w-full">
        <div className="absolute inset-0">
          <Meteors number={20} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl mt-8 md:text-7xl font-bold mb-8">
              <TypewriterEffect words={words} />
            </h1>
            <TextGenerateEffect
              words="Transform any image into editable text instantly with our powerful AI-powered OCR technology"
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            />
            
            <Button className="bg-gray-900 hover:bg-gray-800 rounded-full py-6">
              <div className="px-8  flex items-center gap-2 text-white cursor-pointer ">
                <Upload className="w-5 h-5" />
                <span className="font-semibold">Try Predictify Free</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Spotlight className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </Spotlight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8">
          <div className="absolute inset-0 opacity-50">
            <Meteors number={10} />
          </div>
          
          <div className="relative z-10">
            <TextGenerateEffect
              words="See it in Action"
              className="text-3xl font-bold mb-8 text-center"
            />
            <div className="aspect-video rounded-lg bg-gray-800/50 flex items-center justify-center">
              <p className="text-gray-400">Interactive Demo Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page