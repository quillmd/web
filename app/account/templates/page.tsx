import NewTemplateButton from "@/components/account/templates/new-template-button";
import TemplateList from "@/components/account/templates/template-list";
import { Separator } from "@/components/ui/separator";
import { getTemplates } from "@/lib/template";

export default async function TemplatePage() {
  const templates = await getTemplates();
  const filteredTemplates = templates.filter(
    (template) => template.user_id != null
  );
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Templates</h3>
        <span className="text-sm text-muted-foreground">
          Create custom note templates.
        </span>
      </div>
      <Separator />
      <NewTemplateButton />
      <TemplateList templates={filteredTemplates} />
    </div>
  );
}
