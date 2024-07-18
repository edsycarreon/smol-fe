"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

import { signIn } from "../services/auth/auth.service";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const postFormData = async (formData: z.infer<typeof FormSchema>) => {
    const { email, password } = formData;
    const response = await signIn(email, password);

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: postFormData,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data); //TODO make this more secure
      router.push("/home");
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
        <header className="space-y-2 text-center">
          <h1 className="font-bold text-9xl">Smol</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to shorten your URLs
          </p>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
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
              <Button
                className="w-full"
                type="submit"
                onSubmit={(e) => e.preventDefault()}
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
        <section>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline"
              onClick={() => router.push("/signup")}
              aria-label="Sign up"
            >
              Sign up
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
