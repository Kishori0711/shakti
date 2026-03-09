"use client";

import type { Story } from "../type";
import Avatar from "../common/Avatar";
import { IconPlus } from "../common/Icons";

type Props = { story: Story };

export default function StoryItem({ story }: Props) {
  const { user, isYourStory, seen } = story;

  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-2">
      <div className="relative">
        <Avatar src={user.avatar} alt={user.name} ring="story" seen={seen} size="lg" />

        {isYourStory && (
          <button
            type="button"
            className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-white shadow"
            aria-label="Add story"
            onClick={() => {
              // add story logic here
            }}
          >
            <IconPlus className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="w-full truncate text-center text-xs text-black dark:text-white">
        {isYourStory ? "Your Story" : user.name}
      </p>
    </div>
  );
}