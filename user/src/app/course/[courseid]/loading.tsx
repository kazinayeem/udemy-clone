import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-screen-xl px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="space-y-3 rounded-xl border p-4 shadow-sm">
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}
