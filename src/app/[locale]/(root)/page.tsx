'use server'
import {AuroraText} from "@/components/magicui/aurora-text";
import {getTranslations} from "next-intl/server";
import {FlipText} from "@/components/magicui/flip-text";
import Link from "next/link";
import {auth} from "@/auth";
import HomeHeader from "@/components/shared/header/home-header";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";

export default async function HomePage() {
    const t = await getTranslations()
    const session = await auth()
    return session ? (
        <>
            <div className={"flex flex-col flex-1 break-words items-center justify-center gap-4"}>
                <Link href='/chat'>
                    <InteractiveHoverButton>
                        {t('HomePage.goToChatPage')}
                    </InteractiveHoverButton>
                </Link>
            </div>
        </>
    ) : (
        <>
            <HomeHeader/>
            <div className={"flex flex-col flex-1 break-words items-center justify-center gap-4"}>
                <AuroraText
                    className="text-center text-4xl md:text-6xl font-bold">{t('AboutPage.welcomeMessage')}</AuroraText>
                <Link href='/sign-in'><FlipText
                    className={'font-bold -tracking-widest'}>{t('Reminder.Login')}</FlipText></Link>
            </div>
        </>
    )
}