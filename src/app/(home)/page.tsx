'use server'
import {ToggleThemeMode} from "@/components/shared/header/ToggleThemeMode";
import {Button} from "@/components/ui/button";

export default async function HomePage() {

    return (
        <>
            <ToggleThemeMode/>
            <Button>
                Click Me
            </Button>
        </>
    )
}