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
import { loginSchema, signupSchema } from "@/shared/schemas/formSchema";
import { useState } from "react";
import { usePostMethodMutation } from "@/shared/utils/services/dataServices";

export function Auth() {
  const [isSignUp, setIsSignup] = useState(false);

  const schema = isSignUp ? signupSchema : loginSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [auth, { isError, isLoading }] = usePostMethodMutation();

  const handleSignUp = () => {
    setIsSignup(!isSignUp);
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const response = await auth({
      httpResponse: {
        reqType: "POST",
        url: isSignUp ? "user/signup" : "user/login",
      },
      payload: data,
    });

    console.log(data);
  };
  return (
    <Card className="w-[25rem] mx-2">
      <CardHeader className="flex flex-col items-center">
        <h3>
          Welcome to <span className="font-extrabold">TaskNest</span>
        </h3>
      </CardHeader>
      <h5 className="font-bold text-center">{isSignUp ? "Login" : "Signup"}</h5>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            {isSignUp && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSignUp && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="password"
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
            {isSignUp && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button className="mt-3 w-full" type="submit">
              Submit
            </Button>
          </form>
          <p className="text-center mt-2">
            {!isSignUp ? "Already have an account?" : "New to TaskNest?"}{" "}
            <Button onClick={handleSignUp} variant="link">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>{" "}
          </p>
        </Form>
      </CardContent>
    </Card>
  );
}
