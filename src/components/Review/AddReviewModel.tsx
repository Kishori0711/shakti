"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


type RateCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  maxChars?: number;
};

/* ─── Star Icon ─── */
function StarIcon({
  filled,
  hovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  filled: boolean;
  hovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="p-0.5 transition-transform hover:scale-110"
    >
      <svg
        className="h-9 w-9"
        viewBox="0 0 24 24"
        fill={filled || hovered ? "#F59E0B" : "none"}
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>
  );
}

/* ─── Modal ─── */
const RateCourseModal: React.FC<RateCourseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  maxChars = 100,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState("");

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setRating(0);
        setHoveredStar(0);
        setReview("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, review);
    onClose();
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setReview(e.target.value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-full max-w-md rounded-2xl border-none bg-white p-6 shadow-xl sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader className="">
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Rate Your Course
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            Share your experience to help other learners make better decisions.
          </DialogDescription>
        </DialogHeader>

        {/* Star Rating */}
        <div className=" flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              filled={star <= rating}
              hovered={star <= hoveredStar}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
            />
          ))}
        </div>

        {/* Review Textarea */}
        <div className="">
          <div className="relative">
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 bg-white
                         px-4 py-3 text-sm text-gray-800 outline-none
                         placeholder:text-gray-400
                         focus:border-orange-300 focus:ring-2 focus:ring-orange-100
                         transition-colors"
            />
            {/* Character count */}
            <span className="absolute bottom-3 left-4 text-xs text-gray-400">
              {review.length}/{maxChars}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className=" flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold
                       text-white transition-colors hover:bg-orange-600
                       disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Review
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3
                       text-sm font-semibold text-gray-700 transition-colors
                       hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RateCourseModal;