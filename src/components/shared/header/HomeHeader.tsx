'use server'
import {auth} from "@/auth";
import {ToggleThemeMode} from "@/components/shared/header/ToggleThemeMode";
import AvatarHeader from "@/components/shared/header/AvatarHeader";
import {Button} from "@/components/ui/button";
import Link from "next/link"

export default async function HomeHeader() {
    const session = await auth();
    return(
        <div className='p-2 bg-secondary shadow-foreground drop-shadow-md text-secondary-foreground items-center flex justify-between max-w-screen'>
            <Link className='flex items-center gap-2' href='#'>
                <h1 className='text-2xl font-bold'>Explore chat</h1>
            </Link>
            <div className='flex items-center gap-4'>
                <ToggleThemeMode/>
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