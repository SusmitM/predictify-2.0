import { gql } from "@apollo/client";

export const SIGN_UP=gql`
mutation signUp($email: String!, $password: String){
  signUp(email: $email, password: $password) {
    success
    message
    data {
      email
    }
  }
}
`


export const VERIFY=gql` 
mutation verify($email:String!,$verificationCode:String!){
  verify(email:$email,verificationCode:$verificationCode){
    success
    message
  }
}
`
export const EXTRACT=gql`
mutation extract($filename: String!,$uniqueFilename:String!) {
  extract(filename: $filename,uniqueFilename:$uniqueFilename) {
    success
    message
    content
    s3Location
    fileType
  }
}`

