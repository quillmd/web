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
import {
  FreetextInputFormSchema,
  freetextInputFormSchema,
} from "@/lib/form-schema";
import { Transcript, postTranscript, updateTranscript } from "@/lib/transcript";
import { useDebounce } from "@/lib/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FreetextInputProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  transcript_id?: Transcript["id"];
  initial_content?: Transcript["content"];
}

export default function FreetextInput({
  case_id,
  transcript_id,
  initial_content,
}: FreetextInputProps) {
  const [updatedAt, setUpdatedAt] = useState<DateTime | undefined>();
  const form = useForm<FreetextInputFormSchema>({
    resolver: zodResolver(freetextInputFormSchema),
    defaultValues: {
      content: initial_content ?? "",
    },
    mode: "onChange",
  });
  const data = form.watch();
  function onSubmit(data: FreetextInputFormSchema) {
    if (transcript_id != undefined && data.content != initial_content) {
      console.log("submitting update");
      updateTranscript({
        case_id: case_id,
        transcript_id: transcript_id,
        content: data.content,
      }).then(() => {
        setUpdatedAt(DateTime.now());
      });
    } else if (data.content != initial_content) {
      console.log("submitting post");
      postTranscript({
        case_id: case_id,
        type: "freetext",
        status: "ready",
        description: "Freetext input",
        content: data.content,
      }).then(() => {
        setUpdatedAt(DateTime.now());
      });
    }
  }

  const onSubmitDebounced = useDebounce(() => onSubmit(data), 1000);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Freetext input"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onSubmitDebounced();
                  }}
                  rows={30}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {updatedAt && (
          <div className="w-full flex justify-end items-center gap-2">
            <Check size={12} />
            <span className="text-sm text-muted-foreground">{`Saved ${updatedAt.toLocaleString(
              DateTime.DATETIME_SHORT_WITH_SECONDS
            )}`}</span>
          </div>
        )}
      </form>
    </Form>
  );
}
