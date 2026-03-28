// "use client";

// import Card from "@/components/Card";
// import { Course } from "@/types/course";
// import { useTranslation } from "@/hooks/useTranslation";
// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";

// // Example usage:
// const exampleCourses: Course[] = [
//   {
//     id: "1",
//     title: "Strategic Career Foundations",
//     image:
//       "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
//     tags: "Career Growth",
//     language: "English", // Single language
//     teacherName: "Sunita Sharma",
//     teacherAvatar:
//       "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
//     rating: 5.0,
//     learners: 4523,
//     price: 1499,
//     modules: 8,
//   },
//   {
//     id: "2",
//     title: "Python Advanced",
//     image:
//       "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
//     tags: "Programming",
//     language: ["Hindi", "English"], // Multiple languages
//     teacherName: "Rajesh Kumar",
//     teacherAvatar:
//       "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
//     rating: 4.8,
//     learners: 3421,
//     price: 1999,
//     modules: 12,
//   },
//   {
//     id: "3",
//     title: "Web Development",
//     image:
//       "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
//     tags: "Development",
//     language: ["English", "Hindi", "Bengali"], // Multiple languages
//     teacherName: "Priya Patel",
//     teacherAvatar:
//       "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
//     rating: 4.9,
//     learners: 5234,
//     price: 1299,
//     modules: 10,
//   },
// ];

// const RecommendedCourses = () => {
//   const { t, loading } = useTranslation();
//   const router = useRouter();
//   return (
//     <section className="w-full rounded-2xl p-4 ring-border bg-white border border-border">
//       {/* <div className="flex items-center justify-between">
//          <h2 className="text-lg font-bold text-foreground">
//          {loading ? "Loading..." : t("CoursesRecommendedforYou")}
//         </h2>
        
//         <button className="text-sm font-semibold text-primary-500 hover:underline">
//         {loading ? "Loading..." : t("ViewAll")} (3)
//         </button>
//       </div> */}
//       <div className="flex flex-col gap-2 mb-6">
//         <div className="flex items-baseline justify-between w-full">
//           <h2 className="text-base sm:text-xl font-bold text-gray-900">
//             {loading ? "Loading..." : t("CoursesRecommendedforYou")}
//           </h2>
//           <Button
//             variant="link"
//             onClick={() => router.push("/actions")}
//             className="text-sm font-medium text-primary-500"
//           >
//             {loading ? "Loading..." : t("ViewAll")}
//           </Button>
//         </div>
//         <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
//           {loading ? "Loading..." : t("careerAlignedProfessionals")}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
//         {exampleCourses.map((course) => (
//           <Card
//             key={course.id}
//             course={course}
//             onClick={() => console.log("Course clicked:", course.title)}
//             onEnroll={() => console.log("Enroll clicked:", course.title)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RecommendedCourses;


"use client";

import Card from "@/components/Card";
import { Course } from "@/types/course";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const exampleCourses: Course[] = [
  {
    id: "1",
    title: "Strategic Career Foundations",
    image:
      "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
    tags: "Career Growth",
    language: "English",
    teacherName: "Sunita Sharma",
    teacherAvatar:
      "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
    rating: 5.0,
    learners: 4523,
    price: 1499,
    modules: 8,
  },
  {
    id: "2",
    title: "Python Advanced",
    image:
      "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
    tags: "Programming",
    language: ["Hindi", "English"],
    teacherName: "Rajesh Kumar",
    teacherAvatar:
      "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
    rating: 4.8,
    learners: 3421,
    price: 1999,
    modules: 12,
  },
  {
    id: "3",
    title: "Web Development",
    image:
      "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chars-educational-posters-321862279.jpg",
    tags: "Development",
    language: ["English", "Hindi", "Bengali"],
    teacherName: "Priya Patel",
    teacherAvatar:
      "https://thumbs.dreamstime.com/b/biracial-female-teacher-engaging-diverse-students-classroom-setting-bright-modern-colorful-chairs-educational-posters-321862279.jpg",
    rating: 4.9,
    learners: 5234,
    price: 1299,
    modules: 10,
  },
];

const RecommendedCourses = () => {
  const { t, loading } = useTranslation();
  const router = useRouter();

  return (
    <section className="w-full rounded-2xl p-5 sm:p-6 bg-white border border-border">
      <div className="flex flex-col mb-6">
        {/* Header with Title and Button */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            {loading ? "Loading..." : t("CoursesRecommendedforYou")}
          </h2>
          <Button
            variant="link"
            onClick={() => router.push("/actions")}
            className="text-xs sm:text-sm font-medium text-primary-500 shrink-0"
          >
            {loading ? "Loading..." : t("ViewAll")}
          </Button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed">
          {loading ? "Loading..." : t("careerAlignedProfessionals")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 items-stretch">
        {exampleCourses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onClick={() => console.log("Course clicked:", course.title)}
            onEnroll={() => console.log("Enroll clicked:", course.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedCourses;