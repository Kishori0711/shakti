"use client";

import React from "react";
import Image from "next/image";

type TabKey = "posts" | "video" | "saved";

export type User = {
  name: string;
  username: string;
  avatarUrl: string;
  postsCount: number;
  followersCount: string; 
  followingCount: number;
  bio: string;
};

export type Post = {
  id: string;
  imageUrl: string;
  alt?: string;
};

const cx = (...classes: Array<string | boolean | undefined | null>) =>
  classes.filter(Boolean).join(" ");

function IconGrid(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconVideo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M17 10.5 21 8.2v7.6L17 13.5v-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBookmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4h10a1 1 0 0 1 1 1v16l-6-3-6 3V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  user: User;
  posts: Post[];
  onCreate?: () => void;
};

export const ProfileLeftPanel: React.FC<Props> = ({ user, posts, onCreate }) => {
  const [activeTab, setActiveTab] = React.useState<TabKey>("posts");

  const tabs: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
    { key: "posts", label: "Posts", icon: <IconGrid className="h-4 w-4" /> },
    { key: "video", label: "Video", icon: <IconVideo className="h-4 w-4" /> },
    { key: "saved", label: "Saved", icon: <IconBookmark className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full">
      <div className="space-y-6">
        {/* Profile Card */}
        <section className="rounded-2xl bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="leading-tight">
                <div className="text-base font-semibold text-zinc-900">
                  {user.name}
                </div>
                <div className="text-sm text-zinc-500">@{user.username}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800 active:scale-[0.99]"
            >
              <span className="grid h-5 w-5 place-items-center rounded-md bg-white/15">
                <IconPlus className="h-4 w-4" />
              </span>
              Create
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-900">
            <div>
              <span className="font-semibold">{user.postsCount}</span>{" "}
              <span className="text-zinc-500">posts</span>
            </div>
            <div>
              <span className="font-semibold">{user.followersCount}</span>{" "}
              <span className="text-zinc-500">followers</span>
            </div>
            <div>
              <span className="font-semibold">{user.followingCount}</span>{" "}
              <span className="text-zinc-500">following</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-zinc-500">{user.bio}</p>
        </section>

        {/* Tabs + Grid Card */}
        <section className="rounded-2xl bg-white p-6">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm transition",
                    isActive
                      ? "bg-violet-700 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  )}
                >
                  <span className={cx(isActive ? "text-white" : "text-zinc-500")}>
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <div
                key={p.id}
                className="relative h-44 overflow-hidden rounded-2xl bg-zinc-100 md:h-48"
              >
                <Image
                  src={p.imageUrl}
                  alt={p.alt ?? "post"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};