import Image from "next/image";

export default function About() {
  const teamMembers = [
    {
      name: "Andrea Chobrutskiy, MD",
      image: "/andrea.jpg",
    },
    { name: "Saif Zaman, MD", image: "/saif.jpg" },
    {
      name: "Boris Chobrutskiy, MD",
      image: "/boris.jpg",
    },
    { name: "Brandt Hill, MS", image: "/brandt.jpg" },
    { name: "Jeffrey Tynes, JD", image: "/garrett.jpg" },
  ];

  return (
    <main className="flex flex-col items-center justify-start px-8 py-16 min-h-screen">
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          We make safe AI systems for healthcare professionals
        </h1>
        <p className="text-lg md:text-xl">
          As doctors, we are driven by an ambition to return medicine to its
          roots — where the focus is solely on the patient and their well-being.
          By automating the process of creating accurate and comprehensive
          medical documentation, with safety and privacy as a top priority, we
          empower doctors with more time for patient connection.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-8">Our Founders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 max-w-5xl">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-nowrap">{member.name}</h3>
            {/* <p className="text-gray-600">{member.title}</p> */}
          </div>
        ))}
      </div>
    </main>
  );
}
