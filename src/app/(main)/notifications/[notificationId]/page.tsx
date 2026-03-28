"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NOTIFICATIONS } from "../../../../components/notifications/data";

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
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconWarning({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─── Confirmation Dialog ─── */
function ConfirmDeleteDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="mx-4 w-full max-w-sm animate-[scaleIn_0.2s_ease-out] rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
          <IconWarning className="h-7 w-7" />
        </div>

        <h2 className="mt-4 text-center text-lg font-semibold text-gray-900">
          Delete Notification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Are you sure you want to delete this notification? This action cannot
          be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Page ─── */
export default function NotificationDetailPage() {
  const router = useRouter();
  const params = useParams<{ notificationId: string }>();

  const [showConfirm, setShowConfirm] = useState(false);

  const notification = NOTIFICATIONS.find(
    (n) => n.id === params.notificationId
  );

  if (!notification) {
    router.push("/notifications");
    return null;
  }

  return (
    <>
      {/* Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          router.push("/notifications");
        }}
      />

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
            <p className="text-sm text-gray-500">
              {notification.createdAtLabel}
            </p>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="grid h-9 w-9 place-items-center rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Delete notification"
              title="Delete"
            >
              <IconTrash />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-50 text-primary-500">
              <IconBell />
            </div>
            <h1 className="text-base font-semibold text-gray-900">
              {notification.title}
            </h1>
          </div>

          <p className="mt-6 text-sm text-gray-700">
            {notification.detailText}
          </p>

          {notification.info && notification.info.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Session Information
              </h3>

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
                      ? "bg-primary-500 text-white hover:bg-primary-600"
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
    </>
  );
}