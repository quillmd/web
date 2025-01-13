"use client";
import { refreshToken } from "@/lib/auth";
import { revalidateCase, revalidateCases } from "@/lib/case";
import { revalidateNotes } from "@/lib/note";
import { revalidateTranscripts } from "@/lib/transcript";
import { getCookie } from "cookies-next";
import { Channel, Socket } from "phoenix";
import { useEffect, useState } from "react";

const CasesSocket = () => {
  const authToken = getCookie("accessToken");
  const userId = getCookie("userId");
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [channel, setChannel] = useState<Channel | undefined>(undefined);

  useEffect(() => {
    refreshToken().then();
  }, []);

  useEffect(() => {
    if (authToken && userId && !socket) {
      const newSocket = new Socket(`${process.env.NEXT_PUBLIC_API_WS}`, {
        params: { token: authToken },
      });
      newSocket.connect();
      setSocket(newSocket);
    }
  }, [authToken, userId, socket]);

  useEffect(() => {
    if (userId && socket && !channel) {
      const newChannel = socket.channel(`cases:${userId}`);

      newChannel.on("case_created", () => {
        revalidateCases();
      });

      newChannel.on("case_edited", (payload) => {
        revalidateCase({ id: payload.id });
      });

      newChannel.on("case_deleted", (payload) => {
        revalidateCase({ id: payload.id });
      });

      newChannel.on("note_created", (payload) => {
        revalidateNotes({ case_id: payload.case_id });
      });

      newChannel.on("note_edited", (payload) => {
        revalidateNotes({ case_id: payload.case_id });
      });

      newChannel.on("note_deleted", (payload) => {
        revalidateNotes({ case_id: payload.case_id });
      });

      newChannel.on("transcript_created", (payload) => {
        revalidateTranscripts({ case_id: payload.case_id });
      });

      newChannel.on("transcript_edited", (payload) => {
        revalidateTranscripts({ case_id: payload.case_id });
      });

      newChannel.on("transcript_deleted", (payload) => {
        revalidateTranscripts({ case_id: payload.case_id });
      });

      newChannel
        .join()
        .receive("ok", (resp) => {
          setChannel(newChannel);
        })
        .receive("error", (resp) => {
          console.log("Unable to join", resp);
        });
    }
  }, [userId, socket, channel]);

  return null;
};

export default CasesSocket;
