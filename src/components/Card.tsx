"use client";

import React from "react";
import Image from "next/image";
import type { Course } from "../types/course";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type IconLike = React.ReactNode | string;

type Props = {
  course: Course;
  onClick?: () => void;
  onEnroll?: () => void;
  enrollLoading?: boolean;
  showButton?: boolean;
  buttonText?: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    | "outlinePrimary";
  icons?: {
    modules?: IconLike;
    learners?: IconLike;
    rating?: IconLike;
  };
};

const renderIcon = (icon?: IconLike, className = "h-4 w-4") => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return (
      <Image src={icon} alt="" width={16} height={16} className={className} />
    );
  }

  return icon;
};

const Card: React.FC<Props> = ({
  course,
  onClick,
  onEnroll,
  enrollLoading = false,
  showButton = true,
  buttonText = "Enroll Now",
  buttonVariant = "default",
  icons,
}) => {
  // Safely handle language - can be string, string[], or undefined
  const languages = Array.isArray(course.language)
    ? course.language
    : course.language
      ? [course.language]
      : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bg-white border border-border rounded-2xl hover:shadow-md transition p-4  flex flex-col h-full"
    >
      {/* Image Section */}
      <div
        onClick={onClick}
        className="relative h-52 w-full overflow-hidden rounded-lg mb-4 cursor-pointer"
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Modules badge - LEFT */}
        <div className="absolute top-3 left-3">
          <Badge className="inline-flex items-center gap-2 bg-black/40 text-white text-xs px-4 py-3 rounded-lg backdrop-blur-md leading-none">
            {renderIcon(icons?.modules, "h-4 w-4")}
            <span className="flex items-center">{course.modules} Modules</span>
          </Badge>
        </div>

        {/* New badge - RIGHT */}
        {course.isNew && (
          <div className="absolute top-3 right-3 bg-linear-to-b from-primary-300 to-primary-700 text-white text-xs px-5 py-2 rounded-full shadow-md font-medium">
            New
          </div>
        )}

        {/* Teacher Avatar & Name */}
        <div className="absolute bottom-2 left-3 flex items-center gap-2 rounded-lg px-2 py-1.5 ">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 shadow-md shrink-0 ">
            <Image
              src={course.teacherAvatar}
              alt={course.teacherName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <span className="text-sm font-semibold text-white drop-shadow-md">
            {course.teacherName}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 min-h-7">
          <div className="flex gap-2 flex-wrap items-center">
            {course.tags && (
              <Badge className="px-2 py-3 rounded-lg text-primary-600 bg-primary-50">
                {course.tags}
              </Badge>
            )}
            {languages.length > 0 && (
              <Badge className="px-2 py-3 rounded-lg text-primary-600 bg-secondary-50">
                {languages.length === 1
                  ? languages[0]
                  : `${languages[0]} +${languages.length - 1}`}
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 whitespace-nowrap h-7">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-semibold text-foreground">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="font-medium text-foreground text-base line-clamp-2">
          {course.title}
        </h3>

        {/* Divider */}
        <hr className="border-border" />

        {/* Footer - Learners and Price */}
        <div className="flex items-center justify-between text-sm">
          {/* Learners Count */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {renderIcon(icons?.learners, "h-4 w-4")}
            </span>

            <div className="flex items-center gap-1">
              <span className="text-sm text-foreground font-semibold">
                {course.learners.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">learners</span>
            </div>
          </div>

          {/* Price */}
          <span className="font-semibold text-primary-600 text-base">
            ₹{course.price.toLocaleString()}
          </span>
        </div>

        {/* Button Section - Conditional Rendering */}
        {showButton && onEnroll ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEnroll?.();
            }}
            disabled={enrollLoading}
            size="default"
            className="w-full mt-auto p-5 hover:cursor-pointer"
          >
            {enrollLoading ? "Loading..." : buttonText}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
