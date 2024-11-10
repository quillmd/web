import FirstSteps from "@/components/dashboard/case/first-steps";
import { getAccount } from "@/lib/account";

export default async function HomePage() {
  const account = await getAccount();
  return (
    <FirstSteps
      account={account}
      case_id={undefined}
      case_title={""}
      transcripts={[]}
      notes={[]}
      templates={[]}
    />
  );
}
