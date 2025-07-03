'use client';
import {ChatHeaderPage} from "@/components/shared/chat/chat-header-page";
import {ArrayWithPage, BreadcrumbItemType} from "@/lib/type";
import {ChatBoxInput} from "@/app/[locale]/(root)/chat/components/chat-box";
import {useTranslations} from "next-intl";
import {Room} from "@/lib/interface/response/room";
import {ListNavRoom} from "@/components/shared/sidebar";
import {useLocale} from "use-intl";
import ChatListPagination from "@/app/[locale]/(root)/chat/components/chat-list-pagination";
import * as React from "react";


export function ChatContent({
                                rooms_with_page_init,
                                onRoomSelect,
                                onPathBreadCumbs,
                                onBackToSelectRoom,
                                room_selected,
                                pathBreadcrumbs,
                                page,
                                setPage
                            }: {
    rooms_with_page_init: ArrayWithPage<Room>,
    onRoomSelect: (room: Room) => void
    onPathBreadCumbs: (breadcrumbItemTypes: BreadcrumbItemType[]) => void,
    onBackToSelectRoom: ()=> void,
    room_selected?: Room,
    pathBreadcrumbs: BreadcrumbItemType[],
    page: number,
    setPage: (page: number) => void

}) {
    const locale = useLocale()
    const t = useTranslations()
    return (pathBreadcrumbs.length > 1 ? (
        <>
            <ChatHeaderPage onBackToSelectRoom={onBackToSelectRoom} pathBreadcrumbs={pathBreadcrumbs}/>
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">

                </div>
                <ChatBoxInput placeholder={t('ChatPage.typeMessage')}/>
            </div>
        </>

    ) : (
        <>
            <ChatHeaderPage onBackToSelectRoom={onBackToSelectRoom} pathBreadcrumbs={pathBreadcrumbs}/>
            <ListNavRoom
                rooms={rooms_with_page_init.content}
                locale={locale}
                onRoomSelect={onRoomSelect}
                onPathBreadCumbs={onPathBreadCumbs}
                roomSelected={room_selected}
            />
            <ChatListPagination className={'m-2'} page={page} setPage={setPage} totalPages={20}/>
        </>
    ))
}