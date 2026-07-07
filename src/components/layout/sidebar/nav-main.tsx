/* eslint-disable  */
// @ts-nocheck
"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {logoutAuth} from "@/lib/api/auth";
import {useSelector, useDispatch} from "react-redux";
import {persistor, RootState} from "@/app/store/store";
import { logout } from '@/app/store/features/userSlice';
import {useEffect, useState} from "react";

export function NavMain() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const currentDeviceId = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const user = useSelector((state: RootState) => state.user);

    const activityItems = [
        { title: "Reading", url: "/reading", count: 1, requireLogin: true },
        { title: "Completed", url: "/completed", count: 0, requireLogin: true },
    ];

    const navigationItems = [
        { title: "Home", url: "/home", requireLogin: false },
        { title: "My library", url: "/toread", requireLogin: true },
        { title: "Browse", url: "/browse", requireLogin: false },
        { title: "Marketplace", url: "/marketplace", requireLogin: true },
    ];

    useEffect(() => {
        if(user?.user != null){
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await logoutAuth(user?.user?._id ?? "", currentDeviceId, user?.session?.token);
            dispatch(logout());
            await persistor.purge();
            router.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    const renderNavItem = (item: any) => {
        const isActive = pathname?.startsWith(item.url);

        if (item.requireLogin && !isUserLoggedIn) {
            return (
                <button
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-[15px] text-gray-400 cursor-not-allowed"
                    disabled
                >
                    <span>{item.title}</span>
                </button>
            );
        }

        return (
            <Link
                href={item.url}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                    isActive
                        ? "bg-[#9407F2] text-white font-medium"
                        : "text-gray-700 hover:bg-[#C084FC]/10"
                }`}
            >
                <span>{item.title}</span>
            </Link>
        );
    };

    const renderActivityItem = (item: any) => {
        const isActive = pathname?.startsWith(item.url);
        const disabled = item.requireLogin && !isUserLoggedIn;

        const content = (
            <>
                <span className={disabled ? "text-gray-400" : "text-gray-700"}>{item.title}</span>
                <span className={`text-sm font-medium ${item.count > 0 ? "text-[#9407F2]" : "text-gray-400"}`}>
                    {item.count}
                </span>
            </>
        );

        if (disabled) {
            return (
                <button className="flex w-full items-center justify-between rounded-xl px-4 py-2 cursor-not-allowed" disabled>
                    {content}
                </button>
            );
        }

        return (
            <Link
                href={item.url}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2 transition-colors ${
                    isActive ? "bg-[#C084FC]/15" : "hover:bg-[#C084FC]/10"
                }`}
            >
                {content}
            </Link>
        );
    };

    return (
        <div className="flex h-full flex-col justify-between font-sans">
            <div>
                <SidebarGroup>
                    <SidebarMenu className="gap-1">
                        {navigationItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className="h-auto w-full p-0 hover:bg-transparent">
                                    {renderNavItem(item)}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                        My Activity
                    </SidebarGroupLabel>
                    <SidebarMenu className="gap-0.5">
                        {activityItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className="h-auto w-full p-0 text-sm hover:bg-transparent">
                                    {renderActivityItem(item)}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
                <SidebarMenu className="gap-0.5">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="h-auto w-full p-0 hover:bg-transparent">
                            <Link
                                href="/settings"
                                className="flex w-full items-center rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            >
                                Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="h-auto w-full p-0 hover:bg-transparent">
                            <Link
                                href="/contactus"
                                className="flex w-full items-center rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            >
                                Contact us
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {isUserLoggedIn && (
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="h-auto w-full p-0 hover:bg-transparent">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center rounded-xl px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-gray-100"
                                >
                                    Log out
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </div>
        </div>
    );
}
