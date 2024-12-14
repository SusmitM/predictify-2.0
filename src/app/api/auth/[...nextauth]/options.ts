import { PrismaClient, User as PrismaUser, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<any> {
        const prisma = new PrismaClient();
        try {
          const user: User | null = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            throw new GraphQLError("No user found with this email", {
              extensions: {
                code: "UNREGISTERED_EMAIL",
              },
            });
          }
          if (!user?.password) {
            throw new GraphQLError(
              "User password was not provided during registation",
              {
                extensions: {
                  code: "UNREGISTERED_USER",
                },
              }
            );
          }
          if (!user?.isVerified) {
            throw new GraphQLError("Please verify your account", {
              extensions: {
                code: "UNVERIFIED_USER",
              },
            });
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user?.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new GraphQLError("Incorrect Password", {
              extensions: {
                code: "INCORRECT_PASSWORD",
              },
            });
          }
        } catch (error: any) {
          throw new GraphQLError(error, {
            extensions: {
              code: "SIGNIN_FAILED",
            },
          });
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const prisma = new PrismaClient();
          const { email, name } = user;

          if (!email) throw new Error("Email is required");
          const existingUser: any = await prisma.user.findUnique({
            where: { email: email as string },
          });

          if (!existingUser) {
            if (!email) throw new Error("Email is required");

            const newUser: any = await prisma.user.create({
              data: {
                email,
                isVerified: true,
              },
            });

            user.id = newUser.id.toString();
            user.isVerified = newUser.isVerified;
          } else {
            user.id = existingUser.id.toString();
            user.isVerified = existingUser.isVerified;
          }

          return true; // Allow sign-in
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false; // Deny sign-in
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        const userWithId = user as User;
        token.id = userWithId.id?.toString();
        token.isVerified = userWithId.isVerified;
      }
      return token as JWT & {
        id?: string;
        isVerified?: boolean;
      };
    },

    async session({
      session,
      token,
    }: {
      session: any;
      token: JWT & {
        id?: string;
        isVerified?: boolean;
      };
    }) {
      if (token) {
        session.user.id = token.id;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
