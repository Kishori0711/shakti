"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

type EventItem = {
  id: number;
  title: string;
  thumbnail: string;
  speakerName: string;
  speakerRole: string;
  speakerImage: string;
  time: string;
  date: string;
};

type EventCardProps = EventItem & {
  now: Date;
  joinOpensBeforeMinutes?: number;
};

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parseEventDateTime = (dateStr: string, timeStr: string): Date | null => {
  const dateMatch = dateStr.match(/^(\d{1,2})\s([A-Za-z]{3}),\s(\d{4})$/);
  const timeMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s(am|pm)$/i);

  if (!dateMatch || !timeMatch) return null;

  const day = Number(dateMatch[1]);
  const monthName = dateMatch[2];
  const year = Number(dateMatch[3]);

  let hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const meridian = timeMatch[3].toLowerCase();

  if (meridian === "pm" && hour !== 12) hour += 12;
  if (meridian === "am" && hour === 12) hour = 0;

  const month = monthMap[monthName];
  if (month === undefined) return null;

  return new Date(year, month, day, hour, minute, 0, 0);
};

const EventCard = ({
  title,
  thumbnail,
  speakerName,
  speakerRole,
  speakerImage,
  time,
  date,
  now,
  joinOpensBeforeMinutes = 0,
}: EventCardProps) => {
  const eventDateTime = useMemo(() => {
    return parseEventDateTime(date, time);
  }, [date, time]);

  const isJoinDisabled = useMemo(() => {
    if (!eventDateTime) return true;

    const joinStartTime = new Date(
      eventDateTime.getTime() - joinOpensBeforeMinutes * 60 * 1000
    );

    return now < joinStartTime;
  }, [eventDateTime, now, joinOpensBeforeMinutes]);

  return (
    <div className="rounded-3xl border border-[#e9e1d8] bg-white p-3 sm:p-3.5">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Left Thumbnail */}
        <div className="relative w-full overflow-hidden rounded-2xl h-45 sm:h-23 sm:w-29 sm:min-w-29 md:h-39.25 md:w-41 md:min-w-41">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 116px, 164px"
          />
        </div>

        {/* Right Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 sm:pr-4">
              <h2 className="text-[16px] font-medium leading-tight text-[#1d1d1f] sm:text-[17px]">
                {title}
              </h2>

              <button className="mt-3 text-left text-[14px] font-normal text-[#3e3e3e] underline underline-offset-2">
                View details
              </button>
            </div>

            <button
              disabled={isJoinDisabled}
              className={`inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl px-5 text-[14px] font-medium transition sm:h-11.5 sm:w-auto sm:min-w-33
              ${
                isJoinDisabled
                  ? "cursor-not-allowed bg-[#e7e0d8] text-white"
                  : "bg-[#ff6b2c] text-white hover:bg-[#f45d1d]"
              }`}
            >
              Join Event
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-4 rounded-[14px] bg-[#f7f7fb] px-3 py-3 sm:px-4 md:px-5 md:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Speaker */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12 md:h-13 md:w-13">
                  <Image
                    src={speakerImage}
                    alt={speakerName}
                    fill
                    className="object-cover"
                    sizes="52px"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-medium text-[#202124] sm:text-[16px]">
                    {speakerName}
                  </h3>
                  <p className="truncate text-[13px] text-[#a3a7b2] sm:text-[14px]">
                    {speakerRole}
                  </p>
                </div>
              </div>

              {/* Time + Date */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-semibold text-[#202124] sm:gap-x-6 sm:text-[15px]">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  <span>{time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyEventsPage = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const events: EventItem[] = [
    {
      id: 1,
      title: "Starting Your Business Journey - Live Workshop",
      thumbnail: "/aibacknew.png",
      speakerName: "Ananya Kapoor",
      speakerRole: "Leadership Coach & Product Leader",
      speakerImage: "/giral.jpg",
      time: "05:30 pm",
      date: "25 Mar, 2026", // past example => enabled
    },
    {
      id: 2,
      title: "Starting Your Business Journey - Live Workshop",
      thumbnail: "/aibacknew.png",
      speakerName: "Ananya Kapoor",
      speakerRole: "Leadership Coach & Product Leader",
      speakerImage: "/giral.jpg",
      time: "05:30 pm",
      date: "27 Mar, 2026", // future example => disabled
    },
    {
      id: 3,
      title: "Starting Your Business Journey - Live Workshop",
      thumbnail: "/aibacknew.png",
      speakerName: "Ananya Kapoor",
      speakerRole: "Leadership Coach & Product Leader",
      speakerImage: "/giral.jpg",
      time: "08:00 pm",
      date: "28 Mar, 2026",
    },
  ];

  return (
    <main className="min-h-screen">
         <h2 className="text-[#121632] text-2xl font-bold">Upcoming Events</h2>
      <p className="text-[#8f91a0] text-xs mb-6">
        Join workshops, talks, and networking sessions designed for your growth
        stage.
      </p>
      <div className="mx-auto max-w-auto space-y-5">
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            now={now}
            joinOpensBeforeMinutes={0}
          />
        ))}
      </div>
    </main>
  );
};

export default MyEventsPage;
