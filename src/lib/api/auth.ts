'use server'
import {callApiToObject} from "@/lib/utils";
import {POST_METHOD} from "@/lib/constants";
import {LoginRequest, RefreshTokenRequest, RegisterRequest} from "@/lib/interface/request/auth";
import {LoginResponse} from "@/lib/interface/response/auth";
import {signIn, signOut} from "@/auth";

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
export async function logout() {
    return signOut()
}
export async function refreshToken(data: RefreshTokenRequest) {
    return callApiToObject<LoginResponse>({
        url: `${subPath}/refresh-token`,
        method: POST_METHOD,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
}