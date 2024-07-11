import CookieServices from "../../utils/Cookies";
import { baseURL, QUESTIONS_URLS } from "../../utils/axiosinst";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { RightAnswers } from "../../Types/types";

export interface IFormError {
  data: {
    message: string;
    timestamp: string;
  };
  status: number;
}

export interface IEditQuestion {
  answer: typeof RightAnswers;
}

export interface IQuestions {
  title: string;
  description: string;
  answer: typeof RightAnswers;
  difficulty: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  };
  type: string;
  _id: string;
}

export interface ICreateQuestions {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: typeof RightAnswers;
  difficulty: string;
  type: string;
}

export interface IQuestionResponse {
  data: {
    answer: string;
    createdAt: string;
    description: string;
    difficulty: string;
    instructor: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    points: number;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  message: string;
}

export const QuestionsApiSlice = createApi({
  reducerPath: "questions",
  tagTypes: ["Questions"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    allQuestions: builder.query({
      query: () => ({
        url: QUESTIONS_URLS.createQuestion,
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`,
        },
      }),
      providesTags: (result) =>
        result ? [
          "Questions",
          ...result.map(({ _id }: any) => ({ type: "Questions", _id })),
        ] : ["Questions"],
    }),
    createQuestion: builder.mutation({
      query: (data) => {
        return {
          url: QUESTIONS_URLS.createQuestion,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${CookieServices.get("accessToken")}`,
          },
        };
      },
      invalidatesTags: ["Questions"],
      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      },
    }),
    deleteQuestion: builder.mutation({
      query: (id) => {
        return {
          url: QUESTIONS_URLS.questionOperations(id),
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieServices.get("accessToken")}`,
          },
        };
      },
      invalidatesTags: ["Questions"],
      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      },
    }),
    editQuestion: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data;
        return {
          url: QUESTIONS_URLS.questionOperations(editItemId),
          method: "PUT",
          body: bodyData,
          headers: {
            Authorization: `Bearer ${CookieServices.get("accessToken")}`,
          },
        };
      },
      invalidatesTags: ["Questions"],
      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      },
    }),
    questionDetails: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.questionOperations(id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`,
        },
      }),
    }),
    getQuestions: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.examQuestions(id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useAllQuestionsQuery,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useQuestionDetailsQuery,
} = QuestionsApiSlice;
