// "use client";

// import Image from "next/image";
// import { Briefcase, Globe, Clock } from "lucide-react";
// import { useTranslation } from "@/hooks/useTranslation";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// type Mentor = {
//   id: string;
//   name: string;
//   image: string;
//   role: string;
//   experience: string;
//   languages: string[];
//   sessions: number;
//   reviews: number;
//   price: number;
// };

// const mentors: Mentor[] = [
//   {
//     id: "1",
//     name: "Pooja Sharma",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     role: "Senior Engineering Manager",
//     experience: "12+ years",
//     languages: ["Hindi", "English", "Marathi"],
//     sessions: 187,
//     reviews: 145,
//     price: 2500,
//   },
//   {
//     id: "2",
//     name: "Dr. Priya Mehta",
//     image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
//     role: "CTO & Startup Advisor",
//     experience: "12+ years",
//     languages: ["Hindi", "English", "Marathi"],
//     sessions: 187,
//     reviews: 145,
//     price: 3000,
//   },
//   {
//     id: "3",
//     name: "Anita Sinha",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
//     role: "Product Management Mentor",
//     experience: "12+ years",
//     languages: ["Hindi", "English", "Marathi"],
//     sessions: 187,
//     reviews: 145,
//     price: 2200,
//   },
// ];

// export default function RecommendedMentors() {
//   const { t, loading } = useTranslation();
//   const router = useRouter();
//   return (
//     <section className="w-full bg-white border border-border rounded-2xl p-4">
//       <div className="flex flex-col gap-2 mb-6">
//         <div className="flex items-baseline justify-between w-full">
//           <h2 className="text-base sm:text-xl font-bold text-gray-900">
//             {loading ? "Loading..." : t("mentorsRecommendedforYou")}
//           </h2>
//           <Button
//             variant="link"
//             onClick={() => router.push("/actions")}
//             className="text-sm font-medium text-primary-500"
//           >
//             {loading ? "Loading..." : t("viewAllMentors")}
//           </Button>
//         </div>
//         <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
//           {loading ? "Loading..." : t("careerAlignedProfessionals")}
//         </p>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//         {mentors.map((mentor) => (
//           <MentorCard key={mentor.id} mentor={mentor} />
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------- Mentor Card ---------------- */

// function MentorCard({ mentor }: { mentor: Mentor }) {
//   return (
//     <div className="bg-white border border-border rounded-xl p-4  hover:shadow-md transition">
//       {/* Image */}
//       <div className="relative w-full h-44 rounded-lg overflow-hidden mb-4">
//         <Image
//           src={mentor.image}
//           alt={mentor.name}
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Name */}
//       <h3 className="font-semibold text-base flex items-center gap-2">
//         {mentor.name}
//         <span className="text-orange-500 text-sm">✔</span>
//       </h3>

//       {/* Role */}
//       <p className="text-sm text-muted mb-3">{mentor.role}</p>

//       {/* Experience */}
//       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
//         <Briefcase size={16} />
//         {mentor.experience}
//       </div>

//       {/* Languages */}
//       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
//         <Globe size={16} />
//         {mentor.languages.join(", ")}
//       </div>

//       {/* Sessions */}
//       <div className="flex items-center gap-2 text-sm mb-4">
//         <Clock size={16} className="text-muted-foreground" />

//         <span className="text-muted-foreground">{mentor.sessions} Session</span>

//         <span className="text-muted">({mentor.reviews} Reviews)</span>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between">
//         <span className="text-primary-600 font-semibold text-lg">
//           ₹{mentor.price.toLocaleString()}
//         </span>

//         <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded-lg">
//           Book Session
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Briefcase, Globe, Clock, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LuBadgeCheck } from "react-icons/lu";
import group from "@/assets/Group.svg";
import language_skill from "@/assets/language-skill.svg";
import solar_medal_star_linear from "@/assets/solar_medal-star-linear.svg";
type Mentor = {
  id: string;
  name: string;
  image: string;
  role: string;
  experience: string;
  languages: string[];
  sessions: number;
  reviews: number;
  price: number;
};

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Pooja Sharma",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    role: "Senior Engineering Manager",
    experience: "12+ years",
    languages: ["Hindi", "English", "Marathi"],
    sessions: 187,
    reviews: 145,
    price: 2500,
  },
  {
    id: "2",
    name: "Dr. Priya Mehta",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    role: "CTO & Startup Advisor",
    experience: "12+ years",
    languages: ["Hindi", "English", "Marathi"],
    sessions: 187,
    reviews: 145,
    price: 3000,
  },
  {
    id: "3",
    name: "Anita Sinha",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    role: "Product Management Mentor",
    experience: "12+ years",
    languages: ["Hindi", "English", "Marathi"],
    sessions: 187,
    reviews: 145,
    price: 2200,
  },
];

export default function RecommendedMentors() {
  const { t, loading } = useTranslation();
  const router = useRouter();

  return (
    <section className="w-full bg-white border border-border rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col mb-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            {loading ? "Loading..." : t("mentorsRecommendedforYou")}
          </h2>
          <Button
            variant="link"
            onClick={() => router.push("/actions")}
            className="text-xs sm:text-sm font-medium text-primary-500 shrink-0"
          >
            {loading ? "Loading..." : t("viewAllMentors")}
          </Button>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed">
          {loading ? "Loading..." : t("careerAlignedProfessionals")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5 lg:grid-cols-3 items-stretch">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}

/* ==================== Mentor Card Component ==================== */

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full h-44 rounded-lg overflow-hidden mb-4">
        <Image
          src={mentor.image}
          alt={mentor.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Name with Verification Badge */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold text-base text-foreground">
          {mentor.name}
        </h3>
        {/* <Check size={16} className="text-primary-600 flex-shrink-0" /> */}
        <LuBadgeCheck size={18} className="text-white fill-primary-400" />
      </div>

      {/* Role */}
      <p className="text-sm text-muted-foreground mb-3">{mentor.role}</p>

      {/* Experience */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <div className="relative h-[16px] w-[16px]">
          <Image
            src="/Group.svg"
            alt="experience"
            fill
            className="object-contain"
          />
        </div>
        <span>{mentor.experience}</span>
      </div>

      {/* Languages */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <div className="relative h-[16px] w-[16px]">
          <Image
            src="language-skill.svg"
            alt="experience"
            fill
            className="object-contain"
          />
        </div>
        <span>{mentor.languages.join(", ")}</span>
      </div>

      {/* Sessions & Reviews */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <div className="relative h-[18px] w-[18px]">
          <Image
            src="solar_medal-star-linear.svg"
            alt="experience"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-muted-foreground">
          {mentor.sessions} Sessions
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{mentor.reviews} Reviews</span>
      </div>

      {/* Divider */}
      <hr className="border-border my-3" />

      {/* Footer - Price and Button */}
      <div className="flex items-center justify-between gap-3 mt-auto flex-wrap">
        <span className="font-semibold text-primary-600">
          ₹{mentor.price.toLocaleString()}
        </span>

        <Button
          size="sm"
          className="w-full sm:w-fit px-5 py-4.5 whitespace-nowrap"
        >
          Book Session
        </Button>
      </div>
    </div>
  );
}
