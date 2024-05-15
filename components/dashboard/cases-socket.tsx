"use client";
import { revalidateCase, revalidateCases } from "@/lib/case";
import { revalidateNotes } from "@/lib/note";
import { revalidateTranscripts } from "@/lib/transcript";
import { getCookie } from 'cookies-next';
import { Socket } from "phoenix";
import { useEffect } from "react";

const CasesSocket = () => {
  const authToken = getCookie("accessToken");
  const userId = getCookie("userId");

  useEffect(() => {
    if (authToken && userId) {
      const socket = new Socket(`${process.env.NEXT_PUBLIC_API_WS}`, {
        params: { token: authToken },
      });

      socket.connect();

      console.log(socket.endPointURL())

      const channel = socket.channel(`cases:${userId}`);

      channel
        .join()
        .receive("ok", (resp) => {
          console.log("Joined successfully", resp);
        })
        .receive("error", (resp) => {
          console.log("Unable to join", resp);
        });

      channel.on("case_created", () => {
        revalidateCases();
      });

      channel.on("case_edited", (payload) => {
        console.log("Case edited:", payload);
        revalidateCase({ id: payload.id });
      });

      channel.on("case_deleted", (payload) => {
        console.log("Case deleted:", payload);
        revalidateCase({ id: payload.id });
      });

      channel.on("note_created", (payload) => {
        console.log("Note created:", payload);
        revalidateNotes({ case_id: payload.case_id });
      });

      channel.on("note_edited", (payload) => {
        console.log("Note edited:", payload);
        revalidateNotes({ case_id: payload.case_id });
      });

      channel.on("note_deleted", (payload) => {
        console.log("Note deleted:", payload);
        revalidateNotes({ case_id: payload.case_id });
      });

      channel.on("transcript_created", (payload) => {
        console.log("Transcript created:", payload);
        revalidateTranscripts({ case_id: payload.case_id });
      });

      channel.on("transcript_edited", (payload) => {
        console.log("Transcript edited:", payload);
        revalidateTranscripts({ case_id: payload.case_id });
      });

      channel.on("transcript_deleted", (payload) => {
        console.log("Transcript deleted:", payload);
        revalidateTranscripts({ case_id: payload.case_id });
      });
      return () => {
        channel.leave();
        socket.disconnect();
      };
    }
  }, [userId, authToken]);
  return null;
};

export default CasesSocket;
