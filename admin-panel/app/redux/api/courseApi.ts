// src/redux/api/courseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/course",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: "/add-course",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourses: builder.query({
      query: () => "/",
      providesTags: ["Course"],
    }),
    getCourseById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Course"],
    }),
    addLesson: builder.mutation({
      query: ({ courseId, ...newLesson }) => ({
        url: `/${courseId}/lessons`,
        method: "POST",
        body: newLesson,
      }),
      invalidatesTags: ["Course"],
    }),
    getLessonByCourseId: builder.query({
      query: ({ courseId, lessonId }) => `/${courseId}/lessons/${lessonId}`,
      providesTags: ["Course"],
    }),
    updateLessons: builder.mutation({
      query: ({ courseId, lessonId, ...patch }) => ({
        url: `/${courseId}/lessons/${lessonId}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useAddLessonMutation,
  useGetLessonByCourseIdQuery,
  useUpdateLessonsMutation,
} = courseApi;
