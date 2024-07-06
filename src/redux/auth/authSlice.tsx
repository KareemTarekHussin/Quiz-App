import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/axiosinst";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: {
        data: {
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          status: string;
          _id: string;
          updatedAt: string;
          createdAt: string;
          __v: number;
        };
        message: string;
      }) => {
        toast.success(response.message,{
            autoClose: 1500,
          });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message,{
            autoClose: 1500,
          });
        return error;
      },
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: {
        data: {
          accessToken: string;
          refreshToken: string;
          profile: {
            accessToken: string;
            refreshToken: string;
            profile: {
              _id: string;
              first_name: string;
              last_name: string;
              email: string;
              status: string;
              role: string;
            };
          };
        };
        message: string;
      }) => {
        cookies.set("accessToken", response.data.accessToken)
        toast.success(response.message, {
            autoClose: 1500,
          });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {

        toast.error(error.data.message, {
          autoClose: 1500,
        });
        return error;
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation} = authSlice;
