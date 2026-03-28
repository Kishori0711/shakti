// app/learn/my-courses/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CourseHeroCard from "@/components/CourseHeroCard";
import TwoColumnSection from "@/components/TwoColumnSection";
import CourseCurriculum from "@/components/CourseCurriculum";
// import ReviewsRatingsSection from "@/components/ReviewsRatingsSection";
import AskAICard from "@/components/sidebar/AskAICard";
import CourseDetailsCard from "@/components/sidebar/CourseDetailsCard";
import CourseProgressCard from "@/components/sidebar/CourseProgressCard";
import AskAIChatModal from "@/components/AskAIChatModal";
import type { CourseDetail, CurriculumWeek } from "@/types/courses";
import ReviewsRatingsSection from "@/components/Review/Reviewsratingssection";
import BackButton from "@/components/BackButton";
import AboutMentor from "@/components/AboutMentor";

// ✅ STATIC DATA — Course Details
const courseData: Record<string, CourseDetail> = {
  "4": {
    id: "4",
    title: "Starting Your Business Journey",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Sunita Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    tags: "Career Growth",
    language: ["Hindi", "English"],
    rating: 4.5,
    learners: 4523,
    price: 1499,
    specialty: "Career Coaching",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
    description:
      "Starting Your Business Journey is a structured, beginner-to-advanced course designed to help women turn ideas into viable businesses.",
    progress: 20,
    completedLessons: 3,
    totalLessons: 15,
    lastWatchedLessonId: "lecture-1-2",
    lastWatchedTime: 82,
    totalDuration: "3 months",
    downloadableResources: 27,
    certificate: "Yes, on completion",
    courseStartDate: "Jan 20, 2025",
    overview: {
      leftTitle: "What You'll Learn",
      leftItems: [
        "How to identify profitable business opportunities",
        "Understanding and reaching your target customers",
        "Planning your products or services on a budget",
        "Creating simple but effective business plan",
        "Basic financial planning and record keeping",
        "Building lasting customer relationships",
      ],
      rightTitle: "Who Is This Course For",
      rightItems: [
        "Women looking to start their own business",
        "Aspiring entrepreneurs with a business idea",
        "Professionals exploring entrepreneurship",
        "Anyone seeking financial independence",
      ],
    },
  },
  "5": {
    id: "5",
    title: "Confidence Building for Professionals",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    modules: 8,
    teacherName: "Sunita Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    tags: "Career Growth",
    language: ["Hindi"],
    rating: 4.8,
    learners: 4523,
    price: 1499,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
    description: "Build unshakeable confidence in your professional life.",
    progress: 65,
    completedLessons: 6,
    totalLessons: 24,
    lastWatchedLessonId: "lecture-2-1",
    lastWatchedTime: 120,
    totalDuration: "2 months",
    downloadableResources: 15,
    certificate: "Yes, on completion",
    courseStartDate: "Feb 15, 2025",
    overview: {
      leftTitle: "What You'll Learn",
      leftItems: [
        "Public speaking confidence",
        "Overcoming imposter syndrome",
        "Assertive communication skills",
      ],
      rightTitle: "Who Is This Course For",
      rightItems: ["Working professionals", "Women re-entering workforce"],
    },
  },
  "6": {
    id: "6",
    title: "Leadership Basics for Working Women",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    modules: 8,
    teacherName: "Sunita Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    tags: "Career Growth",
    language: ["Hindi", "English"],
    rating: 4.9,
    learners: 4523,
    price: 1499,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
    description: "Learn leadership fundamentals designed for working women.",
    progress: 65,
    completedLessons: 6,
    totalLessons: 24,
    lastWatchedLessonId: "lecture-1-3",
    lastWatchedTime: 45,
    totalDuration: "2.5 months",
    downloadableResources: 20,
    certificate: "Yes, on completion",
    courseStartDate: "Mar 1, 2025",
    overview: {
      leftTitle: "What You'll Learn",
      leftItems: [
        "Leadership styles and strategies",
        "Team management skills",
        "Decision making frameworks",
      ],
      rightTitle: "Who Is This Course For",
      rightItems: ["Mid-level professionals", "Aspiring team leads"],
    },
  },
};

