"use client";

import type React from "react";
import { IconSearch } from "./Icons";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput(props: Props) {
  return (
    <div className="relative">
      <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        {...props}
        className={[
          "w-full rounded-full bg-zinc-100 px-9 py-2 text-sm outline-none",
          "placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-300",
          props.className ?? "",
        ].join(" ")}
      />
    </div>
  );
}