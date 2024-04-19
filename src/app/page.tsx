"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const FormSchema = z.object({
  link: z.string().url().min(1, { message: "Link is required" }),
  customUrl: z
    .string()
    .max(6, { message: "Custom URL must not exceed 6 characters" }),
  password: z.string(),
  expiresIn: z.string(),
});

export default function HomePage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: "",
      customUrl: "",
      password: "",
      expiresIn: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted data:", data);
  }

  return (
    <div className="px-4 md:px-6 lg:px-80 py-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">URL Shortener</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your URL to shorten it
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <div className="">
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="customUrl"
                  render={({ field }) => (
                    <FormItem>
                      <div className="">
                        <FormLabel>Custom URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter custom URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="">
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="expiresIn"
                  render={({ field }) => (
                    <FormItem>
                      <div className="">
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2 minutes/hours/days"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="w-full" type="submit">
              Shorten
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
