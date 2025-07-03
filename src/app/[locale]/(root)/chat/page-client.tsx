'use client'
import {AppSidebar} from "@/components/shared/sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {ChatContent} from "@/app/[locale]/(root)/chat/chat-content";
import {useState} from "react";
import {Room} from "@/lib/interface/response/room";
import {ArrayWithPage, BreadcrumbItemType} from "@/lib/type";
import {getMyRooms} from "@/lib/api/room";
import {toast} from "sonner";
import {useTranslations} from "next-intl";


export default function ChatPageClient({
                                           roomsWithPage,
                                           pathBreadcrumbsInit,
                                           roomSelected
                                       }:{
    roomsWithPage: ArrayWithPage<Room>,
    pathBreadcrumbsInit: BreadcrumbItemType[],
    roomSelected?: Room
}) {
    const t = useTranslations()
    const [roomsWithPageInit, setRoomsWithPageInit] = useState<ArrayWithPage<Room>>(roomsWithPage)
    const [roomSelectedInit, setRoomSelectedInit] = useState<Room|undefined>(roomSelected);
    const [pathBreadcrumbs, setPathBreadcrumbs] = useState<BreadcrumbItemType[]>(pathBreadcrumbsInit);
    const [page, setPage] = useState<number>(roomsWithPage.page.number+1);
    function backToSelectRoom() {
        setRoomSelectedInit(undefined);
        setPathBreadcrumbs([{
            title: t('ChatPage.title'),
            href: '/chat',
        }]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function fetchRooms(page:number,size:number = 9) {
        const myRooms = await getMyRooms()
        if (myRooms.success) {
            setRoomsWithPageInit(myRooms.data)
            setPage(myRooms.data.page.number)
        }else {
            toast.error(myRooms.message)
        }
    }

   return <SidebarProvider
        style={
            {
                "--sidebar-width": "355px",
            } as React.CSSProperties
        }
    >
        <AppSidebar onPathBreadCumbsAction={setPathBreadcrumbs} rooms_with_page_init={roomsWithPageInit} onRoomSelectAction={setRoomSelectedInit} room_selected={roomSelectedInit}/>
        <SidebarInset>
            <ChatContent page={page} setPageAction={setPage} onBackToSelectRoomAction={backToSelectRoom} onPathBreadCumbsAction={setPathBreadcrumbs}  rooms_with_page_init={roomsWithPageInit} onRoomSelectAction={setRoomSelectedInit} room_selected={roomSelectedInit} pathBreadcrumbs={pathBreadcrumbs}/>
        </SidebarInset>
    </SidebarProvider>
}