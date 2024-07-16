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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { feedback } from "@/lib/contact";
import { FeedbackSchema, feedbackSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, MessageCircleCode } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FeedbackForm() {
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
      <TooltipProvider delayDuration={250}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <MessageCircleCode />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Give us feedback</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give us feedback</DialogTitle>
          <DialogDescription>
            {`We appreciate your thoughts about Quill! If you've encountered a problem, please include details like what you were trying to do, and what happened. We'll respond by email.`}
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
