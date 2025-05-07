// app/components/HeroSection.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchSection() {
  const logos = [
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Walmart",
      src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    },
    {
      name: "Accenture",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Accenture_logo.svg",
    },
    {
      name: "Adobe",
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
    },
    {
      name: "PayPal",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
  ];
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const searchHandeler = () => {
    router.push(`/course?search=${searchText}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-cyan-100/70 to-white flex flex-col justify-center items-center text-center px-4 py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
          Empower your future with the courses designed to{" "}
          <span className="text-blue-600 relative inline-block">
            <span className="z-10 relative">fit your choice.</span>
            <svg
              className="absolute bottom-0 left-0 w-full h-2 z-0 text-blue-300"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0,10 Q100,0 200,10"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </span>
        </h1>
        <p className="mt-6 text-gray-600 text-base md:text-lg">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 w-full max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for courses"
              value={searchText}
              className="pl-10 pr-4 py-2 text-base"
            />
          </div>
          <Button
            onClick={searchHandeler}
            className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="mt-16 text-sm text-gray-500">
        Trusted by learners from
      </div>
      <div className="mt-4 flex flex-wrap justify-center items-center gap-8">
        {logos.map((logo) => (
          <div key={logo.name} className="h-6 relative w-28">
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
