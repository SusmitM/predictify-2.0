import { gql } from "@apollo/client";


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
type ExtractData {
    content: String
}
type ExtractResponse{
    success:Boolean!
    message:String!
    content:String!
}



type Query {
    getUser(id:ID!): UserResponse
}

type Mutation {
    signUp(email:String!,password:String,isVerified:Boolean,verificationCode:String): UserResponse
    verify(email:String,verificationCode:String):UserResponse
    extract(filename:String,uniqueFilename:String):ExtractResponse
}

`