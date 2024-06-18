import ContactUsForm from "@/components/landing/contact-us-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default async function Landing() {
  return (
    <main className="px-8 flex flex-col gap-8">
      <section className="w-full h-svh flex flex-col-reverse items-center md:flex-row justify-center gap-4 pb-24">
        <div className="flex flex-col gap-2 md:gap-6 max-w-2xl text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-bold">Introducing Quill:</h1>
          <h1 className="text-3xl md:text-6xl font-bold">
            Effortless Documentation for the Modern Physician
          </h1>
          <span className="text-xl md:text-3xl">
            Quill is an AI scribe that listens to doctor-patient interactions
            and writes accurate, complete notes. Replace the computer and
            keyboard with better conversations and more time.
          </span>
          <span className="text-xl md:text-3xl">
            Built by doctors, for doctors.
          </span>
          <div className="flex justify-center md:justify-start">
            <Button
              className="text-lg md:text-2xl font-semibold"
              size={"lg"}
              asChild
            >
              <NextLink href={"/signup"}>Try Quill</NextLink>
            </Button>
          </div>
        </div>
        <div className="relative w-full h-1/3 md:h-full max-w-md">
          <Image src="/doctor.svg" alt="Mascot" layout="fill" />
        </div>
      </section>
      <section className="w-full h-svh md:h-auto flex flex-col justify-center gap-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          How Quill Works
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-2">1. Consent</h3>
            <p className="text-base md:text-2xl">
              Quill is introduced and everyone in the room agrees to let it
              scribe. Like a human scribe, Quill listens and doesn&apos;t save
              audio. You free yourself from the computer, and can provide the
              patient with your undivided attention.
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-2">2. Listen</h3>
            <p className="text-base md:text-2xl">
              The Quill mobile app listens to the conversation and writes the
              documentation based on the selected template. You proceed as you
              normally would during a patient encounter, no changes need to be
              made to your style.
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-2">3. Verify</h3>
            <p className="text-base md:text-2xl">
              The scribed note is available on the Quill website. All you have
              to do is copy and paste from our website to your EMR. The
              physician then edits and reviews the note prior to signing.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-svh md:text-center flex flex-col justify-center gap-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Why Quill?
          </h2>
          <div className="w-full">
            <table className="divide-y divide-gray-200 mx-auto">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">
                    Robust Privacy and Security
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <ul className="text-left list-disc pl-5 text-base md:text-lg">
                      <li>No audio is saved. No PHI included in notes.</li>
                      <li>Gold-standard encryption and data handling</li>
                      <li>HIPAA compliant</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">
                    Intuitive and User-Friendly
                  </td>
                  <td className="px-4 md:px-6 py-4 text-base md:text-lg">
                    <ul className="text-left list-disc pl-5">
                      <li>Entire system designed by doctors to be intuitive</li>
                      <li>Seamless integration into existing workflows</li>
                      <li>No new hardware</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">
                    AI Superpowers
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <ul className="text-left list-disc pl-5 text-base md:text-lg">
                      <li>Consistent and familiar documentation</li>
                      <li>Proven in noisy, fast-paced environments</li>
                      <li>Accurate over very long documents</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">
                    More time for...
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <ul className="text-left list-disc pl-5 text-base md:text-lg">
                      <li>Better conversations</li>
                      <li>Trust and connection</li>
                      <li>Patient and physician wellness</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="w-full h-svh md:h-96 flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:mb-48">
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold">Drop us a line</h2>
          <p className="text-base md:text-2xl">
            {`Have a new feature idea or want to know something about the project? Know someone who could benefit from Quill? Tell us.`}
          </p>
        </div>
        <div>
          <ContactUsForm />
        </div>
      </section>
    </main>
  );
}
