// src/redux/api/courseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_API}/course`,
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
    getChapters: builder.query({
      query: (courseId) => `/${courseId}/chapters`,
      providesTags: ["Course"],
    }),
    createChapter: builder.mutation({
      query: ({ courseId, ...body }) => ({
        url: `/${courseId}/chapters`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    updateChapter: builder.mutation({
      query: ({ courseId, chapterId, ...patch }) => ({
        url: `/${courseId}/chapters/${chapterId}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Course"],
    }),

    getFqaById: builder.query({
      query: (id) => `/${id}/fqa`,
      providesTags: ["Course"],
    }),
    createFqa: builder.mutation({
      query: ({ courseId, question, answer }) => ({
        url: `/${courseId}/fqa`,
        method: "POST",
        body: { question, answer },
      }),
      invalidatesTags: ["Course"],
    }),
    updateFaq: builder.mutation({
      query: ({ faqId, data }) => ({
        url: `/faq/${faqId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteFaq: builder.mutation({
      query: (faqId) => ({
        url: `/faq/${faqId}`,
        method: "DELETE",
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
  useGetChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useGetFqaByIdQuery,
  useCreateFqaMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = courseApi;
