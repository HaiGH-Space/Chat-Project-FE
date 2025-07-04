'use client';
import {ChatHeaderPage} from "@/components/shared/chat/chat-header-page";
import {BreadcrumbItemType} from "@/lib/type";
import {ChatBoxInput} from "@/app/[locale]/(root)/chat/chat-box";
import {useTranslations} from "next-intl";
import {ListNavRoom} from "@/components/shared/sidebar";
import {useLocale} from "use-intl";
import ChatListPagination from "@/app/[locale]/(root)/chat/chat-list-pagination";
import * as React from "react";


export function ChatContent({
                                onPathBreadCumbsAction,
                                onBackToSelectRoomAction,
                                pathBreadcrumbs,
                            }: {
    onPathBreadCumbsAction: (breadcrumbItemTypes: BreadcrumbItemType[]) => void,
    onBackToSelectRoomAction: ()=> void,
    pathBreadcrumbs: BreadcrumbItemType[],

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
                locale={locale}
                onPathBreadCumbsAction={onPathBreadCumbsAction}
            />
            <ChatListPagination className={'m-2'}/>
        </>
    ))
}