import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default function Pricing() {
  return (
    <div className="font-garamond">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-2 bg-background">
        <nav className="flex justify-between items-center w-full">
          <NextLink href={"/"}>
            <Image
              src="/logo_text.svg"
              alt="Logo"
              width={100}
              height={36}
              className="logo cursor-pointer"
            />
          </NextLink>
          <ul className="flex">
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/about"}>How Quill Works</NextLink>
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/about"}>Testimonials</NextLink>
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/pricing"}>Pricing</NextLink>
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                <NextLink href={"/about"}>About us</NextLink>
              </Button>
            </li>
            <li>
              <Button
                variant={"outline"}
                className="text-lg"
                size={"lg"}
                asChild
              >
                <NextLink href={"/login"}>Login</NextLink>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-start pt-64 px-6 md:px-0 pt-20 pb-20 pl-6 pr-6">
        <div className="text-center max-w-xl">
          <h1 className="text-6xl font-bold mb-8">Pricing</h1>
          <p className="text-xl mb-12">
          At Quill, we believe in price transparency. Our mission is to deliver the best product at the most affordable rate. If you find lower prices from any of our competitors, please bring them to our attention, and we will gladly match or beat their rate.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-4">Free</h2>
            <p className="text-lg mb-4">Check out our product, no strings attached</p>
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
            <p className="text-lg mb-4">For those who are happy with our product</p>
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
            <p className="text-lg mb-4">For larger groups that never want to chart again</p>
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
          We're dedicated to making Quill accessible to all aspiring clinicians. If you're a student or trainee,
          please <a href="#" className="text-blue-500 hover:underline">contact us</a> for a discount.
        </p>
      </main>
      <footer className="py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Image src="/hippa.svg" alt="HIPAA" width={150} height={150} />
          </div>
          <div className="flex-1 flex justify-center pr-12">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-lg hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:underline">
                  Press Inquiries
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:underline">
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}