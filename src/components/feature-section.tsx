'use client';

import { motion } from 'framer-motion';
import { FileText, Zap, Download, History, Shield, Sparkles } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const features = [
  {
    title: "Lightning Fast",
    description: "Get your results in seconds with our optimized processing engine",
    icon: <Zap className="w-6 h-6 text-white" />,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Multiple Formats",
    description: "Support for JPG, PNG, GIF, PDF and more file formats",
    icon: <FileText className="w-6 h-6 text-white" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Easy Export",
    description: "Copy to clipboard or download as .txt file instantly",
    icon: <Download className="w-6 h-6 text-white" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "History Access",
    description: "Access all your previous extractions anytime",
    icon: <History className="w-6 h-6 text-white" />,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Safety Assured",
    description: "Secure and private image to text conversion",
    icon: <Shield className="w-6 h-6 text-white" />,
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Advanced OCR",
    description: "Powered by cutting-edge OCR technology for accuracy",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    gradient: "from-indigo-500 to-purple-500"
  }
];

export function FeatureSection() {
  return (
    <div className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Why Choose Predictify?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The most powerful and user-friendly image to text converter
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <BackgroundGradient className="rounded-[22px] p-6 sm:p-8 bg-gray-900">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}