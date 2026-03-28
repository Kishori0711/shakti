// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { FaUser } from "react-icons/fa";
// import verify from "@/assets/verify.svg";
// import group from "@/assets/Group.svg";
// import language_skill from "@/assets/language-skill.svg";
// import solar_medal_star_linear from "@/assets/solar_medal-star-linear.svg";

// export type Mentor = {
//   id: string;
//   name: string;
//   avatar: string;
//   expertise: string;
//   experience?: string;
//   languages?: string;
//   sessions?: number;
//   reviews?: number;
//   isTopMentor?: boolean;
//   isVerified?: boolean;
//   isRecommended?: boolean;
//   sessionPrice?: number;
//   category?: string;
//   level?: string;
// };

// interface MentorCardProps {
//   mentor: Mentor;
// }

// export default function MentorCard({ mentor }: MentorCardProps) {
//   const router = useRouter();

//   return (
//     <article className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
//       <div className="flex flex-col gap-4 sm:flex-row">
//         {/* LEFT: Image Section */}
//         <div className="relative shrink-0 w-full sm:w-auto">
//           <div className="relative h-28 w-28 sm:h-44 sm:w-44 overflow-hidden rounded-xl mx-auto sm:mx-0 group-hover:shadow-md transition-shadow">
//             <Image
//               src={mentor.avatar}
//               alt={mentor.name}
//               fill
//               sizes="(max-width: 640px) 112px, 176px"
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           </div>

//           {/* Top Mentor Badge */}
//           {mentor.isTopMentor && (
//             <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-[#F5A623] px-2 py-1 text-xs font-semibold text-white shadow-lg">
//               <span>👑</span>
//               <span className="hidden sm:inline">Top Mentor</span>
//               <span className="sm:hidden">Top</span>
//             </span>
//           )}
//         </div>

//         {/* RIGHT: Content Section */}
//         <div className="min-w-0 flex-1 flex flex-col justify-between">
//           {/* Header */}
//           <div>
//             {/* Name & Badge */}
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
//               <div className="min-w-0">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <h3 className="truncate text-sm sm:text-base font-bold text-[#121632]">
//                     {mentor.name}
//                   </h3>
//                   {mentor.isVerified && (
//                     <Image
//                       src={verify}
//                       alt="verified"
//                       width={16}
//                       height={16}
//                       className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
//                     />
//                   )}
//                 </div>
//                 <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-[#8f91a0]">
//                   {mentor.expertise}
//                 </p>
//               </div>

//               {mentor.isRecommended && (
//                 <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#E7FFE6] px-2 py-1 text-xs font-semibold text-[#47B881] w-fit">
//                   <span>✓</span>
//                   <span className="hidden sm:inline">Recommendation</span>
//                   <span className="sm:hidden">Rec</span>
//                 </span>
//               )}
//             </div>

//             {/* Meta Info */}
//             <div className="mt-3 space-y-2">
//               {/* Experience & Languages */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 text-xs sm:text-sm text-[#121632] flex-wrap">
//                 <span className="inline-flex items-center gap-1.5">
//                   <Image src={group} alt="" width={16} height={16} />
//                   {mentor.experience}
//                 </span>
//                 <span className="hidden sm:inline text-[#8f91a0]">•</span>
//                 <span className="inline-flex min-w-0 items-center gap-1.5">
//                   <Image src={language_skill} alt="" width={16} height={16} />
//                   <span className="truncate">{mentor.languages}</span>
//                 </span>
//               </div>

//               {/* Sessions */}
//               <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#121632]">
//                 <Image
//                   src={solar_medal_star_linear}
//                   alt=""
//                   width={16}
//                   height={16}
//                 />
//                 <span className="truncate">
//                   {mentor.sessions} Session{" "}
//                   <span className="text-[#8f91a0]">
//                     ({mentor.reviews} Reviews)
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
//             <div className="flex items-baseline gap-1">
//               <span className="text-base sm:text-lg font-bold text-[#121632]">
//                 ₹{mentor.sessionPrice?.toLocaleString("en-IN")}
//               </span>
//               <span className="text-xs text-[#8f91a0]">/session</span>
//             </div>

//             <div className="flex w-full gap-2 sm:w-auto">
//               {/* Add to favorites button */}
//               <button
//                 type="button"
//                 className="grid h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 place-items-center rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
//                 aria-label="Add to favorites"
//               >
//                 <FaUser size={18} className="text-[#121632]" />
//               </button>

//               {/* Book Session button */}
//               <button
//                 type="button"
//                 onClick={() => router.push(`/mentors/${mentor.id}`)}
//                 className="flex-1 sm:flex-none h-9 sm:h-10 rounded-lg bg-primary-500 px-4 text-xs sm:text-sm font-bold text-white hover:bg-primary-600 transition-colors"
//               >
//                 <span className="sm:hidden">Book</span>
//                 <span className="hidden sm:inline">Book Session</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
export type Mentor = {
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

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const router = useRouter();

  return (
    <article className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* IMAGE */}
        <div className="relative w-full sm:w-auto">
          <div className="relative w-full h-48 sm:h-40 sm:w-40 md:h-44 md:w-44 overflow-hidden rounded-xl">
            <Image
              src={mentor.avatar}
              alt={mentor.name}
              fill
              className="object-cover"
            />
          </div>

          {mentor.isTopMentor && (
            <span className="absolute left-3 top-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
              👑 Top
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1">
          {/* NAME */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              {mentor.name}
              {mentor.isVerified && <span className="text-orange-500">✔</span>}
            </h3>

            <p className="text-sm text-gray-500 mt-1">{mentor.expertise}</p>

            {/* INFO */}
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Image src="/Group.svg" alt="" width={16} height={16} />
                {mentor.experience}
              </div>

              <div className="flex items-center gap-2">
                <Image src="/language-skill.svg" alt="" width={16} height={16} />
                {mentor.languages}
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/solar_medal-star-linear.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                {mentor.sessions} Sessions ({mentor.reviews} Reviews)
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-4 pt-3 border-t flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">
              ₹{mentor.sessionPrice}
            </span>

            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-600">
              Book Session
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
