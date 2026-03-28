import api from "@/lib/client/mainApi";
import {
  EventFilters,
  EventListResponse,
  EventDetailResponse,
} from "./events.types";

export async function getRecommendedEventsApi() {
  const res = await api.get<EventListResponse>("/api/v1/events/recommended");
  console.log(res, "rahul");
  return res.data;
}

export async function getFutureEventsApi(params?: EventFilters) {
  const res = await api.get<EventListResponse>("/api/v1/events/feature", {
    params,
  });
  return res.data;
}

export async function getEventByIdApi(id: string) {
  const res = await api.get<EventDetailResponse>(`/api/v1/events/${id}`);
  return res.data;
}
