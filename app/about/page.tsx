import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default function About() {
  // Throw an error for testing error handling
  // throw new Error('Test Error - Landing Page');
  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0 h-screen">
        <div className="text-center max-w-3xl">
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
    </div>
  );
}
