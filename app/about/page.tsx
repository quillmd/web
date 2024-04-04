import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default function About() {
  // Throw an error for testing error handling
  // throw new Error('Test Error - Landing Page');
  return (
    <div className="font-garamond">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-2 bg-background">
        <nav className="flex justify-between items-center w-full">
          <NextLink href={"/"}>
            <Image
              src="/logo_text.svg"
              alt="Logo"
              width={100}
              height={36}
              className="logo cursor-pointer"
            />
          </NextLink>
          <ul className="flex">
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/about"}>How Quill Works</NextLink>
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/testimonials"}>Testimonials</NextLink>
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/pricing"}>Pricing</NextLink>
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/about"}>About us</NextLink>
              </Button>
            </li>
            <li>
              <Button
                variant={"outline"}
                className="text-lg"
                size={"lg"}
                asChild
              >
                <NextLink href={"/login"}>Login</NextLink>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-start pt-64 px-6 md:px-0 h-screen">
        <div className="text-center max-w-3xl mr-20">
          <h1 className="text-6xl font-bold mb-8">
            {"We make safe AI systems for healthcare professionals"}
          </h1>
          <p className="text-3xl">
            {
              "As doctors, we are driven by an ambition to return medicine to its roots — where the focus is solely on the patient and their well-being. By automating the process of creating accurate and comprehensive medical documentation, with safety and privacy as a top priority, we empower doctors with more time for patient connection."
            }
          </p>
        </div>
      </main>
      <footer className="py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Image src="/hippa.svg" alt="HIPAA" width={150} height={150} />
          </div>
          <div className="flex-1 flex justify-center pr-12">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-lg hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:underline">
                  Press Inquiries
                </a>
              </li>
              <li>
                <a href="/contactus" className="text-lg hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/trustsafety" className="text-lg hover:underline">
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
