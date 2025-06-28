'use server'
import {auth} from "@/auth";
import {TogglThemeMode} from "@/components/shared/header/toggl-theme-mode";
import AvatarHeader from "@/components/shared/header/avatar-header";
import {Button} from "@/components/ui/button";
import Link from "next/link"
import LanguageSwitcher from "@/components/shared/header/language-switcher";

export default async function HomeHeader() {
    const session = await auth();
    return(
        <div className='p-2 bg-secondary shadow-foreground drop-shadow-md text-secondary-foreground items-center flex justify-between max-w-screen flex-wrap'>
            <Link className='flex items-center gap-2' href='#'>
                <h1 className='text-xl md:text-2xl font-bold'>Explore chat</h1>
            </Link>
            <div className='flex flex-wrap sm:flex-nowrap items-center gap-4'>
                <LanguageSwitcher/>
                <TogglThemeMode/>
                {session ?
                    <AvatarHeader alt={session.user.name} src={session.user.image}/>
                :
                    <Button>
                        <Link href={'/sign-in'}>
                            Sign in
                        </Link>
                    </Button>
                }
            </div>
        </div>
    )
}