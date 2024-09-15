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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function TemplateDisplay({ template }: { template?: Template }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<TemplateInputFormSchema>({
    resolver: zodResolver(templateInputFormSchema),
    defaultValues: {
      title: template?.title ?? "",
      instructions:
        template?.instructions ??
        `Example instructions:
-'Subjective' section that describes the patient's symptoms and history.
-'Objective' section (physical exam, vitals, labs, imaging, procedure findings, etc).
-'Assessment and Plan' section divided by problem.
-For each problem, write a short paragraph explaining reasoning for the problem's assessment.
-The plan for each problem should be bullet point format.`,
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

  async function onSubmit(data: TemplateInputFormSchema) {
    setLoading(true);
    try {
      if (
        template?.id != undefined &&
        data.title.length > 0 &&
        (data.instructions.length > 0 || data.examples[0]?.length > 0) &&
        (data.title != template?.title ||
          data.instructions != template?.instructions ||
          data.examples != template?.examples)
      ) {
        await updateTemplate({
          template_id: template.id,
          title: formattedData.title,
          instructions: formattedData.instructions,
          examples: formattedData.examples,
        });
      } else if (
        data.title.length > 0 &&
        (data.instructions.length > 0 || data.examples[0]?.length > 0) &&
        (data.title != template?.title ||
          data.instructions != template?.instructions ||
          data.examples != template?.examples)
      ) {
        await postTemplate({
          title: formattedData.title,
          instructions: formattedData.instructions,
          examples: formattedData.examples,
        });
      }
      form.reset();
    } catch (error) {
      console.error("Error saving template:", error);
    } finally {
      setLoading(false);
    }
  }

  const getButtonContent = () => {
    if (loading) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (form.formState.isSubmitSuccessful && !form.formState.isDirty)
      return "Saved";
    return "Save";
  };

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
                  Instructions - Tell Squire how you would like your note
                  written
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={``}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
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
                  Examples - Give Squire examples of notes that fit this
                  template
                </FormLabel>
                {field.value.map((example, i) => (
                  <FormField
                    key={`example-input-${i}`}
                    name={`examples.${i}`}
                    control={form.control}
                    render={({ field: nestedField }) => (
                      <FormItem className="flex flex-row items-start justify-center gap-2 relative">
                        <FormControl>
                          <Textarea
                            {...nestedField}
                            onChange={(e) => {
                              nestedField.onChange(e);
                            }}
                            placeholder="Example note goes here"
                            rows={10}
                          />
                        </FormControl>
                        <Button
                          className="absolute right-1 -top-1 hover:text-destructive-foreground hover:bg-destructive/90"
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
          <div className="flex items-center justify-end w-full gap-1">
            <Button
              type="submit"
              disabled={!form.formState.isDirty || loading}
              className="w-24 h-10"
            >
              {getButtonContent()}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
