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
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginSchema } from "../../schema";
import CardWrapper from "./card-wrapper";
import { useCaptcha, useFormSubmit } from "./hooks";

interface LoginFormsProps {
  onLogin: (token?: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormsProps) {
  const { handleFormSubmit } = useFormSubmit();
  const captcha = useCaptcha();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await handleFormSubmit(
      `${AUTH_API_URL}/login`,
      data,
      form.setError,
      onLogin
    );
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

          <div className="space-y-2">
            <img
              id="captcha-image"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(captcha || "")}`}
              alt="CAPTCHA"
              className="h-24 w-full rounded-md border object-contain py-1"
            />
            <FormField
              name="captcha"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="captcha">Verification</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="captcha"
                      type="text"
                      placeholder="Enter the verification code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {errors.root && (
            <p
              id="error-message"
              className="text-sm font-medium text-destructive"
            >
              {errors.root.message}
            </p>
          )}

          <Button
            id="submit-button"
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
