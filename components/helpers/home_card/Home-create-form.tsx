"use client";
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
import { HomeSchema } from "@/shared/schemas/homeSchema";
import { setUser } from "@/shared/store/slices/user-slice";
import { ApiMethod, HomeApiUrls } from "@/shared/utils/enums/apiEnums";
import usePostApi from "@/shared/utils/hooks/postApi";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/utils/hooks/redux-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { z } from "zod";

export default function HomeCreateForm({
  setIsHomeCreate,
}: {
  setIsHomeCreate: (value: boolean) => void;
}) {
  const form = useForm<z.infer<typeof HomeSchema>>({
    resolver: zodResolver(HomeSchema),
    defaultValues: {
      homeName: "",
      homeDesc: "",
      homePhoto: "",
    },
  });

  const user = useAppSelector((state) => state.user);
  const isHomeCreated = usePostApi();
  const dispatch = useAppDispatch();

  const onFormSubmit = async (formData: z.infer<typeof HomeSchema>) => {
    const sendData = { leader: user.id, ...formData };
    const resData = await isHomeCreated.postApiCall({
      url: HomeApiUrls.createHome,
      method: ApiMethod.POST,
      payload: sendData,
    });
    if (resData.data?.statusCode === 201) {
      toast.success("Home created successfully");
      Cookies.set("homeId", resData.data?.response?.data?._id, { expires: 1 });
      dispatch(setUser({ ...user, homeId: resData.data?.response?.data?._id }));
      setIsHomeCreate(true);
    } else {
      const errorMessage: any = resData.error;
      toast.error(errorMessage?.data?.message || "Something went wrong");
    }

    form.reset();
  };

  return (
    <>
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
            name="homeDesc"
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
          <Button
            disabled={isHomeCreated.isLoading}
            type="submit"
            className="mt-3 w-full"
          >
            {isHomeCreated.isLoading ? "Creating..." : "Create Home"}
          </Button>
        </form>
      </Form>
    </>
  );
}
