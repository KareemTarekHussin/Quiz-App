import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/axiosinst";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const cookies = new Cookies();
export const requestHeader = { Authorization: `Bearer ${cookies.get("accessToken")}` };
export const groupSlice = createApi({
  reducerPath: "group",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: requestHeader,
  }),
  tagTypes: ["Groups"],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "group",
      providesTags: ["Groups"],
    }),

    addGroup: builder.mutation({
      query: (data) => ({
        url: "group",
        method: "POST",
        body: data,
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
       const {groupId,data} = newData
        
        return { url: `group/${groupId}`, method: "PUT", body: data };
      },
      transformResponse:(response: { message: string }) => {
        toast.success(response.message, {
          autoClose: 1500,
        });
        return response;
      },transformErrorResponse:(error: {
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
      invalidatesTags:["Groups"]
    }),
    deleteGroup: builder.mutation({
      query: (groupIdToDelete) => {
        
        return { url: `group/${groupIdToDelete}`, method: "Delete",};
      },
      transformResponse:(response: { message: string }) => {
        toast.success(response.message, {
          autoClose: 1500,
        });
        return response;
      },transformErrorResponse:(error: {
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
      invalidatesTags:["Groups"]
    }),

   
  }),
});

export const {
  useGetGroupsQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation
} = groupSlice;
