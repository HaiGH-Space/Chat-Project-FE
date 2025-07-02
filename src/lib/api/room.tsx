'use server';
import {callApiToArrayWithPage, callApiToObject, generateHeaderAccessToken, throwSessionError} from "@/lib/utils";
import {auth} from "@/auth";
import {Room, RoomMember} from "@/lib/interface/response/room";
import {APIResponse, ArrayWithPage} from "@/lib/type";

const subPath = '/rooms';

export async function getMyRooms():Promise<APIResponse<ArrayWithPage<Room>>>{
    const session = await auth()
    if (!session) {
        return throwSessionError()
    }
    return callApiToArrayWithPage<Room>({
        url: `${subPath}/me`,
        method: 'GET',
        headers: generateHeaderAccessToken(session)
    });
}

export async function roomMemberMe({
    roomId
                                   }:{
    roomId: number;
}) : Promise<APIResponse<RoomMember>> {
    const session = await auth()
    if (!session) {
        return throwSessionError()
    }
    return callApiToObject<RoomMember>({
        url: `${subPath}/${roomId}/members/me`,
        method: 'GET',
        headers: generateHeaderAccessToken(session)
    });
}