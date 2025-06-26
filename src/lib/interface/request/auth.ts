export interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string| null;
}