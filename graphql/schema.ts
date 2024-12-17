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
    extractedData: [FileData!] # Make it nullable if it can be null, e.g., [FileData]
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
    extractedData: [FileData] # Change to an array of FileData
  }

  type Query {
    getUser(id: ID!): UserResponse
    getExtractedData: ExtractResponse
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
