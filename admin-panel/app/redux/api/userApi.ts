// src/redux/api/userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "user",
    }),
    // update user user/userid
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    getCourseByUserId: builder.query({
      query: () => `/user/courses/course`,
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetCourseByUserIdQuery,
} = userApi;
