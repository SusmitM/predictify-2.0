import { z } from "zod";

export const signInScheam=z.object({
    email:z.string().min(1,{message:"Invalid Email"}),
    password:z.string().min(1,{message:"Please enter an Password"})
})