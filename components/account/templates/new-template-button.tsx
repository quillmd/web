import NextLink from "next/link"
import { Button } from "@/components/ui/button"

export default function NewTemplateButton(){
    return(
        <NextLink href={"/account/templates/new"}><Button className={"w-full"}variant={"ghost"}>{`+ New Template`}</Button></NextLink>
    )
}