import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import NextLink from "next/link";

export default function NotesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="p-5 md:p-10">
			<div className="mb-2">
				<NextLink href={"/home"}>
					<Button variant={"outline"} size="icon">
						<ChevronLeft />
					</Button>
				</NextLink>
			</div>
			<div>{children}</div>
		</div>
	);
}
