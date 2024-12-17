'use client';

import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface PreviewProps {
  fileLink?: string;
  fileName: string;
  fileType:string;
}

export function Preview({ fileLink, fileName,fileType }: PreviewProps) {
  const isImage = fileType==="image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-lg overflow-hidden bg-gray-800"
    >
      {isImage ? (
        <div className="aspect-video">
          <img
            src={fileLink}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center bg-gray-800/50">
          <FileText className="w-16 h-16 text-white" />
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-sm text-gray-200 truncate">{fileName}</p>
      </div>
    </motion.div>
  );
}