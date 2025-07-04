import {
    Pagination, PaginationClick,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {getPagination} from "@/lib/utils";
import * as React from "react";
import {useMyRoomStore} from "@/hooks/use-my-room-store";

type ChatListPaginationProps = {
    className?: string;
}


export default function ChatListPagination(props: ChatListPaginationProps) {
    const {className} = props;
    const {
        page,
        setPageNumber,
    } = useMyRoomStore()
    const pages = getPagination(page.number, page.totalPages,1);
    const handlePreviousClick = () => {
        if (page.number > 1) {
            setPageNumber(page.number - 1);
        }
    };
    const handleNextClick = () => {
        if (page.number < page.totalPages) {
            setPageNumber(page.number + 1);
        }
    };
    const handlePageClick = (page: number) => {
        setPageNumber(page)
    }
    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem >
                    <PaginationPrevious className={page.number ===1?'disabled:':''} onClick={handlePreviousClick}/>
                </PaginationItem>
                {pages.map(pageI => {
                    if (pageI < 1) {
                        return (
                            <PaginationItem key={pageI}>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )
                    } else {
                        return (
                            <PaginationItem key={pageI}>
                                <PaginationClick
                                    onClick={() => {
                                        handlePageClick(pageI);
                                    }}
                                    isActive={pageI === page.number}
                                >
                                    {pageI}
                                </PaginationClick>
                            </PaginationItem>
                        );
                    }
                })}
                <PaginationItem>
                    <PaginationNext className={page.number ===page.totalPages?'disabled:':''} onClick={handleNextClick}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}