// components/sidebar/CourseProgressCard.tsx
"use client";

import React from "react";

type CourseProgressCardProps = {
  completedLessons: number;
  totalLessons: number;
  progress: number;
  onResume?: () => void;
};

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
  completedLessons,
  totalLessons,
  progress,
  onResume,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">
        Course Progress
      </h3>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {completedLessons} of {totalLessons} Lessons completed
          </span>
          <span className="font-semibold text-gray-900">{progress}%</span>
        </div>
      </div>

      {/* Resume Button */}
      {onResume && (
        <button
          onClick={onResume}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white 
                     font-medium py-2.5 px-4 rounded-xl transition-colors"
        >
          Resume Lesson
        </button>
      )}
    </div>
  );
};

export default CourseProgressCard;