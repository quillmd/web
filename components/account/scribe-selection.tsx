"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scribe, setScribe } from "@/lib/scribe";

interface ScribeSelectionProps {
  preferred_scribe?: Scribe;
  scribes: Scribe[];
}

export default function ScribeSelection({
  preferred_scribe,
  scribes,
}: ScribeSelectionProps) {
  const handleSetScribe = async (id: string) => {
    await setScribe({ id: id });
  };

  return (
    <div className="flex gap-6 w-fit">
      {scribes.map((scribe) => (
        <Card
          key={scribe.id}
          className={`w-80 cursor-pointer transition-all border-2 ${
            preferred_scribe && preferred_scribe.id === scribe.id
              ? "border-2 border-primary bg-accent"
              : "border-2 border-slate-200 hover:border-primary hover:bg-accent"
          } hover:shadow-lg`}
          onClick={() => handleSetScribe(scribe.id)}
        >
          <CardHeader>
            <CardTitle>{scribe.name}</CardTitle>
            <CardDescription>{scribe.short_description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{scribe.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
