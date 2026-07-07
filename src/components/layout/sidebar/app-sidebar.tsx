/* eslint-disable  */
// @ts-nocheck

"use client"

import * as React from "react"
import { NavMain } from "@/components/layout/sidebar/nav-main"

import {
  Sidebar, SidebarContent, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar
          collapsible="icon"
          className="border-r border-gray-200 bg-white [&_[data-sidebar=sidebar]]:bg-white"
          {...props}
      >
        <SidebarHeader className="px-4 pt-6 pb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="h-auto p-0 hover:bg-transparent data-[slot=sidebar-menu-button]:!p-0"
              >
                <a href="/">
                  <span className="font-serif text-2xl font-medium tracking-tight text-gray-900">GTL</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-2 pb-4">
          <NavMain />
        </SidebarContent>
      </Sidebar>
  )
}
