'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-1 snap-y snap-mandatory h-screen overflow-y-auto">
      <div className="pt-8 md:pt-36 px-4 md:px-0 max-w-full min-h-screen flex-1 snap-start">
        <main className="flex flex-col md:flex-row items-center justify-center mb-24 md:mb-48">
          <div className="text-center md:text-left max-w-3xl mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-1">Introducing Quill:</h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8">Effortless Documentation for the Modern Physician</h1>
            <p className="text-lg md:text-3xl mb-4 md:mb-8">Quill is an AI scribe that listens to doctor-patient interactions and writes accurate, complete notes. Replace the computer and keyboard with better conversations and more time.</p>
            <p className="text-lg md:text-3xl mb-6 md:mb-8">Built by doctors, for doctors.</p>
            <div className="flex justify-center md:justify-start">
              <Button className="py-3 px-6 text-lg md:text-2xl" size={"lg"} asChild>
                <NextLink href={"/signup"}>Try Quill</NextLink>
              </Button>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:ml-8 hidden sm:block">
            <Image src="/doctor.svg" alt="Mascot" width={300} height={300} className="max-w-full h-auto" />
          </div>
        </main>
      </div>
      <section className="py-16 md:py-36 px-4 md:px-6 md:text-center min-h-screen flex-1 snap-start sm:flex sm:flex-col sm:items-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-center">How Quill Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 max-w-6xl mx-auto h-full">
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-2">1. Consent</h3>
            <p className="text-base md:text-2xl">
              Quill is introduced and everyone in the room agrees to let it scribe. Like a human scribe, Quill listens and doesn&apos;t save audio.
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-2">2. Listen</h3>
            <p className="text-base md:text-2xl">
              The Quill mobile app listens to the conversation and writes the documentation based on the selected template.
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-2">3. Verify</h3>
            <p className="text-base md:text-2xl">
              The scribed note is available on the Quill website. The physician edits and reviews the note prior to signing.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-36 px-4 md:px-6 md:text-center flex-1 snap-start">
        <div className="max-w-6xl mx-auto flex flex-col">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center">Why Quill?</h2>
          <div className="w-full overflow-x-auto mb-16">
            <table className="divide-y divide-gray-200 mx-auto">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">Robust Privacy and Security</td>
                  <td className="px-4 md:px-6 py-4">
                    <ul className="list-disc pl-5 text-base md:text-lg">
                      <li>No audio is saved. No PHI included in notes.</li>
                      <li>Military-grade encryption and data handling</li>
                      <li>HIPAA compliant</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">Intuitive and User-Friendly</td>
                  <td className="px-4 md:px-6 py-4 text-base md:text-lg">
                    <ul className="list-disc pl-5">
                      <li>Entire system designed by doctors to be intuitive</li>
                      <li>Seamless integration into existing workflows</li>
                      <li>No new hardware</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">AI Superpowers</td>
                  <td className="px-4 md:px-6 py-4">
                    <ul className="list-disc pl-5 text-base md:text-lg">
                      <li>Consistent and familiar documentation</li>
                      <li>Proven in noisy, fast-paced environments</li>
                      <li>Accurate over very long documents</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 text-lg md:text-xl font-medium text-gray-900">More time for...</td>
                  <td className="px-4 md:px-6 py-4">
                    <ul className="list-disc pl-5 text-base md:text-lg">
                      <li>Better conversations</li>
                      <li>Trust and connection</li>
                      <li>Patient and physician wellness</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Additional content for the "Why Quill?" section */}
          </div>
        </div>
      </section>
    </div>
  );
}