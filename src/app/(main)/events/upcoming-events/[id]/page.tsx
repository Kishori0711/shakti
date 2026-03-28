"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EventHero from "@/components/events/EventHero";
import EventInfoCard from "@/components/events/EventInfoCard";
import EventSpeaker from "@/components/events/EventSpeaker";
import BackButton from "@/components/BackButton";
import { TwoColumnSection } from "@/components/TwoColumnSection";
import { getEventByIdApi } from "@/features/events/events.api";
import type { EventDetailResponse } from "@/features/events/events.types";

const formatEnum = (value?: string | null) => {
  if (!value) return "";
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatLanguage = (value?: string | null) => {
  const map: Record<string, string> = {
    hi: "Hindi",
    en: "English",
  };
  return map[value || ""] || value || "";
};

const formatDate = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (value?: string | null) => {
  if (!value) return "";
  const [hour, minute] = value.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function EventDetailsPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => { 
      try {
        setLoading(true);
        setPageError(null);

        const data = await getEventByIdApi(eventId);
        setEvent(data);
      } catch (error: any) {
        setPageError(error?.message || "Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const firstSpeaker = event?.speakers?.[0];

  const heroImage = useMemo(() => {
    if (!event) return "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200";
    return (
      event.banner_image 
    );
  }, [event, firstSpeaker]);

  const openPayment = () => {
    if (!event) return;
    setRegisterLoading(true);
    router.push(`/payment/events/${event.id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading event details...</p>
      </div>
    );
  }

  if (pageError || !event) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="text-sm text-gray-500">
            {pageError || "Event not found"}
          </p>
          <button
            onClick={() => router.push("/events")}
            className="rounded-lg bg-primary px-4 py-2 text-white"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <BackButton label="Back to Events" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-2">
          <EventHero
             event_type={event.event_type ?? ""}
            image={heroImage}
            title={event.title}
            description={event.description}
            badgeText={
              event.is_recommended
                ? "Recommended"
                : formatEnum(event.event_type)
            }
          />

          <TwoColumnSection 
            leftColumnTitle="What You'll Learn"
            leftColumnItems={event.what_you_will_learn || []}
            rightColumnTitle="Who Should Attend"
            rightColumnItems={event.who_should_attend || []}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="h-fit space-y-6 lg:sticky lg:top-0.5">
              <EventInfoCard
            price={Number(event.price || 0)}
            seatsLeft={event.capacity_remaining}
            totalSeats={event.capacity}
            eventDate={formatDate(event.event_date)}
            eventTime={`${formatTime(event.start_time)} - ${formatTime(event.end_time)}`}
            format={formatEnum(event.format)}
            language={formatLanguage(event.language)}
            onRegister={openPayment}
            loading={registerLoading}
            disabled={!!event.is_registered || event.capacity_remaining <= 0}
          />

          {firstSpeaker && (
            <EventSpeaker
              name={`${firstSpeaker.first_name || ""} ${firstSpeaker.last_name || ""}`.trim()}
              role={formatEnum(event.event_type) || "Speaker"}
              avatar={
                firstSpeaker.profile_photo_url ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              }
              // email={firstSpeaker.email || undefined}
              // phone={firstSpeaker.phone || undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}