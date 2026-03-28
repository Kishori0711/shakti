// components/sidebar/LessonResources.tsx
"use client";

import React from "react";
import { FileText, Download } from "lucide-react";
import type { LessonResource } from "@/types/courses";

type LessonResourcesProps = {
  resources: LessonResource[];
  onDownload?: (resourceId: string) => void;
};

const LessonResources: React.FC<LessonResourcesProps> = ({
  resources,
  onDownload,
}) => {
  if (!resources.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">
        Lesson Resources
      </h3>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center gap-3 p-3 rounded-lg 
                       bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {/* File Icon */}
            <div className="w-10 h-10 rounded-lg bg-orange-100 
                            flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {resource.title}
              </p>
              <p className="text-xs text-gray-500">
                {resource.type} · {resource.size}
              </p>
            </div>

            {/* Download */}
            <button
              onClick={() => onDownload?.(resource.id)}
              className="flex-shrink-0 p-2 hover:bg-gray-200 
                         rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonResources;