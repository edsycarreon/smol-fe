"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
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
import { useToast } from "@/components/ui/use-toast";
import { ErrorCode } from "@/enums";

import { accessProtectedUrl } from "../../../services/url/url.service";

export default function PasswordProtected() {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  const url = pathname.replace("/password-protected/", "");

  const FormSchema = z.object({
    password: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const postFormData = async (formData: z.infer<typeof FormSchema>) => {
    const payload = { ...formData, shortUrl: url };
    const response = await accessProtectedUrl(payload);

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: postFormData,
    onSuccess: (response) => {
      window.location.replace(response.data);
    },
    onError: (error) => {
      if (error.message === ErrorCode.INVALID_CREDENTIALS) {
        toast({
          variant: "destructive",
          title: "Invalid email address or password. Please try again.",
          duration: 2000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong. Please try again.",
          duration: 2000,
        });
      }
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <>
      <div className="px-4 md:px-6 lg:px-[38rem] pt-32 pb-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="font-bold text-3xl">
                  Uh oh! This URL is password protected.
                </h1>
              </div>
              <div className="space-y4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>Password</FormLabel>
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
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
