import BackButton from "@/components/dashboard/case/back-button";

export default function CaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-6xl flex flex-col gap-2 mx-auto">
      <BackButton />
      <div className="w-full p-8">{children}</div>
    </div>
  );
}
