"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "@/app/auth/action";
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
      const token = await getCookie("token");

      if (!token) {
        await deleteCookie("token");
        dispatch(logout());
        router.replace("/auth");
        return;
      }

      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
}
