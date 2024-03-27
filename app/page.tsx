import { ModeToggle } from "@/components/ui/toggle-mode";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Image src="/logo1_notari-cropped.svg" alt="Logo" width={150} height={150} className="logo" className="logo invert-on-dark" />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><button className="text-lg hover:underline">Pricing</button></li>
            <li><button className="text-lg hover:underline">Research</button></li>
            <li><button className="text-lg hover:underline">About Us</button></li>
            <li><button className="text-lg hover:underline">News</button></li>
            <li><button className="text-lg hover:underline">Careers</button></li>
            <li><ModeToggle></ModeToggle></li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center py-20">
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mr-20">
            <h1 className="text-5xl font-bold mb-8">Your friendly scribe. Fast, capable, affordable and truly reliable.</h1>
            <div className="rounded-lg p-8 mb-12">
              <p className="text-2xl mb-4">Built by Docs for Docs</p>
              <p className="text-lg mb-6">Time is freedom</p>
              <Button variant="outline" className="font-bold py-3 px-6 rounded-full text-lg">
                Free Yourself with Notari
              </Button>
            </div>
          </div>
          <div>
            <Image src="/mascot1.png" alt="Mascot" width={400} height={400} />
          </div>
        </div>
      </main>
      <section className="py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Work</h2>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-2">Product</h3>
            <p className="text-lg mb-4">Introducing the next generation of AI scribes</p>
            <p className="text-gray-500">Mar 9, 2024 • 7 min read</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Research</h3>
            <p className="text-lg mb-4">Statistically significant differences in note writing speed, read about us on pubmed</p>
            <p className="text-gray-500">Dec 15, 2022 • 12 min read</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Company</h3>
            <p className="text-lg mb-4">Core Views on AI and HIPAA compliance: When, Why, What, and How</p>
            <p className="text-gray-500">Mar 8, 2023 • 30 min read</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Work with Notari</h2>
          <p className="text-xl mb-8">
            Notari is an AI safety and research company based in San Francisco. Our interdisciplinary team has
            experience across ML, physics, policy, and product. Together, we generate research and create reliable,
            beneficial AI systems.
          </p>
          <a href="#" className="hover:underline text-lg">I don't know what this button is for</a>
        </div>
      </section>
      <footer className="py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Image src="/hippa.svg" alt="HIPAA" width={150} height={150} />
          </div>
          <div>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-lg hover:underline">Customization Studio</a></li>
              <li><a href="#" className="text-lg hover:underline">Blog</a></li>
              <li><a href="#" className="text-lg hover:underline">Press Inquiries</a></li>
              <li><a href="#" className="text-lg hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-lg hover:underline">Trust & Safety</a></li>
            </ul>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-2xl hover:underline">X</a></li>
              <li><a href="#" className="text-2xl hover:underline">LinkedIn</a></li>
              <li><a href="#" className="text-2xl hover:underline">Facebook</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}