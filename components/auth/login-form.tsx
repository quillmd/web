"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
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
import { Check, LoaderCircle, Mail, QrCode } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import AuthSocket from "./auth-socket";
import {QRCodeSVG} from 'qrcode.react';
// function QRCodeAuth({ onSuccess }) {
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const channelId = generateRandomString(32);
//     const displayCode = generateDisplayCode();

//     // Create WebSocket connection
//     const socket = new WebSocket(
//       `${window.location.protocol === 'wss:'}//api.squirescribe.com/socket/websocket`
//     );

//     socket.onopen = () => {
//       // Join the auth channel
//       const msg = {
//         topic: `auth:${channelId}`,
//         event: "phx_join",
//         payload: { code: displayCode },
//         ref: "1"
//       };
//       socket.send(JSON.stringify(msg));

//       // Get QR code URL
//       fetch(`/auth/qr_channel?channel=auth:${channelId}&code=${displayCode}`)
//         .then(response => response.blob())
//         .then(blob => {
//           setQrCodeUrl(URL.createObjectURL(blob));
//           setLoading(false);
//         });
//     };

//     socket.onmessage = (event) => {
//       const response = JSON.parse(event.data);
//       if (response.event === "grant") {
//         // Handle successful authentication
//         validateAuth(response.payload.email, response.payload.otp)
//           .then(() => {
//             router.push("/home");
//           })
//           .catch(console.error);
//       }
//     };

//     return () => {
//       socket.close();
//       if (qrCodeUrl) {
//         URL.revokeObjectURL(qrCodeUrl);
//       }
//     };
//   }, [router]);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <CardDescription className="text-lg text-foreground text-center font-heading">
//         Scan with Squire mobile app
//       </CardDescription>
//       {loading ? (
//         <LoaderCircle className="animate-spin h-48 w-48" />
//       ) : (
//         <img src={qrCodeUrl} alt="QR Code" className="h-48 w-48" />
//       )}
//     </div>
//   );
// }
function RequestForm({
  setEmailPrefill,
}: {
  setEmailPrefill: (value: string) => void;
}) {
  const form = useForm<AuthRequestSchema>({
    resolver: zodResolver(authRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: AuthRequestSchema) => {
    try {
      const responseData = await requestAuth(values.email);
      if (responseData.error) {
        form.setError("email", { type: "manual", message: responseData.error });
      } else {
        setEmailPrefill(values.email);
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("email", { type: "manual", message: error.message });
      } else {
        form.setError("email", { type: "manual", message: "Request error" });
      }
    }
  };

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
  );
}

function ValidateForm({
  emailPrefill,
  setEmailPrefill,
}: {
  emailPrefill: string;
  setEmailPrefill: (value: string) => void;
}) {
  const router = useRouter();
  const form = useForm<AuthValidateSchema>({
    resolver: zodResolver(authValidateSchema),
    defaultValues: {
      email: emailPrefill,
      otp: "",
    },
  });

  const onSubmit = async (values: AuthValidateSchema) => {
    try {
      const responseData = await validateAuth(values.email, values.otp);
      if (responseData.error) {
        form.setError("email", { type: "manual", message: responseData.error });
      } else {
        router.push("/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("otp", { type: "manual", message: error.message });
      } else {
        form.setError("otp", { type: "manual", message: "Validation error" });
      }
    }
  };

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
  );
}

export function LoginForm() {
  const [emailPrefill, setEmailPrefill] = useState("");
  const [useQrCode, setUseQrCode] = useState(false);
  const authChannel = generateAuthChannel()
  const authChannelCode = generateAuthChannelCode()

  const showValidateForm = emailPrefill.length != 0;

  return (
    <>
      <AuthSocket authChannel={authChannel} authChannelCode={authChannelCode} />
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-4 p-6">
          {useQrCode ? <div className="mt-6 flex justify-center">
          <QRCodeSVG value={JSON.stringify({channel:authChannel, code:authChannelCode})} size={200} />
        </div>
 : showValidateForm ? ( // <QRCodeAuth />
            <ValidateForm
              emailPrefill={emailPrefill}
              setEmailPrefill={setEmailPrefill}
            />
          ) : (
            <RequestForm setEmailPrefill={setEmailPrefill} />
          )}

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
  );
}

const generateAuthChannel = () => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((x) => charset[x % charset.length])
    .join("");
};

const generateAuthChannelCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};