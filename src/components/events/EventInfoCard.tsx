"use client";

import { FiCalendar, FiClock, FiGlobe, FiUsers } from "react-icons/fi";

type Props = {
  price: number;
  seatsLeft: number;
  totalSeats: number;
  eventDate: string;
  eventTime: string;
  format: string;
  language: string;
  onRegister: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function EventInfoCard({
  price,
  seatsLeft,
  totalSeats,
  eventDate,
  eventTime,
  format,
  language,
  onRegister,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-extrabold text-foreground">
          {price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`}
        </p>

        <span className="rounded-full bg-[#FDEDD1] px-3 py-1 text-[10px] font-semibold text-[#F5A623]">
          {seatsLeft}/{totalSeats} Seats left
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <FiCalendar />
            Date:
          </span>
          <span className="text-foreground">{eventDate}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <FiClock />
            Time:
          </span>
          <span className="text-foreground">{eventTime}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <FiUsers />
            Format:
          </span>
          <span className="text-foreground">{format}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <FiGlobe />
            Language:
          </span>
          <span className="text-foreground">{language}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onRegister}
        disabled={disabled || loading}
        className="mt-5 h-12 w-full rounded-xl bg-primary font-bold text-sm text-primary-foreground transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Processing..."
          : disabled
            ? "Already Registered / Full"
            : "Register Now"}
      </button>
    </div>
  );
}
