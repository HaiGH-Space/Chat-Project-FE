'use server'
import {TogglThemeMode} from "@/components/shared/header/toggl-theme-mode";
import {Button} from "@/components/ui/button";

export default async function HomePage() {
    return (
        <>
            <TogglThemeMode/>
            <Button>
                Hello, World!
            </Button>
        </>
    )
}