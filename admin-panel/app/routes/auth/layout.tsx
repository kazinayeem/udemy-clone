import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout({}: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}
