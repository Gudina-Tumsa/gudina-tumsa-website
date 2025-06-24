"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map, Menu,
  PieChart,
  Settings2,
  SquareTerminal,
  X,
} from "lucide-react"
import { NavMain } from "@/components/layout/sidebar/nav-main"

import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher"
import {Sidebar,SidebarContent,SidebarHeader} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "GTL",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Close sidebar when clicking on a nav item (for mobile)
  // const closeSidebar = () => {
  //   if (window.innerWidth < 768) {
  //     setIsOpen(false)
  //   }
  // }
  React.useEffect(() => {
    const handleResize = () => {

      setIsOpen(window.innerWidth >= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
      <>
        {/* Mobile header - appears only on mobile */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b h-16 flex items-center px-4">
          <button
              className="p-2 rounded-md bg-background border"
              onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="ml-4 font-semibold">GTL</div>
        </header>

        {/* Main content area with padding to account for mobile header */}
        <div className="pt-16 md:pt-0">
          {/* Sidebar component */}
          <Sidebar
              collapsible="icon"
              {...props}
              style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 300ms ease-in-out',
              }}
              className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-white border-r`}
          >
            <SidebarHeader>
              <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto h-[calc(100vh-4rem)]">
              <NavMain />
            </SidebarContent>
          </Sidebar>

          {/* Mobile overlay and sidebar */}
          {isOpen && (
              <div className="md:hidden fixed inset-0 z-20">
                {/* Overlay background */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setIsOpen(false)}
                />

                {/* Mobile sidebar positioned below header */}
                <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white border-r shadow-lg">
                  {/*<div className="p-4 border-b">*/}
                  {/*  <TeamSwitcher teams={data.teams} />*/}
                  {/*</div>*/}
                  <div className="overflow-y-auto h-[calc(100%-4rem)]">
                    <NavMain />
                  </div>
                </div>
              </div>
          )}
        </div>
      </>
  )
}
