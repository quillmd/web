import TestimonialsComponent from "./TestimonialsComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";

export default function Testimonials() {
  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0 h-screen">
        <TestimonialsComponent />
      </main>
    </div>
  );
}