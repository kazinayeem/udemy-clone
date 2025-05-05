import Image from "next/image";
import { Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
interface User {
  name: string;
}
interface Course {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: number;
  category: Category;
  reviews: unknown[];
  user: User;
}

export default async function HomePageCourse() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/client/courses?limit=4`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  const courses: Course[] = json.data || [];

  return (
    <div className="py-16 md:px-40 px-8 m-auto">
      <div className="flex items-center flex-col text-center">
        <h2 className="text-3xl font-medium text-gray-800">
          Learn from the best
        </h2>
        <p className="md:text-base text-sm text-gray-500 mt-3 max-w-2xl">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 mt-10">
        Featured Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            href={`/course/${course.id}`}
            key={course.id}
            className="border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 group"
          >
            <div className="aspect-video relative">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 text-left">
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500">{course.user.name}</p>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration} hours</span>
              </div>

              <p className="text-base font-bold text-gray-900 mt-2">
                ${course.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/course">
          <Button variant="default">View All</Button>
        </Link>
      </div>
    </div>
  );
}
