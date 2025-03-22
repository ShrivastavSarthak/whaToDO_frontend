"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { signupSchema } from "../shared/schema/formSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninSchema, ChildSignupSchema } from "@/shared/schemas/formSchema";
import { useState } from "react";
import { usePostMethodMutation } from "@/shared/utils/services/dataServices";
import { LoginApiUrls } from "@/shared/utils/enums/apiEnums";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { toast } from "sonner";
import { useAuth } from "@/shared/utils/hooks/user-validate";
import { useAppDispatch } from "@/shared/utils/hooks/redux-hook";
import { setToken, setUser } from "@/shared/store/slices/user-slice";

function ChildSignin() {
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const [auth, { isError, isLoading }] = usePostMethodMutation();
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    const response = await auth({
      httpResponse: {
        reqType: "POST",
        url: LoginApiUrls.childSignin,
      },
      payload: data,
    });


    if (response.data?.statusCode === 201) {
      toast.success("Login successful");
      dispatch(setUser(response.data?.response?.user_id));
      dispatch(setToken(response.data?.response?.access_token));
      login(
        response.data?.response?.access_token,
        response.data?.response?.user_id
      );

      return;
    }
    const error =
      (response.error as any)?.data?.message ||
      "Something went wrong please try again!";
    toast.error(error);
    return;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Username or email</FormLabel>
              <FormControl>
                <Input placeholder="jhon_2234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="mt-3 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function ParentSignin() {
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const [auth, { isError, isLoading }] = usePostMethodMutation();

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    const response = await auth({
      httpResponse: {
        reqType: "POST",
        url: LoginApiUrls.parentSignin,
      },
      payload: data,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Username or email</FormLabel>
              <FormControl>
                <Input placeholder="jhon_2234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="mt-3 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default function Signin() {
  return (
    <Tabs defaultValue="child" className="mt-2">
      <TabsList className="grid w-full gap-1 grid-cols-2 bg-gray-600 rounded-lg p-1">
        <TabsTrigger
          value="parent"
          className="rounded-lg py-1 px-1 text-gray-300 transition-all duration-300 ease-in-out 
                     data-[state=active]:bg-gray-900 data-[state=active]:text-white 
                     hover:bg-gray-700"
        >
          As Parent
        </TabsTrigger>
        <TabsTrigger
          value="child"
          className="rounded-lg py-1 px-1 text-gray-300 transition-all duration-300 ease-in-out 
                     data-[state=active]:bg-gray-900 data-[state=active]:text-white 
                     hover:bg-gray-700"
        >
          As Child
        </TabsTrigger>
      </TabsList>
      <TabsContent value="parent">
        <ParentSignin />
      </TabsContent>
      <TabsContent value="child">
        <ChildSignin />
      </TabsContent>
    </Tabs>
  );
}
