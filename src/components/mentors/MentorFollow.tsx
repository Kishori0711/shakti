"use client";

import type React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

type MentorFollowProps = {
  image: string;
  name: string;
  onFollow?: () => void;
  isFollowed?: boolean;
};

export function MentorFollow({
  image,
  name,
  onFollow,
  isFollowed = false,
}: MentorFollowProps): React.ReactElement {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm p-4">
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden rounded-2xl mb-4">
        <Image src={image} alt={name} fill className="object-cover" priority />
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer">
          <button className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
            <svg
              className="w-6 h-6 text-gray-800 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      </div>
      <button
        onClick={onFollow}
        className="w-full border border-border py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors rounded"
      >
        👤 Follow
      </button>
    </div>
  );
}

export default MentorFollow;
