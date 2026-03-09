"use client";

import React from "react";
import Image from "next/image";

type Course = {
  id: string;
  title: string;
  image: string;
  modules: number;
  teacherName: string;
  teacherAvatar: string;
  tags?: string;
  language?: string[];
};

type Progress = {
  percentage: number;
  completedLessons: number;
  totalLessons: number;
};

type Props = {
  course: Course;
  progress: Progress;
  onClick?: () => void;
};

const MyCourseCard: React.FC<Props> = ({ course, onClick, progress }) => {
  const safePercent = Math.max(0, Math.min(progress.percentage, 100));

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition"
    >
      {/* Image */}
      <div className="relative mb-4 h-52 w-full overflow-hidden rounded-lg">

        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />

        {/* Modules badge */}
        <span className="absolute left-3 top-3 rounded-md bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
          {course.modules} Modules
        </span>

        {/* Teacher */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2">

          <Image
            src={course.teacherAvatar}
            alt={course.teacherName}
            width={24}
            height={24}
            className="rounded-full border border-white/60 object-cover"
          />

          <span className="text-sm font-semibold text-white">
            {course.teacherName}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-2">
        {course.tags && (
          <span className="rounded-md bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
            {course.tags}
          </span>
        )}

        {course.language?.length && (
          <span className="rounded-md bg-orange-50 px-3 py-1 text-sm font-medium text-purple-700">
            {course.language.join(", ")}
          </span>
        )}
      </div>

      <h3 className="mb-3 text-base font-medium text-foreground">
        {course.title}
      </h3>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{safePercent}%</span>

          <span className="text-muted-foreground">
            {progress.completedLessons}/{progress.totalLessons} lessons
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-green-500 transition-all"
            style={{ width: `${safePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;