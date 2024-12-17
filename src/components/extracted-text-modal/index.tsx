'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Preview } from './preview';
import { Content } from './content';
import { ModalActions } from './actions';

interface ExtractedTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  preview?: string;
  fileName: string;
  originalFile?: string;
  fileType?:string;
}

export function ExtractedTextModal({
  isOpen,
  onClose,
  text,
  preview,
  fileName,
  originalFile,
  fileType
}: ExtractedTextModalProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-gray-900 rounded-xl shadow-xl border border-gray-800 p-6">
          <div className="space-y-4">
            <Dialog.Title className="text-xl font-semibold text-white flex items-center justify-between">
              <span className='text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>Extracted Text</span>
              <ModalActions
                text={text}
                originalFile={originalFile}
                onSpeakToggle={setIsSpeaking}
              />
            </Dialog.Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Preview originalFile={originalFile} fileName={fileName} fileType={fileType??"file"} />
              <Content text={text} isGenerating={!isSpeaking} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}