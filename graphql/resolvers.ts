import { signUpSchema } from "@/schema/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUser: async (_: any, args: { id: string }): Promise<ApiResponse> => {
      try {
        const user: User | null = await prisma.user.findUnique({
          where: { id: args.id },
        });

        if (!user) {
          return {
            success: false,
            message: "No user found with the provided userId",
          };
        }
        return {
          success: true,
          message: "User Found",
          data: user,
        };
      } catch (error) {
        console.error("Failed to get user", error);
        return {
          success: false,
          message: "Failed to find user",
        };
      }
    },
  },

  Mutation: {
    signUp: async (
      _: any,
      args: { email: string; password: string }
    ): Promise<ApiResponse> => {
      const validationResult = signUpSchema.safeParse(args);
      if (!validationResult.success) {
        return {
          success: false,
          message: validationResult.error.errors
            .map((err: any) => err.message)
            .join(", "),
          extensions: { code: 400 },
        };
      }
      try {
        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: args.email },
        });
        if (existingUser) {
          return {
            success: false,
            message:
              "Email is already registered. Please log in or use a different email.",
          
          };
        }

        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const newUser: User = await prisma.user.create({
          data: {
            email: args.email,
            password: hashedPassword,
            isVerified: false,
            verificationCode: verifyCode,
          },
        });
        return {
          success: true,
          message: "Sign-up successfull user added",
          data: newUser,
       
        };
      } catch (error: unknown) {
        console.error("Sign-up Error:", error);
        return {
          success: false,
          message: "Sign-up failed. Please try again later.",
         
        };
      }
    },
  },
};
