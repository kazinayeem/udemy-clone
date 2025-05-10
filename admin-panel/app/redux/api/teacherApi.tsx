// ~/redux/api/teacherApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/teacher",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSalesReportForTeacher: builder.query<any, void>({
      query: () => "/sales-report-for-teacher",
    }),
    getStudentsForTeacher: builder.query({
      query: () => ({
        url: "/students",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSalesReportForTeacherQuery,
  useGetStudentsForTeacherQuery,
} = teacherApi;
