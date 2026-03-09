"use client";

import type { Story } from "../type";
import StoryItem from "./StoryItem";

type Props = { stories: Story[] };

export default function StoriesBar({ stories }: Props) {
  return (
    <div className="w-full overflow-hidden rounded-2xl">
      <div className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none]">
        {stories.map((s) => (
          <StoryItem key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}