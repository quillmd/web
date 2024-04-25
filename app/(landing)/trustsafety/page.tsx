export default function PrivacySecurity() {
  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0">
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl font-bold mb-8">
            {"Trust, Safety, Privacy & Security at Quill"}
          </h1>
          <p className="text-xl mb-12">
            {
              "Clinician and patient trust is of the highest priority at Quill. We hold ourselves accountable to a HIPAA-compliant data storage and processing protocol for all data captured and shared through our platform."
            }
          </p>
        </div>
        <div className="text-left max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            {"Internal Personnel Security"}
          </h2>
          <div className="text-xl mb-8">
            <p>{"All Quill employees are required to:"}</p>
            <ul className="list-disc list-inside ml-6">
              <li>{"Undergo background checks before being hired"}</li>
              <li>
                {
                  "Complete annual security awareness training on HIPAA, privacy, and information classification"
                }
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Compliance"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>
                {
                  "Quill conducts regular risk assessments to ensure policies remain up-to-date and relevant"
                }
              </li>
              <li>{"Our CEO is responsible for Privacy and Security"}</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {"Secure Development Lifecycle"}
          </h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>{"All software changes are reviewed for compliance"}</li>
              <li>
                {
                  "Quill practices infrastructure-as-code. All infrastructure changes are reviewed before deployment"
                }
              </li>
              <li>
                {"All engineers complete secure development practices training"}
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {"Cloud Hosting and Availability"}
          </h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>
                {
                  "All hosting services and data is stored and processed within Microsoft's Azure secure data centers"
                }
              </li>
              <li>
                {
                  "Quill has a HIPAA Business associate agreement with Microsoft"
                }
              </li>
              <li>
                {
                  "Quill leverages Azure's high-availability infrastructure to ensure data is always accessible"
                }
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {"Confidentiality and Data Encryption"}
          </h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>
                {
                  "All data is encrypted at-rest and in-transit using standard encryption schemes"
                }
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Vendor Management"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>
                {
                  "All Vendors who may process patient information are required to be HIPAA compliant and sign BAAs with Quill"
                }
              </li>
              <li>
                {
                  "Quill regularly reviews vendor security practices to ensure continued high standards"
                }
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {"Artificial Intelligence"}
          </h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>
                {"All AI models are HIPAA compliant and don't retain data"}
              </li>
              <li>
                {
                  "Protected health information is never used for AI training purposes"
                }
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4">{"Patient Information"}</h2>
          <div className="text-xl mb-8">
            <ul className="list-disc list-inside ml-6">
              <li>
                {"Patient information is encrypted at-rest and in-transit"}
              </li>
              <li>
                {
                  "Patient recordings are never stored to disk and are immediately deleted upon successful note generation"
                }
              </li>
              <li>{"No patient information is retained"}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
