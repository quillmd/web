"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scribe, setScribe } from "@/lib/scribe";
import { Eclipse, ShieldHalf, Sparkles } from "lucide-react";

const scribeIconMapping = {
  Lancelot: Sparkles,
  Galahad: ShieldHalf,
  Percival: Eclipse,
} as const;

type ScribeName = keyof typeof scribeIconMapping;

interface ScribeSelectionProps {
  preferred_scribe?: Scribe;
  scribes: Scribe[];
}

export default function ScribeSelection({
  preferred_scribe,
  scribes,
}: ScribeSelectionProps) {
  const handleSetScribe = (id: string) => {
    setScribe({ id: id }).then();
  };

  const scribesWithIcons = scribes.map((scribe) => ({
    ...scribe,
    icon: scribeIconMapping[scribe.name as ScribeName],
  }));

  return (
    <div className="flex gap-6 w-fit">
      {scribesWithIcons.map((scribe) => (
        <Card
          key={scribe.id}
          className={`w-72 cursor-pointer transition-all border-2 ${
            preferred_scribe && preferred_scribe.id === scribe.id
              ? "border-2 border-primary bg-accent"
              : "border-2 border-slate-200 hover:border-primary hover:bg-accent"
          } hover:shadow-lg`}
          onClick={() => handleSetScribe(scribe.id)}
        >
          <CardHeader>
            <div className="flex w-full justify-between">
              <div>
                <CardTitle>{scribe.name}</CardTitle>
                <CardDescription>{scribe.short_description}</CardDescription>
              </div>
              <scribe.icon className="ml-4" size={30} />
            </div>
          </CardHeader>
          <CardContent>
            <p>{scribe.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
