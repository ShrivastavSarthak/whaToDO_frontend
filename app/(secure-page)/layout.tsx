import VerificationCard from "@/components/helpers/verificationCard";
import { userEnums } from "@/shared/utils/enums/user-enums";
import { Metadata } from "next";
import { cookies } from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const userRole = cookieStore.get("role")?.value;

  return {
    title:
      userRole === userEnums.PARENT
        ? "Parent  | TaskNest"
        : "Child  | TaskNest",
    description:
      userRole === userEnums.PARENT
        ? "Manage your child's tasks efficiently with TaskNest."
        : "Task management application that helps your child stay productive.",
  };
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <VerificationCard />
        </div>
    );
}