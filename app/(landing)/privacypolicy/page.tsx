"use client";

import { useState } from "react";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">
            Privacy at Quill is About Empowering You.
          </h1>
          <p className="text-xl mb-12">
            Quill is a company founded by patients, doctors, researchers, and
            technologists. We believe that patients should have the power to
            control their health information through technology. Patients should
            also be an equal partner in relationships with their care doctors.
          </p>
          <p className="text-xl mb-12">
            We leverage groundbreaking technologies to help people remember the
            important details from their health conversations, so they can
            better follow their care plan. With more context and understanding
            of medical conversations, we hope to help everyone achieve better
            health outcomes.
          </p>
        </div>
        <div className="text-left max-w-3xl">
          <h2 className="text-center text-2xl font-bold mb-4">
            Privacy Policy
          </h2>
          <p className="mb-4">
            Quill was created to help people get structured documentation from
            health conversations. Quill provides services through the Quill
            Service (&quot;Quill App&quot; or &quot;App&quot;), collectively,
            &quot;the Quill Services,&quot; &quot;Quill&quot; or &quot;the
            Services&quot;. Our goal with this Privacy Policy is to inform you
            about how Quill works by explaining the data you provide, data we
            collect, how we use it to provide the Services and when it is
            shared.
          </p>
          <p> Effective March 22, 2024</p>
        </div>
        <div className="text-left max-w-3xl">
          <h2 className="text-center text-2xl font-bold pt-16 mb-4">
            How Quill protects your privacy
          </h2>
          <p className="text-lg mb-8"></p>
          <div className="space-y-4">
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("personalData")}
            >
              <h3 className="text-xl font-semibold">
                What personal data does Quill collect about me?
              </h3>
              {expandedSection === "personalData" && (
                <p className="mt-2">
                  {/* Add content for personal data section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("usePersonalData")}
            >
              <h3 className="text-xl font-semibold">
                How does Quill use personal data?
              </h3>
              {expandedSection === "usePersonalData" && (
                <p className="mt-2">
                  {/* Add content for how Abridge uses personal data section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("sharePersonalData")}
            >
              <h3 className="text-xl font-semibold">
                When is my personal data shared?
              </h3>
              {expandedSection === "sharePersonalData" && (
                <p className="mt-2">
                  {/* Add content for when personal data is shared section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("safeData")}
            >
              <h3 className="text-xl font-semibold">
                How do you keep my data safe?
              </h3>
              {expandedSection === "safeData" && (
                <p className="mt-2">
                  {/* Add content for how data is kept safe section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("protectChildren")}
            >
              <h3 className="text-xl font-semibold">
                How do you protect children?
              </h3>
              {expandedSection === "protectChildren" && (
                <p className="mt-2">
                  {/* Add content for how children are protected section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("accessPersonalData")}
            >
              <h3 className="text-xl font-semibold">
                Access to, storage of, and deleting my personal data
              </h3>
              {expandedSection === "accessPersonalData" && (
                <p className="mt-2">
                  {/* Add content for accessing, storing, and deleting personal data section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("privacyRights")}
            >
              <h3 className="text-xl font-semibold">Your privacy rights</h3>
              {expandedSection === "privacyRights" && (
                <p className="mt-2">
                  {/* Add content for California? privacy rights section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("changesPolicy")}
            >
              <h3 className="text-xl font-semibold">Changes to this policy</h3>
              {expandedSection === "changesPolicy" && (
                <p className="mt-2">
                  {/* Add content for changes to the policy section */}
                </p>
              )}
            </div>
            <div
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleSection("contactUs")}
            >
              <h3 className="text-xl font-semibold">Contact us</h3>
              {expandedSection === "contactUs" && (
                <p className="mt-2">
                  You can reach us by email at support@quill.md
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
