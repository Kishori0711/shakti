"use client";

import type React from "react";
import { Briefcase } from "lucide-react";

type ExperienceItem = {
  title: string;
  company: string;
  duration?: string;
  icon?: string;
};

type ExperienceSectionProps = {
  title?: string;
  experiences: ExperienceItem[];
};

export function ExperienceSection({
  title = "Experience",
  experiences = [],
}: ExperienceSectionProps): React.ReactElement {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      
      {/* Section Title */}
      <h3 className="font-semibold text-gray-900">{title}</h3>

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div key={`exp-${idx}`} className="flex gap-3">
            
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              {exp.icon ? (
                <img src={exp.icon} alt="" className="w-5 h-5" />
              ) : (
                <Briefcase className="w-5 h-5 text-orange-500" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{exp.title}</p>
              <p className="text-xs text-gray-600">{exp.company}</p>
              {exp.duration && (
                <p className="text-xs text-gray-500 mt-1">{exp.duration}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {experiences.length === 0 && (
        <p className="text-sm text-gray-600 text-center py-4">
          No experience information available
        </p>
      )}
    </div>
  );
}

export default ExperienceSection;