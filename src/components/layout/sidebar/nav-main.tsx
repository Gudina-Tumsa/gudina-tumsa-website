"use client"

import { Home, Search, BookOpen, BookMarked, CheckCircle, Notebook, Plus } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Settings, Mail, LogOut } from "lucide-react";
import Link from "next/link";

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
                <Link href={"/"} className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md text-red-600">
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </>
  )
}


/*

"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/app/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

 */