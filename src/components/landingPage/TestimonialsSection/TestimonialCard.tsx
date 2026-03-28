"use client";

import Image from "next/image";

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  avatar: string; // "/avatar/x.jpg"
};

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative w-97.5 flex-none rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      {/* quote icon */}
      <div className="absolute right-4 top-4 text-neutral-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.17 6C4.31 6 2 8.31 2 11.17V18h7v-6H6.5c0-1.38 1.12-2.5 2.5-2.5V6H7.17zm13 0C17.31 6 15 8.31 15 11.17V18h7v-6h-2.5c0-1.38 1.12-2.5 2.5-2.5V6h-1.83z" />
        </svg>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-neutral-200">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="36px" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
          <div className="text-xs text-neutral-500">{t.role}</div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-neutral-600">
        “{t.text}”
      </p>
    </div>
  );
}