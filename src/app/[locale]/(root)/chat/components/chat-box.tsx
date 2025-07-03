'use client';
import {Input} from "@/components/ui/input";
import * as React from "react";
import {cn} from "@/lib/utils";

export function ChatBox() {

}

export function ChatBoxInput(
    { className,placeholder ,...props }: React.ComponentProps<"input">) {
    return (
        <div className="p-4 border-t">
            <Input
                type="text"
                placeholder={placeholder}
                className={cn(className,"w-full p-2 border rounded")}
                {...props}
            />
        </div>
    )
}

export function ChatBoxMessageItem() {

}

export function ChatBoxMessages() {

}

export function ChatBoxHeader() {

}

export function ChatBoxEmpty() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
                <span className="text-lg">
                    No messages yet. Start chatting!
                </span>
            </div>
        </div>
    );
}