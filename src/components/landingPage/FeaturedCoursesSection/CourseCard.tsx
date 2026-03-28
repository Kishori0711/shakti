import Image from "next/image";

export type CourseLevel = "Beginner" | "Medium" | "Advance";

export type Course = {
  title: string;
  category: string;
  level: CourseLevel;
  image: string; 
  peopleAvatars: string[]; 
  extraCount?: number; 
};

const levelStyles: Record<CourseLevel, string> = {
  Beginner: "bg-emerald-500 text-white",
  Medium: "bg-indigo-500 text-white",
  Advance: "bg-orange-500 text-white",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Image */}
      <div className="relative h-65 w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          priority
        />

        {/* level badge */}
        <div
          className={[
            "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
            levelStyles[course.level],
          ].join(" ")}
        >
          {course.level}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-medium text-neutral-900">
          {course.title}
        </h3>
        <p className="mt-1 text-base text-neutral-500">{course.category}</p>

        {/* Avatars */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {course.peopleAvatars.slice(0, 3).map((src, i) => (
              <div
                key={src + i}
                className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white"
              >
                <Image src={src} alt="user" fill className="object-cover" sizes="32px" />
              </div>
            ))}
          </div>

          <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
            +{course.extraCount ?? 0}
          </div>
        </div>
      </div>
    </article>
  );
}