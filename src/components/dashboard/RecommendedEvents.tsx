// "use client";

// import Image from "next/image";
// import { MdEventNote } from "react-icons/md";
// import { FiClock, FiChevronRight, FiChevronLeft } from "react-icons/fi";
// import { useState } from "react";
// import { useTranslation } from "@/hooks/useTranslation";

// type Event = {
//   title: string;
//   date: string;
//   time: string;
//   mode: string;
//   hostName: string;
//   hostRole: string;
//   hostAvatar: string;
//   coverImage: string;
// };

// const RecommendedEvents = () => {
//   const events: Event[] = [
//     {
//       title: "Mastering Influence in Tech Leadership",
//       date: "17 April 2026",
//       time: "11:00 AM",
//       mode: "Leadership Workshop • Online",
//       hostName: "Anita Verma",
//       hostRole: "Leadership Coach",
//       hostAvatar:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
//       coverImage:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       title: "Women in Tech: Breaking the Glass Ceiling",
//       date: "22 April 2026",
//       time: "2:00 PM",
//       mode: "Panel Discussion • Hybrid",
//       hostName: "Priya Singh",
//       hostRole: "Tech Executive",
//       hostAvatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
//       coverImage:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       title: "Entrepreneurship Essentials for Women",
//       date: "28 April 2026",
//       time: "10:00 AM",
//       mode: "Webinar • Online",
//       hostName: "Neha Kapoor",
//       hostRole: "Business Mentor",
//       hostAvatar:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
//       coverImage:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const { t, loading } = useTranslation();

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
//   };

//   const event = events[currentIndex];

//   return (
//     <section className="flex h-full w-full flex-col rounded-2xl p-5 border border-border bg-white">
//       {/* Header */}
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-lg font-bold text-foreground">
//           {loading ? "Loading..." : t("RecommendedEvents")}
//         </h2>

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={handlePrevious}
//             aria-label="Previous"
//             className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent transition-colors hover:text-white"
//           >
//             <FiChevronLeft className="text-lg" />
//           </button>

//           <button
//             type="button"
//             onClick={handleNext}
//             aria-label="Next"
//             className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent transition-colors hover:text-white"
//           >
//             <FiChevronRight className="text-lg" />
//           </button>
//         </div>
//       </div>

//       {/* Card */}
//       <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-card">
//         {/* Cover Image */}
//         <div className="overflow-hidden rounded-2xl flex-shrink-0">
//           <Image
//             src={event.coverImage}
//             alt={event.title}
//             width={600}
//             height={300}
//             className="h-44 w-full object-cover"
//             priority={currentIndex === 0}
//           />
//         </div>

//         <div className="flex min-h-0 flex-1 flex-col px-1 pt-4">
//           {/* Title */}
//           <div className="text-[15px] font-black leading-snug text-foreground line-clamp-2">
//             {event.title}
//           </div>

//           {/* Date + Time */}
//           <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
//             <span className="inline-flex items-center gap-1.5 flex-shrink-0">
//               <MdEventNote className="text-base flex-shrink-0" />
//               {event.date}
//             </span>

//             <span className="opacity-50">•</span>

//             <span className="inline-flex items-center gap-1.5 flex-shrink-0">
//               <FiClock className="text-base flex-shrink-0" />
//               {event.time}
//             </span>
//           </div>

//           <div className="mt-2 text-xs font-medium text-muted-foreground">
//             {event.mode}
//           </div>

//           {/* Footer */}
//           <div className="mt-auto flex items-center justify-between gap-3 pt-4 flex-shrink-0">
//             {/* Host Info */}
//             <div className="flex min-w-0 items-center gap-2.5">
//               <Image
//                 src={event.hostAvatar}
//                 alt={event.hostName}
//                 width={36}
//                 height={36}
//                 className="h-9 w-9 shrink-0 rounded-full object-cover"
//               />

