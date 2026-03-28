// app/learn/my-courses/[id]/lesson/[lessonId]/page.tsx
"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import AskAICard from "@/components/sidebar/AskAICard";
import CourseContentSidebar from "@/components/sidebar/CourseContentSidebar";
import LessonResources from "@/components/sidebar/LessonResources";
import AskAIChatModal from "@/components/AskAIChatModal";
import type { LessonResource, CurriculumWeek } from "@/types/courses";
import BackButton from "@/components/BackButton";
// import AboutMentor from "@/components/explore/AboutMentor";

// ✅ Same curriculum data (import or duplicate)
const curriculumData: CurriculumWeek[] = [
  {
    id: "week-1",
    title: "Week 1: Introduction to course",
    lectureCount: 6,
    totalDuration: "20 min",
    lectures: [
      {
        id: "lecture-1-1",
        title: "Introduction to Entrepreneurship",
        duration: "15:00",
        isVideo: true,
        isCompleted: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
        description: "Learn the fundamentals of entrepreneurship.",
      },
      {
        id: "lecture-1-2",
        title: "Finding Your Business Idea",
        duration: "36:00",
        isVideo: true,
        isCompleted: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/elephants_dream.mp4",
        description:
          "Learn how to identify, segment, and understand your ideal customers.",
      },
      {
        id: "lecture-1-3",
        title: "Understanding Your Market",
        duration: "40:00",
        isVideo: true,
        isCompleted: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
        description:
          "Learn how to identify, segment, and understand your ideal customers. This lesson covers practical techniques to define your target audience and align your product or service with real market needs.",
      },
      {
        id: "lecture-1-4",
        title: "Creating Your Business Plan",
        duration: "18:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
        description: "Step-by-step guide to creating your first business plan.",
      },
      {
        id: "lecture-1-5",
        title: "Financial Basics for Business",
        duration: "35:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
        description: "Understanding profit, loss, and cash flow basics.",
      },
      {
        id: "lecture-1-6",
        title: "Marketing on a Budget",
        duration: "25:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
        description: "Cost-effective marketing strategies for new businesses.",
      },
    ],
  },
  {
    id: "week-2",
    title: "Week 2: Market Understanding",
    lectureCount: 1,
    totalDuration: "30 min",
    lectures: [
      {
        id: "lecture-2-1",
        title: "Building Customer Relationships",
        duration: "30:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
        description: "How to build and maintain strong customer relationships.",
      },
    ],
  },
];

const lessonResources: LessonResource[] = [
  {
    id: "res-1",
    title: "Target Market Worksheet",
    type: "PDF",
    size: "245 KB",
    downloadUrl: "#",
  },
  {
    id: "res-2",
    title: "Target Market Worksheet",
    type: "PDF",
    size: "180 KB",
    downloadUrl: "#",
  },
  {
    id: "res-3",
    title: "Target Market Worksheet",
    type: "PDF",
    size: "320 KB",
    downloadUrl: "#",
  },
];

// ============ PAGE COMPONENT ============
export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  const courseId = params.id as string;
  const lessonId = params.lessonId as string;

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Get timestamp from URL (?t=82)
  const startTime = Number(searchParams.get("t")) || 0;

  // ✅ Flatten all lectures for sidebar
  const allLessons = useMemo(() => {
    return curriculumData.flatMap((week) => week.lectures);
  }, []);

  // Find current lesson
  const currentLesson = allLessons.find((l) => l.id === lessonId);

  // Find which week this lesson belongs to
  const currentWeek = curriculumData.find((week) =>
    week.lectures.some((l) => l.id === lessonId),
  );

  // ✅ Set video to resume time
  useEffect(() => {
    if (videoRef.current && startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime, lessonId]);

  // ✅ Save progress every 10 sec + on pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const saveProgress = () => {
      const currentTime = Math.floor(video.currentTime);
      console.log(
        `Progress: Course ${courseId}, Lesson ${lessonId}, Time: ${currentTime}s`,
      );
      // 🔥 API: fetch("/api/save-progress", { ... })
    };

    const interval = setInterval(saveProgress, 10000);
    video.addEventListener("pause", saveProgress);

    return () => {
      clearInterval(interval);
      video.removeEventListener("pause", saveProgress);
    };
  }, [courseId, lessonId]);

  // ✅ Switch lesson — NO lock check needed
  const handleLessonClick = (newLessonId: string) => {
    router.push(`/learn/my-courses/${courseId}/lesson/${newLessonId}`);
  };

  // 404
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-gray-600">Lesson not found</p>
        </div>
      </div>
    );
  }

  const completedCount = allLessons.filter((l) => l.isCompleted).length;
  const totalCount = allLessons.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="p-2">
      <BackButton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ====== LEFT — VIDEO ====== */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video */}
          <div
            className="bg-white rounded-2xl border border-border
                            overflow-hidden p-6"
          >
            <video
              ref={videoRef}
              key={lessonId}
              src={currentLesson.videoUrl}
              className="w-full aspect-video bg-black rounded-3xl"
              controls
              autoPlay
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>

            <h1 className="text-2xl font-bold mt-6">
              {currentWeek?.title || "Lesson"}
            </h1>

            <p className="leading-relaxed text-sm ">
              {currentLesson.description || "No description available."}
            </p>
          </div>
        </div>

        {/* ====== RIGHT SIDEBAR ====== */}

        <div className="h-fit space-y-6 lg:sticky lg:top-0.5">
          <AskAICard
            title="Ask AI to Explain This Lesson"
            onAskAI={() => setIsAIChatOpen(true)}
          />

          <CourseContentSidebar
            completedLessons={completedCount}
            totalLessons={totalCount}
            progress={progressPercent}
            lessons={allLessons}
            activeLessonId={lessonId}
            onLessonClick={handleLessonClick}
          />

          <LessonResources
            resources={lessonResources}
            onDownload={(id) => console.log(`Download ${id}`)}
          />
            
        </div>
      </div>

      {/* ✅ AI Chat Modal */}
      <AskAIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        lessonTitle={currentLesson.title}
      />
    </div>
  );
}
