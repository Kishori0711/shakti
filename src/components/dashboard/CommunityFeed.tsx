// import { FaLeaf } from "react-icons/fa";
// import { FiStar, FiThumbsUp } from "react-icons/fi";
// import { useTranslation } from "@/hooks/useTranslation";

// type ActivityItem = {
//   text: string;
//   subtext: string;
//   icon: React.ComponentType<{ className?: string }>;
// };

// const items: ActivityItem[] = [
//   {
//     text: "New Mentor Added",
//     subtext:
//       "A new mentor specializing in FinTech leadership has joined the platform.",
//     icon: FiThumbsUp,
//   },
//   {
//     text: "Leadership Workshop Registrations Open",
//     subtext:
//       "Seats are now open for the upcoming workshop on strategic leadership and influence.",
//     icon: FaLeaf,
//   },
//   {
//     text: "Top Article of the Week",
//     subtext:
//       "Building Strategic Influence in the Workplace is currently the most read article this week.",
//     icon: FiStar,
//   },
// ];

// export default function CommunityFeed() {
//   const { t, loading } = useTranslation();

//   return (
//     <section className="w-full rounded-2xl p-6 border border-border bg-white">
//       {/* Header */}
//       <div className="mb-5 flex items-center justify-between">
//         <h2 className="text-lg font-bold text-foreground">
//           {loading ? "Loading..." : t("communityFeed")}
//         </h2>

//         <button
//           type="button"
//           className="text-primary-500 text-sm font-semibold hover:underline transition-colors"
//         >
//           {loading ? "Loading..." : t("ViewAll")}
//         </button>
//       </div>

//       {/* Activity List */}
//       <ul className="space-y-0 divide-y divide-border">
//         {items.map((a, index) => {
//           const Icon = a.icon;

//           return (
//             <li
//               key={a.text}
//               className={`flex items-start gap-3 ${
//                 index === 0 ? "pb-4" : "py-4"
//               }`}
//             >
//               {/* Icon - Fixed size, never shrinks */}
//               <span className="mt-0.5 text-primary-500 shrink-0 text-lg">
//                 <Icon className="h-5 w-5" />
//               </span>

//               {/* Content - Can wrap and grow */}
//               <div className="min-w-0 flex-1">
//                 {/* Title */}
//                 <h3 className="text-sm font-semibold text-foreground leading-snug">
//                   {a.text}
//                 </h3>

//                 {/* Subtitle */}
//                 <p className="mt-1 text-xs text-muted leading-relaxed">
//                   {a.subtext}
//                 </p>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </section>
//   );
// }


"use client";

import { FaLeaf } from "react-icons/fa";
import { FiStar, FiThumbsUp } from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation";

type ActivityItem = {
  text: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: ActivityItem[] = [
  {
    text: "New Mentor Added",
    subtext:
      "A new mentor specializing in FinTech leadership has joined the platform.",
    icon: FiThumbsUp,
  },
  {
    text: "Leadership Workshop Registrations Open",
    subtext:
      "Seats are now open for the upcoming workshop on strategic leadership and influence.",
    icon: FaLeaf,
  },
  {
    text: "Top Article of the Week",
    subtext:
      "Building Strategic Influence in the Workplace is currently the most read article this week.",
    icon: FiStar,
  },
];

export default function CommunityFeed() {
  const { t, loading } = useTranslation();

  return (
    <section className="w-full rounded-2xl p-5 sm:p-6 border border-border bg-white">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          {loading ? "Loading..." : t("communityFeed")}
        </h2>

        <button
          type="button"
          className="text-primary-500 text-xs sm:text-sm font-semibold hover:underline transition-colors"
        >
          {loading ? "Loading..." : t("ViewAll")}
        </button>
      </div>

      {/* Activity List */}
      <ul className="space-y-0 divide-y divide-border">
        {items.map((a, index) => {
          const Icon = a.icon;

          return (
            <li
              key={a.text}
              className={`flex items-start gap-3 ${
                index === 0 ? "pb-4" : "py-4"
              }`}
            >
              {/* Icon - Fixed size, never shrinks */}
              <div className="mt-0.5 shrink-0 text-primary-500 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>

              {/* Content - Can wrap and grow */}
              <div className="min-w-0 flex-1">
                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground leading-snug">
                  {a.text}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {a.subtext}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}