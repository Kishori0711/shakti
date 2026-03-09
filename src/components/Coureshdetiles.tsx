"use client";

import { FiHeart, FiPlay, FiShare2 } from "react-icons/fi";
import Image from "next/image";
import type { ReactNode } from "react";
// import { StarIcon } from "../assets/Icons";
import { StarIcon } from "lucide-react";

type BaseProps = {
  recommendBadge?: ReactNode;
  title: string;
  categoryLabel: string;
  ratingText: string;
  level: string;
  students: string;
  language: string;
  onWishlist?: () => void;
  onShare?: () => void;
};

type VideoVariantProps = BaseProps & {
  variant: "video";
  videoUrl: string;
  coverImage?: string;
  onPlayPreview?: () => void;
};

type ImageVariantProps = BaseProps & {
  variant: "image";
  coverImage: string;
  onPlayPreview?: never;
  videoUrl?: never;
};

type Props = VideoVariantProps | ImageVariantProps;

export default function CourseHeroCard({
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
}: Props) {
  const videoUrl = "videoUrl" in rest ? rest.videoUrl : undefined;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      
      {recommendBadge && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-md bg-[#D6DFFC] px-3 py-1 text-[14px] text-[#1D4AED]">
          {recommendBadge}
        </span>
      )}

      <h1 className="mb-2 text-[32px] font-medium text-foreground">
        {title}
      </h1>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-[14px] text-muted-foreground">
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">
          {categoryLabel}
        </span>

        <span className="flex items-center gap-1 text-foreground">
          {/* <Image src={StarIcon} alt="Star" width={16} height={16} /> */}
          {ratingText}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

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

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onWishlist}
            className="flex h-9 items-center gap-2 rounded-md bg-primary/20 px-4 text-sm
            text-foreground hover:bg-accent transition-colors"
          >
            <FiHeart /> Wishlist
          </button>

          <button
            onClick={onShare}
            className="flex h-9 items-center gap-2 rounded-md bg-primary/20 px-4 text-sm
            text-foreground hover:bg-accent transition-colors"
          >
            <FiShare2 /> Share
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-border">

        {variant === "video" ? (
          <>
            <video
              src={videoUrl}
              poster={coverImage}
              className="h-[420px] w-full object-cover"
              controls
              preload="metadata"
            />

            {onPlayPreview && (
              <button
                onClick={onPlayPreview}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white shadow">
                  <FiPlay className="ml-1" />
                </div>
              </button>
            )}
          </>
        ) : (
          <Image
            src={coverImage}
            alt="Course preview"
            width={1200}
            height={420}
            className="h-[420px] w-full object-cover"
          />
        )}

      </div>
    </section>
  );
}


