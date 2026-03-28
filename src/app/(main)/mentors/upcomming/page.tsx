"use client";

import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";

// ✅ Props define karo
type Props = {
  name: string;
  role: string;
  image: string;
  time: string;
  date: string;
  startTime: string;
  endTime: string;
};

function SessionCard({
  name,
  role,
  image,
  time,
  date,
  startTime,
  endTime,
}: Props) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  const isLive = now >= start && now <= end;

  return (
    <div className="w-full max-w-[700px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <div className="relative h-[64px] w-[64px] overflow-hidden rounded-xl">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-semibold text-gray-900">
                {name}
              </h2>
              <span className="text-orange-500">✔</span>
            </div>

            <p className="text-[14px] text-gray-500">{role}</p>

            <button className="mt-2 text-[14px] underline text-gray-700">
              View details
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <button
            disabled={!isLive}
            className={`w-full sm:w-auto rounded-xl px-4 py-2 text-sm font-medium text-white
              ${
                isLive
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {isLive ? "Join Session" : "Session Offline"}
          </button>

          <div className="flex flex-wrap gap-3 text-sm">
            <button className="text-green-600 underline">
              Reschedule
            </button>
            <button className="text-red-500 underline">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex flex-col gap-3 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          ⏳ <span>1 Hour Session</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Page
export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        
        <SessionCard
          name="Ananya Kapoor"
          role="Leadership Coach & Product Leader"
          image="/giral.jpg"
          time="02:30 - 03:30 pm"
          date="26 Mar, 2026"
          startTime="2026-03-26T14:30:00"
          endTime="2026-03-26T15:30:00"
        />

        <SessionCard
          name="Ananya Kapoor"
          role="Leadership Coach & Product Leader"
          image="/giral.jpg"
          time="02:30 - 03:30 pm"
          date="26 Mar, 2026"
          startTime="2026-03-26T14:30:00"
          endTime="2026-03-26T15:30:00"
        />

      </div>
    </div>
  );
}