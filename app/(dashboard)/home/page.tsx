import NewCase from "@/components/dashboard/home/new-case";
import { Card } from "@/components/ui/card";

export default async function HomePage() {
  return (
    <Card className="relative flex flex-col overflow-hidden h-[calc(100vh-4.5rem)] justify-center">
      <div className="max-w-md mx-auto pb-48">
        <NewCase />
      </div>
    </Card>
  );
}
