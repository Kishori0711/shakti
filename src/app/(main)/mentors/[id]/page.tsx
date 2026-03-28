"use client";

import type React from "react";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import MentorHero from "@/components/mentors/MentoreHero";
import { TwoColumnSection } from "@/components/TwoColumnSection";
import MentoreSessionInfo from "@/components/mentors/MentoreSessionInfo";
import AvailabilitySection from "@/components/mentors/AvailabilitySection";
import ExperienceSection from "@/components/mentors/Ex";
import MentorFollow from "@/components/mentors/MentorFollow";
type Props = {
  params: { id: string };
};

// Demo Data
const highlights = [
  "Learn how to start a business",
  "Networking with entrepreneurs",
  "Live Q&A with experts",
];

export default function EventDetails({ params }: Props): React.ReactElement {
  return (
   <div className="p-2">
      <BackButton label="Back to Mentors" />

     <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
      <div className="space-y-6 lg:col-span-2">
          {/* Mentor Hero Section */}
          <MentorHero
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop"
            name="Ananya Kapoor"
            title="Leadership Coach & Product Leader"
            experience="12+ years"
            languages="Hindi, English, Marathi"
            location="Mumbai, India"
            tags={["Structured", "Practical", "Goal-Oriented"]}
            sessions={187}
            reviews={145}
            isTopMentor={true}
            isVerified={true}
          />

          {/* Overview Section */}
          <TwoColumnSection
            title="About"
            description="Starting Your Business Journey is a structured, beginner-to-advanced course designed to help women turn ideas into viable businesses. The course focuses on practical decision-making, market understanding, financial basics, and customer growth, using simple frameworks and real-world examples."
            leftColumnTitle="Areas of Expertise"
            leftColumnItems={highlights}
          />
        </div>

        {/* RIGHT SIDE */}
       <div className="h-fit space-y-6 lg:sticky lg:top-0.5">
          <MentorFollow
            image=""
            name="Ananya Kapoor"
            onFollow={() => {}}
            isFollowed={false}
          />
          <MentoreSessionInfo
            title="1:1 Mentor Session"
            duration={45}
            type="video"
            price={2500}
            currency="₹"
            onBook={() => {}}
          />
          <AvailabilitySection
            title="Availability"
            nextSlot="Next Slot"
            timeRange="20 Feb 2025 - 9:00-4:30 PM"
            onCheckAvailability={() => {}}
          />

          <ExperienceSection
            title="Experience"
            experiences={[
              {
                title: "Business Coach & Consultant",
                company: "ABC Company",
                duration: "2020 - present",
              },
              {
                title: "Business Coach & Consultant",
                company: "ABC Company",
                duration: "2020 - present",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
