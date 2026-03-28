"use client";

import type React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type MentorHeroProps = {
  image: string;
  name: string;
  title: string;
  experience: string;
  languages: string;
  location: string;
  tags: string[];
  sessions: number;
  reviews: number;
  isTopMentor?: boolean;
  isVerified?: boolean;
};

export function MentorHero({
  image,
  name,
  title,
  experience,
  languages,
  location,
  tags,
  sessions,
  reviews,
  isTopMentor = true,
  isVerified = true,
}: MentorHeroProps): React.ReactElement {
  return (
    <section className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
        
        {/* LEFT - Image */}
        <div className="sm:col-span-3 flex justify-center sm:justify-start">
          <div className="relative w-40 h-52 sm:w-44 sm:h-60 rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* RIGHT - Content */}
        <div className="sm:col-span-9 space-y-3">
          
          {/* Header - Name + Verify Badge + Top Mentor */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {name}
              </h2>
              {isVerified && (
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
              )}
            </div>

            {isTopMentor && (
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                <span>⭐</span>
                Top Mentor
              </button>
            )}
          </div>

          {/* Title */}
          <p className="text-gray-600 text-sm">{title}</p>

          {/* Info Row - Experience • Languages • Location */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <span>📋</span>
              <span>{experience}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <span>🌐</span>
              <span>{languages}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Sessions & Reviews */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 pt-1">
            <span>⭐</span>
            <span>
              <span className="font-semibold">{sessions}</span> Session{" "}
              <span className="text-gray-500">({reviews} Reviews)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MentorHero;