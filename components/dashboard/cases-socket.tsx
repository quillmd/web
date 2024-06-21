"use client";
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
        console.log("Case edited:", payload);
        revalidateCase({ id: payload.id });
      });

      newChannel.on("case_deleted", (payload) => {
        console.log("Case deleted:", payload);
        revalidateCase({ id: payload.id });
      });

      newChannel.on("note_created", (payload) => {
        console.log("Note created:", payload);
        revalidateNotes({ case_id: payload.case_id });
      });

      newChannel.on("note_edited", (payload) => {
        console.log("Note edited:", payload);
        revalidateNotes({ case_id: payload.case_id });
      });

      newChannel.on("note_deleted", (payload) => {
        console.log("Note deleted:", payload);
        revalidateNotes({ case_id: payload.case_id });
      });

      newChannel.on("transcript_created", (payload) => {
        console.log("Transcript created:", payload);
        revalidateTranscripts({ case_id: payload.case_id });
      });

      newChannel.on("transcript_edited", (payload) => {
        console.log("Transcript edited:", payload);
        revalidateTranscripts({ case_id: payload.case_id });
      });

      newChannel.on("transcript_deleted", (payload) => {
        console.log("Transcript deleted:", payload);
        revalidateTranscripts({ case_id: payload.case_id });
      });

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
  }, [userId, socket, channel]);

  return null;
};

export default CasesSocket;
