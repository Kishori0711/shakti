"use client";

import type React from "react";
import { Calendar } from "lucide-react";

type AvailabilityProps = {
  title?: string;
  nextSlot: string;
  timeRange: string;
  onCheckAvailability?: () => void;
};

export function AvailabilitySection({
  title = "Availability",
  nextSlot,
  timeRange,
  onCheckAvailability,
}: AvailabilityProps): React.ReactElement {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      
      {/* Title */}
      <h3 className="font-semibold text-gray-900">{title}</h3>

      {/* Next Slot */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{nextSlot}</span>
        </div>

        {/* Time Range */}
        <div className="ml-6 text-sm text-gray-700">
          🕐 {timeRange}
        </div>
      </div>

      {/* Check Availability Button */}
      {onCheckAvailability && (
        <button
          onClick={onCheckAvailability}
          className="w-full mt-3 py-2 px-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Check Availability
        </button>
      )}
    </div>
  );
}

export default AvailabilitySection;