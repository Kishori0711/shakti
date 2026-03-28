// components/CourseCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "./ui/button";
import Badge from "./Badge";
import type { CourseCardData ,CardVariant,ExploreCourse,EnrolledCourse} from "@/types/courses";

// ✅ Type Guards — API data ko safely check karo
function isExploreCourse(course: CourseCardData): course is ExploreCourse {
  return "price" in course && "rating" in course;
}

function isEnrolledCourse(course: CourseCardData): course is EnrolledCourse {
  return "progress" in course && "completedLessons" in course;
}

type Props = {
  course: CourseCardData;
  variant: CardVariant;
  onClick?: () => void;
  onEnroll?: () => void;
  enrollLoading?: boolean;
  showButton?: boolean;
};

const CourseCard: React.FC<Props> = ({
  course,
  variant,
  onClick,
  onEnroll,
  enrollLoading = false,
  showButton = true,
}) => {
  const languages = Array.isArray(course.language)
    ? course.language
    : course.language
      ? [course.language]
      : [];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="bg-white border border-border rounded-2xl 
                 hover:shadow-md transition p-4 cursor-pointer 
                 flex flex-col"
    >
      {/* ========== IMAGE SECTION (COMMON) ========== */}
      <div className="relative h-52 w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />

        {/* Modules Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            label={`${course.modules} Modules`}
            variant="glass"
            icon={<BookOpen className="h-4 w-4" />}
          />
        </div>

        {/* New Badge — Only Explore */}
        {variant === "explore" &&
          isExploreCourse(course) &&
          course.isNew && (
            <div
              className="absolute top-3 right-3 bg-gradient-to-b 
                         from-primary-300 to-primary-700 text-white 
                         text-xs px-5 py-2 rounded-full shadow-md 
                         font-medium"
            >
              New
            </div>
          )}

        {/* Teacher */}
        <div className="absolute bottom-2 left-3 flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full overflow-hidden 
                       border-2 border-white/80 shadow-md"
          >
            <Image
              src={course.teacherAvatar}
              alt={course.teacherName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-white drop-shadow-md">
            {course.teacherName}
          </span>
        </div>
      </div>

      {/* ========== CONTENT SECTION ========== */}
      <div className="space-y-3 flex flex-col flex-1">
        {/* Tags + Rating Row */}
        <div className="flex items-center justify-between gap-3 min-h-7">
          <div className="flex gap-2 flex-wrap items-center">
            {course.tags && (
              <Badge
                label={course.tags}
                variant="category"
                color="primary"
              />
            )}
            {languages.length > 0 && (
              <Badge
                label={languages.join(", ")}
                variant="language"
                color="secondary"
              />
            )}
          </div>

          {/* ⭐ Rating — Only Explore */}
          {variant === "explore" && isExploreCourse(course) && (
            <div className="flex items-center gap-1 text-orange-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-semibold text-foreground">
                {course.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium text-foreground text-base line-clamp-2">
          {course.title}
        </h3>

        <hr className="border-border" />

        {/* ========== VARIANT-SPECIFIC BOTTOM ========== */}
        <div className="mt-auto">
          {variant === "explore" && isExploreCourse(course) ? (
            <ExploreBottom
              course={course}
              onEnroll={onEnroll}
              enrollLoading={enrollLoading}
              showButton={showButton}
            />
          ) : variant === "enrolled" && isEnrolledCourse(course) ? (
            <EnrolledBottom course={course} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

/* ============ EXPLORE BOTTOM ============ */
const ExploreBottom: React.FC<{
  course: ExploreCourse;
  onEnroll?: () => void;
  enrollLoading: boolean;
  showButton: boolean;
}> = ({ course, onEnroll, enrollLoading, showButton }) => (
  <>
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="font-semibold">{course.learners.toLocaleString()}</span>
        <span className="text-muted-foreground">learners</span>
      </div>
      <span className="font-semibold text-primary-600 text-base">
        ₹{course.price.toLocaleString()}
      </span>
    </div>

    {showButton && onEnroll && (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onEnroll();
        }}
        disabled={enrollLoading}
        className="w-full mt-3 p-5"
      >
        {enrollLoading ? "Loading..." : "Enroll Now"}
      </Button>
    )}
  </>
);

/* ============ ENROLLED BOTTOM ============ */
const EnrolledBottom: React.FC<{ course: EnrolledCourse }> = ({ course }) => (
  <>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-semibold">{course.progress}%</span>
      <span className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {course.completedLessons}
        </span>
        /{course.totalLessons} lessons
      </span>
    </div>
    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500"
        style={{ width: `${course.progress}%` }}
      />
    </div>
  </>
);

export default CourseCard;