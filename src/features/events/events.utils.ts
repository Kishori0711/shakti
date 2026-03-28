import { EventApiItem, EventCardItem, EventFilters } from "./events.types";

export function formatEventDate(date: string, time: string) {
  try {
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = time
      ? new Date(`1970-01-01T${time}`).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "";

    return `${formattedDate} · ${formattedTime}`;
  } catch {
    return date;
  }
}

export function mapEventToCard(event: EventApiItem): EventCardItem {
  const firstSpeaker = event.speakers?.[0];

  const mentorName =
    [firstSpeaker?.first_name, firstSpeaker?.last_name]
      .filter(Boolean)
      .join(" ") || "Speaker TBA";

  return {
    id: event.id,
    title: event.title,
    image: event.banner_image || "https://picsum.photos/800/500",
    date: formatEventDate(event.event_date, event.start_time),
    mentorName,
    mentorRole: event.event_type || event.format || "Event Speaker",
    mentorAvatar:
      firstSpeaker?.profile_photo_url ||
      "https://picsum.photos/100/100",
    price: Number(event.price || 0),
  };
}

export function buildEventQuery(params?: EventFilters) {
  if (!params) return "";

  const sp = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "ALL" &&
      value !== "all"
    ) {
      sp.set(key, String(value));
    }
  });

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}