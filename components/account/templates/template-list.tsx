import { ScrollArea } from "@/components/ui/scroll-area";
import { Template } from "@/lib/template";
import TemplateListItem from "./template-list-item";

interface TemplateListProps {
  templates: Template[];
}

export default function TemplateList({ templates }: TemplateListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2">
        {templates.map((template, i) => (
          <TemplateListItem
            key={`template-list-item-${i}`}
            template={template}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
