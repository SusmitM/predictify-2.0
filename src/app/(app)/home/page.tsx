"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import client from "lib/apollo-client";
import { EXTRACT } from "graphql/mutations";
import { error } from "console";
import { FileUpload } from "@/components/file-upload";
import { ExtractedTextModal } from "@/components/extracted-text-modal";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [extractedData, setExtractedData] = useState<{

    text: string;
    preview: string;
    fileType:string
  } | null>(null);
  const { toast } = useToast();
 
  const [extract] = useMutation(EXTRACT, {
    client,
    onCompleted: (data) => {
      const text = data.extract.content;
      const preview = data.extract.s3Location;
      const fileType=data.extract.fileType;
      setExtractedData({ text, preview,fileType });
      setShowModal(true);

      toast({
        title: "Text extracted successfully!",
        variant:"success"
      });

    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Text extracted failed!",
        description:error.message|| "Unexpected error occured",
        variant:"destructive"
      });
    },
  });

  const handleSubmit = async (file: File) => {
    if (!file) return;
    setLoading(true)
    try {
      setFile(file);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.status === 200) {
        const result = await extract({
          variables: {
            filename: data.data.filename,
            uniqueFilename: data.data.uniqueFilename,
          },
          errorPolicy: "all",
        });
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Something went wrong!",
        variant: "destructive",
      });
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
     {loading && (
            <div className="absolute right-5 bottom-10 bg-white text-black w-72 p-6 rounded-xl shadow-lg flex items-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="text-lg">Processing your file...</span>
            </div>
          )}
      <h1 className="text-center text-3xl font-bold my-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Extract Text from Files
      </h1>

      <FileUpload loading={loading} onFileUpload={handleSubmit} />

      {extractedData && (
        <ExtractedTextModal
        page="home"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          text={extractedData.text}
          fileName={file?.name ?? ""}
         fileLink={extractedData.preview}
         fileType={extractedData.fileType}
        />
      )}
    </div>
  );
};

export default Page;
