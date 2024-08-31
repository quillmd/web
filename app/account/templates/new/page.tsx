import TemplateDisplay from "@/components/account/templates/template-display";
import { Card, CardContent } from "@/components/ui/card";

export default async function NewTemplatePage() {
  return (
    <Card className="min-h-[calc(100vh-4.5rem)]">
      <CardContent className="pt-4">
        <TemplateDisplay template={undefined} />
      </CardContent>
    </Card>
  );
}
