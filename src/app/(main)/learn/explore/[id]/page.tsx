"use client";

import type React from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import CourseHeroCard from "@/components/CourseHeroCard";
import { TwoColumnSection } from "@/components/TwoColumnSection";
import { CourseCurriculum } from "@/components/CourseCurriculum";
import ReviewsRatingsSection from "@/components/Review/Reviewsratingssection";
import PricingCard from "@/components/explore/Pricingcard";
// import AboutMentor from "@/components/explore/AboutMentor";
import { CurriculumWeek } from "@/types/courses";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import AboutMentor from "@/components/AboutMentor";
// Course data
const courses = [
  {
    id: "1",
    title: "Starting Your Business Journey",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 4.6,
    learners: 1240,
    price: 499,
    originalPrice: 999,
    tags: "Career Growth",
    language: ["Hindi", "English"],
    specialty: "Leadership Development",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
  },
  {
    id: "2",
    title: "Career Growth Fundamentals",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    modules: 6,
    teacherName: "Ananya Kapoor",
    teacherAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 4.8,
    learners: 2150,
    price: 599,
    originalPrice: 1299,
    tags: "Career",
    language: ["Hindi"],
    specialty: "Career Coaching",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
  },
  {
    id: "3",
    title: "Entrepreneurship Basics",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    modules: 10,
    teacherName: "Sarah Johnson",
    teacherAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 4.9,
    learners: 3200,
    price: 799,
    originalPrice: 1599,
    tags: "Business",
    language: ["English"],
    specialty: "Entrepreneurship",
    isNew: true,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
  },
  {
    id: "4",
    title: "Digital Marketing Mastery",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    modules: 12,
    teacherName: "Rahul Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 4.7,
    learners: 1890,
    price: 699,
    originalPrice: 1399,
    tags: "Marketing",
    language: ["Hindi", "English"],
    specialty: "Digital Marketing",
    isNew: true,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
  },
  {
    id: "5",
    title: "Data Science Fundamentals",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 15,
    teacherName: "Dr. Meera Patel",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 4.5,
    learners: 2540,
    price: 899,
    originalPrice: 1899,
    tags: "Technology",
    language: ["English"],
    specialty: "Data Science",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
  },
];


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

// Reviews data
const reviews = [
  {
    name: "Sarah Johnson",
    date: "2 weeks ago",
    text: "Ananya is an amazing mentor! Her insights on career transitions were invaluable.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    name: "Priya Sharma",
    date: "1 month ago",
    text: "Great session! Very practical advice about leadership development. Highly recommend!",
    rating: 4,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    name: "Emily Chen",
    date: "1 month ago",
    text: "Excellent mentor. She really understands the challenges women face in tech leadership.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
  {
    name: "Amit Kumar",
    date: "2 months ago",
    text: "Exactly what I needed to understand career planning better. Very knowledgeable.",
    rating: 5,
  },
];

export default function CourseDetailsPage(): React.ReactElement {
  const params = useParams();
   const router = useRouter();
  const courseId = params.id as string;
  const [enrollLoading, setEnrollLoading] = useState(false);

  const handleLectureClick = (lectureId: string) => {
    // router.push(`/learn/my-courses/${courseId}/lesson/${lectureId}`);
    console.log("navigate your url");
  };

  // Find course by ID
  const course = courses.find((c) => c.id === courseId);

  // 404 Page
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  // Format data for display
  const ratingText = `${course.rating} (${(course.learners / 100).toFixed(0)}K+ Reviews)`;
  const studentsText = `${(course.learners / 1000).toFixed(1)}K`;
  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100,
  );

  // Handle enroll
  const handleEnroll = () => {
    setEnrollLoading(true);
   router.push(`/learn/explore/${courseId}/payment`);
  };

  return (
    <div className="p-2">
      <BackButton label="Back To Explore"/>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left*/}
        <div className="space-y-6 lg:col-span-2">
          <CourseHeroCard
            variant="video"
            videoUrl={course.videoUrl}
            coverImage={course.image}
            recommendBadge={
              course.isNew ? (
                <span>✨ New Course</span>
              ) : (
                <span>⭐ 98% of women recommend it</span>
              )
            }
            title={course.title}
            categoryLabel={course.tags}
            ratingText={ratingText}
            level="Intermediate"
            students={studentsText}
            language={course.language.join(", ")}
            onWishlist={() => console.log(`Added to wishlist`)}
            onShare={() => console.log(`Shared`)}
            onPlayPreview={() => console.log(`Playing preview`)}
          />

          <TwoColumnSection
            title="Overview"
            description={
    <>
      <p className="mt-1">
        Starting Your Business Journey is a structured, beginner-to-advanced
        course designed to help women turn ideas into viable businesses.
      </p>

      <p className="mt-2">
        The course focuses on practical decision-making, market understanding,
        financial basics, and customer growth using simple frameworks and
        real-world examples.
      </p>

      <p className="mt-2">
        By the end of this course, you will have a clear business direction,
        a basic business plan, and the confidence to take informed next steps.
      </p>
    </>
  }
            leftColumnTitle="What You’ll Learn"
            leftColumnItems={[
              "How to identify profitable business opportunities in your community",
              "Understanding and reaching your target customers",
              "Marketing your products or services on a budget",
              "Creating a simple but effective business plan",
              "Basic financial planning and record keeping",
              "Building lasting customer relationships"
            ]}
            rightColumnTitle="Who Is This Course For"
            rightColumnItems={[
              "Women looking to start their first business",
              "Aspiring entrepreneurs with a business idea",
              "Professionals exploring entrepreneurship",
              "Anyone seeking financial independence",
            ]}
          />

          <CourseCurriculum
            title="Course Curriculum"
            totalLessons={12}
            totalLectures={96}
            totalLength="14h 33m"
            weeks={curriculumData}
            onLectureClick={handleLectureClick}
          />

          {/* Reviews Section */}

          <ReviewsRatingsSection
            title="Reviews & Ratings"
            subtitle="Trusted by women building confident career paths"
            averageRating={4.5}
            totalReviews={145}
            breakdown={[
              { label: "Excellent", value: 70 },
              { label: "Very Good", value: 20 },
              { label: "Average", value: 5 },
              { label: "Poor", value: 3 },
              { label: "Terrible", value: 2 },
            ]}
            reviews={reviews}
            onAddReview={() => console.log("Add review")}
          />
        </div>

        {/* Right Column - Sticky Sidebar (1 col) */}
        <div className="h-fit space-y-6 lg:sticky lg:top-0.5">
          {/* Pricing Card */}
          <PricingCard
            currentPrice={course.price}
            originalPrice={course.originalPrice}
            discount={discountPercent}
            daysLeft={3}
            onEnroll={handleEnroll}
            enrollLoading={enrollLoading}
            includes={[
              { label: "8 structured learning modules" },
              { label: "Step-by-step video lessons" },
              { label: "Downloadable reference materials" },
              { label: "Community access for discussions" },
              { label: "Certificate of completion" },
              { label: "Lifetime course access" },
            ]}
          />

          {/* About Mentor */}
          <AboutMentor
            name={course.teacherName}
            specialty={course.specialty}
            avatar={course.teacherAvatar}
            rating={course.rating}
            courses={12}
          />
        </div>
      </div>
    </div>
  );
}
