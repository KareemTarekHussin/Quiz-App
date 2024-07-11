import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { groupSlice } from "./Groups/groupSlice";
import { studentSlice } from "./students/studentsSlice";
import { QuestionsApiSlice } from "./Questions/questionSlice";
import { QuizzesApiSlice } from "./Quizzes/quizzesSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [groupSlice.reducerPath]: groupSlice.reducer,
    [studentSlice.reducerPath]: studentSlice.reducer,
    [QuestionsApiSlice.reducerPath]: QuestionsApiSlice.reducer,
    [QuizzesApiSlice.reducerPath]:QuizzesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authSlice.middleware, groupSlice.middleware, studentSlice.middleware,QuestionsApiSlice.middleware,QuizzesApiSlice.middleware),
});
