"use client";

import type { User } from "../type";
import Avatar from "../common/Avatar";
import { IconPlus } from "../common/Icons";
import { useRouter } from "next/navigation";

export default function ProfileCard({ user }: { user: User }) {
  const router = useRouter();

  const goToUser = () => {
    router.push("/social-user");
  };

  return (
    <div
      className="cursor-pointer rounded-2xl bg-white p-4"
      onClick={goToUser}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToUser();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} alt={user.name} size="md" />
          <div>
            <p className="text-sm font-semibold text-zinc-900">{user.name}</p>
            <p className="text-xs text-zinc-500">{user.handle}</p>
          </div>
        </div>

        {/* Arrow button → navigate */}
        <button
          type="button"
          className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100"
          aria-label="Open"
          onClick={(e) => {
            e.stopPropagation();
            goToUser();
          }}
        >
          ›
        </button>
      </div>

      {/* Create button → NO navigate */}
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
        onClick={(e) => {
          e.stopPropagation();
          // create logic here
        }}
      >
        <span className="grid h-5 w-5 place-items-center rounded-md bg-white/15">
          <IconPlus className="h-4 w-4" />
        </span>
        Create
      </button>
    </div>
  );
}