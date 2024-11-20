'use client'

import { CardDescription } from "@/components/ui/card";
import { QRCodeSVG } from 'qrcode.react';

interface QRProps {
    authChannel: string;
    authChannelCode: string;
}

export function QRLogin({authChannel, authChannelCode}: QRProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <CardDescription className="w-72 text-lg text-foreground text-center font-heading">
        Scan the code below with the Squire mobile app to log in instantly
      </CardDescription>
      <QRCodeSVG
        value={JSON.stringify({ channel: authChannel, code: authChannelCode })}
        size={200}
      />
    </div>
  )
}