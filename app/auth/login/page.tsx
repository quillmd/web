import { LoginForm } from "@/components/auth/login-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <NextLink
        href="/auth/signup"
        className={cn(
          buttonVariants({ variant: "default" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign Up
      </NextLink>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r bg-orange-200">
        <div className="absolute inset-0 bg-orange-200" />
        <div className="font-serif relative z-20 flex items-start justify-center h-full">
          <NextLink href={"/"} className="absolute top-4 left-4">
            <Image
              src="/logo_text.svg"
              alt="Logo"
              width={100}
              height={36}
              className="logo cursor-pointer"
            />
          </NextLink>
          <div className="flex flex-col items-center justify-center space-y-8 h-full">
            <Image
              src="/art3.png"
              alt="art3"
              width={400}
              height={108}
              className="art"
            />
          </div>
        </div>
      </div>
      <div className="font-serif lg:hidden absolute left-4 top-4 z-20 flex items-center text-center mx-auto text-2xl font-semibold tracking-tight">
        {/*nothing*/}
      </div>
      <div className="flex items-center justify-center h-screen lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to log into your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}