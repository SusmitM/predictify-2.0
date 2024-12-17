import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { signUpSchema } from "@/schema/signUpSchema";
import { verifySchema } from "@/schema/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { PrismaClient, User } from "@prisma/client";
import { Textract } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { sendVerificationEmail } from "helpers/sendVerificationEmai";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient();


const textract = new Textract({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});



export const resolvers = {
  Query: {
    getUser: async (_: any, args: { id: string }): Promise<ApiResponse> => {
      try {
        const user: User | null = await prisma.user.findUnique({
          where: { id: args.id },
        });

        if (!user) {
          throw new GraphQLError("No user found with the provided userId", {
            extensions: {
              code: "UNREGISTERED_USER",
            },
          });
         
        }
        return {
          success: true,
          message: "User Found",
          data: user,
        };
      } catch (error) {
        console.error("Failed to get user", error);
        throw error
      }
    },
    getExtractedData: async (_: any) => {
      try {
        const session = await getServerSession(authOptions);
        const user = session?.user as User;
    
        if (!session || !session.user) {
          throw new GraphQLError("No session found", {
            extensions: {
              code: "UNAUTHENTICATED_USER",
            },
          });
        }
    
        const userId = user.id;
    
        // Fetch the user from the database
        const userRecord = await prisma.user.findUnique({
          where: { id: userId },
          select: { extractedData: true },
        });
    
        if (!userRecord) {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "USER_NOT_FOUND",
            },
          });
        }
    
        return {
          success:true,
          message:"History fetched succesfully",
          extractedData:userRecord.extractedData || []
        }
      } catch (error) {
        console.error("Error in getExtractedData resolver:", error);
        throw error
      }
    }
    
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

    extract: async (_: any, args: { filename: string; uniqueFilename: string }): Promise<ApiResponse> => {
      try {
        const session = await getServerSession(authOptions);
        const user = session?.user as User;
    
        if (!session || !session.user) {
          throw new GraphQLError("No session found", {
            extensions: {
              code: "UNAUTHENTICATED_USER",
            },
          });
        }
        if(!args.filename || !args.uniqueFilename){
          throw new GraphQLError("Parameters Missing", {
            extensions: {
              code: "PARAMETERS_MISSING",
            },
          });
        }
    
        const userId = user.id;
    
        const params = {
          Document: {
            S3Object: {
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Name: `${userId}/${args.uniqueFilename}`,
            },
          },
          FeatureTypes: ["TABLES", "FORMS"],
        };
    
        // Call Amazon Textract to analyze the document
        const textractResponse = await textract.analyzeDocument(params).promise();
    
        // Extract the text or structured data from the response
        const extractedText = textractResponse?.Blocks?.filter(
          (block) => block.BlockType === "LINE"
        )
          .map((line) => line.Text)
          .join("\n");
    
        const s3Location = `${process.env.CLOUD_FRONT_URL}/${userId}/${args.uniqueFilename}`;
    
        const fileType = args.filename?.toLowerCase().endsWith('.jpg') || 
                         args.filename?.toLowerCase().endsWith('.jpeg') || 
                         args.filename?.toLowerCase().endsWith('.png') || 
                         args.filename?.toLowerCase().endsWith('.gif') 
                         ? 'image' 
                         : 'file';

        const newFileData = {
          _id: uuidv4(),
          content: extractedText ?? "",
          filename: args.filename ?? "",
          s3Location: s3Location,
          createdAt: new Date().toISOString(),
          fileType: fileType,
        };
    
        // Fetch the current `extractedData` array
        const userRecord = await prisma.user.findUnique({
          where: { id: userId },
          select: { extractedData: true },
        });
    
        if (!userRecord) {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "USER_NOT_FOULD",
            },
          });
         
        }
    
        const updatedExtractedData = [
          ...(userRecord.extractedData || []),
          newFileData,
        ].filter((item): item is NonNullable<typeof item> => item !== null && item !== undefined);
    
        // Update the user record with the updated array
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            extractedData: updatedExtractedData,
          },
        });

        if (!updatedUser) {
          throw new GraphQLError("Database upload failed", {
            extensions: {
              code: "DB_UPLOAD_FAILED",
            },
          });
        }
    
        return {
          success: true,
          message: "Text extracted and file saved to db successfully",
          content: extractedText,
          s3Location,
          fileType
        };
      } catch (error) {
        
        console.error("Error in extract resolver:", error);
        throw error;
      }
    }
   

  }    
};
