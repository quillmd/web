import NewTemplateButton from "@/components/account/templates/new-template-button";
import TemplateList from "@/components/account/templates/template-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTemplates } from "@/lib/template";

export default async function TemplatePage() {
  const templates = await getTemplates();
  const filteredTemplates = templates.filter(
    (template) => template.user_id != null
  );
  return (
    <Card className="h-[calc(100vh-4.5rem)]">
      <CardHeader>
        <CardTitle>Templates</CardTitle>
        <CardDescription>Create a custom note template</CardDescription>
      </CardHeader>
      <CardContent>
        <NewTemplateButton />
        <TemplateList templates={filteredTemplates} />
      </CardContent>
    </Card>
  );
}
