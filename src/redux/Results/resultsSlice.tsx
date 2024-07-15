import CookieServices from "../../utils/Cookies";
import { baseURL, RESULTS_URLS } from "../../utils/axiosinst";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ResultsSlice = createApi({
  reducerPath: "results",
  tagTypes: ["Results"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    quizzesResults: builder.query({
      query: () => ({
        url: RESULTS_URLS.resultsList,
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }

      }),
      providesTags: (result) => ['Results', ...result.map(({ _id }: any) => ({ type: 'Results', _id }))],
    }),
  }),
})

export const { useQuizzesResultsQuery } = ResultsSlice