import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../utils/axiosinst';
import { toast } from 'react-toastify';
import CookieServices from '../../utils/Cookies';


export const authSlice = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
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
        toast.success(response.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || 'An error occurred', { autoClose: 1500 });
        return error;
      },
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: user,
      }),
      transformResponse: (response: {
        data: {
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
        message: string;
      }) => {
        CookieServices.set('accessToken', response.data.accessToken);
        CookieServices.set('userInfo',JSON.stringify(response.data.profile));
        toast.success(response.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || 'An error occurred', { autoClose: 1500 });
        return error;
      },
    }),
    forgotPassword: builder.mutation({
      query: (user) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: user,
      }),
      transformResponse: (response: { message: string }) => {
        toast.success('Email sent successfully', { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || 'An error occurred', { autoClose: 1500 });
        return error;
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { message: string }) => {
        toast.success('Password reset successfully', { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || 'An error occurred', { autoClose: 1500 });
        return error;
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authSlice;
