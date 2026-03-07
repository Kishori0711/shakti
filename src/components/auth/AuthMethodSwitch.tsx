"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Method = "phone" | "email";

export default function AuthMethodSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const method = (sp.get("method") as Method) || "email";

  const setMethod = (m: Method) => {
    const params = new URLSearchParams(sp.toString());
    params.set("method", m);
    router.push(`${pathname}?${params.toString()}`);
  };

  const btnBase =
    "flex-1 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer";

  return (
    <div className="w-full pt-2">
      <div className="w-full rounded-2xl bg-gray-100 p-2 flex items-center gap-1">
        {/* By Phone */}
        <button
          type="button"
          onClick={() => setMethod("phone")}
          aria-pressed={method === "phone"}
          className={[
            btnBase,
            method === "phone"
              ? "bg-gray-900 text-white shadow-sm "
              : "bg-transparent text-gray-900 hover:bg-white/60",
          ].join(" ")}
        >
          By Phone
        </button>

        {/* By email */}
        <button
          type="button"
          onClick={() => setMethod("email")}
          aria-pressed={method === "email"}
          className={[
            btnBase,
            method === "email"
              ? "bg-gray-900 text-white shadow-sm"
              : "bg-transparent text-gray-900 hover:bg-white/60",
          ].join(" ")}
        >
          By email
        </button>
      </div>
    </div>
  );
}