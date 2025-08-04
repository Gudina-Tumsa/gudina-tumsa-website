/* eslint-disable  */
// @ts-nocheck

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import * as React from "react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>

                <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
                    <div className="flex relative  p-4 border-b  h-[50px]">
                        <div className={"absolute top-2 left-4"}>
                            <SidebarTrigger />
                        </div>

                        <div className="absolute top-3 right-4 text-lg font-semibold">GTL</div>


                    </div>
                </header>

                <div className="w-[80%] mx-auto">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}