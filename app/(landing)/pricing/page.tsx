import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0 pt-24 pb-24 pl-6 pr-6">
        <div className="text-center max-w-xl">
          <h1 className="text-6xl font-bold mb-8">Pricing</h1>
          <p className="text-xl mb-12">
            At Squire, we believe in price transparency. Our mission is to
            deliver the best product at the most affordable rate. If you find
            lower prices from any of our competitors, please bring them to our
            attention, and we will gladly match or beat their rate.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-4">Free</h2>
            <p className="text-lg mb-4">
              Check out our product, no strings attached
            </p>
            <p className="text-4xl font-bold mb-4">$0 / month</p>
            <ul className="text-lg mb-8">
              <li>10 free visits</li>
              <li>No credit card</li>
            </ul>
            <Button variant="outline" size="lg" className="w-full">
              Try for Free
            </Button>
          </div>
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-4">Premium</h2>
            <p className="text-lg mb-4">
              For those who are happy with our product
            </p>
            <p className="text-4xl font-bold mb-4">$50 / month</p>
            <ul className="text-lg mb-8">
              <li>Unlimited visits</li>
              <li>Cancel anytime</li>
            </ul>
            <Button variant="outline" size="lg" className="w-full">
              Purchase Now
            </Button>
          </div>
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-4">Group</h2>
            <p className="text-lg mb-4">
              For larger groups that never want to chart again
            </p>
            <p className="text-4xl font-bold mb-4">$0.25 / note generated</p>
            <ul className="text-lg mb-8">
              <li>License management</li>
              <li>Annual or monthly subscription</li>
            </ul>
            <Button variant="outline" size="lg" className="w-full">
              Contact Us
            </Button>
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
