import { z } from "zod";

export const authRequestSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
});

export const authValidateSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  otp: z.string().length(6, { message: "Enter the 6-number pin" }),
});

export const accountProfileSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
});

export const changeCaseTitleFormSchema = z.object({
  title: z.string().min(1),
});

export const newSessionFormSchema = z.object({
  name: z.string().min(1),
});

export const textInputFormSchema = z.object({
  content: z.string(),
});

export const templateInputFormSchema = z.object({
  title: z.string(),
  instructions: z.string(),
  examples: z.string().array(),
});

export const contactUsSchema = z.object({
  name: z.string(),
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  message: z.string().min(1, {
    message: "Enter a message",
  }),
});

export const feedbackSchema = z.object({
  message: z.string().min(1, {
    message: "Enter a message",
  }),
});

export type AuthRequestSchema = z.infer<typeof authRequestSchema>;
export type AuthValidateSchema = z.infer<typeof authValidateSchema>;
export type AccountProfileSchema = z.infer<typeof accountProfileSchema>;
export type ChangeCaseTitleFormSchema = z.infer<
  typeof changeCaseTitleFormSchema
>;
export type NewSessionFormSchema = z.infer<typeof newSessionFormSchema>;
export type TextInputFormSchema = z.infer<typeof textInputFormSchema>;
export type TemplateInputFormSchema = z.infer<typeof templateInputFormSchema>;
export type ContactUsSchema = z.infer<typeof contactUsSchema>;
export type FeedbackSchema = z.infer<typeof feedbackSchema>;
