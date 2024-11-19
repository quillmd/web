'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Mail, QrCode } from 'lucide-react';
import NextLink from "next/link";
import { useMemo, useState } from "react";
import AuthSocket from "./auth-socket";
import { EmailLogin } from "./email-login";
import { QRLogin } from "./qr-login";

export function LoginForm() {
  const [useQrCode, setUseQrCode] = useState(false)
  const authChannel = useMemo(() => generateAuthChannel(), [])
  const authChannelCode = useMemo(() => generateAuthChannelCode(), [])

  return (
    <>
      <AuthSocket authChannel={authChannel} authChannelCode={authChannelCode}/>
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-4 p-6">
          {useQrCode ? <QRLogin authChannel={authChannel} authChannelCode={authChannelCode} /> : <EmailLogin />}

          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setUseQrCode(!useQrCode)}
              className="text-sm text-muted-foreground"
            >
              {useQrCode ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with email instead
                </>
              ) : (
                <>
                  <QrCode className="mr-2 h-4 w-4" />
                  Login with QR code
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-center leading-tight max-w-sm">
            <span className="text-xs text-muted-foreground">{`By continuing, you agree to Squire's `}</span>
            <NextLink
              href={"/terms"}
              className="text-xs text-muted-foreground underline"
            >
              {`Customer Terms`}
            </NextLink>
            <span className="text-xs text-muted-foreground">{`, and acknowledge their `}</span>
            <NextLink
              href={"/privacy"}
              className="text-xs text-muted-foreground underline"
            >
              {`Privacy Policy`}
            </NextLink>
            <span className="text-xs text-muted-foreground">{`.`}</span>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export function generateAuthChannel() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((x) => charset[x % charset.length])
    .join("")
}

export function generateAuthChannelCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}
