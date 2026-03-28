"use client";

import { useState } from "react";
import Image from "next/image";
import { TABS, getDataForTab, type TabKey, type Purchase } from "./data";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: Purchase["status"] }) {
  return (
    <span
      className={cx(
        "inline-block rounded-[5px] px-3 py-1 text-xs font-semibold whitespace-nowrap",
        status === "Ongoing" && "bg-orange-50 text-orange-500",
        status === "Completed" && "bg-green-50 text-green-500",
        status === "Cancelled" && "bg-red-50 text-red-500"
      )}
    >
      {status}
    </span>
  );
}

/* ─── Invoice Button / Label ─── */
function InvoiceCell({ invoice }: { invoice: Purchase["invoice"] }) {
  if (invoice === "receipt") {
    return (
      <button
        type="button"
        className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        Receipt
      </button>
    );
  }

  return (
    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
      Invoice unavailable
    </span>
  );
}

/* ─── Table Row (flex based) ─── */
function PurchaseRow({ item }: { item: Purchase }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-b-0">
      {/* Name + Image — takes remaining space */}
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <span className="truncate text-sm font-medium text-orange-500">
          {item.name}
        </span>
      </div>

      {/* Date */}
      <span className="w-32.5 shrink-0 text-sm text-gray-700">
        {item.date}
      </span>

      {/* Total Price */}
      <span className="w-25 shrink-0 text-sm font-semibold text-gray-900">
        {item.totalPrice}
      </span>

      {/* Status */}
      <div className="w-27.5 shrink-0">
        <StatusBadge status={item.status} />
      </div>

      {/* Invoice */}
      <div className="w-32.5 shrink-0 text-right">
        <InvoiceCell invoice={item.invoice} />
      </div>
    </div>
  );
}

/* ─── Table Header (flex based) ─── */
function TableHeader({ nameHeader }: { nameHeader: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4">
      <span className="flex-1 text-xs font-semibold uppercase tracking-wide text-black">
        {nameHeader}
      </span>
      <span className="w-32.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-black">
        Date
      </span>
      <span className="w-25 shrink-0 text-xs font-semibold uppercase tracking-wide text-black">
        Total price
      </span>
      <span className="w-27.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-black">
        Status
      </span>
      <span className="w-32.5 shrink-0" />
    </div>
  );
}

/* ─── Mobile Card (for small screens) ─── */
function PurchaseCard({ item }: { item: Purchase }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <span className="text-sm font-medium text-orange-500 line-clamp-2">
          {item.name}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-black">Date</span>
        <span className="text-black">{item.date}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Total price</span>
        <span className="font-semibold text-gray-900">{item.totalPrice}</span>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={item.status} />
        <InvoiceCell invoice={item.invoice} />
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ tabLabel }: { tabLabel: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
        <svg
          className="h-8 w-8 text-gray-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        No {tabLabel.toLowerCase()} purchases yet.
      </p>
    </div>
  );
}

/* ─── Page ─── */
export default function PurchasesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("courses");

  const currentTabData = getDataForTab(activeTab);
  const currentTabLabel =
    TABS.find((t) => t.key === activeTab)?.label ?? "Items";

  const nameHeader =
    activeTab === "courses"
      ? "Course Name"
      : activeTab === "mentor-sessions"
        ? "Session Name"
        : "Event Name";

  return (
    <div className="h-full min-h-0 overflow-y-auto rounded-2xl bg-white">
      <div className="w-full rounded-2xl">
        {/* ── Tabs ── */}
        <div className="flex gap-6 border-b border-gray-100 px-6 pt-5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cx(
                "relative pb-3 text-sm font-semibold transition-colors",
                activeTab === tab.key
                  ? "text-orange-500"
                  : "text-black "
              )}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-orange-500" />
              )}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="px-6 pb-6">
          {currentTabData.length === 0 ? (
            <EmptyState tabLabel={currentTabLabel} />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block">
                <TableHeader nameHeader={nameHeader} />
                {currentTabData.map((item) => (
                  <PurchaseRow key={item.id} item={item} />
                ))}
              </div>

              {/* Mobile cards */}
              <div className="mt-4 space-y-3 md:hidden">
                {currentTabData.map((item) => (
                  <PurchaseCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}