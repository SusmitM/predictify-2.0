import { ApolloServer } from "@apollo/server";
import {resolvers} from "../../../../graphql/resolvers"
import {typeDefs} from "../../../../graphql/schema"
import { startServerAndCreateNextHandler } from '@as-integrations/next';


const server =new ApolloServer({
    resolvers,
    typeDefs,
})

const handler=startServerAndCreateNextHandler(server);
export {handler as GET, handler as POST};