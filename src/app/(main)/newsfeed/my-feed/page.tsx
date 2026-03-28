"use client";

import type { ImageProps } from "next/image";
import TopicCards from "@/components/artCulture/TopicCards";

type Tile = { label: string; bg: string; image: ImageProps["src"] };



export default function ArtsPage() {

  return (
    <div className="h-full min-h-0 overflow-y-auto pr-1">
      <div className="space-y-6">
        <TopicCards />
      </div>
    </div>
  );
}
