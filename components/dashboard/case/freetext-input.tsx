"use client";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
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
  const form = useForm<FreetextInputFormSchema>({
    resolver: zodResolver(freetextInputFormSchema),
    defaultValues: {
      content: initial_content ?? "",
    },
  });

  function onSubmit(data: FreetextInputFormSchema) {
    if (
      transcript_id != undefined &&
      initial_content &&
      data.content != initial_content
    ) {
      updateTranscript({
        case_id: case_id,
        transcript_id: transcript_id,
        content: data.content,
      }).then(() => form.reset({ content: data.content }));
    } else {
      postTranscript({
        case_id: case_id,
        type: "freetext",
        status: "ready",
        description: "Freetext input",
        content: data.content,
      }).then(() => form.reset({ content: data.content }));
    }
  }

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
                <Textarea placeholder="Freetext input" {...field} rows={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty}>
          {form.formState.isSubmitSuccessful ? <Check /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
