"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HomeSchema } from "@/shared/schemas/homeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function InviteFamily() {
  const form = useForm();
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const onPartnerInvite = () => {
    console.log(inviteEmail);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.target.value);
  };
  return (
    <Card className="w-full max-w-[30rem] shadow-lg p-1 my-[1%]">
      <CardHeader className="flex flex-col items-start justify-start">
        <h2>Invite Your Family</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="mt-3">
            <FormLabel>Invite your partner </FormLabel>
            <div className="flex w-full  items-center space-x-2 mt-2">
              <Input onChange={handleEmailChange} placeholder="Email" />
              <Button type="button" onClick={onPartnerInvite} className="py-1">
                Invite
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <FormLabel>Invite your Childrens</FormLabel>
            <div className="w-full space-x-2 mt-2">
              <Input onChange={handleEmailChange} placeholder="Email" />
              <div className="flex items-center justify-between mt-3">
                <div className="mb-3">
                  <Link
                    href={"/dashboard"}
                    className="text-[1rem] hover:underline text-gray-500"
                  >
                    Skip
                  </Link>
                </div>
                <Button
                  type="button"
                  onClick={onPartnerInvite}
                  className="py-1"
                >
                  Invite children
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

function CreateHome({
  setIsHomeCreate,
}: {
  setIsHomeCreate: (value: boolean) => void;
}) {
  const form = useForm<z.infer<typeof HomeSchema>>({
    resolver: zodResolver(HomeSchema),
    defaultValues: {
      homeName: "",
      homeDetails: "",
      homePhoto: "",
    },
  });

  const onFormSubmit = async (formData: z.infer<typeof HomeSchema>) => {
    console.log(formData);
    setIsHomeCreate(true);
  };
  return (
    <Card className="w-full max-w-[30rem] shadow-lg p-4 my-[3%]">
      <CardHeader>
        <h2>Create Your Home here</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              name="homeName"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Home Name</FormLabel>
                  <FormControl>
                    <Input placeholder="i.e My Home" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="homeDetails"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Home description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e My Home is super cool!! right?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="homePhoto"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Upload your family photo</FormLabel>
                  <FormControl>
                    <Input placeholder="i.e My Home" {...field} type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-3 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
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
