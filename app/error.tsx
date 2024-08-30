"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { refreshToken } from "@/lib/auth";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container max-w-lg">
      <div className="text-center w-full py-4 mb-4">
        <h1 className="text-3xl md:text-5xl font-garamond">
          Something went wrong
        </h1>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-center text-muted-foreground">
            We're sorry, but an error occurred while processing your request.
          </p>
          {error.digest && (
            <p className="text-center text-sm text-muted-foreground">
              Error code: {error.digest}
            </p>
          )}
          <Button
            onClick={() =>
              refreshToken().then(() => {
                console.log("Retrying...");
              })
            }
            className="w-full"
          >
            Try again
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">
            If the problem persists, please <a href="/contactus" className="text-blue-500 hover:underline">
            contact support
          </a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
