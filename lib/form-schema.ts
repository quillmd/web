import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email({
	  message: "Must be a valid email address",
	}),
	password: z
	  .string()
	  .min(8, { message: "Must be at least 8 characters long" }),
  });


export const signupFormSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email address",
  }),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" }),
  activation: z.string(),
});

export const newSessionFormSchema = z.object({
  name: z.string().min(1),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type SignupFormSchema = z.infer<typeof signupFormSchema>;
export type NewSessionFormSchema = z.infer<typeof newSessionFormSchema>;
