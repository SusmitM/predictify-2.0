"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import client from "lib/apollo-client";
import { EXTRACT } from "graphql/mutations";
import { error } from "console";
import { FileUpload } from "@/components/file-upload";
import { ExtractedTextModal } from "@/components/extracted-text-modal";



const Page = () => {
  
  const [file, setFile] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    text: string;
    preview?: string;
  } | null>(null);
  const { toast } = useToast();
  const [extract] = useMutation(EXTRACT, {
    client,
    onCompleted: (data) => {
      const text=data.extract.content
      const preview=file?.type.startsWith('image/') 
      ? URL.createObjectURL(file)
      : undefined
      setExtractedData({text,preview})
      setShowModal(true);
      toast({
        title: "Text extracted successfully!",
      });
      
      console.log("Extracted Content:", data.extract.content);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  

  const handleSubmit = async (file:File) => {

    if (!file) return;

    try {
      setFile(file);
      const formData = new FormData();
      formData.append("file", file);

      const response=await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data=await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data)
      if(response.status===200){
        const result=await extract({
          variables:{
            filename:data.data.filename,
            uniqueFilename:data.data.uniqueFilename
          },
          errorPolicy:"all"
        })
      }
      
      
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
   <h1 className="text-3xl font-bold my-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Extract Text from Files
      </h1>
  
    <FileUpload onFileUpload={handleSubmit} />
    
    {extractedData && (
      <ExtractedTextModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        text={extractedData.text}
        fileName={file?.name??""}
        preview={extractedData.preview}
      
      />
    )}
  </div>
  );
};



export default Page;