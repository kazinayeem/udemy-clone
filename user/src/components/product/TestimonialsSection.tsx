"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  approved: boolean; 
  user: {
    name: string;
    image: string | null;
  };
  course: {
    title: string;
  };
};

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
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/review/user-review")
      .then((res) => {
        const approved = res.data.filter((review: Review) => review.approved);
        setTestimonials(approved);
      })
      .catch((err) => console.error("Failed to fetch reviews", err))
      .finally(() => setLoading(false));
  }, []);

  const getRandomImage = () => {
    const id = Math.floor(Math.random() * 90) + 10;
    return `https://randomuser.me/api/portraits/men/${id}.jpg`;
  };

  return (
    <section className="py-20 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-2">Testimonials</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>

      {loading ? (
        <div className="text-center">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-gray-500">No testimonials available.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="bg-gray-100 p-4 flex items-center gap-3">
                <Image
                  src={
                    testimonial.user.image
                      ? testimonial.user.image
                      : getRandomImage()
                  }
                  alt={testimonial.user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.user.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.course.title}
                  </p>
                </div>
              </div>
              <div className="p-4 text-left">
                <div className="flex items-center mb-2">
                  {getStars(testimonial.rating)}
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {testimonial.comment ?? "No comment provided."}
                </p>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
