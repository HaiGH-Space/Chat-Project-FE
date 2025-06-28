"use client"
import {SignUpFormValidator} from "@/lib/validator";
import {SignUpFormType} from "@/lib/type";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signUpWithCredentials} from "@/lib/api/auth";
import {toast} from "sonner";
import {useState} from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

const signUpDefaultValues = {
    email: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    phone: '',
}
export default function SignUpForm() {
    const signUpForm = SignUpFormValidator()
    type signUpType = SignUpFormType
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<signUpType>({
        resolver: zodResolver(signUpForm),
        mode: "onChange",
        defaultValues: signUpDefaultValues,
    })
    const onSubmit = async (data: signUpType) => {
        setIsLoading(true);
        const {email, username, password, confirmPassword, fullName, phone} = data;

        const response = await signUpWithCredentials({
            confirmPassword: confirmPassword,
            email: email,
            fullName: fullName,
            password: password,
            phoneNumber: !phone || phone.length === 0 ? null : phone,
            username: username
        })
        if (response.success) {
            toast.success("Signed up successfully");
            window.location.href = '/sign-in'
        } else {
            toast.error(response.message || "Something went wrong");
        }
        setIsLoading(false)
    }
    return (
        <div className={"flex flex-col gap-6"}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <div className="grid gap-6">
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Username" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Fullname</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Fullname" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Phone" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Confirm password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Confirm password" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Lottie animationData={loadingAnimation} loop={true}
                                                        className="h-7 w-7"/>
                                                     Sign up...
                                            </span>
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </Button>

                                </div>
                            </form>
                            <div className="text-center text-sm">
                                Do you have an account?{" "}
                                <a href="/sign-in" className="underline underline-offset-4">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </Form>
                </CardContent>
            </Card>
            <div
                className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}