import { apiFetch } from "@/lib/server/api";
import {
  EventFilters,
  EventListResponse,
  EventDetailResponse,
} from "./events.types";
import { buildEventQuery } from "./events.utils";

export async function getRecommendedEventsServer() {
  return apiFetch<EventListResponse>("/api/v1/events/recommended");
}

export async function getFutureEventsServer(params?: EventFilters) {
  return apiFetch<EventListResponse>(
    
    `/api/v1/events/feature${buildEventQuery(params)}`
  );
}

export async function getEventByIdServer(id: string) {
  return apiFetch<EventDetailResponse>(`/api/v1/events/${id}`);
}