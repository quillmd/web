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

export const changeCaseTitleFormSchema = z.object({
  title: z.string().min(1),
});

export const newSessionFormSchema = z.object({
  name: z.string().min(1),
});

export const freetextInputFormSchema = z.object({
  content: z.string(),
});

export const templateInputFormSchema = z.object({
  title: z.string(),
  instructions: z.string(),
  examples: z.string().array()
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type SignupFormSchema = z.infer<typeof signupFormSchema>;
export type ChangeCaseTitleFormSchema = z.infer<
  typeof changeCaseTitleFormSchema
>;
export type NewSessionFormSchema = z.infer<typeof newSessionFormSchema>;
export type FreetextInputFormSchema = z.infer<typeof freetextInputFormSchema>;
export type TemplateInputFormSchema = z.infer<typeof templateInputFormSchema>;
