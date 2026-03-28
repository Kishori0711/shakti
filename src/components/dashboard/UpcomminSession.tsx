"use client";

import SessionCard from "@/components/SessionCard";
import { useRouter } from "next/navigation";

const mockSessions = [
  {
    name: "Rahul Sharma",
    role: "Career Mentor",
    image: "/aiback.jpg",
    duration: "45 min",
    time: "10:00 AM",
    date: "25 Mar 2026",
    isLive: true,
  },
  {
    name: "Anjali Verma",
    role: "Soft Skills Coach",
    image: "/aiback.jpg",
    duration: "30 min",
    time: "12:30 PM",
    date: "26 Mar 2026",
    isLive: false,
  },
  {
    name: "Amit Singh",
    role: "Tech Mentor",
    image: "/aiback.jpg",
    duration: "60 min",
    time: "3:00 PM",
    date: "27 Mar 2026",
    isLive: true,
  },
];

const UpcomminSession = () => {
  const router = useRouter();

  return (
    <section className="bg-white border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          Upcoming Sessions
        </h2>
      </div>

      {/* Use lg:grid-cols-2 instead of md:grid-cols-2 to avoid cramped cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {mockSessions.map((session, index) => (
          <SessionCard
            key={index}
            {...session}
            onVideoCall={() => console.log("Join", session.name)}
            onReschedule={() => console.log("Reschedule", session.name)}
            onCancel={() => console.log("Cancel", session.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomminSession;