import { ApiResponse } from "@/types/ApiResponse";
import resend from "../lib/resend";
import VerificationEmail from "emails/VerificationEmail";
import { GraphQLError } from "graphql";
export const sendVerificationEmail=async(email:string,verifyCode:string):Promise<ApiResponse>=>{
    try {
        const {data,error}=await resend.emails.send({
            from:'Predictify <onboarding@resend.dev>',
            to:[email],
            subject:'Predictify | Verification code',
            react: VerificationEmail({otp:verifyCode})
        })
        return {
            success:true,
              message:"Verification email send successfully "
        }
    } catch (error) {
        console.error(error);
        return {
            success:false,
              message:"Error sending verification email"
        }
        
    }
}