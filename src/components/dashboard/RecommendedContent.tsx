// "use client";

// import ContentCard from "@/components/ContentCard";
// import { useTranslation } from "@/hooks/useTranslation";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// type RecommendedContentItem = {
//   id: number;
//   title: string;
//   subtitle: string;
//   tag: string;
//   minutes: number;
//   likes: number;
//   image: string;
// };

// const items: RecommendedContentItem[] = [
//   {
//     id: 1,
//     title: "The Art of Madhubani Painting",
//     subtitle: "Ancient art form empowering rural women",
//     tag: "Arts",
//     minutes: 5,
//     likes: 189,
//     image:
//       "https://thumbs.dreamstime.com/b/group-children-attentively-listening-to-group-children-attentively-listening-to-men-teacher-as-sit-desks-321358222.jpg?w=768",
//   },
//   {
//     id: 2,
//     title: "Indra Nooyi: Leadership Lessons",
//     subtitle: "How she led PepsiCo with grace and grit",
//     tag: "Leadership",
//     minutes: 5,
//     likes: 189,
//     image:
//       "https://thumbs.dreamstime.com/b/group-children-attentively-listening-to-group-children-attentively-listening-to-men-teacher-as-sit-desks-321358222.jpg?w=768",
//   },
//   {
//     id: 3,
//     title: "She believed she could, so she did",
//     subtitle: "Daily inspiration for your journey",
//     tag: "Courage",
//     minutes: 5,
//     likes: 189,
//     image:
//       "https://thumbs.dreamstime.com/b/group-children-attentively-listening-to-group-children-attentively-listening-to-men-teacher-as-sit-desks-321358222.jpg?w=768",
//   },
// ];

// const RecommendedContent = () => {
//   const { t, loading } = useTranslation();
//   const router = useRouter();
//   return (
//     <section className="w-full rounded-2xl p-4 sm:p-6 shadow-sm bg-white border border-border">
//       <div className="flex flex-col gap-2 mb-6">
//         <div className="flex items-baseline justify-between w-full">
//           <h2 className="text-base sm:text-xl font-bold text-gray-900">
//             {loading ? "Loading..." : t("recommendedContent")}
//           </h2>
//           <Button
//             variant="link"
//             onClick={() => router.push("/actions")}
//             className="text-sm font-medium text-primary-500"
//           >
//             Explore Content Library
//           </Button>
//         </div>
//         <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
//           {loading ? "Loading..." : t("goalAlignedLearningResources")}
//         </p>
//       </div>
//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//         {items.map((item) => (
//           <ContentCard key={item.id} {...item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RecommendedContent;


"use client";

import ContentCard from "@/components/ContentCard";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type RecommendedContentItem = {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  minutes: number;
  likes: number;
  image: string;
};

const items: RecommendedContentItem[] = [
  {
    id: 1,
    title: "The Art of Madhubani Painting",
    subtitle: "Ancient art form empowering rural women",
    tag: "Arts",
    minutes: 5,
    likes: 189,
    image:
      "https://thumbs.dreamstime.com/b/group-children-attentively-listening-to-group-children-attentively-listening-to-men-teacher-as-sit-desks-321358222.jpg?w=768",
  },
  {
    id: 2,
    title: "Indra Nooyi: Leadership Lessons",
    subtitle: "How she led PepsiCo with grace and grit",
    tag: "Leadership",
    minutes: 5,
    likes: 189,
    image:
      "https://thumbs.dreamstime.com/b/group-children-attentively-listening-to-group-children-attentively-listening-to-men-teacher-as-sit-desks-321358222.jpg?w=768",
  },
  {
    id: 3,
    title: "She believed she could, so she did",
    subtitle: "Daily inspiration for your journey",
    tag: "Courage",
    minutes: 5,
    likes: 189,
    image:
      "https://thumbs.dreamstime.com/b/group-children-attentively-listening-to-group-children-attentively-listening-to-men-teacher-as-sit-desks-321358222.jpg?w=768",
  },
];

const RecommendedContent = () => {
  const { t, loading } = useTranslation();
  const router = useRouter();

  return (
    <section className="w-full rounded-2xl p-5 sm:p-6 shadow-sm bg-white border border-border">
      <div className="flex flex-col gap-4 mb-6">
        {/* Header with Title and Button */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            {loading ? "Loading..." : t("recommendedContent")}
          </h2>
          <Button
            variant="link"
            onClick={() => router.push("/actions")}
            className="text-xs sm:text-sm font-medium text-primary-500 shrink-0"
          >
            Explore Library
          </Button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {loading ? "Loading..." : t("goalAlignedLearningResources")}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {items.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedContent;
