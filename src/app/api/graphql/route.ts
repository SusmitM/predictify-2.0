import { ApolloServer } from "@apollo/server";
import {resolvers} from "../../../../graphql/resolvers"
import {typeDefs} from "../../../../graphql/schema"
import { startServerAndCreateNextHandler } from '@as-integrations/next';


const server =new ApolloServer({
    resolvers,
    typeDefs,
    formatError: (err) => {
        console.error("GraphQL Error:", err);
        return {
          success:false,
          message: err.message || "An unexpected error occurred.",
          code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
          path: err.path,
        };
      },
})

const handler=startServerAndCreateNextHandler(server);
export {handler as GET, handler as POST};