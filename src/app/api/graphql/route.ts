import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../../graphql/resolvers";
import { typeDefs } from "../../../../graphql/schema";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// Initialize the Apollo Server
const server = new ApolloServer({
  resolvers,
  typeDefs,
  formatError: (err) => {
    console.error("GraphQL Error:", err);
    return {
      success: false,
      message: err.message || "An unexpected error occurred.",
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
      path: err.path,
    };
  },
});


const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    return { req };
  },
});


export async function GET(req: NextRequest, context: { params: any }) {
  return handler(req as any); 
}

export async function POST(req: NextRequest, context: { params: any }) {
  return handler(req as any); 
}
