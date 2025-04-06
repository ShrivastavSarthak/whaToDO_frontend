"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import TnModal from "@/lib/wrapper/Tn_modal";
import { TaskSchema } from "@/shared/schemas/taskSchema";
import { ApiMethod, childApiUrls } from "@/shared/utils/enums/apiEnums";
import usePostApi from "@/shared/utils/hooks/postApi";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function TaskReport() {
  const user = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    mode: "all",
    defaultValues: {
      taskName: "",
      taskDetails: "",
      created_by: "",
      updated_by: "",
      started_at: new Date(),
      points: "0",
      media: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("created_by", user.id);
      form.setValue("updated_by", user.id);
    }
  }, [user]);

  const [isRecentTaskOpen, setIsRecentTaskOpen] = useState(false);
  const onCloseRecentTaskCard = () => {
    setIsRecentTaskOpen(false);
  };

  const openRecentTaskCard = () => {
    setIsRecentTaskOpen(true);
  };

  const { postApiCall, data, isError, isLoading, isSuccess } = usePostApi();

  const onSubmitTask = async (data: z.infer<typeof TaskSchema>) => {
    await postApiCall({
      url: childApiUrls.postChildTask,
      method: ApiMethod.POST,
      payload: data,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong, please try again later.");
    }
    if (isSuccess) {
      toast.success("Task created successfully.");
      form.reset();
      onCloseRecentTaskCard();
    }
  }, [isError, isSuccess]);

  const takeNumberOnly = (data: any, field: any) => {
    if (data === "" || /^[0-9]+$/.test(data)) {
      field.onChange(data);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Task</CardTitle>
            <Button onClick={openRecentTaskCard}>Create task</Button>
          </div>
        </CardHeader>
        <CardContent className="h-[100%] overflow-y-auto">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full rounded-md border-[1px] mb-2 p-2 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold">Task 1</h3>
                  <p className="text-xs text-gray-500">Task description</p>
                </div>
                <Button>Edit</Button>
              </div>
            ))}
        </CardContent>
      </Card>
      <TnModal
        className="mx-2 rounded-md w-[80%]"
        isOpen={isRecentTaskOpen}
        handleClose={onCloseRecentTaskCard}
      >
        <DialogHeader>Add Your Task here</DialogHeader>
        <div className="w-full h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitTask)}>
              <FormField
                control={form.control}
                name="taskName"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[50%]"
                        placeholder="Study"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taskDetails"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full h-24 max-h-24"
                        placeholder="Study"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="points"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={field.value}
                        onChange={(e) => takeNumberOnly(e.target.value, field)}
                        placeholder="points"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="started_at"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>Start from</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="media"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Upload media</FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="points" {...field} />
                    </FormControl>
                    <FormDescription>
                      Upload Photos, Videos, File (less then 5MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex mt-2 w-full justify-between items-center">
                <Button onClick={onCloseRecentTaskCard}>Cancel</Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </TnModal>
    </>
  );
}
