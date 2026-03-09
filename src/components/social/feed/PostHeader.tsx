"use client";

import type { Post } from "../type";
import Avatar from "../common/Avatar";
import { IconDots } from "../common/Icons";

export default function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-3">
        <Avatar src={post.author.avatar} alt={post.author.name} size="md" />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-900">{post.author.name}</p>
            <span className="text-xs text-zinc-500">• {post.createdAt}</span>
          </div>

          {post.author.location && (
            <p className="text-xs text-zinc-500">{post.author.location}</p>
          )}
        </div>
      </div>

      <button type="button" className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100" aria-label="More">
        <IconDots className="h-5 w-5" />
      </button>
    </div>
  );
}