
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="w-[80%] mx-auto">
                    <main className="">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
