import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0">
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl font-bold mb-8">
            {"Quill is Always Here to Help"}
          </h1>
          <p className="text-xl mb-8">
            {
              "If you have any questions, need application support, or just want to chat, you can always email us directly at help@quill.md."
            }
          </p>
          <p className="text-xl mb-8">
            {
              "For all other sales questions and press inquiries, please fill the form below."
            }
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="organization" className="block mb-1">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="numPhysicians" className="block mb-1">
                  Number of Physicians in Organization
                </label>
                <select
                  id="numPhysicians"
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select one...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>

              <div>
                <label htmlFor="workEmail" className="block mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  id="workEmail"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="phone" className="block mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="role" className="block mb-1">
                  Role
                </label>
                <select id="role" className="w-full px-4 py-2 border rounded">
                  <option value="">Select one...</option>
                  <option value="physician">Physician</option>
                  <option value="administrator">Administrator</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="primaryRole" className="block mb-1">
                Primary Role Focus
              </label>
              <select
                id="primaryRole"
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select one...</option>
                <option value="clinical">Clinical</option>
                <option value="it">IT</option>
                <option value="business">Business</option>
                <option value="research">Research</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="emr" className="block mb-1">
                EMR
              </label>
              <select id="emr" className="w-full px-4 py-2 border rounded">
                <option value="">Select one...</option>
                <option value="epic">Epic</option>
                <option value="cerner">Cerner</option>
                <option value="meditech">Meditech</option>
                <option value="allscripts">Allscripts</option>
                <option value="athena">Athena</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-8">
              <label htmlFor="additionalInfo" className="block mb-1">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                rows={4}
                className="w-full px-4 py-2 border rounded"
                placeholder="Include any additional information"
              ></textarea>
            </div>

            <div>
              <Button type="submit" size="lg">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