//               <div className="min-w-0">
//                 <div className="truncate text-xs font-black text-foreground">
//                   {event.hostName}
//                 </div>

//                 <div className="truncate text-[11px] font-medium text-muted-foreground">
//                   {event.hostRole}
//                 </div>
//               </div>
//             </div>

//             {/* Button */}
//             <button
//               type="button"
//               className="shrink-0 rounded-lg bg-primary-500 px-4 py-2 text-xs font-black text-white hover:bg-primary-600 transition-colors"
//             >
//               Get Details
//             </button>
//           </div>

//           {/* Indicator */}
//           <div className="mt-3 flex justify-center gap-1.5 flex-shrink-0">
//             {events.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   index === currentIndex
//                     ? "bg-primary w-6"
//                     : "bg-border hover:bg-muted-foreground w-1.5"
//                 }`}
//                 aria-label={`Go to event ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecommendedEvents;

"use client";

import Image from "next/image";
import { MdEventNote } from "react-icons/md";
import { FiClock, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "../ui/button";

type Event = {
  title: string;
  date: string;
  time: string;
  mode: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  coverImage: string;
};

const RecommendedEvents = () => {
  const events: Event[] = [
    {
      title: "Mastering Influence in Tech Leadership",
      date: "17 April 2026",
      time: "11:00 AM",
      mode: "Leadership Workshop • Online",
      hostName: "Anita Verma",
      hostRole: "Leadership Coach",
      hostAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      coverImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Women in Tech: Breaking the Glass Ceiling",
      date: "22 April 2026",
      time: "2:00 PM",
      mode: "Panel Discussion • Hybrid",
      hostName: "Priya Singh",
      hostRole: "Tech Executive",
      hostAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
      coverImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Entrepreneurship Essentials for Women",
      date: "28 April 2026",
      time: "10:00 AM",
      mode: "Webinar • Online",
      hostName: "Neha Kapoor",
      hostRole: "Business Mentor",
      hostAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      coverImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, loading } = useTranslation();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const event = events[currentIndex];

  return (
    <section className="flex flex-col rounded-2xl p-5 border border-border bg-white h-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          {loading ? "Loading..." : t("RecommendedEvents")}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous event"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <FiChevronLeft className="text-lg" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next event"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-card">
        {/* Cover Image */}
        <div className="overflow-hidden rounded-2xl flex-shrink-0">
          <Image
            src={event.coverImage}
            alt={event.title}
            width={600}
            height={300}
            className="h-40 sm:h-44 w-full object-cover"
            priority={currentIndex === 0}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 sm:px-5 pt-4">
          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold leading-snug text-foreground line-clamp-2">
            {event.title}
          </h3>

          {/* Date + Time */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 flex-shrink-0">
              <MdEventNote className="text-base flex-shrink-0" />
              {event.date}
            </span>

            <span className="opacity-50">•</span>

            <span className="inline-flex items-center gap-1.5 flex-shrink-0">
              <FiClock className="text-base flex-shrink-0" />
              {event.time}
            </span>
          </div>

          <div className="mt-2 text-xs font-medium text-muted-foreground">
            {event.mode}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-2 pt-4 flex-shrink-0">
            {/* Host Info */}
            <div className="flex min-w-0 items-center gap-2">
              <Image
                src={event.hostAvatar}
                alt={event.hostName}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />

              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-foreground">
                  {event.hostName}
                </div>

                <div className="truncate text-xs font-medium text-muted-foreground">
                  {event.hostRole}
                </div>
              </div>
            </div>

            {/* Button */}
            <Button
              size="sm"
              className="shrink-0 rounded-lg bg-primary-500 px-3 sm:px-4 py-2 text-xs font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Get Details
            </Button>
          </div>

          {/* Indicator */}
          <div className="mt-3 flex justify-center gap-1.5 flex-shrink-0">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-border hover:bg-muted-foreground w-1.5"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
