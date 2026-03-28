"use client";

import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import FilterSelect from "@/components/filters/FilterSelect";
import { useState } from "react";
import MentorCard from "@/components/mentors/MentoreCard";
import RecommendedMentoreCard from "@/components/mentors/RecommendedMentoreCard";

type Mentor = {
  id: string;
  name: string;
  avatar: string;
  expertise: string;
  experience?: string;
  languages?: string;
  sessions?: number;
  reviews?: number;
  isTopMentor?: boolean;
  isVerified?: boolean;
  sessionPrice?: number;
};

type Props = {
  mentors: Mentor[];
};

const mentorData: Mentor[] = [
  {
    id: "1",
    name: "Ananya Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    expertise: "Leadership Coach & Product Leader",
    experience: "12+ years",
    languages: "Hindi, English, Marathi",
    sessions: 187,
    reviews: 145,
    isTopMentor: true,
    isVerified: true,
    sessionPrice: 2500,
  },
  {
    id: "2",
    name: "Priya Mehta",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    expertise: "Financial Advisor",
    experience: "10+ years",
    languages: "Hindi, English",
    sessions: 150,
    reviews: 120,
    isVerified: true,
    sessionPrice: 2000,
  },
  {
    id: "3",
    name: "Priya Mehta",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    expertise: "Financial Advisor",
    experience: "10+ years",
    languages: "Hindi, English",
    sessions: 150,
    reviews: 120,
    isVerified: true,
    sessionPrice: 2000,
  },
  {
    id: "4",
    name: "Priya Mehta",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    expertise: "Financial Advisor",
    experience: "10+ years",
    languages: "Hindi, English",
    sessions: 150,
    reviews: 120,
    isVerified: true,
    sessionPrice: 2000,
  },
  {
    id: "5",
    name: "Priya Mehta",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    expertise: "Financial Advisor",
    experience: "10+ years",
    languages: "Hindi, English",
    sessions: 150,
    reviews: 120,
    isVerified: true,
    sessionPrice: 2000,
  },
  {
    id: "6",
    name: "Priya Mehta",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    expertise: "Financial Advisor",
    experience: "10+ years",
    languages: "Hindi, English",
    sessions: 150,
    reviews: 120,
    isVerified: true,
    sessionPrice: 2000,
  },
];

export default function MentorsPage() {
  const [durations, setDurations] = useState("");
  const [skills, setSkills] = useState("");

  return (
    <div className="w-full min-h-screen p-3">
      <h2 className="text-[#121632] text-2xl font-bold">Find Your Mentor</h2>
      <p className="text-[#8f91a0] text-xs mb-6">
        Book 1:1 sessions with experienced professionals aligned to your goals.
      </p>
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="w-full md:max-w-sm">
          <Input placeholder="Search courses..." icon={FiSearch} />
        </div>
        <div className="flex flex-wrap gap-3 xl:ml-auto w-full xl:w-auto">
          <FilterSelect
            placeholder="All Durations"
            value={durations}
            onChange={setDurations}
            options={[
              { value: "en", label: "English" },
              { value: "hi", label: "Hindi" },
              { value: "es", label: "Spanish" },
            ]}
          />

          <FilterSelect
            placeholder="All Skills"
            value={skills}
            onChange={setSkills}
            options={[
              { value: "career", label: "Career Growth" },
              { value: "tech", label: "Technology" },
              { value: "business", label: "Business" },
            ]}
          />
        </div>
      </div>

      <h6 className="text-[#121632] font-bold mt-6">Recommended Mentors</h6>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-2">
        {mentorData.slice(0, 2).map((mentore) => (
          <RecommendedMentoreCard key={mentore.id} mentor={mentore} />
        ))}
      </div>
      <h6 className="text-[#121632] font-bold mt-6">Feature Mentors</h6>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-2">
        {mentorData.map((mentore) => (
          <MentorCard key={mentore.id} mentor={mentore} />
        ))}
      </div>
    </div>
  );
}
