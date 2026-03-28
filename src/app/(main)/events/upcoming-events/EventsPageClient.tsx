"use client";

import { useEffect, useMemo, useState } from "react";
import FilterSelect from "@/components/filters/FilterSelect";
import EventCard from "@/components/events/EventCard";
import RecommendedEventCard from "@/components/events/RecommendedEventCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchFutureEventsThunk,
  fetchRecommendedEventsThunk,
} from "@/features/events/events.thunks";
import { mapEventToCard } from "@/features/events/events.utils";
import EventCardSkeleton from "@/components/skeleton/EventCardSkeleton";
import RecommendedSkeleton from "@/components/skeleton/RecommendedSkeleton";


export default function EventsPageClient() {
  const dispatch = useAppDispatch();

  const { recommended, future, loadingRecommended, loadingFuture, error } =
    useAppSelector((s) => s.events);

  const [eventType, setEventType] = useState("");
  const [careerStage, setCareerStage] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    dispatch(fetchRecommendedEventsThunk());

    dispatch(fetchFutureEventsThunk({ limit: 9, page: 1 }));
  }, [dispatch]);

  const handleFilterChange = async (next: {
    event_type?: string;
    career_stage?: string;
    price?: string;
    language?: string;
  }) => {
    const finalFilters = {
      event_type: next.event_type ?? eventType,
      career_stage: next.career_stage ?? careerStage,
      price: next.price ?? price,
      language: next.language ?? language,
      limit: 9,
      page: 1,
    };

    await dispatch(fetchFutureEventsThunk(finalFilters));
  };

  const recommendedCards = useMemo(
    () => recommended.map(mapEventToCard),
    [recommended],
  );

  const futureCards = useMemo(() => future.map(mapEventToCard), [future]);

  return (
    <div className="w-full min-h-screen ">
      <h2 className="text-[#121632] text-2xl font-bold">Upcoming Events</h2>
      <p className="text-[#8f91a0] text-xs mb-6">
        Join workshops, talks, and networking sessions designed for your growth
        stage.
      </p>

      <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="flex flex-wrap gap-3 w-full">
          <FilterSelect
            placeholder="Event Type"
            value={eventType}
            onChange={(value) => {
              setEventType(value);
              handleFilterChange({ event_type: value });
            }}
            options={[
              { value: "WORKSHOP", label: "Workshop" },
              { value: "WEBINAR", label: "Webinar" },
              { value: "CONFERENCE", label: "Conference" },
              { value: "MEETUP", label: "Meetup" },
            ]}
          />

          <FilterSelect
            placeholder="Career Stage"
            value={careerStage}
            onChange={(value) => {
              setCareerStage(value);
              handleFilterChange({ career_stage: value });
            }}
            options={[
              { value: "STUDENT", label: "Student" },
              { value: "WORKING", label: "Working" },
              { value: "RETIRED", label: "Retired" },
            ]}
          />

          <FilterSelect
            placeholder="Price"
            value={price}
            onChange={(value) => {
              setPrice(value);
              handleFilterChange({ price: value });
            }}
            options={[
              { value: "FREE", label: "Free" },
              { value: "PAID", label: "Paid" },
            ]}
          />

          <FilterSelect
            placeholder="All Language"
            value={language}
            onChange={(value) => {
              setLanguage(value);
              handleFilterChange({ language: value });
            }}
            options={[
              { value: "en", label: "English" },
              { value: "hi", label: "Hindi" },
            ]}
          />
        </div>
      </div>

      <h6 className="text-[#121632] font-bold mt-6">Recommended</h6>
      {loadingRecommended ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <RecommendedSkeleton key={i} />
          ))}
        </div>
      ) : recommendedCards.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          No recommended events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {recommendedCards.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <h6 className="text-[#121632] font-bold mt-6">Featured Events</h6>
      {loadingFuture ? (
        // ✅ 1. Skeleton loading
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : futureCards.length === 0 ? (
        // ✅ 2. No data
        <p className="mt-3 text-sm text-gray-500">No events found.</p>
      ) : (
        // ✅ 3. Real data
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {futureCards.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
