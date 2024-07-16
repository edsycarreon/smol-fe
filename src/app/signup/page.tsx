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
import { ErrorCode, ErrorMessage, RequestType } from "@/enums";
import fetchRequest from "@/utils/fetch.utils";

function SignUp() {
  const router = useRouter();
  const { toast } = useToast();

  const FormSchema = z
    .object({
      firstName: z
        .string()
        .min(1, { message: "First name is required" })
        .max(25, { message: "First name must be less than 25 characters" }),
      lastName: z
        .string()
        .min(1, { message: "Last name is required" })
        .max(25, { message: "Last name must be less than 25 characters" }),
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const postFormData = async (formData: z.infer<typeof FormSchema>) => {
    const response = await fetchRequest("/auth/signup", {
      method: RequestType.POST,
      data: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.code);
    }
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: postFormData,
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Account created successfully!",
        duration: 2000,
      });
      router.push("/");
    },
    onError: (error) => {
      if (error.message === ErrorCode.ACCOUNT_ALREADY_EXISTS) {
        toast({
          variant: "success",
          title: "Uh oh!",
          description: ErrorMessage.ACCOUNT_ALREADY_EXISTS,
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
      <div className="px-4 md:px-6 lg:px-96 pt-32 pb-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-9xl">Smol</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign up to shorten your URLs
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-6 lg:space-y-0 lg:flex lg:space-x-2">
                <div className="w-full lg:w-1/2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
              <div className="space-y-4">
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm password"
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
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
        <section>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline"
              onClick={() => router.push("/")}
              aria-label="Sign in"
            >
              Sign in
            </a>
          </p>
        </section>
      </div>
    </>
  );
}

export default SignUp;
