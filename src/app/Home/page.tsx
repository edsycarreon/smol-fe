"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
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
import { RequestType } from "@/enums";
import fetchRequest from "@/utils/fetch.utils";

const FormSchema = z.object({
  longUrl: z.string().url().min(1, { message: "Link is required" }),
  customUrl: z
    .string()
    .max(6, { message: "Custom URL must not exceed 6 characters" }),
  password: z.string(),
  expiresIn: z.string(),
});

export default function HomePage() {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopyButtonText("Copied");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    });
  }, [shortUrl]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      longUrl: "",
      customUrl: "",
      password: "",
      expiresIn: "",
    },
  });

  const postFormData = async (formData: z.infer<typeof FormSchema>) => {
    const response = await fetchRequest("/", RequestType.POST, formData);

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: postFormData,
    onSuccess: (response) => {
      setShortUrl(response.data.shortUrl);
    },
    onError: (error) => {
      throw error;
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  const renderShortUrl = useMemo(() => {
    if (shortUrl) {
      return (
        <div className="flex justify-center items-center space-x-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={handleCopyClick}
          >
            {copyButtonText}
          </button>
          <span
            className="text-zinc-500 font-light underline underline-offset-4 text-xl cursor-pointer hover:text-zinc-300"
            onClick={handleCopyClick}
          >
            {shortUrl}
          </span>
        </div>
      );
    }
    return null;
  }, [shortUrl, copyButtonText, handleCopyClick]);

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
                name="longUrl"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter URL" {...field} />
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
                      <div>
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
                      <div>
                        <FormLabel>Password (Optional)</FormLabel>
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
                      <div>
                        <FormLabel>Link (Optional)</FormLabel>
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
      {renderShortUrl}
    </div>
  );
}
