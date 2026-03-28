"use client";

import Image from "next/image";
import { FiClock, FiHeart } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";

type Props = {
  title: string;
  subtitle: string;
  tag: string;
  minutes: number;
  likes: number;
  image: string;
};

export default function ContentCard({
  title,
  subtitle,
  tag,
  minutes,
  likes,
  image,
}: Props) {
  return (
    <article className="group flex flex-col h-full">
      
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          width={600}
          height={300}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* TAG */}
        <span className="absolute bottom-3 left-3 bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
          {tag}
        </span>

        {/* PLAY BUTTON */}
        {/* <button className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-600 transition">
          <BsPlayFill className="text-lg" />
        </button> */}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 mt-3">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1 flex-1 line-clamp-2">
          {subtitle}
        </p>

        {/* FOOTER */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 pt-3 border-t">
          <span className="flex items-center gap-1">
            <FiClock /> {minutes} min read
          </span>

          <span>•</span>

          <span className="flex items-center gap-1">
            <FiHeart /> {likes}
          </span>
        </div>
      </div>
    </article>
  );
}