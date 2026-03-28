// components/sidebar/CourseDetailsCard.tsx
"use client";

import React from "react";
import {
  Calendar,
  Clock,
  BookOpen,
  FileText,
  Award,
  CalendarDays,
} from "lucide-react";

type DetailItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

type CourseDetailsCardProps = {
  topicType?: string;
  totalDuration?: string;
  totalLessons?: number;
  downloadableResources?: number;
  certificate?: string;
  courseStartDate?: string;
};

const CourseDetailsCard: React.FC<CourseDetailsCardProps> = ({
  topicType = "Video Course",
  totalDuration = "3 months",
  totalLessons = 9,
  downloadableResources = 27,
  certificate = "Yes, on completion",
  courseStartDate = "Jan 20, 2025",
}) => {
  const details: DetailItem[] = [
    {
      icon: <Calendar className="w-4 h-4 text-gray-500" />,
      label: "Course Type",
      value: topicType,
    },
    {
      icon: <Clock className="w-4 h-4 text-gray-500" />,
      label: "Total Duration",
      value: totalDuration,
    },
    {
      icon: <BookOpen className="w-4 h-4 text-gray-500" />,
      label: "Total Lessons",
      value: String(totalLessons),
    },
    {
      icon: <FileText className="w-4 h-4 text-gray-500" />,
      label: "Downloadable Resources",
      value: `${downloadableResources} items`,
    },
    {
      icon: <Award className="w-4 h-4 text-gray-500" />,
      label: "Certificate",
      value: certificate,
    },
    {
      icon: <CalendarDays className="w-4 h-4 text-gray-500" />,
      label: "Course Start Date",
      value: courseStartDate,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">Course Details</h3>

      <div className="space-y-3">
        {details.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsCard;