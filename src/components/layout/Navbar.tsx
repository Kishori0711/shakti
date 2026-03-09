"use client";

import { FiBell, FiMenu, FiUser } from "react-icons/fi";
import { GiHeartPlus } from "react-icons/gi";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  onMenuClick: () => void;
};

export default function Header({ title = "Learn", onMenuClick }: Props) {
  const router = useRouter();

  return (
    <header className="w-full rounded-2xl bg-white px-5 py-4 flex items-center justify-between gap-3 border border-gray-200 ">
      {/* Left: menu + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="xl:hidden grid h-10 w-10 place-items-center rounded-xl bg-[#5b2a86] text-white shadow-sm hover:opacity-90 transition"
          aria-label="Open sidebar"
        >
          <FiMenu className="text-xl" />
        </button>

        <h1 className="truncate text-[16px] font-semibold text-gray-900">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/well-being")}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#111827] text-white px-4 py-2.5 text-xs font-semibold  hover:opacity-90 transition shadow-sm"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
            <GiHeartPlus className="text-base" />
          </span>
          Well-being Support
        </button>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />
        </button>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full bg-[#5b2a86] text-white hover:opacity-90 transition"
          aria-label="Profile"
        >
          <FiUser className="text-lg" />
        </button>
      </div>
    </header>
  );
}
