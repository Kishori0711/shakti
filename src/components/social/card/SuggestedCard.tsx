"use client";

import type { User } from "../type";
import Avatar from "../common/Avatar";
import SearchInput from "../common/SearchInput";
import { IconPlus } from "../common/Icons";
import { IoIosArrowDown } from "react-icons/io";

export default function SuggestedCard({ users }: { users: User[] }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-semibold text-zinc-900">Suggested for you</p>

      <div className="mt-3">
        <SearchInput placeholder="Search" />
      </div>

      <div className="mt-3 space-y-3">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={u.avatar} alt={u.name} size="sm" />
              <div>
                <p className="text-sm font-medium text-zinc-900">{u.name}</p>
                <p className="text-xs text-zinc-500">{u.handle}</p>
              </div>
            </div>

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              aria-label={`Add ${u.name}`}
              onClick={() => {
                // add friend logic here
              }}
            >
              <IconPlus className="h-5 w-5" />
            </button>
          </div>
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