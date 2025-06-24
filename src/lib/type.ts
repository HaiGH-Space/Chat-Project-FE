import {SignInFormValidator} from "@/lib/validator";
import {z} from "zod";

export type SignInFormType = z.infer<ReturnType<typeof SignInFormValidator>>;