"use client";

import type { Post } from "../type";
import Image from "next/image";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl bg-white p-5">
      <PostHeader post={post} />

      <div className="mt-3 text-sm leading-6 text-zinc-600">
        <p>{post.text}</p>

        {post.tags.length > 0 && (
          <p className="mt-3 text-violet-700">
            {post.tags.map((t) => (
              <span key={t} className="mr-2">
                #{t}
              </span>
            ))}
          </p>
        )}
      </div>

      {post.image && (
        <div className="mt-4 overflow-hidden rounded-xl bg-zinc-100">
          {/* Fixed height like your old img: h-[360px] */}
          <div className="relative h-[360px] w-full">
            <Image
              src={post.image}
              alt="Post"
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      )}

      <PostActions likes={post.likes} comments={post.comments} />
    </article>
  );
}