// ✅ CURRICULUM — NO isLocked (all open, user purchased)
const curriculumData: CurriculumWeek[] = [
  {
    id: "week-1",
    title: "Week 1: Introduction to course",
    lectureCount: 6,
    totalDuration: "20 min",
    lectures: [
      {
        id: "lecture-1-1",
        title: "Welcome to the course!",
        duration: "5:45",
        isDocument: true,
        isCompleted: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-1-2",
        title: "Introduction to Entrepreneurship",
        duration: "8:35",
        isVideo: true,
        isCompleted: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/elephants_dream.mp4",
      },
      {
        id: "lecture-1-3",
        title: "Introduction to Entrepreneurship",
        duration: "2:15",
        isVideo: true,
        isCompleted: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-1-4",
        title: "Introduction to Entrepreneurship",
        duration: "7:45",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-1-5",
        title: "Introduction to Entrepreneurship",
        duration: "2:45",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-1-6",
        title: "Introduction to Entrepreneurship",
        duration: "2:45",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
    ],
  },
  {
    id: "week-2",
    title: "Week 2: Market & Customer Understanding",
    lectureCount: 3,
    totalDuration: "20 min",
    lectures: [
      {
        id: "lecture-2-1",
        title: "Customer Research Methods",
        duration: "10:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-2-2",
        title: "Competitor Analysis",
        duration: "12:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-2-3",
        title: "Market Positioning",
        duration: "8:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
    ],
  },
  {
    id: "week-3",
    title: "Week 3: Business Planning & Financial Basics",
    lectureCount: 3,
    totalDuration: "30 min",
    lectures: [
      {
        id: "lecture-3-1",
        title: "Revenue Models",
        duration: "15:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-3-2",
        title: "Cost Planning",
        duration: "10:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-3-3",
        title: "Break-even Analysis",
        duration: "8:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
    ],
  },
  {
    id: "week-4",
    title: "Week 4: Marketing & Customer Growth",
    lectureCount: 3,
    totalDuration: "25 min",
    lectures: [
      {
        id: "lecture-4-1",
        title: "Social Media Marketing",
        duration: "10:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-4-2",
        title: "Customer Retention",
        duration: "8:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-4-3",
        title: "Growth Strategies",
        duration: "7:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
    ],
  },
  {
    id: "week-5",
    title: "Week 5: Scaling & Next Steps",
    lectureCount: 2,
    totalDuration: "20 min",
    lectures: [
      {
        id: "lecture-5-1",
        title: "Scaling Your Business",
        duration: "12:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
      {
        id: "lecture-5-2",
        title: "Next Steps & Resources",
        duration: "8:00",
        isVideo: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
      },
    ],
  },
];

const reviews = [
  {
    name: "Anjali Verma",
    date: "12 Jan 2024",
    text: "This course explained business ideas in a very simple and practical way.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    name: "Pooja Sharma",
    date: "05 Jan 2024",
    text: "Loved the market research and planning modules. Easy to follow.",
    rating: 4,
  },
  {
    name: "Pallavi Mehra",
    date: "28 Dec 2023",
    text: "The lessons are short, clear, and actionable. Perfect for beginners.",
    rating: 4,
  },
];

// ============ PAGE COMPONENT ============
export default function MyCourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  // ✅ AI Chat modal state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  const languages = Array.isArray(course.language)
    ? course.language.join(", ")
    : course.language || "";

  const ratingText = `${course.rating} (${course.learners.toLocaleString()} Reviews)`;

  // ✅ Any lecture click → navigate to lesson player
  const handleLectureClick = (lectureId: string) => {
    router.push(`/learn/my-courses/${courseId}/lesson/${lectureId}`);
  };

  // ✅ Resume → last watched lesson with timestamp
  const handleResume = () => {
    const lessonId = course.lastWatchedLessonId || "lecture-1-1";
    const time = course.lastWatchedTime || 0;
    router.push(`/learn/my-courses/${courseId}/lesson/${lessonId}?t=${time}`);
  };

  return (
    <div className="p-2">
      <BackButton />
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
          {/* ====== LEFT COLUMN ====== */}
         <div className="space-y-6 lg:col-span-2">
            <CourseHeroCard
              variant="video"
              videoUrl={course.videoUrl!}
              coverImage={course.image}
              title={course.title}
              categoryLabel={course.tags || ""}
              ratingText={ratingText}
              level="Advanced"
              students={`${(course.learners / 1000).toFixed(1)}K`}
              language={languages}
              onWishlist={() => console.log("Wishlist")}
              onShare={() => console.log("Share")}
            />

            {course.overview && (
              <TwoColumnSection
                title="Overview"
                description={course.description}
                leftColumnTitle={course.overview.leftTitle}
                leftColumnItems={course.overview.leftItems}
                rightColumnTitle={course.overview.rightTitle}
                rightColumnItems={course.overview.rightItems}
              />
            )}

            {/* ✅ Curriculum — all lectures clickable */}
            <CourseCurriculum
              title="Course Curriculum"
              totalLessons={12}
              totalLectures={96}
              totalLength="14h 33m"
              weeks={curriculumData}
              onLectureClick={handleLectureClick}
            />

            <ReviewsRatingsSection
              averageRating={4.5}
              totalReviews={145}
              breakdown={[
                { label: "Excellent", value: 65 },
                { label: "Very Good", value: 20 },
                { label: "Average", value: 12 },
                { label: "Poor", value: 2 },
                { label: "Terrible", value: 1 },
              ]}
              reviews={reviews}
              onAddReview={() => console.log("Add review")}
            />
          </div>

          {/* ====== RIGHT SIDEBAR ====== */}
        
          <div className="h-fit space-y-6 lg:sticky lg:top-0.5">
              <AskAICard onAskAI={() => setIsAIChatOpen(true)} />

              <CourseDetailsCard
                topicType="Video Course"
                totalDuration={course.totalDuration}
                totalLessons={course.totalLessons}
                downloadableResources={course.downloadableResources}
                certificate={course.certificate}
                courseStartDate={course.courseStartDate}
              />

              <CourseProgressCard
                completedLessons={course.completedLessons || 0}
                totalLessons={course.totalLessons || 0}
                progress={course.progress || 0}
                onResume={handleResume}
              />

                <AboutMentor
                          name={course.teacherName}
                          specialty="djbfdj"
                          avatar={course.teacherAvatar}
                          rating={course.rating}
                          courses={12}
                        />
            </div>
          </div>
       
    

      {/* ✅ AI Chat Modal */}
      <AskAIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        lessonTitle={course.title}
      />
    </div>
  );
}
