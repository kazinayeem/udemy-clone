"use client";
// components/ReviewSection.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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
        // Find the user's review if exists
        if (res.data.length > 0) {
          setUserReview(res.data[0]); // Assuming first review is the user's
        } else {
          setUserReview(null);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews([]);
        setUserReview(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

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
      
      // Update state with the new review
      setUserReview(response.data);
      setReviews([response.data]);
      setReviewSuccess("Your review has been submitted successfully!");
      setReviewError(null);
      setReviewText("");
      setRating(1);
    } catch (err) {
      setReviewError("Failed to submit your review. Please try again.");
      setReviewSuccess(null);
    }
  };

  if (isLoading) {
    return <div>Loading review status...</div>;
  }

  return (
    <Card className="mt-6 p-4 bg-gray-50 mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Review</h2>
      
      {userReview ? (
        <div>
          {userReview.approved ? (
            <>
              <p className="text-green-600 mb-2">Your review has been approved.</p>
              <div className="mb-2">
                <span className="font-medium">Rating:</span> {userReview.rating}/5
              </div>
              {userReview.comment && (
                <div>
                  <span className="font-medium">Review:</span> {userReview.comment}
                </div>
              )}
            </>
          ) : (
            <p className="text-yellow-600">
              Your review is pending approval. {userReview.comment && (
                <>
                  <div className="mt-2">
                    <span className="font-medium">Your submitted review:</span> {userReview.comment}
                  </div>
                  <div className="mt-1">
                    <span className="font-medium">Rating:</span> {userReview.rating}/5
                  </div>
                </>
              )}
            </p>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-4">You haven't submitted a review yet.</p>
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="w-32 h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Write Review
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Write a Review</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <form onSubmit={handleReviewSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rating (1-5)
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="block text-sm font-medium text-gray-700">
                        Review (Optional)
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>

                    {reviewSuccess && (
                      <div className="text-green-500">{reviewSuccess}</div>
                    )}
                    {reviewError && (
                      <div className="text-red-500">{reviewError}</div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <AlertDialogCancel asChild>
                        <button 
                          type="button"
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                          onClick={() => {
                            setReviewText("");
                            setRating(1);
                            setReviewError(null);
                            setReviewSuccess(null);
                          }}
                        >
                          Cancel
                        </button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <button 
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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