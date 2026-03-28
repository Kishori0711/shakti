import { Skeleton } from "@/components/ui/skeleton";

const RecommendedSkeleton = () => {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 space-y-4">
      {/* Image */}
      <div className="relative">
        <Skeleton className="h-52 w-full rounded-lg" />

        {/* Date badge */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-32 rounded-md" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>

      {/* Mentor */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      {/* Divider */}
      <Skeleton className="h-[1px] w-full" />

      {/* Price + Button */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export default RecommendedSkeleton;