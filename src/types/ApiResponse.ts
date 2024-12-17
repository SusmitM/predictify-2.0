import { User } from "@prisma/client";

export interface ApiResponse{
    success:boolean;
    message:string;
    data?:User;
    extensions?:any;
    content?:string
}