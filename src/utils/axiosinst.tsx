import axios from "axios";
import CookieServices from "./Cookies";

const baseURL = "https://upskilling-egypt.com:3005/api";
const staticURL = "https://upskilling-egypt.com:3005";

//Without Token mostly for Auth
const apiPuplic = axios.create({
  baseURL,
});

//With Token mostly for Lists 3lshan el m7taga token
const apiToken = axios.create({
  baseURL,
});
apiToken.interceptors.request.use((config) => {
  config.headers.Authorization = CookieServices.get("accessToken");
  return config;
});
//Questions Endpoints
 const QUESTIONS_URLS = {
  createQuestion: "/question",
  questionOperations: (id: string) => `/question/${id}`,
  examQuestions: (id: string) => `/quiz/without-answers/${id}`
};
//QuizzesEndpoints
 const QUIZZES_URLS = {
  upcomingQuizzes: "/quiz/incomming",
  completedQuizzes: "/quiz/completed",
  createQuiz: "/quiz",
  quizzesOperations: (id: string) => `/quiz/${id}`,
  joinQuiz: "/quiz/join",
  finishQuiz: (id: string) => `/quiz/submit/${id}`,
}

//Results Endpoints
 const RESULTS_URLS = {
  resultsList: "/quiz/result",
}

export {
  apiPuplic,
  apiToken,
  baseURL,
  staticURL,
  QUIZZES_URLS,
  QUESTIONS_URLS,
  RESULTS_URLS,
};
