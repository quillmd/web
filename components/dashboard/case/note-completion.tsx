"use client";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { postNote } from "@/lib/note";
import { Scribe } from "@/lib/scribe";
import { Template } from "@/lib/template";
import { Transcript, postTranscript, updateTranscript } from "@/lib/transcript";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface NoteCompletionProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  template_id: Template["id"];
  scribe_id: Scribe["id"];
  transcript_id?: Transcript["id"];
  initial_content?: Transcript["content"];
}

export default function NoteCompletion({
  case_id,
  template_id,
  scribe_id,
  transcript_id,
  initial_content,
}: NoteCompletionProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<TextInputFormSchema>({
    resolver: zodResolver(textInputFormSchema),
    defaultValues: {
      content: initial_content ?? "",
    },
    mode: "onChange",
  });
  const data = form.watch();
  async function onSubmit(data: TextInputFormSchema) {
    if (transcript_id != undefined && data.content != initial_content) {
      await updateTranscript({
        case_id: case_id,
        transcript_id: transcript_id,
        content: data.content,
      });
    } else if (data.content != initial_content) {
      await postTranscript({
        case_id: case_id,
        type: "note_for_completion",
        status: "ready",
        description: "Note for Completion",
        content: data.content,
      });
      await postNote({ case_id, template_id, scribe_id });
    }

    setLoading(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Note Completion</DialogTitle>
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
                    placeholder={
                      "Enter the note you want your Squire to complete"
                    }
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
                  <span className="text-sm font-medium">
                    {form.formState.isDirty ? `Submit` : `Cancel`}
                  </span>
                </Button>
              </DialogClose>
            )}
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
