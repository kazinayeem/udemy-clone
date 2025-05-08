// src/features/api/reviewApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    // Create Review
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    // Update review approval (true/false)
    updateReviewApproval: builder.mutation({
      query: ({ id, approved }) => ({
        url: `/review/${id}/approve`,
        method: "PUT",
        body: { approved },
      }),
      invalidatesTags: ["Review"],
    }),

    // Get all reviews
    getAllReviews: builder.query({
      query: () => "/review",
      providesTags: ["Review"],
    }),

    // Get review by ID
    getReviewById: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: (result, error, id) => [{ type: "Review", id }],
    }),

    // Get reviews by Course ID
    getReviewsByCourseId: builder.query({
      query: (courseId) => `/review/course/${courseId}`,
      providesTags: ["Review"],
    }),

    // Get reviews by User ID
    getReviewsByUserId: builder.query({
      query: (userId) => `/review/user/${userId}`,
      providesTags: ["Review"],
    }),

    // Get current user's reviews ("/user-review")
    getAllReviewsForUser: builder.query({
      query: () => `/review/user-review`,
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useUpdateReviewApprovalMutation,
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useGetReviewsByCourseIdQuery,
  useGetReviewsByUserIdQuery,
  useGetAllReviewsForUserQuery,
} = reviewApi;
