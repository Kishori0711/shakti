"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import TopicCards from "@/components/artCulture/TopicCards";

type Tile = { label: string; bg: string; image: ImageProps["src"] };

const tiles: Tile[] = [
  {
    label: "Courage",
    bg: "bg-orange-100",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Innovation",
    bg: "bg-blue-100",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Arts",
    bg: "bg-purple-100",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Leadership",
    bg: "bg-green-100",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Finance",
    bg: "bg-pink-100",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ArtsPage() {
  const [active, setActive] = useState<string | null>(null);

  const ACTIVE_H = 264;
  const NORMAL_H = 220;

  return (
    <div className="h-full min-h-0 overflow-y-auto pr-1">
      <div className="space-y-6">
        <div className="mt-4 space-y-2 text-center">
          <h1 className="text-lg font-extrabold text-zinc-900">
            Explore Creative Expression and Heritage
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-zinc-500">
            Discover traditions, stories, and artistic practices that inspire
            connection, identity, and personal expression.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div
            className="flex flex-nowrap items-center gap-3"
            style={{ height: ACTIVE_H }}
          >
            {tiles.map((t) => {
              const isActive = active === t.label;
              const someoneActive = active !== null;

              return (
                <button
                  key={t.label}
                  type="button"
                  onMouseEnter={() => setActive(t.label)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(t.label)}
                  onBlur={() => setActive(null)}
                  className={[
                    "group relative text-left",
                    "basis-0 flex flex-col",
                    "rounded-2xl border border-zinc-200 p-5",
                    "shadow-sm",
                    "transition-[flex-grow,height,box-shadow] duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
                    t.bg,
                    someoneActive ? (isActive ? "grow-[1.2]" : "grow-[0.95]") : "grow",
                    "min-w-42.5 lg:min-w-0",
                  ].join(" ")}
                  style={{
                    height: isActive ? ACTIVE_H : NORMAL_H,
                    boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.08)" : undefined,
                  }}
                >
                  <div className="text-center text-xs font-extrabold text-zinc-800">
                    {t.label}
                  </div>

                  <div className="mt-2 min-h-0 flex-1 overflow-hidden rounded-xl bg-white/60">
                    <div className="relative h-full w-full ">
                      <Image
                        src={t.image}
                        alt={t.label}
                        fill
                        sizes="(min-width: 1024px) 260px, 200px"
                        className={[
                          "object-cover object-center",
                          "transition-transform duration-200 ease-out",
                          "transform-gpu will-change-transform",
                          "group-hover:scale-[1.06] group-focus-visible:scale-[1.06]",
                        ].join(" ")}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
                <TopicCards />
      </div>
    </div>
  );
}