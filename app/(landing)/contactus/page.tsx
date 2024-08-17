import ContactUsForm from "@/components/landing/contact-us-form";

export default function Contact() {
  return (
    <main className="px-8 flex flex-col gap-8">
      <section className="w-full h-svh flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 pb-48">
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold">Drop us a line</h2>
          <p className="text-base md:text-2xl">
            {`Have a new feature idea or want to know something about the project? Know someone who could benefit from Squire? Tell us.`}
          </p>
        </div>
        <div>
          <ContactUsForm />
        </div>
      </section>
    </main>
  );
}
