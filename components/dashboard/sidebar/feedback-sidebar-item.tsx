"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { feedback } from "@/lib/contact";
import { FeedbackSchema, feedbackSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, MessageCircleCode } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FeedbackSidebarItem() {
  const defaultValues = {
    name: "",
    email: "",
    message: "",
  };
  const form = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: defaultValues,
  });

  const isSubmitSuccessful = form.formState.isSubmitSuccessful;

  const onSubmit = async (values: FeedbackSchema) => {
    await feedback(values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        form.reset(defaultValues);
      }, 250);
    }
  }, [isSubmitSuccessful]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MessageCircleCode />
            Feedback
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Thoughts</DialogTitle>
          <DialogDescription>
            {`We’d love to hear what went well or how we can improve Squire. We'll respond by email.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <DialogFooter>
              <Button type="submit">
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : form.formState.isSubmitted &&
                  form.formState.isSubmitSuccessful ? (
                  <Check />
                ) : (
                  `Send message`
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
