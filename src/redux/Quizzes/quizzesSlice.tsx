import CookieServices from "../../utils/Cookies";
import { baseURL, QUIZZES_URLS } from "../../utils/axiosinst";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
interface ISubmitQuizResponse {
    data: {
      finished_at: string
      participant: string
      questions: {}[]
      quiz: string
      score: number
      started_at: string
      _id: string
    }
    message: string
  }
  interface IJoinQuizResponse {
    data: {
      createdAt: string
      participant: string
      quiz: string
      score: number
      started_at: string
      updatedAt: string
      __v: number
      _id: string
    }
    message: string
  }
interface IFormError {
    data: {
      message: string,
      timestamp: string
    };
    status: number;
  }
 interface IQuizzesResponse {
  participants: [],
  quiz: {
    closed_at: string
    code: string
    createdAt: string
    description: string
    difficulty: string
    duration: number
    group: string
    instructor: string
    participants: number
    questions: []
    questions_number: number
    schadule: string
    score_per_question: number
    status: string
    title: string
    type: string
    updatedAt: string
    __v: number
    _id: string
  },
}
export const QuizzesApiSlice = createApi({
  reducerPath: "quizzes",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Quizzes"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: QUIZZES_URLS.createQuiz,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }
      }),
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    editQuiz: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data;
        return {
          url: QUIZZES_URLS.quizzesOperations(editItemId),
          method: "PUT",
          body: bodyData,
          headers: {
            Authorization: `Bearer ${CookieServices.get("accessToken")}`
          }
        };
      },
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    deleteQuiz: builder.mutation({
      query: (deleteItemId) => ({
        url: QUIZZES_URLS.quizzesOperations(deleteItemId),
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }
      }),
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    joinQuiz: builder.mutation({
      query: (data) => ({
        url: QUIZZES_URLS.joinQuiz,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }
      }),
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IJoinQuizResponse) => {
        toast.success(response.message);
        return response as IJoinQuizResponse;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    submitQuiz: builder.mutation({
      query: (data) => {
        const { _id, ...bodyData } = data;
        return {
          url: QUIZZES_URLS.finishQuiz(_id),
          method: "POST",
          body: bodyData,
          headers: {
            Authorization: `Bearer ${CookieServices.get("accessToken")}`
          }
        };
      },
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: ISubmitQuizResponse) => {
        toast.success(response.message);
        return response as ISubmitQuizResponse;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    getFirstUpcomingQuizzes: builder.query({
      query: () => ({
        url: QUIZZES_URLS.upcomingQuizzes,
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }
      }),
      providesTags: (result) => ['Quizzes', ...result?.map(({ _id }: any) => ({ type: 'Quizzes', _id }))]
    }),
    completedQuizzes: builder.query({
      query: () => ({
        url: QUIZZES_URLS.completedQuizzes,
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }
      })
    }),
    quizzesDetails: builder.query({
      query: (_id) => ({
        url: QUIZZES_URLS.quizzesOperations(_id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("accessToken")}`
        }
      })
    })
  })
});

export const {
  useSubmitQuizMutation,
  useJoinQuizMutation,
  useGetFirstUpcomingQuizzesQuery,
  useCompletedQuizzesQuery,
  useCreateQuizMutation,
  useQuizzesDetailsQuery,
  useDeleteQuizMutation,
  useEditQuizMutation
} = QuizzesApiSlice;
