import {
    Pagination, PaginationClick,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {getPagination} from "@/lib/utils";
import * as React from "react";

type ChatListPaginationProps = {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
    className?: string;
}


export default function ChatListPagination(props: ChatListPaginationProps) {
    const {page,className, setPage, totalPages} = props;
    const pages = getPagination(page, totalPages,1);
    const handlePreviousClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const handleNextClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };
    const handlePageClick = (page: number) => {
        setPage(page)
    }
    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem >
                    <PaginationPrevious className={page ===1?'disabled:':''} onClick={handlePreviousClick}/>
                </PaginationItem>
                {pages.map(page => {
                    if (page < 1) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )
                    } else {
                        return (
                            <PaginationItem key={page}>
                                <PaginationClick
                                    onClick={() => {
                                        handlePageClick(page);
                                    }}
                                    isActive={page === props.page}
                                >
                                    {page}
                                </PaginationClick>
                            </PaginationItem>
                        );
                    }
                })}
                <PaginationItem>
                    <PaginationNext className={page ===totalPages?'disabled:':''} onClick={handleNextClick}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}