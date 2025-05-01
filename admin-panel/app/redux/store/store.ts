import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import AuthReducer from "../reducer/authSlice";
import { courseApi } from "../api/courseApi";
import { userApi } from "../api/userApi";
import { studentAndTeacherApi } from "../api/adminApi";
import { categoryApi } from "../api/categoryApi";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [studentAndTeacherApi.reducerPath]: studentAndTeacherApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courseApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(studentAndTeacherApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
