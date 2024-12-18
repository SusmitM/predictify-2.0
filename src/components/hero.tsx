"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteor-preview";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Button } from "./ui/moving-border";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const words = [
    { text: "Transform", className: "text-purple-400" },
    { text: "your", className: "text-gray-100" },
    { text: "images", className: "text-gray-100" },
    { text: "into", className: "text-gray-100" },
    { text: "text", className: "text-pink-400" },
    { text: "instantly.", className: "text-gray-100" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Meteors number={20} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h1 className="text-6xl mt-8 md:text-7xl font-bold mb-8">
            <TypewriterEffect words={words} />
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
          >
            Predictify lets you transform images into text with accuracy and
            speed, powered by our
            <span className="text-purple-400 font-medium"> Advanced OCR </span>
            technology.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/sign-up"
            >
             <Button
              borderRadius="0.5rem"
              className="h-12 bg-gradient-to-r from-purple-500 to-pink-600
               text-white font-semibold text-base  border-2 border-purple-500 "
            >
              Try Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
