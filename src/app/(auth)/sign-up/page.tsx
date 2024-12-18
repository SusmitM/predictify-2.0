"use client";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "../../../components/ui/meteor-preview";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/schema/signUpSchema";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "../../../../public/GoogleIcon.svg";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../../graphql/mutations";
import client from "lib/apollo-client";
import { ApiResponse } from "@/types/ApiResponse";
import { signIn } from "next-auth/react";
import { AppLogo } from "@/components/ui/app-logo";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    client,
    onCompleted: (data) => {
      
      handleSignUpResponse(data.signUp);
    },
    onError: (error) => {
      console.error("Error while signup:", error); 
      handleError(error);
    },
    errorPolicy: "all", 
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    
    const { email, password } = data;

    try {
      const response = await signUp({ variables: { email, password },errorPolicy: "all" },);
     
    } catch (error) {

      handleError(error);
    }
  };


  const handleSignUpResponse = async  (data: ApiResponse) => {
   
    if (!data.success) {
        toast({
            title:"Signup failed",
            description: data.message,
            variant: 'destructive', 
        });

    } else {
        toast({
            title: "Sign-up successful!",
          description:data.message,
        });
        router.replace(`/verify/${data?.data?.email}`);
    }
};

const handleError = (error: any) => {
  const description =
    error.graphQLErrors?.[0]?.message ||
    error.networkError?.message ||
    "An unexpected error occurred. Please try again later.";
    
    const code=error.graphQLErrors?.[0]?.code;
   
    if(code==="INTERNAL_SERVER_ERROR"){
      toast({
        title:"Signup failed",
        description:"An unexpected error occured. Please try again later",
        variant:"destructive"
      })
      return
    }
   
  toast({
    title: "Signup failed",
    description,
    variant: "destructive",
  });
  
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
        <div className="absolute top-0 -left-4">
          <Link
            href="/"
            className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8 mt-16">
        <div className=" mb-6 flex items-center justify-center"> <AppLogo showText={false} /></div>
          <h2 className="text-3xl text-center font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Create Account
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl
                       focus:outline-none focus:border-2  focus:border-purple-500 text-white"
                       style={{ boxShadow: "none" }}
                       />
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll send you a verification code
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-400 mb-1">
                      Password
                    </FormLabel>
                    <Input
                      {...field}
                      type="password"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl
                      focus:outline-none focus:border-2  focus:border-purple-500 text-white"
                      style={{ boxShadow: "none" }}
                      placeholder="••••••••"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-colors"
              >
                Create Account
              </Button>
            </form>
          </Form>
          <div className="flex items-center py-4">
                <hr className="flex-grow border-t border-white" />
                <p className="mx-2 text-sm text-white">or</p>
                <hr className="flex-grow border-t border-white" />
              </div>
              <Button
               onClick={() => {
                signIn("google", { callbackUrl: "/" });
              }}
                className="w-full py-3 px-4 text-sm rounded-xl flex gap-2 bg-white border-2 border-border text-[#565656] hover:text-white hover:border-black"
              >
                <Image src={GoogleIcon} alt="Google Icon" />
                <p>Sign up with Google</p>
              </Button>
              <p className="text-center text-gray-400 text-sm pt-2">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Sign in
                </Link>
              </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;