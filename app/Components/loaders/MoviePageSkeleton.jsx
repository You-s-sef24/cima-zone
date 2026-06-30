import { Skeleton } from "@/components/ui/skeleton";

export default function MoviePageSkeleton() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="relative w-full h-[70vh] min-h-[500px] bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute bottom-10 left-6 md:left-12 flex gap-8 items-end max-w-4xl">
          <Skeleton className="hidden md:block shrink-0 w-[200px] h-[300px] rounded-xl" />
          <div className="flex flex-col gap-4 w-full max-w-xl">
            <Skeleton className="h-10 w-64 rounded-lg" />
            <Skeleton className="h-4 w-40" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-14">
        <section>
          <Skeleton className="h-6 w-16 mb-6" />
          <div className="flex gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 shrink-0 w-20"
              >
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <Skeleton className="h-6 w-36 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="rounded-xl aspect-video" />
            ))}
          </div>
        </section>

        <section>
          <Skeleton className="h-6 w-20 mb-6" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Skeleton className="h-6 w-36 mb-6" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="w-full aspect-[2/3] rounded-xl" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
