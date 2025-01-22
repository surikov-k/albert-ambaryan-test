import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
        "Password must contain at least one capital letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    captcha: z.string().min(1, {
      message: "Please enter a verification code",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string(),
  captcha: z.string().min(1, {
    message: "Please enter a verification code",
  }),
});
