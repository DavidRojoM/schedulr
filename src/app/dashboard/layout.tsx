import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import AppSessionProvider from "@/components/ui/app-session-provider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Projects dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSessionProvider>
        <AppSidebar />
      </AppSessionProvider>

      <main>
        <SidebarTrigger className="cursor-pointer" />
        {children}
      </main>
    </SidebarProvider>
  );
}
