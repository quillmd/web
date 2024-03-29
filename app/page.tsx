import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Image
            src="/Quill_plain.svg"
            alt="Logo"
            width={60}
            height={75}
            className="logo"
          />
          <Image
            src="/Quill_text_plain.svg"
            alt="Logo"
            width={75}
            height={75}
            className="logo"
          />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button className="text-lg hover:underline">Pricing</button>
            </li>
            <li>
              <button className="text-lg hover:underline">Research</button>
            </li>
            <li>
              <button className="text-lg hover:underline">About Us</button>
            </li>
            <li>
              <button className="text-lg hover:underline">News</button>
            </li>
            <li>
              <button className="text-lg hover:underline">Careers</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center pt-20">
        <div className="flex items-center justify-center mx-auto">
          <div className="text-left max-w-3xl mr-20">
            <h1 className="text-6xl font-bold mb-1">Introducing Quill:</h1>
            <h1 className="text-6xl font-bold mb-8">
              Effortless Documentation for the Modern Physician
            </h1>
            <div className="rounded-lg">
              <p className="text-3xl">
                Quill is an AI scribe that listens to doctor-patient
                interactions and writes accurate, complete notes. Replace the
                computer and keyboard with better conversations and more time.
              </p>
              <p className="text-3xl mb-8">Built by doctors, for doctors.</p>
              <Button className="py-3 px-6 text-xl" size={"lg"}>
                Try Quill
              </Button>
            </div>
          </div>
          <div>
            <Image src="/doctor.svg" alt="Mascot" width={400} height={400} />
          </div>
        </div>
      </main>
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-8 text-center">How Quill Works</h2>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold mb-2">1. Consent</h3>
            <p className="text-2xl mb-4">
              Quill is introduced and everyone in the room agrees to let it
              scribe. Like a human scribe, Quill listens and doesn't record or
              save audio.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">2. Listen</h3>
            <p className="text-2xl mb-4">
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
      <section className="">
        <h2 className="text-4xl font-bold mb-6 text-center">Why Quill?</h2>
        <div className="w-full">
          <table className="divide-y divide-gray-200 mx-auto">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-3xl font-medium text-gray-900">
                  Robust Privacy and Security
                </td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-5 text-2xl">
                    <li>No audio is saved. No PHI included in notes.</li>
                    <li>Military-grade encryption and data handling</li>
                    <li>HIPAA compliant</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-3xl font-medium text-gray-900">
                  Intuitive and User-Friendly
                </td>
                <td className="px-6 py-4 text-2xl">
                  <ul className="list-disc pl-5">
                    <li>Entire system designed by doctors to be intuitive</li>
                    <li>No new hardware</li>
                    <li>Seamless integration into existing workflows</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-3xl font-medium text-gray-900">
                  AI Superpowers
                </td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-5 text-2xl">
                    <li>Consistent and familiar documentation</li>
                    <li>Proven in noisy, fast-paced environments</li>
                    <li>Accurate over very long documents</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-3xl font-medium text-gray-900">
                  More time for...
                </td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-5 text-2xl">
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
      <footer className="py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Image src="/hippa.svg" alt="HIPAA" width={150} height={150} />
          </div>
          <div className="flex-1 flex justify-center pr-12">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-lg hover:underline">
                  Blog
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
    </>
  );
}
