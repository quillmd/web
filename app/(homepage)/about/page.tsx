import Image from "next/image";

export default function About() {
  // Throw an error for testing error handling
  // throw new Error('Test Error - Landing Page');

  return (
      <main className="flex flex-col items-center justify-start px-8 min-h-screen">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 overflow-hidden rounded-full">
                <Image
                  src="/boris.jpg"
                  alt="Boris Chobrutskiy"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4">Boris Chobrutskiy, MD</h3>
              {/* <p className="text-gray-600">Lead Software Engineer</p> */}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 overflow-hidden rounded-full">
                <Image
                  src="/garrett.jpeg"
                  alt="Garrett Tynes"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4">Garrett Tynes, JD</h3>
              {/* <p className="text-gray-600">Regulatory Compliance Specialist</p> */}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 overflow-hidden rounded-full">
                <Image
                  src="/saif.jpeg"
                  alt="Saif Zaman"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4">Saif Zaman, MD</h3>
              {/* <p className="text-gray-600">Front End Developer</p> */}
            </div>
          </div>
        </div>
      </main>
  );
}
