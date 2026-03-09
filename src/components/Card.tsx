"use client";

import React from "react";
import Image from "next/image";
import type { Course } from "../types/course";
import { Star } from "lucide-react";

type IconLike = React.ReactNode | string;

type Props = {
  course: Course;
  onClick?: () => void;
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

const Card: React.FC<Props> = ({ course, onClick, icons }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition p-4"
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />

        {/* Modules badge */}
        <span className="absolute top-3 left-3 flex items-center gap-2 rounded-md bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs text-white shadow-md">
          {course.modules} Modules
          {renderIcon(icons?.modules, "h-4 w-4 opacity-90")}
        </span>

        {/* Teacher */}
        <div className="absolute bottom-2 left-1 flex items-center gap-2 rounded-lg px-3 py-1.5">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/60">
            <Image
              src={course.teacherAvatar}
              alt={course.teacherName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <span className="text-sm font-semibold text-white">
            {course.teacherName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 flex-wrap mt-3">
            {course.tags && (
              <span className="text-primary-600 text-sm bg-primary-100  px-3 py-1 rounded-md font-medium">
                {course.tags}
              </span>
            )}

            {course.language?.length > 0 && (
              <span className="text-primary-600 text-sm bg-secondary-100 px-3 py-1 rounded-md font-medium">
                {course.language.join(", ")}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-secondary-500 mt-3">
            <Star size={16} fill="currentColor" />
            <span className="text-muted-foreground text-sm font-semibold">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="font-medium text-foreground text-base mb-3">
          {course.title}
        </h3>

        <hr className="m-2 border-border" />

        <div className="flex items-center justify-between text-sm">
          {/* Learners */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {renderIcon(icons?.learners, "h-4 w-4")}
            </span>

            <span className="text-sm text-foreground font-semibold">
              {course.learners.toLocaleString()}
            </span>

            <span className="text-sm text-muted-foreground">learners</span>
          </div>

          <span className="font-semibold text-primary-500 text-base">
            ₹{course.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
