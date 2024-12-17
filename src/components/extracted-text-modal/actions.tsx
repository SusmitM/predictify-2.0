'use client';

import { Copy, Download, FileDown, Volume2 } from 'lucide-react';

import { motion } from 'framer-motion';
import { useState } from 'react';


interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className=" flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
    >
      {icon}
      <span className="text-sm hidden sm:inline">{label}</span>
    </motion.button>
  );
}

interface ModalActionsProps {
  text: string;
  originalFile?: string;
  onSpeakToggle: (speaking: boolean) => void;
}

export function ModalActions({ text, originalFile, onSpeakToggle }: ModalActionsProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
   
   
  };

  const handleDownloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
      
  };

  const handleDownloadOriginal = () => {
    if (originalFile) {
      const a = document.createElement('a');
      a.href = originalFile;
      a.download = 'original-file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    }
  };

  const handleSpeak = () => {
    
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        onSpeakToggle(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          setIsSpeaking(false);
          onSpeakToggle(false);
        };
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        onSpeakToggle(true);
      }
    } 
  };

  return (
    <div className="flex flex-wrap gap-3">
      <ActionButton
        icon={<Copy className="w-4 h-4" />}
        label="Copy"
        onClick={handleCopy}
      />
      <ActionButton
        icon={<Download className="w-4 h-4" />}
        label="Download Text"
        onClick={handleDownloadText}
      />
      {/* {originalFile && (
        <ActionButton
          icon={<FileDown className="w-4 h-4" />}
          label="Download File"
          onClick={handleDownloadOriginal}
        />
      )} */}
      <ActionButton
        icon={<Volume2 className="w-4 h-4" />}
        label={isSpeaking ? 'Stop' : 'Listen'}
        onClick={handleSpeak}
      />
    </div>
  );
}