"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Item = { href: string; label: string; danger?: boolean };

const items: Item[] = [
  { href: "/settings/my-profile", label: "My Profile" },
  { href: "/settings/login-security", label: "Login & Security" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/payments-billing", label: "Payments & Billing" },
  { href: "/settings/terms-policies", label: "Terms & Policies" },
  { href: "/settings/delete-account", label: "Delete Account", danger: true },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        // Mobile/Tablet: top scrollable tabs
        "no-scrollbar -mx-2 flex flex-nowrap gap-2 overflow-x-auto px-2",
        // Desktop: left vertical list
        "lg:mx-0 lg:flex-col lg:overflow-x-visible lg:px-0"
      )}
    >
      {items.map((it) => {
        const active = pathname === it.href;

        return (
          <Link
            key={it.href}
            href={it.href}
            className={clsx(
              // common
              "shrink-0 rounded-xl px-3 py-3 text-sm font-medium transition",
              // mobile: one line only
              "whitespace-nowrap",
              // states
              it.danger
                ? active
                  ? " text-red-500"
                  : "text-red-500 hover:bg-red-50"
                : active
                ? "bg-primary-50 text-primary-500"
                : "text-neutral-600 hover:bg-neutral-50"
            )}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}