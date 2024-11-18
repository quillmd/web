"use client";
import { requestQRAuth } from "@/lib/auth";
import { Channel, Socket } from "phoenix";
import { useEffect, useState } from "react";

interface AuthSocketProps {
    authChannel: string;
    authChannelCode: string;
}

const AuthSocket = ({authChannel, authChannelCode}: AuthSocketProps) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [channel, setChannel] = useState<Channel | undefined>(undefined);

  useEffect(() => {
    if (!socket) {
      const newSocket = new Socket(`${process.env.NEXT_PUBLIC_API_WS}`, {});
      newSocket.connect();
      setSocket(newSocket);
    }
  }, [socket]);

  useEffect(() => {
    if (socket && !channel) {
      const newChannel = socket.channel(`auth:${authChannel}`, { code:authChannelCode });

      newChannel
        .join()
        .receive("ok", (resp) => {
          console.log("Joined successfully", resp);
          setChannel(newChannel);
        })
        .receive("error", (resp) => {
          console.log("Unable to join", resp);
        });
    }
  }, [socket, channel]);

  return null;
};



export default AuthSocket;
