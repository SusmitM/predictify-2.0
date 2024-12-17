'use client'
import { useQuery } from "@apollo/client";
import { GET_EXTRACTED_DATA } from "graphql/queries";
import client from "lib/apollo-client";
import Image from "next/image";
import { useState } from 'react';
import { HistoryCard } from '../../../components/history-card';
import { ExtractedTextModal } from '../../../components/extracted-text-modal';
import { motion } from 'framer-motion';

// Define the type for the history item
interface HistoryItem {
  _id: string;
  filename: string;
  createdAt: string;
  preview: string;
  content: string;
  s3Location: string;
  fileType: string;
}

const Page = () => {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data, loading, error } = useQuery(GET_EXTRACTED_DATA,{
    client,
    onCompleted: (data) => {
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Extraction History
      </h1>
      
    </div>

    <motion.div 
      className="grid gap-6 grid-cols-1 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {data?.getExtractedData?.extractedData?.map((item:any) => (
        <HistoryCard
          key={item._id}
          id={item._id}
          fileName={item.filename}
          timestamp={item.createdAt}
          preview={item.preview}
          text={item.content}
          originalFile={item.s3Location}
          fileType={item.fileType}
          onView={() => {
            setSelectedItem(item);
            setShowModal(true);
          }}
        
        />
      ))}
    </motion.div>

    {selectedItem && (
      <ExtractedTextModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        text={selectedItem.content}
        preview={selectedItem.preview}
        fileName={selectedItem.filename}
        originalFile={selectedItem.s3Location}
        fileType={selectedItem.fileType}
      />
    )}
  </div>
  );
};

export default Page;