// app/about/page.tsx

import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust the import path as necessary

const About: React.FC = () => {

  return (
    <div className="font-garamond">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 bg-background">
        <NextLink href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image
              src="/logo_text.svg"
              alt="Logo"
              width={100}
              height={36}
              className="logo"
            />
          </div>
        </NextLink>
        <nav>
          <ul className="flex space-x-6">
            <li className="hidden md:block">
              <Button variant="ghost" size="lg" className="text-lg" asChild>
                <NextLink href={"/about"}>About Us</NextLink>
              </Button>
            </li>
            <li>
              <Button variant="outline" className="text-lg" size="lg" asChild>
                <NextLink href={"/login"}>Login</NextLink>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center pt-48 px-6 md:px-0 min-h-screen">
        <div className="text-center">
            <button className="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Trigger Error
            </button>
        </div>
        <div className="max-w-3xl bg-white shadow overflow-hidden sm:rounded-lg p-5">
          <h1 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
            About Us
          </h1>
          <div className="mt-6 text-gray-500 space-y-4">
            <p>
              In a world where medicine increasingly intersects with technology, we, a group of dedicated physicians, found ourselves at a crossroads. Faced with the growing demands of documentation and administrative tasks, we noticed that the essence of patient care was gradually eroding away.
            </p>
            <p>
              Driven by a collective ambition to return medicine to its roots — where the focus is solely on the patient and their well-being — we ventured into the realm of artificial intelligence to develop Quill: an AI scribe designed to liberate doctors from the chains of clerical burdens.
            </p>
            <p>
              Quill is more than just technology; it's a beacon of hope for healthcare professionals everywhere. By streamlining the documentation process, we enable doctors to spend less time typing and more time engaging with their patients. Our vision is clear: to revolutionize the way medicine is practiced by ensuring that doctors can focus on what they do best — doctoring.
            </p>
            <p>
              We are proud to introduce Quill to the world, not just as a tool, but as a movement towards a future where technology and healthcare walk hand in hand towards a more humane and connected world of medicine.
            </p>
          </div>
        </div>
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
                  Blog
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
};

export default About;

