'use client'
import {AppSidebar} from "@/components/shared/sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {ChatContent} from "@/app/[locale]/(root)/chat/chat-content";
import React, {useEffect, useState} from "react";
import {Room} from "@/lib/interface/response/room";
import {ArrayWithPage, BreadcrumbItemType, Page} from "@/lib/type";
import {useTranslations} from "next-intl";
import {useMyRoomStore} from "@/hooks/use-my-room-store";


export default function ChatPageClient({
                                           roomsWithPage,
                                           pathBreadcrumbsInit,
                                           roomSelected
                                       }: {
    roomsWithPage: ArrayWithPage<Room>,
    pathBreadcrumbsInit: BreadcrumbItemType[],
    roomSelected?: Room
}) {
    const t = useTranslations()
    const [pathBreadcrumbs, setPathBreadcrumbs] = useState<BreadcrumbItemType[]>(pathBreadcrumbsInit);
    const {
        setPage,
        setRooms,
        setRoomSelected
    } = useMyRoomStore()


    useEffect(() => {
        const page: Page = roomsWithPage.page
        const rooms: Room[] = roomsWithPage.content
        setPage(page)
        setRooms(rooms)
        setRoomSelected(roomSelected)
    }, [roomsWithPage, roomSelected, setPage, setRooms, setRoomSelected]);

    function backToSelectRoom() {
        setRoomSelected(undefined);
        setPathBreadcrumbs([{
            title: t('ChatPage.title'),
            href: '/chat',
        }]);
    }

    return <SidebarProvider
        style={
            {
                "--sidebar-width": "355px",
            } as React.CSSProperties
        }
    >
        <AppSidebar onPathBreadCumbsAction={setPathBreadcrumbs}
        />
        <SidebarInset>
            <ChatContent onBackToSelectRoomAction={backToSelectRoom}
                         onPathBreadCumbsAction={setPathBreadcrumbs}
                         pathBreadcrumbs={pathBreadcrumbs}/>
        </SidebarInset>
    </SidebarProvider>
}