"use client";

import Image from "next/image";
import { MdEventNote } from "react-icons/md";
import { FiClock, FiChevronRight, FiChevronLeft } from "react-icons/fi";

type Event = {
  title: string;
  date: string;
  time: string;
  mode: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  coverImage: string;
};

export default function UpcomingEvents() {
  const event: Event = {
    title: "Mastering Influence in Tech Leadership",
    date: "17 April 2026",
    time: "11:00 AM",
    mode: "Leadership Workshop • Online",
    hostName: "Anita Verma",
    hostRole: "Leadership Coach",
    hostAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <section className="flex h-full w-full flex-col rounded-2xl bg-card p-5  ring-border bg-white">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-black text-foreground">Upcoming Events</h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent transition-colors"
          >
            <FiChevronLeft className="text-lg" />
          </button>

          <button
            type="button"
            aria-label="Next"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent transition-colors"
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-card">

        {/* Cover Image */}
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={event.coverImage}
            alt={event.title}
            width={600}
            height={300}
            className="h-44 w-full object-cover"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-1 pt-4">
          
          <div className="text-[15px] font-black leading-snug text-foreground line-clamp-2">
            {event.title}
          </div>

          {/* Date + Time */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FiClock className="text-sm" />
              {event.date}
            </span>

            <span className="opacity-50">•</span>

            <span className="inline-flex items-center gap-1.5">
              <MdEventNote className="text-base" />
              {event.time}
            </span>
          </div>

          <div className="mt-2 text-xs font-medium text-muted-foreground">
            {event.mode}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            
            <div className="flex min-w-0 items-center gap-2.5">
              <Image
                src={event.hostAvatar}
                alt={event.hostName}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />

              <div className="min-w-0">
                <div className="truncate text-xs font-black text-foreground">
                  {event.hostName}
                </div>

                <div className="truncate text-[11px] font-medium text-muted-foreground">
                  {event.hostRole}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-black text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Details
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}