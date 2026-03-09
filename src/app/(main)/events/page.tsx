// "use client";

// import EventCard from "@/components/EventCard";

// const events = [
//   {
//     id: "1",
//     title: "Starting Your Business Journey - Live Workshop",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978",
//     date: "12 Mar 2026, 5:00 PM",
//     category: "Workshop",
//     language: "Hindi",
//     members: 20,
//     price: 999,
//   },
//   {
//     id: "1",
//     title: "Starting Your Business Journey - Live Workshop",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978",
//     date: "12 Mar 2026, 5:00 PM",
//     category: "Workshop",
//     language: "Hindi",
//     members: 20,
//     price: 999,
//   },
//    {
//     id: "1",
//     title: "Starting Your Business Journey - Live Workshop",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978",
//     date: "12 Mar 2026, 5:00 PM",
//     category: "Workshop",
//     language: "Hindi",
//     members: 20,
//     price: 999,
//   },
//    {
//     id: "1",
//     title: "Starting Your Business Journey - Live Workshop",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978",
//     date: "12 Mar 2026, 5:00 PM",
//     category: "Workshop",
//     language: "Hindi",
//     members: 20,
//     price: 999,
//   },
//    {
//     id: "1",
//     title: "Starting Your Business Journey - Live Workshop",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978",
//     date: "12 Mar 2026, 5:00 PM",
//     category: "Workshop",
//     language: "Hindi",
//     members: 20,
//     price: 999,
//   },


//    {
//     id: "1",
//     title: "Starting Your Business Journey - Live Workshop",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978",
//     date: "12 Mar 2026, 5:00 PM",
//     category: "Workshop",
//     language: "Hindi",
//     members: 20,
//     price: 999,
//   },
// ];

// export default function Page() {
//   return (
//     <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {events.map((event) => (
//         <EventCard
//           key={event.id}
//           event={event}
//           onClick={() => console.log(event.title)}
//         />
//       ))}
//     </div>
//   );
// }

// src/app/(main)/events/page.tsx
"use client";

import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";
import type { Event, EventFilter as EventFilterType } from "@/types/event";
import { useState, useMemo } from "react";

const eventsData: Event[] = [
  {
    id: "1",
    title: "Starting Your Business Journey - Live Workshop",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "12 Mar 2026, 5:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 20,
    price: 999,
  },
  {
    id: "2",
    title: "Advanced React Patterns - Technical Webinar",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    date: "15 Mar 2026, 6:00 PM",
    category: "Webinar",
    language: "English",
    members: 45,
    price: 599,
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "18 Mar 2026, 4:00 PM",
    category: "Workshop",
    language: "Hindi",
    members: 30,
    price: 1299,
  },
  {
    id: "4",
    title: "Full Stack Development Bootcamp",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    date: "20 Mar 2026, 10:00 AM",
    category: "Bootcamp",
    language: "English",
    members: 15,
    price: 4999,
  },
  {
    id: "5",
    title: "Data Science Fundamentals",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    date: "22 Mar 2026, 3:00 PM",
    category: "Webinar",
    language: "Hindi",
    members: 35,
    price: 799,
  },
  {
    id: "6",
    title: "UI/UX Design Conference 2026",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    date: "25 Mar 2026, 9:00 AM",
    category: "Conference",
    language: "English",
    members: 120,
    price: 2499,
  },
];

export default function EventsPage() {
  const [filters, setFilters] = useState<EventFilterType>({
    category: "all",
    language: "all",
    priceRange: "all",
  });

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      // Category filter
      if (filters.category !== "all" && event.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Language filter
      if (filters.language !== "all" && event.language.toLowerCase() !== filters.language.toLowerCase()) {
        return false;
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        if (filters.priceRange === "free" && event.price !== 0) return false;
        if (filters.priceRange === "0-500" && (event.price < 0 || event.price > 500)) return false;
        if (filters.priceRange === "500-1000" && (event.price < 500 || event.price > 1000)) return false;
        if (filters.priceRange === "1000-5000" && (event.price < 1000 || event.price > 5000)) return false;
        if (filters.priceRange === "5000+" && event.price < 5000) return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilter = (newFilters: EventFilterType) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      category: "all",
      language: "all",
      priceRange: "all",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Upcoming Events
          </h1>
          <p className="text-gray-600">
            Discover and join amazing learning events happening around you
          </p>
        </div>

        {/* Main Container */}
        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <aside className="w-80 flex-shrink-0">
            <EventFilter onFilter={handleFilter} onReset={handleReset} />
          </aside>

          {/* Events Grid */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                Showing {filteredEvents.length} of {eventsData.length} events
              </p>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => {
                      console.log("Event clicked:", event.title);
                      // Add navigation or modal logic here
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No events found matching your filters.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}