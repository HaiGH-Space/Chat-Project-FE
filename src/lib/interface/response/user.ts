export interface UserGeneralInfo {
    id: number;
    username: string;
    avatarUrl: string;
    createAt: Date;
}

export interface UserDetailInfo extends UserGeneralInfo {
    email: string;
    phoneNumber: string;
    role: string;
    updateAt: Date
}