import { signUpSchema } from "@/schema/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
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
                throw new GraphQLError(`${validationResult.error.errors
                    .map((err: any) => err.message)
                    .join(", ")}`, {
                    extensions: {
                        code: "FIELD_VALIDATION_FAILED",
                    },
                });
               
            }
            try {
                // Check if the email already exists
                const existingUser = await prisma.user.findUnique({
                    where: { email: args.email },
                });

                const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

                if (existingUser) {
                    if (existingUser.isVerified) {
                        throw new GraphQLError("Email already in use", {
                            extensions: {
                                code: "EMAIL_IN_USE",
                            },
                        });
                    } else {
                        const hashedPassword = await bcrypt.hash(args.password, 10);
                        const updatedUser = await prisma.user.update({
                            where: { email: args.email },
                            data: {
                                password: hashedPassword,
                                verificationCode: verifyCode,
                                verifyCodeExpiry: new Date(Date.now() + 3600000),
                            },
                        });
                        return {
                            success: true,
                            message: "User registered successfully. Please verify your email.",
                            data: updatedUser,
                        };
                    }
                } 

                else {
                    const hashedPassword = await bcrypt.hash(args.password, 10);
                    const expiryDate = new Date();
                    expiryDate.setHours(expiryDate.getHours() + 1);

                    const newUser: User = await prisma.user.create({
                        data: {
                            email: args.email,
                            password: hashedPassword,
                            isVerified: false,
                            verificationCode: verifyCode,
                            verifyCodeExpiry: expiryDate,
                        },
                    });
                    return {
                        success: true,
                        message: "User registered successfully. Please verify your email.",
                        data: newUser,
                    };
                }
            } catch (error: unknown) {
                throw error;
            }
        },
    },
};
