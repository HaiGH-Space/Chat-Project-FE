import  { DefaultUser } from "next-auth";
declare module "next-auth" {
    interface Session {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
        error?: string;
    }

    interface User extends DefaultUser {
        accessToken?: string;
        refreshToken?: string;
        id?: string;
        name: string;
        email: string;
        image: string;
        exp?: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        id?: string;
        name?: string;
        email?: string;
        image?: string;
        error?: string;
        exp?: number;
    }
}