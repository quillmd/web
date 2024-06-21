"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AccountProfileSchema, accountProfileSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function ProfileForm(defaultValues: AccountProfileSchema) {
  const form = useForm<AccountProfileSchema>({
    resolver: zodResolver(accountProfileSchema),
    defaultValues: defaultValues,
  });
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;
  const onSubmit = async (values: AccountProfileSchema) => {
    null;
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your work or personal email"
                  type="email"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button className="w-full" type="submit">
              {form.formState.isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                `Continue with email`
              )}
            </Button> */}
      </form>
    </Form>
  );
}
