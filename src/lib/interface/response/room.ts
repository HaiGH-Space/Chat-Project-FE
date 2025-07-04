import {UserGeneralInfo} from "@/lib/interface/response/user";

export interface Room {
    id: number;
    name: string;
    avatarUrl: string;
    type: 'DIRECT' | 'GROUP';
    isPublic: boolean;
    createdBy: UserGeneralInfo;
    createdAt: Date
}
export interface RoomMember {
    id: number;
    room: Room;
    user: UserGeneralInfo;
    roleInRoom: 'HOST' | 'MEMBER';
    joinedAt: Date
}