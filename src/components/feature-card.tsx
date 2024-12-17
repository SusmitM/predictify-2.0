'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  borderColor: 'purple' | 'pink' | 'blue';
}

export function FeatureCard({ icon, title, description, borderColor }: FeatureCardProps) {
  const getBorderColorClass = (color: string) => {
    switch (color) {
      case 'purple':
        return 'hover:border-purple-500/50';
      case 'pink':
        return 'hover:border-pink-500/50';
      case 'blue':
        return 'hover:border-blue-500/50';
      default:
        return 'hover:border-purple-500/50';
    }
  };

  return (
    <div className={`p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 ${getBorderColorClass(borderColor)} transition-colors duration-300`}>
      <div className={`w-12 h-12 rounded-full bg-${borderColor}-500/10 flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}