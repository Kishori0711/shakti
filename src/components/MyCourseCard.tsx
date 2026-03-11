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

const MyCourseCard: React.FC<Props> = ({ course, progress, onClick }) => {
  const safePercent = Math.max(0, Math.min(progress.percentage, 100));

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition p-4"
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />

        {/* Modules badge */}
        <span className="absolute top-3 left-3 rounded-md bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs text-white shadow-md">
          {course.modules} Modules
        </span>

        {/* Teacher */}
        <div className="absolute bottom-2 left-1 flex items-center gap-2 rounded-lg px-3 py-1.5">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/60">
            <Image
              src={course.teacherAvatar}
              alt={course.teacherName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <span className="text-sm font-semibold text-white">
            {course.teacherName}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-3">
        {course.tags && (
          <span className="text-primary-600 text-sm bg-primary-100 px-3 py-1 rounded-md font-medium">
            {course.tags}
          </span>
        )}

        {/* {course.language?.length > 0 && (
          <span className="text-primary-600 text-sm bg-secondary-100 px-3 py-1 rounded-md font-medium">
            {course.language.join(", ")}
          </span>
        )} */}
      </div>

      {/* Title */}
      <h3 className="font-medium text-foreground text-base mb-3">
        {course.title}
      </h3>

      <hr className="m-2 border-border" />

      {/* Progress Section */}
      <div className="space-y-2 mt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary-500">{safePercent}%</span>

          <span className="text-muted-foreground">
            {progress.completedLessons}/{progress.totalLessons} lessons
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-green-600 transition-all"
            style={{ width: `${safePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
