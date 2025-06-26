import {callApiToObject} from "@/lib/utils";
import {POST_METHOD} from "@/lib/constants";
import {LoginRequest, RegisterRequest} from "@/lib/interface/request/auth";
import {LoginResponse} from "@/lib/interface/response/auth";
import {signIn} from "next-auth/react";

const subPath = '/public/auth'

export async function signInWithCredentials(request: LoginRequest) {
    return signIn('credentials', {...request, redirect: false})
}

export async function signUpWithCredentials(request: RegisterRequest) {
    return callApiToObject<LoginResponse>({
        url: `${subPath}/register`,
        method: POST_METHOD,
        headers: {
            'Content-Type': 'application/json'
        },
        body: request
    })
}

export async function login(data: LoginRequest) {
    return callApiToObject<LoginResponse>({
        url: `${subPath}/login`,
        method: POST_METHOD,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
}

export async function refreshToken(token: string) {
    return callApiToObject<LoginResponse>({
        url: `${subPath}/refresh`,
        method: POST_METHOD,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}