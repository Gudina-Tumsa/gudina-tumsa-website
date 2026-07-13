/* eslint-disable  */
// @ts-nocheck

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import * as React from "react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-800">
                <header className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-gray-50/80 md:hidden dark:bg-gray-800">
                    <div className="flex relative p-4 border-b border-gray-200 h-[50px] dark:bg-gray-800 dark:border-gray-700">
                        <div className="absolute top-2 left-4">
                            <SidebarTrigger />
                        </div>
                        <div className="absolute top-3 right-4 font-sans text-lg font-extrabold tracking-tight text-gray-900 dark:text-white">
                            GTL
                        </div>
                    </div>
                </header>

                <div className="w-full max-w-[1400px] mx-auto px-6 py-8 sm:px-10 sm:py-10 text-gray-900 dark:text-white">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
