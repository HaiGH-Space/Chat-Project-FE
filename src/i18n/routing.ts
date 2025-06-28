import {defineRouting} from 'next-intl/routing';
import {i18n} from "@/i18n/i18n-config";

export const routing = defineRouting({
    locales: i18n.locales.map((locale) => locale.code),
    defaultLocale: 'vi',
    localePrefix: 'as-needed',
    pathnames: {
    },
})