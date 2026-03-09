"use client";

import Image from "next/image";
import { Users, Calendar } from "lucide-react";

type Event = {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  language: string;
  members: number;
  price: number;
};

type Props = {
  event: Event;
  onClick?: () => void;
};

const EventCard: React.FC<Props> = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition p-4"
    >
      {/* Image */}
      <div className="relative h-52 w-full rounded-lg overflow-hidden mb-4">
        <Image src={event.image} alt={event.title} fill className="object-cover" />

        {/* Date */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
          <Calendar size={14} />
          {event.date}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-2">
        <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-md text-sm">
          {event.category}
        </span>

        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
          {event.language}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-4">{event.title}</h3>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users size={16} />
          {event.members} members
        </div>

        <span className="text-purple-700 font-bold">₹{event.price}</span>
      </div>
    </div>
  );
};

export default EventCard;