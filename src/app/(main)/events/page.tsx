"use client";

import EventCard from "@/components/EventCard";

const events = [
  {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },
  {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },
   {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },
   {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },
   {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },


   {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },
];

export default function Page() {
  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => console.log(event.title)}
        />
      ))}
    </div>
  );
}