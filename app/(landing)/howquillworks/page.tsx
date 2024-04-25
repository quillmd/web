export default function About() {
  // Throw an error for testing error handling
  // throw new Error('Test Error - Landing Page');
  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-64 px-6 md:px-0 h-screen">
        <div className="text-center max-w-3xl mr-20">
          <h1 className="text-6xl font-bold mb-8">{"How Quill Works"}</h1>
          <p className="text-3xl">{"Built by Doctors for Doctors."}</p>
        </div>
      </main>
    </div>
  );
}
