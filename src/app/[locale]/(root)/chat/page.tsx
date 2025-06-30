import {auth} from "@/auth";

import {getTranslations} from "next-intl/server";
import {redirect} from "next/navigation";
export default async function ChatPage() {
    const session = await auth()
    if (!session) {
        redirect('/sign-in?callbackUrl=/chat')
    }
    const t = await getTranslations()
    return  (
        <div>
            <h1>{t('ChatPage.title')}</h1>
            <p>{t('ChatPage.welcomeMessage',{username: session.user.name})}</p>
        </div>
    )
}