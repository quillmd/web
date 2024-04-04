import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default function PrivacySecurity() {
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
              <Button variant={"outline"} className="text-lg" size={"lg"} asChild>
                <NextLink href={"/login"}>Login</NextLink>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0">
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl font-bold mb-8">{"Trust, Safety, Privacy & Security at Quill"}</h1>
          <p className="text-xl mb-12">
            {
              "Clinician and patient trust is of the highest priority at Quill. We hold ourselves accountable to a HIPAA-compliant data storage and processing protocol for all data captured and shared through our platform."
            }
          </p>
        </div>
        <div className="text-left max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">{"Internal Personnel Security"}</h2>
          <div className="text-xl mb-8">
            <p>{"All Quill employees are required to:"}</p>
            <ul className="list-disc list-inside ml-6">
              <li>{"Undergo background checks before being hired"}</li>
              <li>{"Complete annual security awareness training on HIPAA, privacy, and information classification"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Compliance"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"Quill conducts regular risk assessments to ensure policies remain up-to-date and relevant"}</li>
              <li>{"Our CEO is responsible for Privacy and Security"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Secure Development Lifecycle"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"All software changes are reviewed for compliance"}</li>
              <li>{"Quill practices infrastructure-as-code. All infrastructure changes are reviewed before deployment"}</li>
              <li>{"All engineers complete secure development practices training"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Cloud Hosting and Availability"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"All hosting services and data is stored and processed within Microsoft's Azure secure data centers"}</li>
              <li>{"Quill has a HIPAA Business associate agreement with Microsoft"}</li>
              <li>{"Quill leverages Azure's high-availability infrastructure to ensure data is always accessible"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Confidentiality and Data Encryption"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"All data is encrypted at-rest and in-transit using standard encryption schemes"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Vendor Management"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"All Vendors who may process patient information are required to be HIPAA compliant and sign BAAs with Quill"}</li>
              <li>{"Quill regularly reviews vendor security practices to ensure continued high standards"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Artificial Intelligence"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"All AI models are HIPAA compliant and don't retain data"}</li>
              <li>{"Protected health information is never used for AI training purposes"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Patient Information"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"Patient information is encrypted at-rest and in-transit"}</li>
              <li>{"Patient recordings are never stored to disk and are immediately deleted upon successful note generation"}</li>
              <li>{"No patient information is retained"}</li>
            </ul>
          </div>
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
                <a href="/contactus" className="text-lg hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:underline">
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