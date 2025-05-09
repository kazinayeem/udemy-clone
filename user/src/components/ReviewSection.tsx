"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getCookie } from "@/app/auth/action";
import { Card } from "./ui/card";

type Review = {
  id: string;
  courseId: string;
  comment: string | null;
  rating: number;
  approved: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type ReviewSectionProps = {
  courseId: string;
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ courseId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const token = await getCookie("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await axios.get<Review[]>(
          `http://localhost:8080/api/review/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReviews(res.data);
        if (res.data.length > 0) {
          setUserReview(res.data[0]); // Assuming first review is the user's
        } else {
          setUserReview(null);
        }
      } catch {
        setReviews([]);
        setUserReview(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);
  console.log(reviews);

  // Submit review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getCookie("token");
      const response = await axios.post<Review>(
        "http://localhost:8080/api/review",
        {
          courseId,
          comment: reviewText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserReview(response.data);
      setReviews([response.data]);
      setReviewSuccess("Review submitted!");
      setReviewError(null);
      setReviewText("");
      setRating(1);
    } catch {
      setReviewError("Error submitting review.");
      setReviewSuccess(null);
    }
  };

  if (isLoading) {
    return <div className="text-sm">Loading...</div>;
  }

  return (
    <Card className="mt-6 p-4 bg-gray-50 mb-6">
      <h2 className="text-lg font-medium mb-">Your Review</h2>
      {userReview ? (
        <div>
          {userReview.approved ? (
            <p className="text-green-600 text-sm mb-1">Approved</p>
          ) : (
            <p className="text-yellow-600 text-sm mb-1">Pending Approval</p>
          )}
          <div className="text-sm">
            <span className="font-medium">Rating:</span> {userReview.rating}/5
          </div>
          {userReview.comment && (
            <div className="mt-1">
              <span className="font-medium">Review:</span> {userReview.comment}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-sm mb-3">You haven’t submitted a review yet.</p>
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="w-24 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs">
                Write Review
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Write a Review</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <form onSubmit={handleReviewSubmit}>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">
                        Rating (1-5)
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Review (Optional)
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>

                    {reviewSuccess && (
                      <div className="text-green-500 text-xs">
                        {reviewSuccess}
                      </div>
                    )}
                    {reviewError && (
                      <div className="text-red-500 text-xs">{reviewError}</div>
                    )}

                    <div className="flex justify-end space-x-2 mt-3">
                      <AlertDialogCancel>
                        <button
                          type="button"
                          className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <button
                          type="submit"
                          className="px-4 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      </AlertDialogAction>
                    </div>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </Card>
  );
};

export default ReviewSection;
