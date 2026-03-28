"use client";

import * as React from "react";
import clsx from "clsx";

type ToggleItem = {
  key: string;
  title: string;
  desc: string;
  defaultOn?: boolean;
};

function Switch({
  checked,
  onChange,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  "aria-label": string;
}) {
  return (
    <button
      type="button" 
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
        checked ? "bg-orange-500" : "bg-neutral-200"
      )}
    >
      <span
        className={clsx(
          "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">{desc}</p>
      </div>

      <div className="pt-0.5">
        <Switch
          checked={checked}
          onChange={onChange}
          aria-label={`${title} toggle`}
        />
      </div>
    </div>
  );
}

export default function SettingsNotificationsPage() {
  const preferenceItems: ToggleItem[] = [
    {
      key: "mentorSessionAlerts",
      title: "Mentor Session Alerts",
      desc: "Get reminders and updates for upcoming mentor sessions.",
      defaultOn: false,
    },
    {
      key: "courseProgressReminders",
      title: "Course Progress Reminders",
      desc: "Stay on track with alerts for unfinished lessons.",
      defaultOn: true,
    },
    {
      key: "eventNotifications",
      title: "Event Notifications",
      desc: "Receive updates about registered and upcoming events.",
      defaultOn: false,
    },
    {
      key: "paymentUpdates",
      title: "Payment Updates",
      desc: "Get confirmations and alerts for payments and invoices.",
      defaultOn: true,
    },
    {
      key: "platformAnnouncements",
      title: "Platform Announcements",
      desc: "Important updates, features, and platform news.",
      defaultOn: false,
    },
  ];

  const channelItems: ToggleItem[] = [
    {
      key: "pushNotifications",
      title: "Push Notifications",
      desc: "Receive instant alerts on your device.",
      defaultOn: true,
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      desc: "Get detailed updates in your inbox.",
      defaultOn: false,
    },
    {
      key: "smsAlerts",
      title: "SMS Alerts",
      desc: "Receive critical alerts via text message.",
      defaultOn: false,
    },
  ];

  const initial = React.useMemo(() => {
    const all = [...preferenceItems, ...channelItems];
    return all.reduce<Record<string, boolean>>((acc, it) => {
      acc[it.key] = Boolean(it.defaultOn);
      return acc;
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [toggles, setToggles] = React.useState<Record<string, boolean>>(initial);

  const setToggle = (key: string, next: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: next }));
    // TODO: yahan API call laga sakte ho (debounce/optimistic update)
  };

  return (
    <div className="min-w-0">
      <h1 className="text-lg font-semibold text-neutral-900">Notifications</h1>

      <div className="mt-4 space-y-5">
        <Card title="Notification Preferences">
          {preferenceItems.map((it) => (
            <ToggleRow
              key={it.key}
              title={it.title}
              desc={it.desc}
              checked={toggles[it.key]}
              onChange={(n) => setToggle(it.key, n)}
            />
          ))}
        </Card>

        <Card title="Delivery Channels">
          {channelItems.map((it) => (
            <ToggleRow
              key={it.key}
              title={it.title}
              desc={it.desc}
              checked={toggles[it.key]}
              onChange={(n) => setToggle(it.key, n)}
            />
          ))}
        </Card>
      </div>
    </div>
  );
}