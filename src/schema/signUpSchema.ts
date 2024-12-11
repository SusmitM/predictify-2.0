import { z } from "zod";

export const signUpScheam=z.object({
    email:z.string().email({message:"Invalid Email"}),
    password:z.string().min(6,{message:"password should be minimum of 6 letters"})

})