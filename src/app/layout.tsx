import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins , Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

import { getLocale, getMessages } from 'next-intl/server'
import { Providers } from './Providers'
import "./global.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


const poppins = Poppins({
    variable: "--font-poppins", // 👈 matches your Tailwind config
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // choose the weights you’ll use

});

const instrumentSerif = Instrument_Serif({
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "GTL",
    description: "GTL",
    icons: {
        icon: "/resized2.svg",
    },
};



export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode
}>) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html lang={locale}>
        <body className={`font-sans bg-white text-black ${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${instrumentSerif.variable} ${plusJakartaSans.variable}`}>
        <Providers locale={locale} messages={messages}>
            {children}
        </Providers>
        </body>
        </html>
    );
}
