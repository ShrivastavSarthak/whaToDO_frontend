import { z } from "zod";

export const ChildSignupSchema = z
  .object({
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email address"),
    phoneNo: z.string().min(10, "Phone number is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
        "Password must contain one upper case letter, one number, alphabets, and special symbols"
      ),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ParentSignupSchema = z
  .object({
    name: z.string().min(3, "name is required"),
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email address"),
    phoneNo: z.string().min(10, "Phone number is required"),
    gender: z.string().min(1, "Gender is required"),
    occupation: z.string().min(1, "Occupation is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
        "Password must contain one upper case letter, one number, alphabets, and special symbols"
      ),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SigninSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
