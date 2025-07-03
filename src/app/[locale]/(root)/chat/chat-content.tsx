'use client';
import {ChatHeaderPage} from "@/components/shared/chat/chat-header-page";
import {ArrayWithPage, BreadcrumbItemType} from "@/lib/type";
import {ChatBoxInput} from "@/app/[locale]/(root)/chat/chat-box";
import {useTranslations} from "next-intl";
import {Room} from "@/lib/interface/response/room";
import {ListNavRoom} from "@/components/shared/sidebar";
import {useLocale} from "use-intl";
import ChatListPagination from "@/app/[locale]/(root)/chat/chat-list-pagination";
import * as React from "react";


export function ChatContent({
                                rooms_with_page_init,
                                onRoomSelectAction,
                                onPathBreadCumbsAction,
                                onBackToSelectRoomAction,
                                room_selected,
                                pathBreadcrumbs,
                                page,
                                setPageAction
                            }: {
    rooms_with_page_init: ArrayWithPage<Room>,
    onRoomSelectAction: (room: Room) => void
    onPathBreadCumbsAction: (breadcrumbItemTypes: BreadcrumbItemType[]) => void,
    onBackToSelectRoomAction: ()=> void,
    room_selected?: Room,
    pathBreadcrumbs: BreadcrumbItemType[],
    page: number,
    setPageAction: (page: number) => void

}) {
    const locale = useLocale()
    const t = useTranslations()
    return (pathBreadcrumbs.length > 1 ? (
        <>
            <ChatHeaderPage onBackToSelectRoomAction={onBackToSelectRoomAction} pathBreadcrumbs={pathBreadcrumbs}/>
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">

                </div>
                <ChatBoxInput placeholder={t('ChatPage.typeMessage')}/>
            </div>
        </>

    ) : (
        <>
            <ChatHeaderPage onBackToSelectRoomAction={onBackToSelectRoomAction} pathBreadcrumbs={pathBreadcrumbs}/>
            <ListNavRoom
                rooms={rooms_with_page_init.content}
                locale={locale}
                onRoomSelectAction={onRoomSelectAction}
                onPathBreadCumbsAction={onPathBreadCumbsAction}
                roomSelected={room_selected}
            />
            <ChatListPagination className={'m-2'} page={page} setPage={setPageAction} totalPages={20}/>
        </>
    ))
}