import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/axiosinst";
import CookieServices from "../../utils/Cookies";
import { toast } from "react-toastify";

const requestHeader = { Authorization: `Bearer ${CookieServices.get("accessToken")}` };

export const groupSlice = createApi({
  reducerPath: "group",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["Groups"],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({
        url: "group",
        headers: requestHeader,
      }),

      providesTags: ["Groups"],
    }),

    addGroup: builder.mutation({
      query: (data) => ({
        url: "group",
        method: "POST",
        body: data,
        headers: requestHeader,
      }),

      transformResponse: (response: { message: string }) => {
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
        toast.error(error?.data?.message, {
          autoClose: 1500,
        });
        return error;
      },
      invalidatesTags: ["Groups"],
    }),
    updateGroup: builder.mutation({
      query: (newData) => {
        const { groupId, data } = newData;

        return { url: `group/${groupId}`, method: "PUT", body: data,headers: requestHeader };
      },
      transformResponse: (response: { message: string }) => {
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
        toast.error(error?.data?.message, {
          autoClose: 1500,
        });
        return error;
      },
      invalidatesTags: ["Groups"],
    }),
    deleteGroup: builder.mutation({
      query: (groupIdToDelete) => {
        return { url: `group/${groupIdToDelete}`, method: "Delete",headers: requestHeader };
      },
      transformResponse: (response: { message: string }) => {
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
        toast.error(error?.data?.message, {
          autoClose: 1500,
        });
        return error;
      },
      invalidatesTags: ["Groups"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupSlice;
