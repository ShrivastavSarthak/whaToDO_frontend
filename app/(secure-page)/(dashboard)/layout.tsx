import { AppSidebar } from "@/components/helpers/sideBar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";


export default function Layout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="w-full m-2">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
