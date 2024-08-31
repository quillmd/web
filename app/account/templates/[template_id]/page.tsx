import TemplateDisplay from "@/components/account/templates/template-display";
import { Card, CardContent } from "@/components/ui/card";
import { getTemplate } from "@/lib/template";

export default async function TemplatePage({
  params: { template_id },
}: {
  params: { template_id: string };
}) {
  const template = await getTemplate({ template_id: template_id });
  return (
    <Card className="min-h-[calc(100vh-4.5rem)]">
      <CardContent className="pt-4">
        <TemplateDisplay template={template} />
      </CardContent>
    </Card>
  );
}
