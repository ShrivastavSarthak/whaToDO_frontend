"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChildSignupSchema,
  ParentSignupSchema,
} from "@/shared/schemas/formSchema";
import { usePostMethodMutation } from "@/shared/utils/services/dataServices";
import { LoginApiUrls } from "@/shared/utils/enums/apiEnums";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAppDispatch } from "@/shared/utils/hooks/redux-hook";
import { useAuth } from "@/shared/utils/hooks/user-validate";
import { setToken, setUser } from "@/shared/store/slices/user-slice";

function ChildSignup() {
  const form = useForm<z.infer<typeof ChildSignupSchema>>({
    resolver: zodResolver(ChildSignupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      phoneNo: "",
      confirmPassword: "",
    },
  });

  const [auth, { isError, isLoading }] = usePostMethodMutation();

  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const onSubmit = async (data: z.infer<typeof ChildSignupSchema>) => {
    const sendData = {
      username: data.username,
      password: data.password,
      email: data.email,
      phoneNo: data.phoneNo,
    };
    const response = await auth({
      httpResponse: {
        reqType: "POST",
        url: LoginApiUrls.childSignup,
      },
      payload: sendData,
    });

    if (response.data?.statusCode === 201) {
      toast.success("signup successfully");
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jhon_2234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="5567845356"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isLoading}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          disabled={isLoading}
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

        <Button disabled={isLoading} className="mt-3 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
function ParentSignup() {
  const form = useForm<z.infer<typeof ParentSignupSchema>>({
    resolver: zodResolver(ParentSignupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      phoneNo: "",
      confirmPassword: "",
      gender: "",
      occupation: "",
    },
  });


  const [auth, { isError, isLoading }] = usePostMethodMutation();
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: z.infer<typeof ParentSignupSchema>) => {
    console.log(data);
    const sendData = {
      name: data.name,
      username: data.username,
      password: data.password,
      email: data.email,
      phoneNo: data.phoneNo,
      gender: data.gender,
      occupation: data.occupation,
    };
    const response = await auth({
      httpResponse: {
        reqType: "POST",
        url: LoginApiUrls.parentSignup,
      },
      payload: sendData,
    });

    if (response.data?.statusCode === 201) {
      toast.success("signup successfully");
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
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="John"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="john_2234"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="5567845356"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="jhon@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          disabled={isLoading}
          render={({ field }) => (
            <Select disabled={isLoading} onValueChange={field.onChange}>
              <Label className="mt-2">Gender</Label>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Male" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="occupation"
          disabled={isLoading}
          render={({ field }) => (
            <Select disabled={isLoading} onValueChange={field.onChange}>
              <Label className="mt-2">Occupation</Label>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Government" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Occupation</SelectLabel>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private </SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          disabled={isLoading}
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

        <Button disabled={isLoading} className="mt-3 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default function Signup() {
  return (
    <Tabs defaultValue="parent" className="mt-2">
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
        <ParentSignup />
      </TabsContent>
      <TabsContent value="child">
        <ChildSignup />
      </TabsContent>
    </Tabs>
  );
}
