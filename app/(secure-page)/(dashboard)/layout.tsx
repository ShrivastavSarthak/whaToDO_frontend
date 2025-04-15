import { AppSidebar } from "@/components/helpers/sideBar/app-sidebar";
import VerificationCard from "@/components/helpers/verificationCard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userEnums } from "@/shared/utils/enums/user-enums";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const userRole = cookieStore.get("role")?.value;

  return {
    title:
      userRole === userEnums.PARENT
        ? "Parent Dashboard | TaskNest"
        : "Child Dashboard | TaskNest",
    description:
      userRole === userEnums.PARENT
        ? "Manage your child's tasks efficiently with TaskNest."
        : "Task management application that helps your child stay productive.",
  };
}

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
