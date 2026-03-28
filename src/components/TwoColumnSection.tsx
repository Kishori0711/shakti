"use client";

import type React from "react";
import { Check } from "lucide-react";

type TwoColumnSectionProps = {
  title?: string;
  description?: React.ReactNode;
  leftColumnTitle: string;
  leftColumnItems?: string[] | string | null;
  rightColumnTitle?: string;
  rightColumnItems?: string[] | string | null;
};

export function TwoColumnSection({
  title,
  description,
  leftColumnTitle,
  leftColumnItems,
  rightColumnTitle,
  rightColumnItems,
}: TwoColumnSectionProps): React.ReactElement {
  // ✅ SAFE — null, string, undefined sab handle
  const safeLeft = Array.isArray(leftColumnItems) ? leftColumnItems : [];
  const safeRight = Array.isArray(rightColumnItems) ? rightColumnItems : [];

  const hasRightColumn = !!rightColumnTitle && safeRight.length > 0;

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6">
      {(title || description) && (
        <div className="space-y-3 mb-6">
          {title && (
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          )}
          {description && (
            <div className="text-sm text-gray-600 leading-relaxed">
              {description}
            </div>
          )}
        </div>
      )}

      <div
        className={`grid ${
          hasRightColumn ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        } gap-6 md:gap-8`}
      >
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {leftColumnTitle}
          </h3>

          <ul className="space-y-3">
            {safeLeft.map((item, idx) => (
              <li key={`left-${idx}`} className="flex items-start gap-3">
                <div className="bg-primary-100 rounded-full p-1 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        {hasRightColumn && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {rightColumnTitle}
            </h3>

            <ul className="space-y-3">
              {safeRight.map((item, idx) => (
                <li key={`right-${idx}`} className="flex items-start gap-3">
                  <div className="bg-primary-100 rounded-full p-1 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default TwoColumnSection;