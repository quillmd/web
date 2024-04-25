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
import { updateCase } from "@/lib/case";
import {
  ChangeCaseTitleFormSchema,
  changeCaseTitleFormSchema,
} from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CaseTitleProps extends React.HTMLAttributes<HTMLElement> {
  case_id: number;
  initial_title: string;
}

export default function CaseTitle({ case_id, initial_title }: CaseTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<ChangeCaseTitleFormSchema>({
    resolver: zodResolver(changeCaseTitleFormSchema),
    defaultValues: {
      title: initial_title,
    },
  });

  function onSubmit(data: ChangeCaseTitleFormSchema) {
    if (data.title != initial_title) {
      updateCase({ id: case_id, title: data.title }).then(() => {
        setIsEditing(false);
        form.reset({ title: data.title });
      });
    } else {
      setIsEditing(false);
    }
  }
  const newTitle = form.watch("title");
  return (
    <div className="flex w-full">
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Case Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"ghost"}
              type="submit"
              disabled={newTitle.length == 0}
            >
              <Save />
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <h2 className="text-3xl font-semibold tracking-tight transition-colors">
            {initial_title}
          </h2>
          <Button
            variant={"ghost"}
            onClick={() => setIsEditing(!isEditing)}
            disabled={newTitle.length == 0}
          >
            <Edit />
          </Button>
        </>
      )}
    </div>
  );
}
