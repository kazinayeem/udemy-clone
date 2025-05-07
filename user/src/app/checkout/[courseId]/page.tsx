"use client";

import { getCookie } from "@/app/auth/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Course = {
  image: string;
  title: string;
  price: number;
};

export default function CheckoutPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/client/course/${courseId}`
        );

        if (!res.ok) {
          setError(
            res.status === 404
              ? "This course is not available."
              : "An unexpected error occurred. Please try again later."
          );
          return;
        }

        const courseData = await res.json();
        setCourse(courseData.data);
      } catch {
        setError("An error occurred while fetching the course details.");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handlePayment = async () => {
    try {
      const token = await getCookie("token");
      const res = await axios.post(
        "http://localhost:8080/api/enrollment/",
        { courseId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      window.location.replace(res.data.GatewayPageURL);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Alert variant="destructive">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-cyan-100/70 to-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col lg:flex-row gap-6">
        {!course ? (
          <>
            <div className="flex-1">
              <Skeleton className="h-40 w-full rounded-md mb-4" />
              <Skeleton className="h-8 w-2/3 mb-3" />
              <Skeleton className="h-6 w-1/4 mb-4" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-12 w-full" />
            </div>
          </>
        ) : (
          <>
            {/* Course Card */}
            <div className="flex-1 space-y-4">
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={200}
                className="rounded-md w-full h-40 object-cover"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {course.title}
              </h2>
              <p className="text-lg font-semibold text-green-600">
                ${course.price.toFixed(2)}
              </p>
            </div>

            {/* Action Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Button
                  onClick={handlePayment}
                  className="w-full py-6 text-base font-semibold"
                >
                  Enroll & Proceed to Payment
                </Button>

                <div className="mt-6 text-center text-sm text-gray-600">
                  <p className="mb-2">We accept:</p>
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                      alt="Visa"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                      alt="Mastercard"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/217/217445.png"
                      alt="PayPal"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="https://cdn.jsdelivr.net/gh/bkash-developer/checkout-web-bkash/static/bkash-logo.png"
                      alt="bKash"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Nagad-Logo-English.svg/2560px-Nagad-Logo-English.svg.png"
                      alt="Nagad"
                      width={50}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
