import { gql } from "@apollo/client";

export const SIGN_UP=gql`
mutation signUp($email: String!, $password: String){
  signUp(email: $email, password: $password) {
    success
    message
    data {
      id
      email
      isVerified
    }
  }
}

`