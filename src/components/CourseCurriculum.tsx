// "use client";

// import React from "react";
// import { BookOpen, Play, Clock } from "lucide-react";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";

// type Lecture = {
//   id: string;
//   title: string;
//   duration: number; // in minutes
//   isVideo?: boolean;
// };

// type CurriculumWeek = {
//   id: string;
//   title: string;
//   lectures: Lecture[];
//   totalDuration: number;
// };

// type CourseCurriculumProps = {
//   title?: string;
//   totalLessons: number;
//   totalLectures: number;
//   totalLength: string;
//   weeks: CurriculumWeek[];
// };

// export function CourseCurriculum({
//   title = "Course Curriculum",
//   totalLessons,
//   totalLectures,
//   totalLength,
//   weeks,
// }: CourseCurriculumProps): React.ReactElement {
//   const lectureCount = weeks.reduce(
//     (acc, week) => acc + week.lectures.length,
//     0
//   );

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
//       {/* Header */}
//       <div className="space-y-2">
//         <h2 className="text-xl font-bold text-gray-900">{title}</h2>
//         <p className="text-sm text-gray-600">
//           {totalLessons} Lessons · {totalLectures} Lectures · {totalLength}{" "}
//           total length
//         </p>
//       </div>

//       {/* Curriculum Accordion */}
//       <Accordion type="single" collapsible defaultValue={weeks[0]?.id}>
//         {weeks.map((week) => (
//           <AccordionItem key={week.id} value={week.id}>
//             {/* Week Header */}
//             <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-lg">
//               <div className="flex items-start justify-between w-full gap-4">
//                 <div className="flex flex-col gap-1">
//                   <h3 className="font-semibold text-gray-900 text-base">
//                     {week.title}
//                   </h3>
//                 </div>
//                 <div className="flex items-center gap-4 text-sm text-gray-600">
//                   <span className="font-medium">
//                     {week.lectures.length} Lectures
//                   </span>
//                   <span className="font-medium">
//                     {Math.floor(week.totalDuration / 60)}h{" "}
//                     {week.totalDuration % 60}m
//                   </span>
//                 </div>
//               </div>
//             </AccordionTrigger>

//             {/* Lectures List */}
//             <AccordionContent className="bg-gray-50">
//               <div className="space-y-2 px-4 py-3">
//                 {week.lectures.map((lecture, index) => (
//                   <div
//                     key={lecture.id}
//                     className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
//                   >
//                     {/* Lecture Icon */}
//                     <div className="flex-shrink-0 mt-1">
//                       {lecture.isVideo ? (
//                         <Play className="w-4 h-4 text-orange-500 fill-orange-500" />
//                       ) : (
//                         <BookOpen className="w-4 h-4 text-orange-500" />
//                       )}
//                     </div>

//                     {/* Lecture Details */}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
//                         {lecture.title}
//                       </p>
//                     </div>

//                     {/* Duration */}
//                     <div className="flex items-center gap-1 flex-shrink-0 text-sm text-gray-600">
//                       <Clock className="w-4 h-4" />
//                       <span>{lecture.duration}m</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// }

// export default CourseCurriculum;


// components/CourseCurriculum.tsx
"use client";

import React from "react";
import { Play, File } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type {  CurriculumWeek } from "@/types/courses";

type CourseCurriculumProps = {
  title?: string;
  totalLessons: number;
  totalLectures: number;
  totalLength: string;
  weeks: CurriculumWeek[];
  onLectureClick?: (lectureId: string) => void;
  activeLectureId?: string;
};

export function CourseCurriculum({
  title = "Course Curriculum",
  totalLessons,
  totalLectures,
  totalLength,
  weeks,
  onLectureClick,
  activeLectureId,
}: CourseCurriculumProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 space-y-4 ">
      {/* Header */}
      <div className="space-y-2 ">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">
          {totalLessons} Lessons · {totalLectures} Lectures · {totalLength}{" "}
          total length
        </p>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible defaultValue={weeks[0]?.id} className="space-y-2">
        {weeks.map((week) => (
         <AccordionItem key={week.id} value={week.id} className=" rounded-lg overflow-hidden">
         <AccordionTrigger className="bg-gray-50 hover:bg-gray-100 px-4 py-3">
              <div className="flex items-start justify-between w-full gap-4 ">
                <h3 className="font-semibold text-gray-900 text-base text-left">
                  {week.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 
                                whitespace-nowrap">
                  <span>{week.lectureCount} Lectures</span>
                  <span>{week.totalDuration}</span>
                </div>
              </div>
            </AccordionTrigger>

          <AccordionContent className="bg-gray-50">
              <div className="space-y-1 px-4 py-3">
                {week.lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    onClick={() => onLectureClick?.(lecture.id)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg 
                      transition-colors cursor-pointer group
                      hover:bg-gray-100
                      ${activeLectureId === lecture.id
                        ? "bg-primary-50 border border-primary-200"
                        : ""
                      }
                    `}
                  >
                    {/* ✅ Icon — Document or Video (NO LOCK) */}
                    <div className="shrink-0">
                      {lecture.isDocument ? (
                        <File className="w-5 h-5 text-primary-400" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2
                                        border-primary-400 flex items-center 
                                        justify-center">
                          <Play className="w-3 h-3 text-primary-500 
                                          fill-primary-500" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <span className={`text-sm flex-1 ${
                      activeLectureId === lecture.id
                        ? "font-semibold text-primary-600"
                        : "text-gray-700 group-hover:text-primary-500"
                    }`}>
                      {lecture.title}
                    </span>

                    {/* Duration */}
                    <span className="text-sm text-gray-500 shrink-0">
                      {lecture.duration}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CourseCurriculum;