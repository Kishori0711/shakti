"use client";

import type React from "react";
import Image from "next/image";
import { Star, File, FileText } from "lucide-react";



type AboutMentorProps = {
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  courses: number;
  bio?: string;
  onViewProfile?: () => void;
};

export function AboutMentor({
  name,
  specialty,
  avatar,
  rating,
  courses,
  bio,
  onViewProfile,
}: AboutMentorProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900">About the Mentor</h3>

      {/* Mentor Profile */}
    {/* Top Row */}
<div className="flex items-center gap-3">
  
  {/* Avatar */}
  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
    <Image
      src={avatar}
      alt={name}
      fill
      className="object-cover"
    />
  </div>

  {/* Name + Specialty */}
  <div>
    <h4 className="font-semibold text-gray-900">{name}</h4>
    <p className="text-sm text-gray-500">{specialty}</p>
  </div>
</div>

{/* Bottom Row */}
<div className="flex items-center justify-between mt-2">
  
  {/* Rating LEFT */}
  <div className="flex items-center gap-1">
    <span className="text-sm font-medium text-gray-900">
      {rating.toFixed(1)}
    </span>

    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  </div>

  {/* Courses RIGHT */}
  <div className="flex items-center gap-1 text-gray-700">
    <FileText className="w-4 h-4" />
    <span className="text-sm font-medium">{courses} Courses</span>
  </div>

</div>
    </div>
  );
}

export default AboutMentor;
