'use client'
import {i18n} from "@/i18n/i18n-config";
import {useLocale} from "use-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
    const {locales} = i18n
    const locale = useLocale()
    const pathname = usePathname()
    const t = useTranslations()
    return (
        <div className="flex items-center w-20">
            <DropdownMenu>
                <DropdownMenuTrigger className='w-full'>
                    <span className='text-sm font-semibold'>
                        {locales.find((l) => l.code === locale)?.name}
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-14'>
                    <DropdownMenuLabel>
                        {t('Language.title')}
                    </DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={locale}>
                        {locales.map((l) => (
                            <DropdownMenuRadioItem key={l.name} value={l.code}>
                                <Link className='w-full flex items-center gap-1' href={pathname} locale={l.code}>
                                    <span className='text-xs'>{l.icon} | {l.name}</span>
                                </Link>
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}