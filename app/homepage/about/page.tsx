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
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            {"We make safe AI systems for healthcare professionals"}
          </h1>
          <p className="text-lg md:text-2xl">
            {
              "As doctors, we are driven by an ambition to return medicine to its roots — where the focus is solely on the patient and their well-being. By automating the process of creating accurate and comprehensive medical documentation, with safety and privacy as a top priority, we empower doctors with more time for patient connection."
            }
          </p>
        </div>

        {/* Who We Are Section */}
        <div className="mt-16 text-left max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Who We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <Image
                src="/boris.jpg"
                alt="Boris Chobrutskiy"
                width={200}
                height={200}
                className="rounded-full"
              />
              <h3 className="text-xl font-bold mt-4">Boris Chobrutskiy, MD</h3>
              <p className="text-gray-600">Lead Software Engineer</p>
            </div>
            <div>
              <Image
                src="/garrett.jpg"
                alt="Garrett Tynes"
                width={200}
                height={200}
                className="rounded-full"
              />
              <h3 className="text-xl font-bold mt-4">Garrett Tynes, JD</h3>
              <p className="text-gray-600">Regulatory Compliance Specialist</p>
            </div>
            <div>
              <Image
                src="/saif.jpg"
                alt="Saif Zaman"
                width={200}
                height={200}
                className="rounded-full"
              />
              <h3 className="text-xl font-bold mt-4">Saif Zaman, MD</h3>
              <p className="text-gray-600">Front End Developer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}