import FirstSteps from "@/components/dashboard/case/first-steps";
import { getAccount } from "@/lib/account";

export default async function HomePage() {
  const account = await getAccount();
  return (
    <FirstSteps
      className={"h-[calc(100vh-4.5rem)]"}
      account={account}
      case_id={undefined}
      case_title={""}
      transcripts={[]}
      notes={[]}
      templates={[]}
    />
  );
}
