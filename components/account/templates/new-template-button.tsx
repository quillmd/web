import { Button } from "@/components/ui/button";
import NextLink from "next/link";

export default function NewTemplateButton() {
  return (
    <NextLink href={"/account/templates/new"}>
      <Button className={"w-full"} variant={"ghost"}>{`+ New Template`}</Button>
    </NextLink>
  );
}
