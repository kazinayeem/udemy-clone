import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import AuthReducer from "../reducer/authSlice";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
