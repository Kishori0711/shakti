// "use client";

// import Image from "next/image";
// import { Users, Calendar } from "lucide-react";

// type Event = {
//   id: string;
//   title: string;
//   image: string;
//   date: string;
//   category: string;
//   language: string;
//   members: number;
//   price: number;
// };

// type Props = {
//   event: Event;
//   onClick?: () => void;
// };

// const EventCard: React.FC<Props> = ({ event, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition p-4"
//     >
//       {/* Image */}
//       <div className="relative h-52 w-full rounded-lg overflow-hidden mb-4">
//         <Image src={event.image} alt={event.title} fill className="object-cover" />

//         {/* Date */}
//         <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
//           <Calendar size={14} />
//           {event.date}
//         </div>
//       </div>

//       {/* Tags */}
//       <div className="flex gap-2 mb-2">
//         <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-md text-sm">
//           {event.category}
//         </span>

//         <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
//           {event.language}
//         </span>
//       </div>

//       {/* Title */}
//       <h3 className="font-semibold text-lg mb-4">{event.title}</h3>

//       {/* Footer */}
//       <div className="flex justify-between items-center text-sm">
//         <div className="flex items-center gap-2 text-muted-foreground">
//           <Users size={16} />
//           {event.members} members
//         </div>

//         <span className="text-purple-700 font-bold">₹{event.price}</span>
//       </div>
//     </div>
//   );
// };

// export default EventCard;



// src/components/EventCard.tsx
'use client';

import Image from 'next/image';
import { MapPin, Users, Calendar, Tag } from 'lucide-react';
import type { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {event.category}
        </div>
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ₹{event.price}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold line-clamp-2 text-gray-800 group-hover:text-blue-600 transition">
          {event.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{event.date}</span>
        </div>

        {/* Language & Members Row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-4 h-4" />
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              {event.language}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium">{event.members} joined</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}