"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  // const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const activeTeam = teams[0]
  console.log(isMobile)

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>


            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >

              <div className="grid flex-1 text-left text-2xl font-bold leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>

              </div>

            </SidebarMenuButton>



      </SidebarMenuItem>
    </SidebarMenu>
  )
}

