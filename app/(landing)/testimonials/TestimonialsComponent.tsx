"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export default function TestimonialsComponent() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      name: "Deb David",
      rating: 5,
      date: "Aug 16, 2023",
      text: "This ability to put into notes what is being said by both provider and patient is beyond helpful !! Gets me out of office quicker at end of the day",
    },
    {
      name: "Sanjay Bharti",
      rating: 5,
      date: "Jul 27, 2023",
      text: "The best thing ever happened to physicians. Try this and this writes a document better than I can.",
    },
    {
      name: "Sami",
      rating: 5,
      date: "Oct 6, 2023",
      text: "I have been using Squire for about a month now, totally changed my everyday experience. I am no longer bothered by charting, having more time to spend with patients, seeing more patients, and going home on time. I highly recommend this app. It gives me peace of mind. It literally resolved my carpet tunnel cause apparently that's how much I was typing in the past.",
    },
    // Add more testimonials...
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="text-center max-w-3xl">
      <h1 className="text-6xl font-bold mb-8">Testimonials</h1>
      <div className="relative">
        <div className="testimonial-container">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 mr-4"></div>
                <div>
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <div className="rating">
                    {Array(testimonial.rating)
                      .fill(null)
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-lg">{testimonial.text}</p>
              <p className="text-sm text-gray-500 mt-2">{testimonial.date}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={prevTestimonial}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={nextTestimonial}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
