import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 space-y-3">
      {/* Image */}
      <Skeleton className="h-52 w-full rounded-lg" />

      {/* Title */}
      <Skeleton className="h-4 w-3/4" />

      {/* Mentor */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Price */}
      <Skeleton className="h-4 w-20" />

      {/* Button */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
};

export default EventCardSkeleton;


