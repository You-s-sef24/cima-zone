import { Skeleton } from "@/components/ui/skeleton";

export default function PersonPageSkeleton() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-14">
        <div className="flex flex-col md:flex-row gap-10">
          <Skeleton className="w-[200px] md:w-[280px] h-[300px] md:h-[420px] rounded-xl" />
          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-9 rounded-lg" />
              <Skeleton className="h-8 w-9 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Skeleton className="h-6 w-28" />
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0 w-[130px]">
                <Skeleton className="aspect-[2/3] rounded-xl w-full" />
                <Skeleton className="h-3 w-3/4 mt-2" />
                <Skeleton className="h-3 w-1/2 mt-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-32" />
          <div className="border border-white/10 rounded-xl overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3 ${i !== 0 ? "border-t border-white/5" : ""}`}
              >
                <div className="flex items-center gap-6">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-3 w-24 hidden sm:block" />
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-5 w-10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Skeleton className="h-6 w-20" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="shrink-0 w-[180px] h-[270px] rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
