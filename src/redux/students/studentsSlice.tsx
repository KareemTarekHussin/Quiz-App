import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/axiosinst";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const studentSlice = createApi({
  reducerPath: "student",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/student",
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      }),
    }),
    getAllStudentsWithoutGroup: builder.query({
      query: () => ({
        url: "/student/without-group",
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      }),
    }),
    studentDetails: builder.query({
      query: (id: string) => ({
        url: `/student/${id}`,
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetStudentsQuery,useGetAllStudentsWithoutGroupQuery, useStudentDetailsQuery } = studentSlice;
