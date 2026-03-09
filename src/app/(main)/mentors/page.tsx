"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import crown_mentor from "@/assets/crown_mentor.svg";
import verify from "@/assets/verify.svg";
import recommended from "@/assets/recommended.svg";
import group from "@/assets/Group.svg";
import language_skill from "@/assets/language-skill.svg";
import solar_medal_star_linear from "@/assets/solar_medal-star-linear.svg";

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
  isRecommended?: boolean;
  sessionPrice?: number;
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
    isRecommended: true,
    sessionPrice: 2500,
  },
  {
    id: "2",
    name: "Dr. Priya Mehta",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    expertise: "Financial Advisor HDFC Bank",
    experience: "12+ years",
    languages: "Hindi, English, Marathi",
    sessions: 187,
    reviews: 145,
    isVerified: true,
    sessionPrice: 2500,
  },
];

export default function MentorsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Find Your Mentor</h2>
      <p className="text-xs text-muted-foreground">
        Book 1:1 sessions with experienced professionals aligned to your goals.
      </p>

      {/* search */}
      <div className="mt-4 flex items-center gap-3">
        <input
          placeholder="Search mentor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-80"
        />
        <FiSearch />
      </div>

      {/* cards */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mentorData.map((mentor) => (
          <article
            key={mentor.id}
            className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-4">
              
              {/* image */}
              <div className="relative h-[180px] w-[180px] overflow-hidden rounded-xl">
                <Image
                  src={mentor.avatar}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                />

                {mentor.isTopMentor && (
                  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Image src={crown_mentor} alt="" width={10} height={10} />
                    Top Mentor
                  </span>
                )}
              </div>

              {/* content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{mentor.name}</h3>

                      {mentor.isVerified && (
                        <Image src={verify} alt="" width={20} height={20} />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {mentor.expertise}
                    </p>
                  </div>

                  {mentor.isRecommended && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-3 text-sm">
                  {mentor.experience} • {mentor.languages}
                </div>

                <div className="mt-3 text-sm">
                  {mentor.sessions} Sessions ({mentor.reviews} Reviews)
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">
                    ₹{mentor.sessionPrice}
                  </span>

                  <button
                    onClick={() => router.push(`/mentorProfile/${mentor.id}`)}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}