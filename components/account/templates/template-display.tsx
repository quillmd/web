"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  TemplateInputFormSchema,
  templateInputFormSchema,
} from "@/lib/form-schema";
import { Template, postTemplate, updateTemplate } from "@/lib/template";
import { useDebounce } from "@/lib/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TemplateDisplay({ template }: { template?: Template }) {
  const [updatedAt, setUpdatedAt] = useState<DateTime | undefined>();
  const form = useForm<TemplateInputFormSchema>({
    resolver: zodResolver(templateInputFormSchema),
    defaultValues: {
      title: template?.title ?? "",
      instructions: template?.instructions ?? "",
      examples:
        template?.examples?.length && template?.examples?.length > 0
          ? template?.examples
          : [""],
    },
    mode: "onChange",
  });
  const data = form.watch();
  const formattedData = {
    title: data.title.trim(),
    instructions: data.instructions.trim(),
    examples: data.examples
      .map((example) => example.trim())
      .filter((example) => example.length > 0),
  };
  function onSubmit(data: TemplateInputFormSchema) {
    if (
      template?.id != undefined &&
      data.title.length > 0 &&
      (data.instructions.length > 0 || data.examples[0]?.length > 0) &&
      (data.title != template?.title ||
        data.instructions != template?.instructions ||
        data.examples != template?.examples)
    ) {
      console.log("submitting template update");
      updateTemplate({
        template_id: template.id,
        title: data.title,
        instructions: data.instructions,
        examples: data.examples,
      }).then(() => {
        setUpdatedAt(DateTime.now());
      });
    } else if (
      data.title.length > 0 &&
      (data.instructions.length > 0 || data.examples[0]?.length > 0) &&
      (data.title != template?.title ||
        data.instructions != template?.instructions ||
        data.examples != template?.examples)
    ) {
      console.log("submitting template post");
      postTemplate({
        title: data.title,
        instructions: data.instructions,
        examples: data.examples,
      }).then(() => {
        setUpdatedAt(DateTime.now());
      });
    }
  }

  const onSubmitDebounced = useDebounce(() => onSubmit(formattedData), 1000);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="font-semibold"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onSubmitDebounced();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Instructions - Tell Quill how you would like your note written
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`-'Subjective' section that describes the patient's symptoms and history.
-'Objective' section (physical exam, vitals, labs, imaging, procedure findings, etc).
-'Assessment and Plan' section divided by problem.
-For each problem, write a short paragraph explaining reasoning for the problem's assessment.
-The plan for each problem should be bullet point format.`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onSubmitDebounced();
                    }}
                    rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examples"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Examples - Give Quill examples of notes that you like
                </FormLabel>
                {field.value.map((example, i) => (
                  <FormField
                    key={`example-input-${i}`}
                    name={`examples.${i}`}
                    control={form.control}
                    render={({ field: nestedField }) => (
                      <FormItem className="flex flex-row items-start justify-center gap-2">
                        <FormControl>
                          <Textarea
                            {...nestedField}
                            onChange={(e) => {
                              nestedField.onChange(e);
                              onSubmitDebounced();
                            }}
                            placeholder="Example note goes here"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size={"icon"}
                          onClick={() => {
                            const updatedExamples = [...field.value];
                            updatedExamples.splice(i, 1);
                            field.onChange(updatedExamples);
                          }}
                        >
                          <Trash />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => field.onChange([...field.value, ""])}
                >
                  + Add Example
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
      {updatedAt && (
        <div className="w-full flex justify-end items-center gap-2">
          <Check size={12} />
          <span className="text-sm text-muted-foreground">{`Saved ${updatedAt.toLocaleString(
            DateTime.DATETIME_SHORT_WITH_SECONDS
          )}`}</span>
        </div>
      )}
    </div>
  );
}
