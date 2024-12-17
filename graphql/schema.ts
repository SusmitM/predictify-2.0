import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar DateTime

  type FileData {
    id: ID!
    content: String!
    filename: String!
    s3Location: String!
    createdAt: DateTime!
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

  type ExtractData {
    content: String
  }

  type ExtractResponse {
    success: Boolean!
    message: String!
    content: String!
  }

  type Query {
    getUser(id: ID!): UserResponse
  }

  type Mutation {
    signUp(email: String!, password: String, isVerified: Boolean, verificationCode: String): UserResponse
    verify(email: String, verificationCode: String): UserResponse
    extract(filename: String, uniqueFilename: String): ExtractResponse
  }
`;
