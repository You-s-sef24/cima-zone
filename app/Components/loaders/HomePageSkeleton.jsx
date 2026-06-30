import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-end mb-12 rounded-xl overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="relative z-10 px-6 pb-12 max-w-xl w-full flex flex-col gap-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-12 w-44 rounded-full" />
      </div>
    </section>
  );
}

export function PopularTVShowsSkeleton() {
  return (
    <section className="mb-12">
      <Skeleton className="h-6 w-44 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-[2/3] rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TrendingSkeleton() {
  return (
    <section className="mb-12">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-[2/3] rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NowPlayingSkeleton() {
  return (
    <section className="mb-12">
      <Skeleton className="h-6 w-36 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-[2/3] rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TopRatedSkeleton() {
  return (
    <section className="mb-12">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 relative">
            <Skeleton className="w-full aspect-[2/3] rounded-xl" />
            <Skeleton className="absolute top-2 left-2 h-5 w-8 rounded" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpcomingSkeleton() {
  return (
    <section className="pb-12">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-[2/3] rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
