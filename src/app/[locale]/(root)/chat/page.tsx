import {auth} from "@/auth";

import {getTranslations} from "next-intl/server";
import {redirect} from "next/navigation";

import {getMyRooms, roomMemberMe} from "@/lib/api/room";
import {Room} from "@/lib/interface/response/room";
import ChatPageClient from "@/app/[locale]/(root)/chat/page-client";

export default async function ChatPage({
    searchParams
                                       }:{
    searchParams: {
        roomId?: string,
    };
}) {
    const session = await auth()
    if (!session) {
        redirect('/sign-in?callbackUrl=/chat')
    }
    const t = await getTranslations()
    const {roomId}  = await searchParams
    const pathBreadcrumbs = [{
        title: t('ChatPage.title'),
        href: '/chat',
    }]
    const fetchMyRooms = await getMyRooms();
    let room_member_me
    let roomSelected: Room | undefined = undefined;
    if (roomId) {
        room_member_me = await roomMemberMe({
            roomId: parseInt(roomId),
        })
        if (room_member_me.success) {
            roomSelected = room_member_me.data.room
            const roomName = room_member_me.data.room.name;
            pathBreadcrumbs.push({
                title: roomName?? t('ChatPage.defaultRoomName'),
                href: encodeURI(`/chat?roomId=${roomId}`),
            });
        }
    }

    const data = fetchMyRooms.success?fetchMyRooms.data:{
        content: [] as Room[],
        page: {
            number: 0,
            totalPages: 0,
            size:0,
            totalElements: 0,
        }
    }

    return <ChatPageClient roomSelected={roomSelected} pathBreadcrumbsInit={pathBreadcrumbs} roomsWithPage={data}/>
}