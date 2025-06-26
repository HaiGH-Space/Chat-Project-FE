import {z} from "zod";

export const SignInFormValidator = () => z.object({
    email: z.string().min(3, "Username or email is required"),
    password: z.string().min(5, "Password must be at least 6 characters long"),
    rememberMe: z.boolean().optional()
})
export const SignUpFormValidator = () => z.object({
    email: EmailValidator(),
    username: UsernameValidator(),
    fullName: FullNameValidator(),
    password: PasswordValidator(),
    phone: PhoneValidator(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const EmailValidator = () => z.string().email("Invalid email address")
export const UsernameValidator = () => z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long")
export const PhoneValidator = () => z
    .string()
    .refine(
        (val) => val.length === 0 || (val.length >= 10 && val.length <= 15),
        {
            message: "Phone number must be empty or between 10 and 15 characters long",
        }
    );
export const FullNameValidator = () => z.string().min(3, "Full name must be at least 3 characters long").max(50, "Full name must be at most 50 characters long")
export const PasswordValidator = () => z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long")