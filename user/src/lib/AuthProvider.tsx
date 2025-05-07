"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "@/app/auth/action";
import { logout, setUser } from "./features/authSlice";
import { useRouter } from "next/navigation";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getCookie("token");
        if (!token) {
          dispatch(logout());
          router.replace("/");
          return;
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.error("Error during auth check:", error);
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
}
