import { gql } from "@apollo/client"

export const GET_USER=gql`
	query USER($id:ID!) {
  getUser(id: $id) {
    success
    message
    data {
      email
      isVerified
      extractedData {
        filename
      }
    }
  }
}

`



export const GET_EXTRACTED_DATA = gql`
  query GetExtractedData {
    getExtractedData {
      success
      message
      extractedData {
        _id
        content
        filename
        s3Location
        createdAt
      }
    }
  }
`;
