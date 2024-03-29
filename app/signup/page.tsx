import { SignupForm } from "@/components/auth/signup-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NextLink from "next/link";

export default function SignupPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <NextLink
        href="/login"
        className={cn(
          buttonVariants({ variant: "default" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </NextLink>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Quill
        </div>
      </div>
      <div className="lg:hidden absolute left-4 top-4 z-20 flex items-center text-center mx-auto text-2xl font-semibold tracking-tight">
        Quill
      </div>
      <div className="flex items-center justify-center h-screen lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
