"use client";

import { IconBookmark, IconComment, IconHeart, IconShare } from "../common/Icons";

type Props = {
  likes: number;
  comments: number;
};

export default function PostActions({ likes, comments }: Props) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
      <div className="flex items-center gap-6 text-sm text-zinc-500">
        <button type="button" className="flex items-center gap-2 hover:text-zinc-900">
          <IconHeart className="h-5 w-5" />
          <span>{formatCount(likes)} Likes</span>
        </button>

        <button type="button" className="flex items-center gap-2 hover:text-zinc-900">
          <IconComment className="h-5 w-5" />
          <span>{comments} Comments</span>
        </button>

        <button type="button" className="flex items-center gap-2 hover:text-zinc-900">
          <IconShare className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      <button type="button" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900">
        <IconBookmark className="h-5 w-5" />
        <span>Save</span>
      </button>
    </div>
  );
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}