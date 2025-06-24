'use client'

import { Provider } from 'react-redux'
import { store , persistor } from './store/store'
import { PersistGate} from "redux-persist/integration/react";
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
            <PersistGate loading={null} persistor={persistor}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </PersistGate>

        </Provider>
    )
}