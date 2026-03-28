// components/sidebar/CourseContentSidebar.tsx
"use client";

import React from "react";
import { Play, Lock } from "lucide-react";
import type { Lecture } from "@/types/courses";
import { LockKeyhole } from "lucide-react";

type CourseContentSidebarProps = {
  completedLessons: number;
  totalLessons: number;
  progress: number;
  lessons: Lecture[];
  activeLessonId: string;
  onLessonClick: (lessonId: string) => void;
};

const CourseContentSidebar: React.FC<CourseContentSidebarProps> = ({
  completedLessons,
  totalLessons,
  progress,
  lessons,
  activeLessonId,
  onLessonClick,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">Course Content</h3>

      {/* Orange bar */}
      <div className="h-1 w-16 bg-primary-500 rounded-full" />

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {completedLessons} of {totalLessons} Lessons completed
        </span>
        <span className="font-semibold">{progress}%</span>
      </div>

      {/* ✅ Lesson List — ALL CLICKABLE (no lock) */}
      <div className="space-y-1 max-h-96 overflow-y-auto scrollbar-hide">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            onClick={() => onLessonClick(lesson.id)}
            className={`
              flex items-center gap-3 p-3 rounded-lg 
              transition-colors cursor-pointer
              hover:bg-gray-50
              ${activeLessonId === lesson.id ? "bg-primary-50" : ""}
            `}
          >
            {/* Status Icon */}
            <div className="flex-shrink-0">
              {activeLessonId === lesson.id ? (
                // ▶ ACTIVE LESSON → PLAY ICON
                <div
                  className="w-7 h-7 rounded-full bg-primary-500 
                 flex items-center justify-center"
                >
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
              ) : lesson.isCompleted ? (
                // ✅ COMPLETED → BORDER + NUMBER
                <div
                  className="w-7 h-7 rounded-full border border-primary-500 
                 flex items-center justify-center text-sm font-semibold text-primary-500"
                >
                  {index + 1}
                </div>
              ) : (
                // 🔒 LOCKED → DEFAULT
                <div
                  className="w-7 h-7 rounded-full bg-gray-100 
                 flex items-center justify-center"
                >
                  <LockKeyhole className="w-3 h-3 text-gray-500" />
                </div>
              )}
            </div>

            {/* Title */}
            <span
              className={`text-sm flex-1 ${
                activeLessonId === lesson.id
                  ? "font-semibold text-primary-600"
                  : "text-gray-700"
              }`}
            >
              {lesson.title}
            </span>

            {/* Duration */}
            <span className="text-xs text-gray-500 flex-shrink-0">
              {lesson.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentSidebar;
