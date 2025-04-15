"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HomeSchema } from "@/shared/schemas/homeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function HomeCard() {
    const form = useForm<z.infer<typeof HomeSchema>>({
        resolver:zodResolver(HomeSchema),
        defaultValues:{
            homeName:"",
            homeDetails:"",
            homePhoto:""
        }

    })

    const onFormSubmit = async (formData : z.infer<typeof HomeSchema>) => {
        console.log(formData);

        
    }
    
    return(
        <Card className="w-full max-w-[30rem] shadow-lg p-4 my-[3%]">
            <CardHeader>
                <h2>Create Your Home here</h2>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)}>
                        <FormField
                        name="homeName"
                        render={({field})=>(
                            <FormItem className="mt-2">
                                <FormLabel>Home Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="i.e My Home" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="homeDetails"
                        render={({field})=>(
                            <FormItem className="mt-2">
                                <FormLabel>Home description</FormLabel>
                                <FormControl>
                                    <Input placeholder="i.e My Home is super cool!! right?" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="homePhoto"
                        render={({field})=>(
                            <FormItem className="mt-2">
                                <FormLabel>Upload your family photo</FormLabel>
                                <FormControl>
                                    <Input placeholder="i.e My Home" {...field} type="file" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="mt-3 w-full">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}