"use client";

import type { User } from "../type";
import Avatar from "../common/Avatar";
import SearchInput from "../common/SearchInput";
import { IconChevronRight } from "../common/Icons";
import { IoIosArrowDown } from "react-icons/io";

export default function FriendsCard({
  users,
  total = 28,
}: {
  users: User[];
  total?: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-semibold text-zinc-900">
        Friends <span className="text-zinc-500">({total})</span>
      </p>

      <div className="mt-3">
        <SearchInput placeholder="Search" />
      </div>

      <div className="mt-3 space-y-3">
        {users.map((u) => (
          <button
            key={u.id}
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-2 py-2 hover:bg-zinc-50"
          >
            <div className="flex items-center gap-3">
              <Avatar src={u.avatar} alt={u.name} size="sm" />
              <div className="text-left">
                <p className="text-sm font-medium text-zinc-900">{u.name}</p>
                <p className="text-xs text-zinc-500">{u.handle}</p>
              </div>
            </div>

            <IconChevronRight className="h-5 w-5 text-zinc-400" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-zinc-200 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
      >
        View all <IoIosArrowDown />
      </button>
    </div>
  );
}