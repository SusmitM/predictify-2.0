"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "../../../components/ui/meteor-preview";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInScheam } from "@/schema/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import GoogleIcon from "../../../../public/GoogleIcon.svg";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInScheam>>({
    resolver: zodResolver(signInScheam),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInScheam>) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      }
      if (result?.url) {
        router.replace("/home");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <Meteors number={20} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
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
          <h2 className="text-center text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome Back
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
                      type="email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                       focus:outline-none focus:border-2  focus:border-purple-500 text-white"
                      placeholder="you@example.com"
                      {...field}
                      style={{ boxShadow: "none" }}
                    />
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
                      type="password"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                       focus:outline-none focus:border-2  focus:border-purple-500 text-white"
                      placeholder="••••••••"
                      {...field}
                      style={{ boxShadow: "none" }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-colors"
              >
                Sign In
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
          className="w-full py-3 px-4 text-sm rounded-xl flex gap-2 bg-white border-2 border-border text-[#565656] hover:text-white hover:border-black">
            <Image src={GoogleIcon} alt="Google Icon" />
            <p>Sign in with Google</p>
          </Button>
          <p className="text-center text-gray-400 text-sm pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
