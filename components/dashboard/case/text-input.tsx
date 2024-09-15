"use client";
import {
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Case } from "@/lib/case";
import { TextInputFormSchema, textInputFormSchema } from "@/lib/form-schema";
import { Transcript, postTranscript, updateTranscript } from "@/lib/transcript";
import { useDebounce } from "@/lib/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export interface TextInputProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  transcript_id?: Transcript["id"];
  initial_content?: Transcript["content"];
}

export default function TextInput({
  case_id,
  transcript_id,
  initial_content,
}: TextInputProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<TextInputFormSchema>({
    resolver: zodResolver(textInputFormSchema),
    defaultValues: {
      content: initial_content ?? "",
    },
    mode: "onChange",
  });
  const data = form.watch();
  function onSubmit(data: TextInputFormSchema) {
    if (transcript_id != undefined && data.content != initial_content) {
      updateTranscript({
        case_id: case_id,
        transcript_id: transcript_id,
        content: data.content,
      }).then(() => {
        setLoading(false);
      });
    } else if (data.content != initial_content) {
      postTranscript({
        case_id: case_id,
        type: "text",
        status: "ready",
        description: "Text input",
        content: data.content,
      }).then(() => {
        setLoading(false);
      });
    }
  }

  const onSubmitDebounced = useDebounce(() => onSubmit(data), 1000);

  return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Text input</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2 p-1"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="flex-grow min-h-[calc(100vh-18.5rem)] resize-none"
                  placeholder="Enter patient information, including notes, imaging results, and lab data, for your Squire to use in note creation"
                  {...field}
                  autoFocus={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end w-full gap-1">
          {loading ? (
            <Button className="w-32" disabled>
              <span className="text-sm font-medium">Saving...</span>
              <LoaderCircle size={16} className="animate-spin ml-1" />
            </Button>
          ) : (
            <DialogClose asChild>
            <Button className="w-32" type={"submit"}>
              <span className="text-sm font-medium">{form.formState.isDirty?`Submit`:`Cancel`}</span>
            </Button>
            </DialogClose>
          )}
        </div>
      </form>
    </Form>
    </DialogContent>
  );
}
