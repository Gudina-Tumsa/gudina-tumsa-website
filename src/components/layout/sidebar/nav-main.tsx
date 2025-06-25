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
import {logout} from "@/lib/api/auth";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {useRouter} from "next/navigation";


export function NavMain() {
  const navigationItems = [
    { title: "Home", url: "/home", icon: Home },
    { title: "My library", url: "/toread", icon: BookMarked },
    { title: "Browse", url: "/browse", icon: Search },
  ];

  const activityItems = [
    { title: "Reading", url: "/reading", icon: BookOpen, count: 1 },

    { title: "Completed", url: "/completed", icon: CheckCircle, count: 0 },
  ];
  const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
  const currentDeviceId = navigator.userAgent;

  return (
      <>
        <SidebarGroup>


          <SidebarMenu>
            {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center">
                      {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>My Activity</SidebarGroupLabel>
          <SidebarMenu>
            {activityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                        <span>{item.title}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{item.count}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>



        <SidebarGroup>
          <div className="border-t border-gray-200 my-4" />


          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link  href="/settings" className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md">
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md">
                  <Mail className="mr-3 h-5 w-5" />
                  <span>Contact Us</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                {/*<Link href={"/"} onClick={} className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md text-red-600">*/}
               <div onClick={()=>{
                 logout(user?.user?._id ?? "" , currentDeviceId).then((data)=>{
                     console.log(data)
                     router.push('/');
                 }).catch((err : unknown)=>{console.log(err)})
               }}>
                   <LogOut className="mr-3 h-5 w-5" />
                   <span>Logout</span>
               </div>

                {/*</Link>*/}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </>
  )
}

