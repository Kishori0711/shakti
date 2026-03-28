"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";
import { NOTIFICATIONS, type Notification, type NotificationType } from "../../../components/notifications/data";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function IconRocket(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4c4 1 6 5 6 9l-6 6c-4 0-8-2-9-6l4-4c1-3 3-4 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 15l-2 5 5-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 9h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3v3m8-3v3M4 8h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M8 12h4M8 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCard(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M6 11h5M4 9.5V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconFile(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M9 13h6M9 17h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconStar(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l3 7 7 .6-5.3 4.6 1.7 7-6.4-3.8-6.4 3.8 1.7-7L2 9.6 9 9l3-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NotificationIcon({ type }: { type: NotificationType }) {
  const base = "h-5 w-5";
  switch (type) {
    case "mentor":
      return <IoIosNotifications className={base} />;
    case "course":
      return <IconRocket className={base} />;
    case "event":
      return <IconCalendar className={base} />;
    case "payment":
      return <IconCard className={base} />;
    case "content":
      return <IconFile className={base} />;
    case "recommendation":
      return <IconStar className={base} />;
    default:
      return <IoIosNotifications className={base} />;
  }
}

export default function NotificationsPage() {
  const router = useRouter();

  const initial = useMemo<Notification[]>(() => NOTIFICATIONS, []);
  const [items, setItems] = useState<Notification[]>(initial);

  const openNotification = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    router.push(`/notifications/${id}`); // ✅ Next.js dynamic route
  };

  return (
    <div className="h-full min-h-0 overflow-y-auto pr-1 bg-white rounded-2xl">
      <div className="mx-auto w-full rounded-2xl p-2">
        <div className=" divide-gray-100">
          {items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => openNotification(n.id)}
              className={cx("w-full text-left", "px-4 py-4 sm:px-6", "transition-colors hover:bg-gray-50")}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative mt-0.5 grid h-11 w-11 place-items-center rounded-full bg-primary-50 text-primary-500">
                    <NotificationIcon type={n.type} />
                    {n.unread && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary-500" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{n.subtitle}</p>
                  </div>
                </div>

                <div className="shrink-0 text-xs text-gray-500">{n.timeLabel}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}