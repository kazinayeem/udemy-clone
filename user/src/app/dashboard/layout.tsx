import React from "react";
import { Navbar } from "./_components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
