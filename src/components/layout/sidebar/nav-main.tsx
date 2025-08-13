/* eslint-disable  */
// @ts-nocheck
"use client"

import { Home, Search, BookOpen, BookMarked, CheckCircle } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Settings, Mail, LogOut } from "lucide-react";
import Link from "next/link";
import {logoutAuth} from "@/lib/api/auth";
import {useSelector} from "react-redux";
import {persistor, RootState} from "@/app/store/store";
import {useRouter} from "next/navigation";
import { useDispatch } from 'react-redux';
import { logout } from '@/app/store/features/userSlice';
import {useEffect, useState} from "react";

export function NavMain() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const currentDeviceId = navigator.userAgent;
    const user = useSelector((state: RootState) => state.user);

    const activityItems = [
        { title: "Reading", url: "/reading", icon: BookOpen, count: 1, requireLogin: true },
        { title: "Completed", url: "/completed", icon: CheckCircle, count: 0, requireLogin: true },
    ];

    const navigationItems = [
        { title: "Home", url: "/home", icon: Home, requireLogin: false },
        { title: "My library", url: "/toread", icon: BookMarked, requireLogin: true },
        { title: "Browse", url: "/browse", icon: Search, requireLogin: false },
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
            await logoutAuth(user?.user?._id ?? "", currentDeviceId);
            dispatch(logout());
            await persistor.purge();
            router.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    const renderLinkOrButton = (item: any) => {
        if (item.requireLogin && !isUserLoggedIn) {
            return (
                <button
                    className="flex items-center w-full px-3 py-2 opacity-50 cursor-not-allowed"
                    disabled
                >
                    {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                    <span>{item.title}</span>
                    {item.count !== undefined && (
                        <span className="text-gray-400 text-xs ml-auto">{item.count}</span>
                    )}
                </button>
            );
        }

        return (
            <Link
                href={item.url}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md"
            >
                {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                <span>{item.title}</span>
                {item.count !== undefined && (
                    <span className="text-gray-400 text-xs ml-auto">{item.count}</span>
                )}
            </Link>
        );
    };

    return (
        <>
            <SidebarGroup>
                <SidebarMenu>
                    {navigationItems.map((item) => (
                        <SidebarMenuItem key={item.title} className="min-w-[200px]">
                            <SidebarMenuButton asChild className="w-full truncate">
                                {renderLinkOrButton(item)}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>My Activity</SidebarGroupLabel>
                <SidebarMenu>
                    {activityItems.map((item) => (
                        <SidebarMenuItem key={item.title} className="min-w-[200px]">
                            <SidebarMenuButton asChild className="w-full truncate">
                                {renderLinkOrButton(item)}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <div className="border-t border-gray-200 my-4" />
                <SidebarMenu>
                    <SidebarMenuItem className="min-w-[200px]">
                        <SidebarMenuButton asChild className="w-full truncate">

                            <Link
                                href="/settings"
                                className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md"
                            >
                                <Settings className="mr-3 h-5 w-5" />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem className="min-w-[200px]">
                        <SidebarMenuButton asChild className="w-full truncate">
                            <Link
                                href="/contactus"
                                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md">
                                <Mail className="mr-3 h-5 w-5" />
                                <span>Contact Us</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {isUserLoggedIn && (
                        <SidebarMenuItem className="min-w-[200px]">
                            <SidebarMenuButton asChild className="w-full truncate">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md text-red-600"
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarGroup>
        </>
    );
}
