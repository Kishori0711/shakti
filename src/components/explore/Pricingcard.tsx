"use client";

import type React from "react";
import {
  BookOpen,
  Play,
  Download,
  MessageCircle,
  Award,
  Clock,
  Lock,
} from "lucide-react";

import { LockKeyhole } from "lucide-react";

type IncludeItem = {
  icon?: React.ReactNode;
  label: string;
};

type PricingCardProps = {
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  daysLeft?: number;
  onEnroll?: () => void;
  enrollLoading?: boolean;
  includes: IncludeItem[];
};

const defaultIncludes: IncludeItem[] = [
  {
    icon: <BookOpen className="w-5 h-5 text-gray-600" />,
    label: "8 structured learning modules",
  },
  {
    icon: <Play className="w-5 h-5 text-gray-600" />,
    label: "Step-by-step video lessons",
  },
  {
    icon: <Download className="w-5 h-5 text-gray-600" />,
    label: "Downloadable reference materials",
  },
  {
    icon: <MessageCircle className="w-5 h-5 text-gray-600" />,
    label: "Community access for discussions",
  },
  {
    icon: <Award className="w-5 h-5 text-gray-600" />,
    label: "Certificate of completion",
  },
  {
    icon: <Clock className="w-5 h-5 text-gray-600" />,
    label: "Lifetime course access",
  },
];

export function PricingCard({
  currentPrice,
  originalPrice,
  discount,
  daysLeft,
  onEnroll,
  enrollLoading = false,
  includes = defaultIncludes,
}: PricingCardProps): React.ReactElement {
  const savings = originalPrice ? originalPrice - currentPrice : 0;
  const discountPercent =
    discount ||
    (originalPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="space-y-2">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900">
            ₹{currentPrice.toLocaleString("en-IN")}
          </div>

          {daysLeft && (
            <div className="flex items-center gap-1 text-xs font-medium text-secondary-600 bg-secondary-100 px-3 py-2 rounded-full">
              <Clock width={18} height={18}/> {daysLeft} days left
            </div>
          )}
        </div>

        {/* Bottom Row */}
        {originalPrice && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>

            <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
              {discountPercent}% off
            </span>
          </div>
        )}
      </div>

      {/* Enroll Button */}
      <button
        onClick={onEnroll}
        disabled={enrollLoading}
        className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <LockKeyhole className="w-5 h-5" />
        {enrollLoading ? "Processing..." : "Enroll Now"}
      </button>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Includes Section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">This course includes</h3>

        <div className="space-y-3">
          {includes.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Icon */}
              {item.icon ? (
                item.icon
              ) : (
                <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-600">✓</span>
                </div>
              )}

              {/* Label */}
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
