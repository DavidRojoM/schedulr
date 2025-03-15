"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { HomeIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarItem =
  | {
      type: "link";
      title: string;
      icon: React.ComponentType;
      url: string;
    }
  | {
      type: "action";
      title: string;
      icon: React.ComponentType;
      action: () => unknown;
    };

const items: SidebarItem[] = [
  {
    type: "link",
    title: "Home",
    icon: HomeIcon,
    url: "/dashboard",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h1 className="group-data-[collapsible=icon]:hidden">Schedulr</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`${
                  item.type === "link" && pathname === item.url
                    ? "text-red-500"
                    : ""
                }`}
              >
                {item.type === "link" ? (
                  <Link href={item.url} title={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <button onClick={item.action}>
                    <item.icon />
                    <span>{item.title}</span>
                  </button>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {session ? (
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              });
            }}
          >
            Logout
          </button>
        ) : (
          <button onClick={() => signIn("google", {})}>Login</button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
