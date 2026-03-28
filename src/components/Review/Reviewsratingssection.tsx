"use client";

import type React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import RateCourseModal from "./AddReviewModel";
import { useState } from "react";

type RatingBreakdownItem = {
  label: string;
  value: number; // 0 to 100
};

type ReviewItem = {
  name: string;
  date: string;
  text: string;
  rating: number; // 1 to 5
  avatarUrl?: string;
};

type ReviewsRatingsSectionProps = {
  title?: string;
  subtitle?: string;
  averageRating: number;
  totalReviews: number;
  breakdown: RatingBreakdownItem[];
  reviews: ReviewItem[];
  onAddReview?: () => void;
};

// Helper function to render stars
const renderStars = (rating: number): string => {
  const full = Math.round(rating);
  return "★ ".repeat(Math.min(Math.max(full, 0), 5)).trim();
};

export function ReviewsRatingsSection({
  title = "Reviews & Ratings",
  subtitle = "Trusted by women building confident career paths",
  averageRating,
  totalReviews,
  breakdown,
  reviews,
  onAddReview,
}: ReviewsRatingsSectionProps): React.ReactElement {

  const [showRating, setShowRating] = useState(false);
  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

       
          <button
            type="button"
            onClick={() => setShowRating(true)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Add a Review
          </button>

      </div>

      {/* Rating Stats and Breakdown */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        
        {/* Rating Summary Box */}
        <div className="rounded-xl bg-gray-50 p-6 text-center space-y-3">
          <div className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>

          <div className="flex justify-center gap-1 text-yellow-400 text-2xl">
            {renderStars(averageRating)}
          </div>

          <p className="text-sm text-gray-600">
            {totalReviews.toLocaleString()} Reviews
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="space-y-4 rounded-xl bg-gray-50 p-4 md:col-span-2">
          {breakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <p className="w-20 text-sm font-medium text-gray-900">
                {item.label}
              </p>

              <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-600 transition-all duration-300"
                  style={{
                    width: `${Math.max(0, Math.min(item.value, 100))}%`,
                  }}
                />
              </div>

              <p className="w-10 text-right text-sm text-gray-600">
                {item.value}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-8 space-y-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div
              key={`review-${idx}-${review.name}`}
              className="border-t border-gray-200 pt-6"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                
                {/* Avatar */}
                <div className="flex gap-4">
                  {review.avatarUrl ? (
                    <div className="h-12 w-12 shrink-0 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={review.avatarUrl}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />
                  )}

                  {/* Review Content */}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-600">{review.date}</p>

                    <div className="mt-1 text-yellow-400 text-sm">
                      {renderStars(review.rating)}
                    </div>

                    <p className="mt-2 wrap-break-word text-sm text-gray-700 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-600 py-8">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
      <RateCourseModal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onSubmit={(rating, review) => {
          console.log("Rating:", rating, "Review:", review);
          // API call here
        }}
        maxChars={100}
      />
    </section>
  );
}

export default ReviewsRatingsSection;