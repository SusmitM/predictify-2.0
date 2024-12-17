import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar DateTime

  type FileData {
    _id: ID
    content: String
    filename: String
    s3Location: String
    createdAt: DateTime
  }

  type User {
    id: ID!
    email: String!
    isVerified: Boolean!
    verificationCode: String
    extractedData: [FileData] 
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserResponse {
    success: Boolean!
    message: String!
    data: User
  }

  type ExtractResponse {
    success: Boolean!
    message: String!
    extractedData: [FileData]! 
  }

  type Query {
    getUser(id: ID!): UserResponse
    getExtractedData: ExtractResponse
  }


  type Mutation {
    signUp(email: String!, password: String, isVerified: Boolean, verificationCode: String): UserResponse
    verify(email: String, verificationCode: String): UserResponse
    extract(filename: String, uniqueFilename: String): ExtractResponse
  }
`;
