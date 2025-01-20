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
import { EyeIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerSchema } from "../../schema";
import CardWrapper from "./card-wrapper";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
  };

  const { isSubmitting } = form.formState;

  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/auth/login"
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
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
