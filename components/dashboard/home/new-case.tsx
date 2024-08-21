"use client";
import SubscribeDialog from "@/components/account/subscribe-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postCase } from "@/lib/case";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "../account-provider";

export default function NewCase() {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();

  const handleNewCase = async () => {
    setLoading(true);
    const newCase = await postCase({ title: newTitle });
    router.push(`/cases/${newCase.id}`);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleNewCase();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight font-garamond">
        {account.status != "trial_ended"
          ? `Create a case to get started`
          : "Get Squire Unlimited to continue"}
      </h1>
      <Input
        disabled={account.status == "trial_ended"}
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {account.status != "trial_ended" ? (
        <Button
          className="w-48"
          type="button"
          onClick={handleNewCase}
          disabled={newTitle.length == 0 || loading}
        >
          {!loading && "Create Case"}
          {loading && (
            <LoaderCircle className={"ml-2 animate-spin"} size={16} />
          )}
        </Button>
      ) : (
        <SubscribeDialog />
      )}
    </div>
  );
}
