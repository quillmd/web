import TemplateDisplay from "@/components/account/templates/template-display";
import { getTemplate } from "@/lib/template";

export default async function TemplatePage({
  params: { template_id },
}: {
  params: { template_id: string };
}) {
  const template = await getTemplate({ template_id: template_id});
  return <TemplateDisplay template={template} />;
}
