
// "use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { LuCalendarDays, LuListTodo, LuUsers } from "react-icons/lu";

// const actionsData = [
//   {
//     icon: LuUsers,
//     title: "Book a Mentor Session",
//     subtitle: "Get 1:1 Guidance Aligned To Your Goals And Industry",
//     btnText: "Book Mentor",
//     path: "/mentors",
//   },
//   {
//     icon: LuListTodo,
//     title: "Explore Curated Content",
//     subtitle: "Articles, Videos, And Resources Tailored To You",
//     btnText: "Explore Content",
//     path: "/content",
//   },
//   {
//     icon: LuCalendarDays,
//     title: "Discover Events",
//     subtitle: "Workshops And Talks For Your Growth Stage",
//     btnText: "View Events",
//     path: "/events",
//   },
// ];

// const BestActionsCard = () => {
//   const router = useRouter();

//   return (
//     <section className="bg-white border border-border rounded-2xl p-4 sm:p-5 shadow-sm">
//       <div className="flex flex-col gap-2 mb-6">
//         <h2 className="text-base sm:text-xl font-bold text-gray-900">
//           Next Best Actions
//         </h2>
//         <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
//           Based on your goals and career stage, here are three actions that can
//           help accelerate your progress.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {actionsData.map((action) => {
//           const Icon = action.icon;

//           return (
//             <div
//               key={action.path}
//               className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 sm:p-5 hover:shadow-md transition-shadow"
//             >
//               <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-50">
//                 <Icon className="text-primary-600 text-base sm:text-lg" />
//               </div>

//               <div className="mt-3">
//                 <h3 className="text-sm sm:text-base font-semibold text-gray-900">
//                   {action.title}
//                 </h3>
//                 <p className="mt-1 text-xs sm:text-sm text-gray-500">
//                   {action.subtitle}
//                 </p>
//               </div>

              // <Button
              //   size="sm"
              //   onClick={() => router.push(action.path)}
              //   className="w-full mt-4 text-sm font-medium"
              // >
              //   {action.btnText}
              // </Button>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default BestActionsCard;

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LuUsers } from "react-icons/lu";
import { LuCalendarRange } from "react-icons/lu";
import { CgList } from "react-icons/cg";
import { useTranslation } from "@/hooks/useTranslation";

const actionsData = [
  {
    icon: LuUsers,
    title: "Book a Mentor Session",
    subtitle: "Get 1:1 Guidance Aligned To Your Goals And Industry",
    btnText: "Find a Mentor",
    path: "/mentors",
  },
  {
    icon: CgList,
    title: "Explore Curated Content",
    subtitle: "Articles, Videos, And Resources Tailored To You",
    btnText: "Explore Content",
    path: "/content",
  },
  {
    icon: LuCalendarRange,
    title: "Discover Events",
    subtitle: "Workshops And Talks For Your Growth Stage",
    btnText: "View Upcoming Events",
    path: "/events",
  },
];

const BestActionsCard = () => {
  const router = useRouter();
  const { t, loading } = useTranslation();

  return (
    <section className="bg-white border border-border rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col mb-6">
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          {loading ? "Loading..." : t("nextBestActions") }
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed">
          {loading ? "Loading..." : t("progressAccelerationActions") }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {actionsData.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.path}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              {/* <div className="w-15 h-15 flex items-center justify-center rounded-xl"> */}
                <Icon className="text-primary-600 text-lg w-8 h-8" />
              {/* </div> */}

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-sm sm:text-base font-semibold text-foreground">
                  {action.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm ">
                  {action.subtitle}
                </p>
              </div>

              {/* Button */}
               {/* <Button
                size="sm"
                onClick={() => router.push(action.path)}
                className="w-full mt-4 text-sm font-medium p-5 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                {action.btnText}
              </Button> */}
                 <div className="mt-4">
                <Button
                  size="sm"
                  className="w-full sm:w-auto p-4.5 cursor-pointer"
                  onClick={() => router.push(action.path)}
                >
                  {action.btnText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestActionsCard;