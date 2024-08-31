"use client";
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
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
        type: "freetext",
        status: "ready",
        description: "Freetext input",
        content: data.content,
      }).then(() => {
        setLoading(false);
      });
    }
  }

  const onSubmitDebounced = useDebounce(() => onSubmit(data), 1000);

  return (
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
                  placeholder="Enter information for Squire to use when creating notes"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setLoading(true);
                    onSubmitDebounced();
                  }}
                  autoFocus={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end w-full gap-1">
          {loading ? (
            <>
              <span className="text-sm font-medium">Saving...</span>
              <LoaderCircle size={16} className="animate-spin" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Saved</span>
              <CircleCheck size={16} />
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
