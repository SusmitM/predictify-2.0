"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import client from "lib/apollo-client";
import { EXTRACT } from "graphql/mutations";
import { error } from "console";

const Page = () => {
  const [file, setFile] = useState<File | null>(null); // Keep single file state
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [extract] = useMutation(EXTRACT, {
    client,
    onCompleted: (data) => {
      console.log("Extracted Content:", data.extract.content);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
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
    <div className="min-h-screen bg-white text-red-500 overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Upload File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)} // Set single file
            className="w-full bg-gray-800 text-white rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-colors"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Page;
