'use client'
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {BreadcrumbItemType} from "@/lib/type";
import {Fragment} from "react";

export function ChatHeaderPage({
                                   pathBreadcrumbs,
                                   onBackToSelectRoomAction
                               }: {
    pathBreadcrumbs?: BreadcrumbItemType[],
    onBackToSelectRoomAction: () => void
}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            {pathBreadcrumbs && pathBreadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {pathBreadcrumbs.map((item, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {index === 0 ?
                                        (<BreadcrumbLink className={'cursor-pointer'} onClick={onBackToSelectRoomAction}>
                                            {item.title}
                                        </BreadcrumbLink>) : (
                                            <BreadcrumbLink className={'cursor-pointer'} href={item.href}>
                                                {item.title}
                                            </BreadcrumbLink>
                                        )}

                                </BreadcrumbItem>
                                {index < pathBreadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator className=""/>
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </header>
    )
}