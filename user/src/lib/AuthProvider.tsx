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
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = await getCookie("token");

        if (!token && isMounted) {
          await deleteCookie("token");
          dispatch(logout());
          router.replace("/"); // Ensure this happens last after state update
          return;
        }

        const storedUser = localStorage.getItem("user");
        if (token && storedUser && isMounted) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
      } catch (error) {
        console.error("Error during auth check:", error);
        if (isMounted) dispatch(logout());
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, router]);

  return <>{children}</>;
}
