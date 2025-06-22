export type Locale = (typeof locales)[number]

export const locales = ['am', 'om', 'en'] as const
export const defaultLocale: Locale = 'en'
