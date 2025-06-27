import {auth} from "@/auth";
import { AuroraText } from "@/components/magicui/aurora-text";
import { FlipText } from "@/components/magicui/flip-text";
import Link from "next/link";
export default async function ChatPage() {
    const session = await auth()
    return session? (
        <div>
            <h1>Chat Page</h1>
            <p>Welcome, {session.user.name}!</p>
        </div>
    ) : (
        <div className={"flex flex-col flex-1 items-center justify-center gap-4"}>
            <AuroraText className="text-6xl font-bold">Welcome to Explore Chat App!</AuroraText>
            <Link href='/sign-in' ><FlipText className={'font-bold -tracking-widest'}>Please log in to start chatting.</FlipText></Link>
        </div>
    )
}