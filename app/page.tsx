"use client";

import { Auth } from "@/components/helpers/auth-components/auth";

// import { signupSchema } from "../shared/schema/formSchema";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <Auth />
    </div>
  );
}
