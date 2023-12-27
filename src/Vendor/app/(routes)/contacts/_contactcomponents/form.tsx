"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have a TextArea component
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(5).max(20),
  email: z.string().min(5).max(30),
  message: z.string().min(10).max(100),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // ...
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[150px]"
                  placeholder="Enter your description..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Tell us more.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between w-full">
          <div></div>
          <Button className="w-[200px] bg-[#DB4444]" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
  // ...
}
