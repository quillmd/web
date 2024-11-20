'use client'

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { requestAuth, validateAuth } from "@/lib/auth";
import {
    AuthRequestSchema,
    AuthValidateSchema,
    authRequestSchema,
    authValidateSchema,
} from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function RequestForm({
  setEmailPrefill,
}: {
  setEmailPrefill: (value: string) => void
}) {
  const form = useForm<AuthRequestSchema>({
    resolver: zodResolver(authRequestSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: AuthRequestSchema) => {
    try {
      const responseData = await requestAuth(values.email)
      if (responseData.error) {
        form.setError("email", { type: "manual", message: responseData.error })
      } else {
        setEmailPrefill(values.email)
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("email", { type: "manual", message: error.message })
      } else {
        form.setError("email", { type: "manual", message: "Request error" })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardDescription className="text-lg text-foreground text-center font-heading">
          Access Squire using just your email
        </CardDescription>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email to get started"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            `Continue with email`
          )}
        </Button>
      </form>
    </Form>
  )
}

function ValidateForm({
  emailPrefill,
  setEmailPrefill,
}: {
  emailPrefill: string
  setEmailPrefill: (value: string) => void
}) {
  const router = useRouter()
  const form = useForm<AuthValidateSchema>({
    resolver: zodResolver(authValidateSchema),
    defaultValues: {
      email: emailPrefill,
      otp: "",
    },
  })

  const onSubmit = async (values: AuthValidateSchema) => {
    try {
      const responseData = await validateAuth(values.email, values.otp)
      if (responseData.error) {
        form.setError("email", { type: "manual", message: responseData.error })
      } else {
        router.push("/home")
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("otp", { type: "manual", message: error.message })
      } else {
        form.setError("otp", { type: "manual", message: "Validation error" })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your work or personal email"
                  type="email"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <CardDescription className="text-center">
            We just sent you a temporary login code.
          </CardDescription>
          <span className="text-sm text-muted-foreground">{`Can't find it? `}</span>
          <span
            className="text-sm text-muted-foreground underline cursor-pointer"
            onClick={() => setEmailPrefill("")}
          >{`Try again`}</span>
        </div>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Paste Login Code</FormLabel>
              <FormControl>
                <InputOTP
                  className="text-3xl"
                  maxLength={6}
                  onComplete={form.handleSubmit(onSubmit)}
                  autoFocus
                  pushPasswordManagerStrategy="none"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-bw-autofill="off"
                  autoComplete="one-time-code"
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : form.formState.isSubmitSuccessful ? (
            <Check />
          ) : (
            `Continue with login code`
          )}
        </Button>
      </form>
    </Form>
  )
}

export function EmailLogin() {
  const [emailPrefill, setEmailPrefill] = useState("")

  return emailPrefill.length !== 0 ? (
    <ValidateForm
      emailPrefill={emailPrefill}
      setEmailPrefill={setEmailPrefill}
    />
  ) : (
    <RequestForm setEmailPrefill={setEmailPrefill} />
  )
}