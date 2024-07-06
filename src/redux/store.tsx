import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { groupSlice } from "./Groups/groupSlice";

export const store = configureStore({
    reducer: {
        [authSlice.reducerPath] : authSlice.reducer,
        [groupSlice.reducerPath] : groupSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authSlice.middleware,groupSlice.middleware])
})