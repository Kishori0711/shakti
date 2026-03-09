

"use client";

import type { SVGProps } from "react";
import Image, { type ImageProps } from "next/image";
import { FiChevronDown } from "react-icons/fi";

export type Topic = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  imageUrl: ImageProps["src"]; 
  readTime: string;
  likes: number;
  href?: string;
};

const DEFAULT_TOPICS: Topic[] = [
  {
    id: "madhubani-1",
    category: "Arts",
    title: "The Art of Madhubani Painting",
    subtitle: "Ancient art form empowering rural women",
    imageUrl:
      "https://www.shutterstock.com/image-photo/confident-business-woman-modern-office-600nw-2706691495.jpg",
    readTime: "5 min read",
    likes: 189,
    href: "#",
  },
  {
    id: "folk-2",
    category: "Arts",
    title: "Folk Songs and Oral Traditions",
    subtitle: "Stories, rhythm, and identity across generations",
    imageUrl:
      "https://images.stockcake.com/public/0/4/1/041960c3-82ef-4e46-91d2-6031d1065704_large/professional-business-presentation-stockcake.jpg",
    readTime: "7 min read",
    likes: 124,
    href: "#",
  },
  {
    id: "folk-3",
    category: "Arts",
    title: "Folk Songs and Oral Traditions",
    subtitle: "Stories, rhythm, and identity across generations",
    imageUrl:
      "https://images.stockcake.com/public/0/4/1/041960c3-82ef-4e46-91d2-6031d1065704_large/professional-business-presentation-stockcake.jpg",
    readTime: "7 min read",
    likes: 124,
    href: "#",
  },
];

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s-7-4.6-9.5-9A5.7 5.7 0 0 1 12 5.8 5.7 5.7 0 0 1 21.5 12C19 16.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
    >
      {label}
      <FiChevronDown className="text-zinc-400" />
    </button>
  );
}

export function TopicCard({
  topic,
  onPlay,
}: {
  topic: Topic;
  onPlay?: (topic: Topic) => void;
}) {
  return (
    <div
      className={[
        "group block w-full select-none",
        "rounded-[28px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
      ].join(" ")}
      // ✅ No navigation / no click handler on card
    >
      <div className="relative overflow-hidden rounded-[28px] bg-zinc-200 shadow-sm">
        <div className="aspect-4/3">
          <div className="relative h-full w-full">
            <Image
              src={topic.imageUrl}
              alt={topic.title}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={[
                "object-cover object-center",
                "transition-transform duration-300 ease-out",
                "group-hover:scale-[1.03] group-focus-visible:scale-[1.03]",
              ].join(" ")}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-black/40 px-4 py-3 text-xs font-semibold text-white backdrop-blur">
            {topic.category}
          </span>
        </div>

        <button
          type="button"
          aria-label="Play"
          className={[
            "absolute bottom-4 right-4",
            "grid h-10 w-10 place-items-center rounded-full",
            "bg-purple-700 text-white shadow-md",
            "transition-transform duration-200 ease-out",
            "group-hover:scale-[1.05] group-focus-visible:scale-[1.05]",
          ].join(" ")}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPlay?.(topic);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 7.5v9l8-4.5-8-4.5Z" />
          </svg>
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-[15px] font-extrabold text-zinc-900">{topic.title}</h3>
        <p className="text-[13px] text-zinc-500">{topic.subtitle}</p>

        <div className="mt-2 flex items-center gap-3 text-[12px] font-semibold text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            {topic.readTime}
          </span>

          <span className="text-zinc-400">•</span>

          <span className="inline-flex items-center gap-1.5">
            <HeartIcon className="h-4 w-4" />
            {topic.likes}
          </span>
        </div>
      </div>
    </div>
  );
}

type TopicCardsProps = {
  topics?: Topic[];
  className?: string;
  onPlay?: (topic: Topic) => void;
};

export default function TopicCards({
  topics = DEFAULT_TOPICS,
  className = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3",
  onPlay,
}: TopicCardsProps) {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between gap-3 pb-4">
        <h2 className="text-base font-extrabold text-zinc-900">Topics</h2>
        <div className="flex flex-wrap gap-2">
          <FilterBtn label="Category" />
          <FilterBtn label="All Formats" />
        </div>
      </div>

      <div className={className}>
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}