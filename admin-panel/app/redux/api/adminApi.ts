import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentAndTeacherApi = createApi({
  reducerPath: "studentAndTeacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_API}/teacher`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Teachers", "Students", "Sales"],
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: () => "/all-teachers",
      providesTags: ["Teachers"],
    }),
    getAllStudents: builder.query({
      query: () => "/all-students",
      providesTags: ["Students"],
    }),
    getTeacherById: builder.query({
      query: (id) => `/teacher/${id}`,
    }),
    getStudentById: builder.query({
      query: (id) => `/student/${id}`,
    }),
    getStudentByEmail: builder.query({
      query: (email) => `/student/email/${email}`,
    }),
    getTeacherByEmail: builder.query({
      query: (email) => `/teacher/email/${email}`,
    }),
    getTeacherCourses: builder.query({
      query: (teacherId) => `/teacher/${teacherId}/courses`,
    }),
    getTeacherCoursesById: builder.query({
      query: ({ teacherId, courseId }) =>
        `/teacher/${teacherId}/courses/${courseId}`,
    }),
    getStudentCourses: builder.query({
      query: (studentId) => `/student/${studentId}/courses`,
    }),
    getSalesReport: builder.query({
      query: () => "/sales-report",
      providesTags: ["Sales"],
    }),
    bannedTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `/teacher/${teacherId}/banned`,
        method: "PUT",
      }),
      invalidatesTags: ["Teachers", "Students"],
    }),
    unBannedTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `/teacher/${teacherId}/unbanned`,
        method: "PUT",
      }),
      invalidatesTags: ["Teachers", "Students"],
    }),
    totalCourses: builder.query({
      query: () => "/total-courses",
      providesTags: ["Teachers"],
    }),
    getMonthlySales: builder.query({
      query: () => "/monthly-sales",
      providesTags: ["Sales"],
    }),
    getTotalSales: builder.query({
      query: () => "/total-sales",
      providesTags: ["Sales"],
    }),
    getCourseEnrollments: builder.query({
      query: () => "/course-enrollments",
      providesTags: ["Sales"],
    }),
    approvedCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/approved/${courseId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Teachers", "Students", "Sales"],
    }),
    unapprovedCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/unapproved/${courseId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Teachers", "Students", "Sales"],
    }),
    getAllCourse: builder.query({
      query: () => "/all-course",
      providesTags: ["Students", "Students"],
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useGetAllStudentsQuery,
  useGetTeacherByIdQuery,
  useGetStudentByIdQuery,
  useGetStudentByEmailQuery,
  useGetTeacherByEmailQuery,
  useGetTeacherCoursesQuery,
  useGetTeacherCoursesByIdQuery,
  useGetStudentCoursesQuery,
  useGetSalesReportQuery,
  useBannedTeacherMutation,
  useUnBannedTeacherMutation,
  useTotalCoursesQuery,
  useGetMonthlySalesQuery,
  useGetTotalSalesQuery,
  useGetCourseEnrollmentsQuery,
  useApprovedCourseMutation,
  useUnapprovedCourseMutation,
  useGetAllCourseQuery,
} = studentAndTeacherApi;
