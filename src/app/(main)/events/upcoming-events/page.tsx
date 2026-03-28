// "use client";





// import { useState } from "react";
// import FilterSelect from "@/components/filters/FilterSelect";
// import EventCard from "@/components/events/EventCard";
// import RecommendedEventCard from "@/components/events/RecommendedEventCard";

// const events = [
//   {
//     id: "1",
//     title: "Starting Your Business Journey – Live Workshop",
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
//     date: "12 Mar 2026 · 5:00 PM",
//     mentorName: "Ananya Kapoor",
//     mentorRole: "Leadership Coach & Product Leader",
//     mentorAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     price: 999,
//   },

//   {
//     id: "2",
//     title: "Starting Your Business Journey – Live Workshop",
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
//     date: "12 Mar 2026 · 5:00 PM",
//     mentorName: "Ananya Kapoor",
//     mentorRole: "Leadership Coach & Product Leader",
//     mentorAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     price: 999,
//   },
//   {
//     id: "3",
//     title: "Starting Your Business Journey – Live Workshop",
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
//     date: "12 Mar 2026 · 5:00 PM",
//     mentorName: "Ananya Kapoor",
//     mentorRole: "Leadership Coach & Product Leader",
//     mentorAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     price: 999,
//   },
//   {
//     id: "4",
//     title: "Starting Your Business Journey – Live Workshop",
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
//     date: "12 Mar 2026 · 5:00 PM",
//     mentorName: "Ananya Kapoor",
//     mentorRole: "Leadership Coach & Product Leader",
//     mentorAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     price: 999,
//     recommended: true,
//   },
//   {
//     id: "5",
//     title: "Women Startup Networking Session",
//     image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
//     date: "15 Mar 2026 · 6:00 PM",
//     mentorName: "Priya Sharma",
//     mentorRole: "Startup Mentor",
//     mentorAvatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
//     price: 0,
//     recommended: true,
//   },
//   {
//     id: "6",
//     title: "Marketing Basics for Entrepreneurs",
//     image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
//     date: "18 Mar 2026 · 4:00 PM",
//     mentorName: "Rahul Mehta",
//     mentorRole: "Growth Strategist",
//     mentorAvatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//     price: 499,
//     recommended: false,
//   },
// ];

// const Page = () => {
//   const [language, setLanguage] = useState("");
//   const [category, setCategory] = useState("");
//   const [levels, setLevels] = useState("");
//   const [sortbyPopular, setSortbyPopular] = useState("");

//   return (
//     <div className="w-full min-h-screen p-3">
//       <h2 className="text-[#121632] text-2xl font-bold"> Upcoming Events</h2>
//       <p className="text-[#8f91a0] text-xs mb-6">
//         Join workshops, talks, and networking sessions designed for your growth
//         stage.
//       </p>

//       <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
//         <div className="flex flex-wrap gap-3 w-full">
//           <FilterSelect
//             placeholder="Event Type"
//             value={language}
//             onChange={setLanguage}
//             options={[
//               { value: "popular", label: "Most Popular" },
//               { value: "newest", label: "Newest" },
//               { value: "price-low", label: "Price: Low to High" },
//               { value: "price-high", label: "Price: High to Low" },
//             ]}
//           />

//           <FilterSelect
//             placeholder="Career Stage"
//             value={category}
//             onChange={setCategory}
//             options={[
//               { value: "career", label: "Career Growth" },
//               { value: "tech", label: "Technology" },
//               { value: "business", label: "Business" },
//             ]}
//           />

//           <FilterSelect
//             placeholder="Price"
//             value={levels}
//             onChange={setLevels}
//             options={[
//               { value: "beginner", label: "Beginner" },
//               { value: "intermediate", label: "Intermediate" },
//               { value: "advanced", label: "Advanced" },
//             ]}
//           />

//           <FilterSelect
//             placeholder="All Language"
//             value={sortbyPopular}
//             onChange={setSortbyPopular}
//             options={[
//               { value: "en", label: "English" },
//               { value: "hi", label: "Hindi" },
//               { value: "es", label: "Spanish" },
//             ]}
//           />
//         </div>
//       </div>

//       {/* COURSE GRID */}
//       <h6 className="text-[#121632] font-bold mt-6">Recommended</h6>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
//         {events.slice(0, 3).map((event) => (
//           <RecommendedEventCard
//             key={event.id}
//             event={event}
//             onClick={() => console.log(event.title)}
//           />
//         ))}
//       </div>

//       <h6 className="text-[#121632] font-bold mt-6">Featured Events</h6>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
//         {events.map((event) => (
//           <EventCard
//             key={event.id}
//             event={event}
//             onClick={() => console.log(event.title)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;

import EventsPageClient from "./EventsPageClient";
export default function EventsPage() {
  return <EventsPageClient/>;
}