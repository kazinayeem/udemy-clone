import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-gradient-to-b from-cyan-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Right Column - Course Card */}
          <div className="order-1 md:order-2 bg-white rounded-lg shadow-lg p-6">
            <Skeleton className="w-full aspect-video rounded-md mb-6" />
            <Skeleton className="h-4 w-48 mb-2" />
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="w-full h-10 mb-6" />

            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>

          {/* Left Column - Course Details */}
          <div className="order-2 md:order-1 md:col-span-2">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="space-y-4 mb-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>

            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="space-y-2 pl-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 space-y-4">
          <Skeleton className="h-8 w-48 mb-6" />
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
