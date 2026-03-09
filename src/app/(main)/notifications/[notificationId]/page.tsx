"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NOTIFICATIONS, type Notification } from "../data";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function IconBack({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrash({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 6l1 16h10l1-16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBell({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 17H9m10-2V11a7 7 0 1 0-14 0v4l-2 2h18l-2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NotificationDetailPage() {
  const router = useRouter();
  const params = useParams<{ notificationId: string }>();

  const [deleted, setDeleted] = useState(false);

  const notification = NOTIFICATIONS.find(
    (n) => n.id === params.notificationId
  );

  if (!notification || deleted) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-6">
          <button
            type="button"
            onClick={() => router.push("/notifications")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <IconBack /> Back
          </button>
          <p className="mt-6 text-sm text-gray-600">Notification not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto pr-1 rounded-2xl py-4">
      <div className="w-full">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-3 inline-flex items-center gap-2 text-sm text-black"
        >
          <IconBack /> Back
        </button>
      </div>

      <div className="w-full rounded-2xl bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-gray-500">{notification.createdAtLabel}</p>

          <button
            type="button"
            onClick={() => setDeleted(true)}
            className="grid h-9 w-9 place-items-center rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Delete notification"
            title="Delete"
          >
            <IconTrash />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-purple-50 text-[#5b2c83]">
            <IconBell />
          </div>
          <h1 className="text-base font-semibold text-gray-900">{notification.title}</h1>
        </div>

        <p className="mt-6 text-sm text-gray-700">{notification.detailText}</p>

        {notification.info && notification.info.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900">Session Information</h3>

            <div className="mt-3 space-y-2 text-sm text-gray-700">
              {notification.info.map((row) => (
                <div key={row.label} className="flex gap-2">
                  <span className="font-semibold">{row.label}:</span>
                  <span className="text-gray-600">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {notification.actions && notification.actions.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {notification.actions.map((a) => (
              <button
                key={a.label}
                type="button"
                className={cx(
                  "rounded-lg px-5 py-2.5 text-sm font-semibold",
                  a.variant === "primary"
                    ? "bg-[#5b2c83] text-white hover:bg-[#4e2573]"
                    : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                )}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}