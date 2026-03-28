"use client";

import type React from "react";
import { Heart, Play, Share2 } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

type BaseProps = {
  recommendBadge?: ReactNode;
  title: string;
  categoryLabel: string;
  ratingText: string; // "5.0 (4,500 Reviews)"
  level: string;
  students: string;
  language: string;
  onWishlist?: () => void;
  onShare?: () => void;
};

type VideoVariantProps = BaseProps & {
  variant: "video";
  videoUrl: string;
  coverImage?: string; // Optional poster/thumbnail for video
  onPlayPreview?: () => void;
};

type ImageVariantProps = BaseProps & {
  variant: "image";
  coverImage: string;
  onPlayPreview?: never; // Image variant doesn't have play functionality
  videoUrl?: never;
};

type Props = VideoVariantProps | ImageVariantProps;

const CourseHeroCard: React.FC<Props> = ({
  recommendBadge,
  title,
  categoryLabel,
  ratingText,
  level,
  students,
  language,
  coverImage,
  onWishlist,
  onShare,
  onPlayPreview,
  variant,
  ...rest
}) => {
  const videoUrl = "videoUrl" in rest ? rest.videoUrl : undefined;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      {/* Recommend Badge */}
      {recommendBadge && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-600">
          {recommendBadge}
        </div>
      )}

      {/* Title */}
      <h1 className="mb-2 text-3xl font-medium text-foreground md:text-4xl">
        {title}
      </h1>

      {/* Category & Rating */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="rounded-md bg-primary-100 px-2 py-0.5 text-primary">
          {categoryLabel}
        </span>

        <span className="flex items-center gap-1 text-foreground">
          <svg
            className="h-4 w-4 text-secondary-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {ratingText}
        </span>
      </div>

      {/* Info & Actions */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Info */}
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Level</p>
            <p className="font-medium text-foreground">{level}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Students</p>
            <p className="font-medium text-foreground">{students}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Language</p>
            <p className="font-medium text-foreground">{language}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onWishlist}
            className="flex h-9 items-center gap-2 rounded-md bg-primary-200 px-4 text-sm text-foreground hover:bg-primary-300 transition-colors duration-200"
          >
            <Heart size={16} />
            Wishlist
          </button>

          <button
            type="button"
            onClick={onShare}
            className="flex h-9 items-center gap-2 rounded-md bg-primary-200 px-4 text-sm text-foreground hover:bg-primary-300 transition-colors duration-200"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Preview - Video or Image */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-border">
        {variant === "video" ? (
          <>
            {/* Video Element */}
            <video
              src={videoUrl}
              poster={coverImage}
              className="h-80 w-full object-cover md:h-[420px]"
              controls
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>

            {/* Optional Play Button Overlay */}
            {onPlayPreview && (
              <button
                type="button"
                onClick={onPlayPreview}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors duration-200"
                aria-label="Play preview"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                  <Play
                    size={24}
                    className="ml-1 text-foreground fill-foreground"
                  />
                </div>
              </button>
            )}
          </>
        ) : (
          <>
            {/* Image Element */}
            <Image
              src={coverImage}
              alt="Course preview"
              width={1200}
              height={420}
              className="h-80 w-full object-cover md:h-[420px]"
              priority
            />
          </>
        )}
      </div>
    </section>
  );
};

export default CourseHeroCard;