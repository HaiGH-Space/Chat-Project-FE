import NextAuth, {AuthError} from "next-auth"
import {login, refreshToken} from "@/lib/api/auth";
import {jwtDecode} from "jwt-decode";
import Credentials from "@auth/core/providers/credentials";
import {Provider} from "@auth/core/providers";
import {JWT} from "@auth/core/jwt";
export class CustomAuthError extends AuthError{
    constructor(msg: string) {
        super();
        this.message = msg;
        this.stack = undefined;
        Object.setPrototypeOf(this, CustomAuthError.prototype);
    }
}

type JwtPayload = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    exp: number;
};
const providers: Provider[] = [
    Credentials({
        credentials: {
            usernameOrEmail: {
                label: "username",
            },
            password: {
                label: "password",
            },
        },
        authorize: async (credentials) => {
            const password = credentials.password as string;
            const username = credentials?.usernameOrEmail as string;
            const res = await login({usernameOrEmail: username, password: password});
            if (!res.success) {
                throw new CustomAuthError(res.message);
            }
            const loginResponse = res.data;
            const token = loginResponse.accessToken
            const decoded = jwtDecode<JwtPayload>(token);
            return {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                image: decoded.avatarUrl,
                accessToken: loginResponse.accessToken,
                refreshToken: loginResponse.refreshToken,
                exp: decoded['exp'] * 1000,
            }

        }
    })
]

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: providers,
    callbacks: {
        jwt: async ({token, user}) => {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.exp = user.exp
            }
            if (token.exp && Date.now() < token.exp) {
                return token;
            }

            return await refreshTokens(token);
        },
        async session({session, token}) {
            return {
                ...session,
                accessToken: token.accessToken ?? '',
                refreshToken: token.refreshToken ?? '',
                error: typeof token.error === "string" ? token.error : undefined,
                user: {
                    id: typeof token.id === "string" ? token.id : undefined,
                    name: session.user?.name ?? (typeof token.name === "string" ? token.name : undefined),
                    email: session.user?.email ?? (typeof token.email === "string" ? token.email : undefined),
                    image: session.user?.image ?? (typeof token.image === "string" ? token.image : undefined),
                }
            }
        }
    }
})

async function refreshTokens(token: JWT) {
    const response = await refreshToken({refreshToken: token.refreshToken as string});
    if (!response.success) {
        return null
    }
    const data = response.data;
    const decoded = jwtDecode<JwtPayload>(data.accessToken);
    return {
        ...token,
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        image: decoded.avatarUrl,
        exp: decoded.exp * 1000,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    }
}