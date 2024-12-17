'use client';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { FileText, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  loading:boolean;
}

export function FileUpload({ onFileUpload,loading }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const{toast}=useToast()
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
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']; // Allowed MIME types
      if (file.size > 5 * 1024 * 1024) { // Check if file size exceeds 5MB
        toast({
          title: "Upload Failed",
          description: "File size exceeds 5MB limit.",
          variant: "destructive"
        });
        return;
      }
      if (!validTypes.includes(file.type)) { // Check if file type is valid
        toast({
          title: "Invalid File Type",
          description: "Please upload JPG, PNG, GIF, or PDF files.",
          variant: "destructive"
        });
        return;
      }
      onFileUpload(file);
    }
  }, [onFileUpload, toast]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']; // Allowed MIME types
      if (file.size > 5 * 1024 * 1024) { // Check if file size exceeds 5MB
        toast({
          title: "Upload Failed",
          description: "File size exceeds 5MB limit.",
          variant: "destructive"
        });
        return;
      }
      if (!validTypes.includes(file.type)) { // Check if file type is valid
        toast({
          title: "Invalid File Type",
          description: "Please upload JPG, PNG, GIF, or PDF files.",
          variant: "destructive"
        });
        return;
      }
      onFileUpload(file);
    }
  }, [onFileUpload, toast]);

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
        accept=".jpg,.jpeg,.png,.gif,.pdf" 
        disabled={loading}
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
              Supports JPG, PNG, JPEG, GIF & Single Page PDF
            </p>
          </div>
          
          <div className="flex items-center gap-8 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Up to 5MB</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}