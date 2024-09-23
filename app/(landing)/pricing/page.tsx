import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import NextLink from "next/link";

export default function Pricing() {
  return (
    <div className="font-heading">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0 pt-24 pb-24 pl-6 pr-6">
        <div className="text-center max-w-xl">
          <h1 className="text-5xl font-bold mb-8">
            Simple, transparent pricing
          </h1>
          <p className="text-xl mb-12">
            {
              "Check out Squire for free, then unlock unlimited when you're ready."
            }
          </p>
        </div>
        {/* Pricing section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
            <div className="border rounded-lg shadow-sm divide-y">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium">Try for free</h3>
                <p className="mt-4 text-sm">
                  See how Squire can help your workflow
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-base font-medium">/mo</span>
                </p>
                <NextLink href={"/login"}>
                  <Button variant="outline" className="mt-8 w-full">
                    Try Squire
                  </Button>
                </NextLink>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium tracking-wide uppercase">
                  {"What's included"}
                </h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <CheckIcon
                      className="flex-shrink-0 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">10 notes</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon
                      className="flex-shrink-0 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">All features</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border rounded-lg shadow-sm divide-y">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium">Squire Unlimited</h3>
                <p className="mt-4 text-sm">
                  For those who find Squire helpful
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold">$20</span>
                  <span className="text-base font-medium">/mo</span>
                </p>
                <NextLink href={"/login"}>
                  <Button className="mt-8 w-full">
                    Login to unlock
                  </Button>
                </NextLink>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-mediumtracking-wide uppercase">
                  {"What's included"}
                </h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <CheckIcon
                      className="flex-shrink-0 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">Unlimited notes</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon
                      className="flex-shrink-0 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">
                      Priority access during high traffic
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-12 text-lg text-center">
          We are dedicated to making Squire accessible to all aspiring
          clinicians. If you are a student or trainee, please{" "}
          <a href="/contactus" className="text-blue-500 hover:underline">
            contact us
          </a>{" "}
          for a discount.
        </p>
      </main>
    </div>
  );
}
