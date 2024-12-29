'use client'
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schema/verifySchema";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { VERIFY } from "graphql/mutations";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "../../../../components/ui/meteor-preview";
import React from "react";
import client from "lib/apollo-client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ApiResponse } from "@/types/ApiResponse";
import { AppLogo } from "@/components/ui/app-logo";

const Page = () => {
  const [verify, {loading}] = useMutation(VERIFY, {
    client,
    onCompleted(data, clientOptions) {
      handleComplete(data.verify);
    },
    onError: (error) => {
      console.error("GraphQL Mutation Error:", error); 
      handleError(error);
    },
    errorPolicy: "all", 
    
  });
  const router = useRouter();

  const params = useParams<{ email: string }>();
  const email = decodeURIComponent(params.email);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const handleComplete = async (data: ApiResponse) => {
    if (!data.success) {
      toast({
        title: "Code verification failed",
        description: data.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Code verification successfull",
      description: data.message,
    });
    router.replace("/home");
  };

  const handleError = (error: any) => {
  
    const description =
      error.graphQLErrors?.[0]?.message ||
      error.networkError?.message ||
      "An unexpected error occurred. Please try again later.";

    const code = error.graphQLErrors?.[0]?.code;

    if (code === "INTERNAL_SERVER_ERROR") {
      toast({
        title: "Code verification failed",
        description: "An unexpected error occured. Please try again later",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Code verification failed",
      description,
      variant: "destructive",
    });
  };
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await verify({
        variables: {
          email,
          verificationCode: data.verificationCode,
        },
        errorPolicy: "all", 
      });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <Meteors number={20} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8 mt-16">
        <div className=" mb-6 flex items-center justify-center"> <AppLogo showText={false} /></div>
          <div className="mb-6 flex items-center flex-col gap-y-4">
          <h2 className="text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Verify Your Account
          </h2>
          <p className="text-sm text-muted-foreground text-white">
          Enter the verification code sent to your email
          </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="verificationCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-400 mb-1">
                      Verification Code
                    </FormLabel>
                    <Input
                      {...field}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl
                      focus:outline-none focus:border-2  focus:border-purple-500 text-white placeholder:text-[#565656]"
                      style={{ boxShadow: "none" }}
                    />

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-colors"
              >
               Verify Account
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
