import {SignInFormValidator, SignUpFormValidator} from "@/lib/validator";
import {z} from "zod";
export type ApiCallOptions = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
}
export type APIResponseSuccess<T> = {
    success: true;
    message: string;
    data: T; // Never null khi success = true
};

export type APIResponseError = {
    success: false;
    message: string;
    data: null; // Luôn null khi success = false
};
export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError;
export type SignInFormType = z.infer<ReturnType<typeof SignInFormValidator>>;
export type SignUpFormType = z.infer<ReturnType<typeof SignUpFormValidator>>;
export type BreadcrumbItemType = {
    title: string;
    href?: string;
}