'use client';

import { Clock, ExternalLink, FileText, Image as ImageIcon, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';


interface HistoryCardProps {
  id: number;
  fileName: string;
  timestamp: string;
  preview?: string;
  text: string;
  fileType:string;
  originalFile?: string;
  onView: () => void;

}

export function HistoryCard({
  id,
  fileName,
  timestamp,
  preview,
  text,
  fileType,
  originalFile,
  onView,

}: HistoryCardProps) {
  const isImage = fileType==="image"?true:false;
  const FileIcon = isImage ? ImageIcon : FileText;


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
      
      {isImage ? (
        <div className="aspect-[16/9] relative">
          <img
            src={originalFile}
            alt={fileName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gray-800/50 flex items-center justify-center">
          <FileIcon className="w-16 h-16 text-white" />
        </div>
      )}

      <div className="p-4 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{fileName}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <time dateTime={timestamp}>
                {new Date(timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-400 line-clamp-2">{text}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              isImage ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
            )}>
              {isImage ? 'Image' : 'Document'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onView}
              className="rounded-xl inline-flex items-center gap-2 px-4 py-2  bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}