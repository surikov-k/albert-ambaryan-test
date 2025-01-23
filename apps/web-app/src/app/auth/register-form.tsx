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

import { registerSchema } from "../../schema";
import Captcha from "./captcha";
import CardWrapper from "./card-wrapper";
import { useFormSubmit } from "./hooks";

interface LoginFormsProps {
  onRegister: () => void;
}

export default function RegisterForm({ onRegister }: LoginFormsProps) {
  const { handleFormSubmit } = useFormSubmit();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await handleFormSubmit(
      `${AUTH_API_URL}/register`,
      data,
      form.setError,
      onRegister
    );
  };

  const { isSubmitting, errors } = form.formState;

  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/login"
      backButtonLabel="Already have an account? Login here."
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
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm the password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id="confirmPassword"
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
            <Captcha />
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
            <p className="text-sm font-medium text-destructive">
              {errors.root.message}
            </p>
          )}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
