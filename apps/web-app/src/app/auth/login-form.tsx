import { AUTH_API_URL } from "@albert-ambaryan/helpers";
import { Button } from "@albert-ambaryan/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@albert-ambaryan/ui/form";
import { Input } from "@albert-ambaryan/ui/input";
import { PasswordInput } from "@albert-ambaryan/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginSchema } from "../../schema";
import CardWrapper from "./card-wrapper";

interface LoginFormsProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormsProps) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, data);
      if (response.status === 200) {
        onLogin();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data.errors) {
            error.response.data.errors.forEach(
              (error: { field: string; message: string }) => {
                form.setError(
                  error.field as keyof z.infer<typeof loginSchema>,
                  {
                    type: "server",
                    message: error.message,
                  }
                );
              }
            );
          } else {
            form.setError("root", {
              type: "server",
              message:
                error.response.data.message || "An error occurred during login",
            });
          }
        } else {
          form.setError("root", {
            type: "server",
            message: "Network error. Please try again.",
          });
        }
      } else {
        form.setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  const { isSubmitting, errors } = form.formState;

  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      suffix={<MailIcon className="size-5 text-gray-300" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id="password"
                      type="password"
                      placeholder="•••"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {errors.root && (
            <p className="text-sm font-medium text-destructive">
              {errors.root.message}
            </p>
          )}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
