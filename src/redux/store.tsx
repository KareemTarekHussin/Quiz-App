import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { groupSlice } from "./Groups/groupSlice";
import { studentSlice } from "./students/studentsSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
        [groupSlice.reducerPath] : groupSlice.reducer,
    [studentSlice.reducerPath]: studentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([[authSlice.middleware,groupSlice.middleware], studentSlice.middleware]),
});
