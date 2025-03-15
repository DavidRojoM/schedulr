import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSessionProvider from "../_components/ui/app-session-provider";
import { AppSidebar } from "../_components/ui/app-sidebar";

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
