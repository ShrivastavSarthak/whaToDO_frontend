"use client";
import { Invites } from "@/components/helpers/my_peoples/inviteMembers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import HomeCreateForm from "./Home-create-form";
import SearchHome from "./search-home";
export function InviteFamily() {
  return (
    <Card className="w-full max-w-[30rem] shadow-lg p-1 my-[1%]">
      <CardHeader className="flex flex-col items-start justify-start">
        <h2>Invite Your Family</h2>
      </CardHeader>
      <CardContent>
        <Invites />
      </CardContent>
    </Card>
  );
}

function CreateHome({
  setIsHomeCreate,
}: {
  setIsHomeCreate: (value: boolean) => void;
}) {
  return (
    <Card className="w-full max-w-[26rem] h-[30rem] mx-3 shadow-lg p-4 my-[3%]">
      <CardHeader>
        <h2>Find your home</h2>
      </CardHeader>
      <Tabs defaultValue="child" className="mt-2">
        <TabsList className="grid w-full gap-1 grid-cols-2 bg-gray-600 rounded-lg p-1">
          <TabsTrigger
            value="parent"
            className="rounded-lg py-1 px-1 text-gray-300 transition-all duration-300 ease-in-out  data-[state=active]:bg-gray-900 data-[state=active]:text-white  hover:bg-gray-700"
          >
            Create home
          </TabsTrigger>
          <TabsTrigger
            value="child"
            className="rounded-lg py-1 px-1 text-gray-300 transition-all duration-300 ease-in-out  data-[state=active]:bg-gray-900 data-[state=active]:text-white  hover:bg-gray-700"
          >
            Choose home
          </TabsTrigger>
        </TabsList>
        <TabsContent value="parent">
          <CardContent>
            <HomeCreateForm setIsHomeCreate={setIsHomeCreate} />
          </CardContent>
        </TabsContent>
        <TabsContent className="h-full" value="child">
          <CardContent>
            <SearchHome />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default function HomeCard() {
  const [isHomeCreate, setIsHomeCreate] = useState(false);

  return isHomeCreate ? (
    <InviteFamily />
  ) : (
    <CreateHome setIsHomeCreate={setIsHomeCreate} />
  );
}
