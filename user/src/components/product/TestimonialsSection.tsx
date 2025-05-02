// app/components/TestimonialsSection.tsx

"use client";

import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Donald Jackman",
    title: "SWE 1 @ Amazon",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "Richard Nelson",
    title: "SWE 2 @ Samsung",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "James Washington",
    title: "SWE 2 @ Google",
    rating: 3.5,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    text: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
];

function getStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="text-red-500 fill-red-500 w-5 h-5" />);
  }

  if (halfStar) {
    stars.push(
      <StarHalf key="half" className="text-red-500 fill-red-500 w-5 h-5" />
    );
  }

  while (stars.length < 5) {
    stars.push(
      <StarOutline
        key={`empty-${stars.length}`}
        className="text-gray-300 w-5 h-5"
      />
    );
  }

  return stars;
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-2">Testimonials</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="bg-gray-100 p-4 flex items-center gap-3">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
            <div className="p-4 text-left">
              <div className="flex items-center mb-2">
                {getStars(testimonial.rating)}
              </div>
              <p className="text-sm text-gray-700 mb-3">{testimonial.text}</p>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
