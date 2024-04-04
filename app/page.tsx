import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default function Landing() {
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
                <NextLink href={"/about"}>Testimonials</NextLink>
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
      <main className="flex flex-col items-center justify-center pt-24 md:pt-48 px-6 md:px-0 max-w-screen">
        <div className="flex items-center justify-center mx-auto">
          <div className="text-left max-w-3xl mr-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-1">Introducing Quill:</h1>
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Effortless Documentation for the Modern Physician
            </h1>
            <p className="text-2xl md:text-3xl">
              Quill is an AI scribe that listens to doctor-patient interactions
              and writes accurate, complete notes. Replace the computer and
              keyboard with better conversations and more time.
            </p>
            <p className="text-2xl md:text-3xl mb-8">Built by doctors, for doctors.</p>
            <div className="flex w-full justify-center md:justify-start">
              <Button className="p-6 text-2xl" size={"lg"} asChild>
                <NextLink href={"/signup"}> Try Quill</NextLink>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image src="/doctor.svg" alt="Mascot" width={400} height={400} />
          </div>
        </div>
      </main>
      <section className="py-36 px-2 md:text-center">
        <h2 className="text-4xl font-bold mb-12 text-center">
          How Quill Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 max-w-6xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold mb-2">1. Consent</h3>
            <p className="text-2xl">
              {
                "Quill is introduced and everyone in the room agrees to let it scribe. Like a human scribe, Quill listens and doesn't save audio."
              }
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">2. Listen</h3>
            <p className="text-2xl">
              The Quill mobile app listens to the conversation and writes the
              documentation based on the selected template.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">3. Verify</h3>
            <p className="text-2xl">
              The scribed note is available on the Quill website. The physician
              edits and reviews the note prior to signing.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-screen">
        <h2 className="text-4xl font-bold mb-6 text-center">Why Quill?</h2>
        <div className="w-full">
          <table className="divide-y divide-gray-200 mx-auto">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-xl md:text-3xl font-medium text-gray-900">
                  Robust Privacy and Security
                </td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-5 text-lg md:text-2xl">
                    <li>No audio is saved. No PHI included in notes.</li>
                    <li>Military-grade encryption and data handling</li>
                    <li>HIPAA compliant</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl md:text-3xl font-medium text-gray-900">
                  Intuitive and User-Friendly
                </td>
                <td className="px-6 py-4 text-lg md:text-2xl">
                  <ul className="list-disc pl-5">
                    <li>Entire system designed by doctors to be intuitive</li>
                    <li>Seamless integration into existing workflows</li>
                    <li>No new hardware</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl md:text-3xl font-medium text-gray-900">
                  AI Superpowers
                </td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-5 text-lg md:text-2xl">
                    <li>Consistent and familiar documentation</li>
                    <li>Proven in noisy, fast-paced environments</li>
                    <li>Accurate over very long documents</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl md:text-3xl font-medium text-gray-900">
                  More time for...
                </td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-5 text-lg md:text-2xl">
                    <li>Better conversations</li>
                    <li>Trust and connection</li>
                    <li>Patient and physician wellness</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <footer className="py-12 max-w-screen">
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
                <a href="#" className="text-lg hover:underline">
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
