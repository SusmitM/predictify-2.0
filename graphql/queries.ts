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