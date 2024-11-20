'use client'

import { validateAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Channel, Socket } from "phoenix";
import { useEffect, useState } from "react";

interface AuthSocketProps {
  authChannel: string
  authChannelCode: string
}

export default function AuthSocket({ authChannel, authChannelCode }: AuthSocketProps) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  const [channel, setChannel] = useState<Channel | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    if (!socket) {
      const newSocket = new Socket(`${process.env.NEXT_PUBLIC_API_WS}`, {})
      newSocket.connect()
      setSocket(newSocket)
    }
  }, [socket])

  useEffect(() => {
    if (socket && !channel) {
      const newChannel = socket.channel(`auth:${authChannel}`, { code: authChannelCode })

      newChannel
        .join()
        .receive("ok", (resp) => {
          console.log("Joined successfully", resp)
          setChannel(newChannel)
        })
        .receive("error", (resp) => {
          console.log("Unable to join", resp)
        })

      newChannel.on("grant_approved", async (payload) => {
        const { email, otp } = payload
        console.log(payload)
        try {
          const responseData = await validateAuth(email, otp)
          if (responseData.error) {
            console.error("Authentication error:", responseData.error)
          } else {
            router.push("/home")
          }
        } catch (error) {
          console.error("Validation error:", error)
        }
      })

      return () => {
        newChannel.off("grant")
      }
    }
  }, [socket, channel, authChannel, authChannelCode, router])

  return null
}