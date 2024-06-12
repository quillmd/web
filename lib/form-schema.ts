import { z } from "zod";

export const authRequestSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  })
})

export const authValidateSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  otp: z
    .string()
    .length(6, { message: "Enter the 6-number pin" }),
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

export type AuthRequestSchema = z.infer<typeof authRequestSchema>;
export type AuthValidateSchema = z.infer<typeof authValidateSchema>;
export type ChangeCaseTitleFormSchema = z.infer<
  typeof changeCaseTitleFormSchema
>;
export type NewSessionFormSchema = z.infer<typeof newSessionFormSchema>;
export type FreetextInputFormSchema = z.infer<typeof freetextInputFormSchema>;
export type TemplateInputFormSchema = z.infer<typeof templateInputFormSchema>;
