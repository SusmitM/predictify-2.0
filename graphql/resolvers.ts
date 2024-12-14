import { signUpSchema } from "@/schema/signUpSchema";
import { verifySchema } from "@/schema/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { sendVerificationEmail } from "helpers/sendVerificationEmai";
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
      let userData;
      const validationResult = signUpSchema.safeParse(args);

      if (!validationResult.success) {
        throw new GraphQLError(
          `${validationResult.error.errors
            .map((err: any) => err.message)
            .join(", ")}`,
          {
            extensions: {
              code: "FIELD_VALIDATION_FAILED",
            },
          }
        );
      }
      try {
        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: args.email },
        });

        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        if (existingUser) {
          if (existingUser.isVerified) {
            throw new GraphQLError("Email already in use", {
              extensions: {
                code: "EMAIL_IN_USE",
              },
            });
          } else {
            const hashedPassword = await bcrypt.hash(args.password, 10);
            userData = await prisma.user.update({
              where: { email: args.email },
              data: {
                password: hashedPassword,
                verificationCode: verifyCode,
                verifyCodeExpiry: new Date(Date.now() + 3600000),
              },
            });
          }
        } else {
          const hashedPassword = await bcrypt.hash(args.password, 10);
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 1);

          userData = await prisma.user.create({
            data: {
              email: args.email,
              password: hashedPassword,
              isVerified: false,
              verificationCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });
        }

        const emailResponse = await sendVerificationEmail(
          args.email,
          verifyCode
        );

        if (!emailResponse.success) {
          throw new GraphQLError("Error sending verification email", {
            extensions: {
              code: "CANNOT_SEND_VERIFICATION_EMAIL",
            },
          });
        }

        return {
          success: true,
          message: "User registered successfully. Please verify your email.",
          data: userData,
        };
      } catch (error) {
        throw error;
      }
    },

    verify: async (
      _: any,
      args: { email: string; verificationCode: string }
    ): Promise<ApiResponse> => {
      const { email, verificationCode } = args;
      const validationResult = verifySchema.safeParse(args);

      if (!validationResult.success) {
        throw new GraphQLError(
          `${validationResult.error.errors
            .map((err: any) => err.message)
            .join(", ")}`,
          {
            extensions: {
              code: "FIELD_VALIDATION_FAILED",
            },
          }
        );
      }

      try {
        const isUserPresent = await prisma.user.findUnique({
          where: { email },
        });

        if (!isUserPresent) {
          throw new GraphQLError("No user found with this email", {
            extensions: {
              code: "UNREGISTERED_EMAIL",
            },
          });
        }

        const dbVerificationCode = isUserPresent?.verificationCode;
        const verifyCodeExpiry = isUserPresent?.verifyCodeExpiry;

        const isCodeValid = verificationCode === dbVerificationCode;
        const isCodeExpired = verifyCodeExpiry
          ? new Date() > verifyCodeExpiry
          : true;

        if (isCodeValid && !isCodeExpired) {
          const updatedUser = await prisma.user.update({
            where: { email },
            data: {
              isVerified: true,
            },
          });

          return {
            success: true,
            message: "Account verified successfully",
          };
        } else if (isCodeExpired) {
          throw new GraphQLError(
            "Verification code has expired. Please sign up again to get a new code.",
            {
              extensions: {
                code: "VERIFICATION_CODE_EXPIRED",
              },
            }
          );
        } else {
          throw new GraphQLError("Incorrect verification code", {
            extensions: {
              code: "INVALID_VERIFICATION_CODE",
            },
          });
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
