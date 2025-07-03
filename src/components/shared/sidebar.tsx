"use client"

import * as React from "react"
import {Command, Inbox, Settings} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {NavUser} from "@/components/shared/nav-user";
import {useState} from "react";
import {Room} from "@/lib/interface/response/room";
import {cn, formatDateTime} from "@/lib/utils";
import {useLocale} from "use-intl";
import AvatarHeader from "@/components/shared/header/avatar-header";
import {ArrayWithPage, BreadcrumbItemType} from "@/lib/type";
import {useTranslations} from "next-intl";
import ChatListPagination from "@/app/[locale]/(root)/chat/components/chat-list-pagination";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Inbox",
            url: "/chat",
            icon: Inbox,
            isActive: true,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
            isActive: false,
        },
    ],
}


export function AppSidebar({
                               rooms_with_page_init,
                               onRoomSelect,
                               onPathBreadCumbs,
                               room_selected,
                               page,
                               setPage,
                               ...sidebarProps // chỉ chứa các prop của Sidebar
                           }: React.ComponentProps<typeof Sidebar> & {
    rooms_with_page_init: ArrayWithPage<Room>,
    onRoomSelect: (room: Room) => void,
    onPathBreadCumbs: (breadcrumbItemTypes: BreadcrumbItemType[]) => void,
    room_selected?: Room,
    page: number,
    setPage: (page: number) => void,
}) {
    const [roomsWithPage, setRoomsWithPage] = useState<ArrayWithPage<Room>>(rooms_with_page_init)
    const [activeItem, setActiveItem] = useState(data.navMain[0])
    const {setOpen} = useSidebar()
    const locale = useLocale()
    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
            {...sidebarProps}
        >
            <Sidebar
                collapsible="none"
                className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                                <a href="#">
                                    <div
                                        className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Command className="size-4"/>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={{
                                                children: item.title,
                                                hidden: false,
                                            }}
                                            onClick={() => {
                                                setActiveItem(item)
                                                setOpen(true)
                                            }}
                                            isActive={activeItem?.title === item.title}
                                            className="px-2.5 md:px-2"
                                        >
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user}/>
                </SidebarFooter>
            </Sidebar>
            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-foreground text-base font-medium">
                            {activeItem?.title}
                        </div>
                    </div>
                    <SidebarInput placeholder="Type to search..."/>
                </SidebarHeader>
                {activeItem?.title === "Inbox" ? (
                    <ListNavRoom
                        rooms={roomsWithPage.content}
                        locale={locale}
                        onRoomSelect={onRoomSelect}
                        onPathBreadCumbs={onPathBreadCumbs}
                        roomSelected={room_selected}
                    />
                ) : null}
            </Sidebar>
        </Sidebar>
    )
}

export function ListNavRoom({
                                rooms,
                                locale,
                                onRoomSelect,
                                onPathBreadCumbs,
                                roomSelected,
                            }: {
    rooms: Room[],
    locale: string,
    onRoomSelect: (room: Room) => void,
    onPathBreadCumbs: (breadCumbs: BreadcrumbItemType[]) => void,
    roomSelected?: Room
}) {
    const t = useTranslations()
    const pathBreadcrumbs: BreadcrumbItemType[] = [
        {
            title: t("ChatPage.title"),
            href: "/chat",
        },
    ]

    return (
        <SidebarContent>
            <SidebarGroup className="px-0">
                <SidebarGroupContent>
                    {rooms.map((room) => (
                        <div
                            onClick={
                                () => {
                                    onRoomSelect(room)
                                    onPathBreadCumbs(
                                        [...pathBreadcrumbs, {
                                            title: room.name,
                                            href: `/chat?roomId=${room.id}`,
                                        }]
                                    )
                                }}
                            key={room.id}
                            className={cn(room.id === roomSelected?.id ? "bg-sidebar-accent" : "", "cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-row flex-wrap items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0")}
                        >
                            <AvatarHeader src={`${room.avatarUrl}`} alt={room.name}/>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                    <span className="font-medium">{room.name}</span>
                                    <span className="text-xs">{formatDateTime(room.createdAt, locale).dateOnly}</span>
                                </div>
                                <span
                                    className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">{room.type}</span>
                            </div>
                        </div>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )

}
