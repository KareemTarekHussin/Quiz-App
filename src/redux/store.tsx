import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { studentSlice } from "./students/studentsSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [studentSlice.reducerPath]: studentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authSlice.middleware, studentSlice.middleware]),
});
