import { useState } from "react";
import { format } from "date-fns";
import {
  useGetAllReviewsQuery,
  useUpdateReviewApprovalMutation,
} from "~/redux/api/reviewApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";

// Type definitions
type User = {
  name: string;
  email: string;
};

type Course = {
  title: string;
};

type Review = {
  id: string;
  rating: number;
  approved: boolean;
  comment: string | null;
  userId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course: Course;
  user: User;
};

export default function ReviewManagementPage() {
  // Fetch all reviews
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useGetAllReviewsQuery({});
  const [updateReviewApproval] = useUpdateReviewApprovalMutation({});

  // Modal state
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle approve/unapprove
  const handleApprovalToggle = async (id: string, currentStatus: boolean) => {
    try {
      await updateReviewApproval({ id, approved: !currentStatus }).unwrap();
      refetch(); // Refresh the data after update
    } catch (error) {
      console.error("Failed to update review status:", error);
    }
  };

  // Open review details modal
  const openReviewDetails = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  if (isLoading)
    return <div className="text-center py-8">Loading reviews...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading reviews</div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-2 shadow-sm rounded-sm">
        <h1 className="text-2xl font-bold mb-6">Review Management</h1>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews?.map((review: Review) => (
                <TableRow key={review.id}>
                  <TableCell
                    className="font-medium hover:underline cursor-pointer"
                    onClick={() => openReviewDetails(review)}
                  >
                    {review.user.name.slice(0, 20)}..
                  </TableCell>
                  <TableCell
                    className="hover:underline cursor-pointer"
                    onClick={() => openReviewDetails(review)}
                  >
                    {review.course.title.slice(0, 20)}..
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{review.rating}/5</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.comment || "No comment"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={review.approved ? "default" : "secondary"}>
                      {review.approved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(review.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant={review.approved ? "destructive" : "default"}
                      size="sm"
                      onClick={() =>
                        handleApprovalToggle(review.id, review.approved)
                      }
                    >
                      {review.approved ? "Unapprove" : "Approve"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReviewDetails(review)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {reviews?.length === 0 && (
          <div className="text-center py-8 text-gray-500">No reviews found</div>
        )}

        {/* Review Details Modal */}
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent className="sm:max-w-[625px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Review Details</AlertDialogTitle>
            </AlertDialogHeader>

            {selectedReview && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">User</h3>
                    <p>{selectedReview.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedReview.user.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Course
                    </h3>
                    <p>{selectedReview.course.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Rating
                    </h3>
                    <Badge variant="outline">{selectedReview.rating}/5</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <Badge
                      variant={
                        selectedReview.approved ? "default" : "secondary"
                      }
                    >
                      {selectedReview.approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Comment</h3>
                  <p className="mt-1 p-3 bg-gray-50 rounded-md">
                    {selectedReview.comment || "No comment provided"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Created At
                    </h3>
                    <p>
                      {format(
                        new Date(selectedReview.createdAt),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Last Updated
                    </h3>
                    <p>
                      {format(
                        new Date(selectedReview.updatedAt),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
