import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPageSkeleton() {
  return (
    <div className="flex flex-col gap-14">
      <section>
        <Skeleton className="h-6 w-16 mb-6" />
        <div className="flex gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 shrink-0 w-20"
            >
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-6 w-20 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full aspect-[2/3] rounded-xl" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
