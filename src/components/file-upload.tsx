'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { FileText, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 border-dashed transition-colors',
        isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-gray-600'
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
        accept="image/*,.pdf,.doc,.docx"
      />
      
      <div className="p-8 text-center">
        <motion.div
          animate={{
            y: isDragging ? -10 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="p-4 rounded-full bg-purple-500/10">
            <Upload className="w-8 h-8 text-purple-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-white">
              Drop your file here or click to upload
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Supports JPG, PNG, GIF, PDF & More
            </p>
          </div>
          
          <div className="flex items-center gap-8 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Up to 10MB</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}