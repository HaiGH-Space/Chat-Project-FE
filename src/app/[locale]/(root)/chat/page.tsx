import {auth} from "@/auth";
import { AuroraText } from "@/components/magicui/aurora-text";
import { FlipText } from "@/components/magicui/flip-text";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
export default async function ChatPage() {
    const session = await auth()
    const t = await getTranslations()
    return session? (
        <div>
            <h1>{t('ChatPage.title')}</h1>
            <p>{t('ChatPage.welcomeMessage',{username: session.user.name})}</p>
        </div>
    ) : (
        <div className={"flex flex-col flex-1 items-center justify-center gap-4"}>
            <AuroraText className="text-6xl font-bold">{t('AboutPage.welcomeMessage')}</AuroraText>
            <Link href='/sign-in' ><FlipText className={'font-bold -tracking-widest'}>{t('Reminder.Login')}</FlipText></Link>
        </div>
    )
}