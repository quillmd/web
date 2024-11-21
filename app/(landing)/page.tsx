import ContactUsForm from "@/components/landing/contact-us-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import NextLink from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-0 sm:py-16 space-y-32">
        {/* Hero Section */}
        <section className="">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between sm:gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left max-w-3xl">
              <h1>
                <span className="text-4xl md:text-6xl font-bold leading-tight">
                  {"Introducing "}
                </span>
                <span className="text-4xl md:text-6xl font-bold leading-tight text-primary">
                  Squire
                </span>
              </h1>
              <span className="text-2xl md:text-6xl font-bold leading-tight">
                An Advanced Dictation Tool for the Modern Clinician
              </span>
              <p className="text-lg md:text-2xl text-muted-foreground">
                Squire listens to your clinical narrative and writes precice,
                complete notes. Spend less time in front of your computer and
                more time with your patients.
              </p>
              <p className="text-lg md:text-2xl font-semibold">
                Built by doctors, for doctors.
              </p>
            </div>
            <div className="flex-1 relative w-[200px] aspect-square max-w-md mx-auto">
              <Image
                src="/doctor.svg"
                alt="Doctor using Squire"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="w-full flex justify-center mt-6">
            <Button
              size="lg"
              asChild
              className="flex sm:hidden text-lg font-semibold px-8 py-6"
            >
              <NextLink href="https://apps.apple.com/us/app/squire-for-clinicians/id6642666864">
                Try Squire Now
              </NextLink>
            </Button>
            <Button
              size="lg"
              asChild
              className="hidden sm:flex text-lg font-semibold px-8 py-6"
            >
              <NextLink href="/login">Try Squire Now</NextLink>
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            How Squire Works
          </h2>
          <div className="mx-auto max-w-">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src="https://www.youtube.com/embed/sEvfa_ayQFQ?si=d45ukpwv1p8mfSMd"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </AspectRatio>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "1. Present",
                description:
                  "Squire turns your spoken clinical information into structured notes without storing any audio. Can be used by the clinician alone or during live encounters or telehealth visits.",
              },
              {
                title: "2. Review",
                description:
                  "Access your structured note instantly on Squire's web or mobile platform. Simply review, edit if needed, and copy into your EMR.",
              },
            ].map((step, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Squire Section */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            Why Squire?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Robust Privacy and Security",
                features: [
                  "No audio is saved. No PHI included in notes.",
                  "Gold-standard encryption and data handling",
                  "HIPAA compliant",
                ],
              },
              {
                title: "Intuitive and User-Friendly",
                features: [
                  "Entire system designed by doctors to be intuitive",
                  "Seamless integration into existing workflows",
                  "No new hardware",
                ],
              },
              {
                title: "AI Superpowers",
                features: [
                  "Consistent and familiar documentation",
                  "Proven in noisy, fast-paced environments",
                  "Accurate over very long documents",
                ],
              },
              {
                title: "More time for...",
                features: [
                  "Better conversations",
                  "Trust and connection",
                  "Patient and physician wellness",
                ],
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {feature.title}
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="text-base md:text-lg text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 bg-primary/5 rounded-3xl p-8 md:p-12">
          <div className="space-y-4 max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold">Drop us a line</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have a new feature idea or want to know something about the
              project? Know someone who could benefit from Squire? Tell us.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <ContactUsForm />
          </div>
        </section>
      </div>
    </main>
  );
}
