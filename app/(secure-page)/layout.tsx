import { AppSidebar } from "@/components/helpers/sideBar/app-sidebar";
import VerificationCard from "@/components/helpers/verificationCard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();

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
      <VerificationCard />
    </div>
  );
}
