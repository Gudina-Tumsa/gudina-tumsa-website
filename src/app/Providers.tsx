'use client'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { NextIntlClientProvider } from 'next-intl'

export function Providers({
                              children,
                              messages,
                              locale
                          }: {
    children: React.ReactNode
    messages: any
    locale: string
}) {
    return (
        <Provider store={store}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </Provider>
    )
}