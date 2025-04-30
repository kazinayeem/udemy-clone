import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import AuthReducer from "../reducer/authSlice";
import { courseApi } from "../api/courseApi";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
