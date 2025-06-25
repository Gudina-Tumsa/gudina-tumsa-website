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
  const [isOpen, setIsOpen] = React.useState(false); // Start closed on mobile

  React.useEffect(() => {
    const handleResize = () => {
      // Only auto-open if desktop, keep closed if mobile
      setIsOpen(window.innerWidth >= 768);
    }

    // Set initial state based on current screen size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <>
        {/* Mobile header with toggle button */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b h-16 flex items-center px-4">
          <button
              className="p-2 rounded-md bg-background border"
              onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="ml-4 font-semibold">GTL</div>
        </header>

        {/* Sidebar container */}
        <div
            className={`
          fixed 
          inset-y-0 left-0 z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          bg-white
          w-64 /* Explicit width */
        `}
        >
          <Sidebar
              collapsible="icon"
              {...props}
              className="w-full h-full bg-white border-r" /* Use full width of container */
          >
            <SidebarHeader>
              <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto h-[calc(100vh-4rem)]">
              <NavMain />
            </SidebarContent>
          </Sidebar>
        </div>

        {/* Overlay - only visible when sidebar is open on mobile */}
        {isOpen && (
            <div
                className="md:hidden fixed inset-0 z-20 bg-black/50"
                onClick={() => setIsOpen(false)}
            />
        )}

        {/* Main content */}
        <main className={`
        md:ml-64 /* Shift content when sidebar is open on desktop */
        pt-16 md:pt-0 /* Account for mobile header */
        min-h-screen
        transition-all duration-300 /* Match sidebar animation */
      `}>
          {/* Your main content here */}
        </main>
      </>
  )
}
