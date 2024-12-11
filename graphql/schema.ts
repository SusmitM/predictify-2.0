import { gql } from "apollo-server-micro";

export const typeDefs= gql`
type FileData {
    id: ID!
    userId: ID!
    content: String!
    filename: String!
    s3Location: String!
    createdAt:String!
}

type User {
    id: ID!
    email:String!
    isVerified:Boolean!
    verificationCode:String
    extractedData:[FileData]
    createdAt:String!
    updatedAt:String!
}

type UserResponse {
    success:Boolean!
    message:String!
    data:User
}
type FileDataResponse{
    success:Boolean!
    message:String!
    data:[FileData!]!
}


type Query {
    getUser(id:ID!): UserResponse
}

type Mutation {
    signUp(email:String!,password:String,isVerified:Boolean!,verificationCode:String): UserResponse
}

`