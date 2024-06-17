"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/lib/contact";
import { ContactUsSchema, contactUsSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect } from "react";

export default function ContactUsForm() {
    const defaultValues = {
        name:"",
        email: "",
        message: ""
    }
  const form = useForm<ContactUsSchema>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: defaultValues,
  });
  const isSubmitSuccessful = form.formState.isSubmitSuccessful

  const onSubmit = async (values: ContactUsSchema) => {
    await contact(values);
  };

  useEffect(() => {
    if (isSubmitSuccessful){
        setTimeout(() => {
            form.reset(defaultValues);
          }, 250);
      
    }
  }, [isSubmitSuccessful])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Fill out the form below`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Name"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          type="email"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          className="min-h-[120px]"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button className="w-1/2" type="submit">
                  {form.formState.isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : form.formState.isSubmitSuccessful ? (
                    <Check />
                  ) : (
                    `Send message`
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>{`*Your personal information will not be shared, and your inbox will not be spammed`}</CardDescription>
      </CardFooter>
    </Card>
  );
}
