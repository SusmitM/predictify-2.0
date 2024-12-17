'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Preview } from './preview';
import { Content } from './content';
import { ModalActions } from './actions';

interface ExtractedTextModalProps {
  page:"home" | "history";
  isOpen: boolean;
  onClose: () => void;
  text: string;
  fileName: string;
  fileLink?: string;
  fileType?:string;
}

export function ExtractedTextModal({
  page,
  isOpen,
  onClose,
  text,
  fileName,
  fileLink,
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
                fileLink={fileLink}
                onSpeakToggle={setIsSpeaking}
              />
            </Dialog.Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Preview fileLink={fileLink} fileName={fileName} fileType={fileType??"file"} />
              <Content text={text} isGenerating={!isSpeaking} page={page} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}