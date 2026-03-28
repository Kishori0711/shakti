"use client";

import type React from "react";
import { Clock, Video, Users } from "lucide-react";

type MentoreSessionInfoProps = {
  title: string;
  duration: number; // in minutes
  type: "video" | "call"; // Video Call or Voice Call
  price: number;
  currency?: string;
  reviewCount?: number;
  onBook?: () => void;
};

export function MentoreSessionInfo({
  title,
  duration,
  type,
  price,
  currency = "₹",
  reviewCount = 0,
  onBook,
}: MentoreSessionInfoProps): React.ReactElement {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      
      {/* Session Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Session Details */}
      <div className="space-y-2">
        {/* Duration */}
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{duration} Minutes</span>
        </div>

        {/* Type */}
        <div className="flex items-center gap-3 text-sm text-gray-700">
          {type === "video" ? (
            <Video className="w-5 h-5 text-gray-500" />
          ) : (
            <Users className="w-5 h-5 text-gray-500" />
          )}
          <span>{type === "video" ? "Video Call" : "Voice Call"}</span>
        </div>
      </div>

      {/* Price */}
      <div className="pt-2  border-gray-200">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">
            {currency}
            {price.toLocaleString("en-IN")}
          </span>
          {reviewCount > 0 && (
            <span className="text-sm text-gray-500">/ Session</span>
          )}
        </div>
        {reviewCount > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            ({reviewCount} reviews)
          </p>
        )}
      </div>

      {/* Book Button */}
      <button
        onClick={onBook}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        Book Session
      </button>
    </div>
  );
}

export default MentoreSessionInfo;