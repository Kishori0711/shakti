// app/learn/my-courses/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/CouresCard";
import type { ExploreCourse, EnrolledCourse } from "@/types/courses";

const MyCoursesPage = () => {
  const router = useRouter();

  // ✅ TWO separate states for TWO different data types
  const [recommendedCourses, setRecommendedCourses] = useState<
    ExploreCourse[]
  >([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 Baad mein 2 ALAG API calls hongi:
        // const [recRes, enrolledRes] = await Promise.all([
        //   fetch("/api/recommended-courses"),
        //   fetch("/api/my-courses"),
        // ]);
        // const recData = await recRes.json();
        // const enrolledData = await enrolledRes.json();
        // setRecommendedCourses(recData);
        // setEnrolledCourses(enrolledData);

        // ✅ Static data — Recommended (ExploreCourse type)
        setRecommendedCourses([
          {
            id: "1",
            title: "Strategic Career Foundations",
            image:
              "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
            modules: 8,
            teacherName: "Sunita Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            tags: "Career Growth",
            language: ["English"],
            rating: 5.0,
            learners: 4523,
            price: 1499,
            isNew: true,
          },
          {
            id: "2",
            title: "Confidence Building for Professionals",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
            modules: 8,
            teacherName: "Sunita Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
            tags: "Career Growth",
            language: ["Hindi"],
            rating: 5.0,
            learners: 4523,
            price: 1499,
            isNew: true,
          },
          {
            id: "3",
            title: "Leadership Basics for Working Women",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
            modules: 8,
            teacherName: "Sunita Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            tags: "Career Growth",
            language: ["Hindi", "English"],
            rating: 5.0,
            learners: 4523,
            price: 1499,
          },
        ]);

        // ✅ Static data — Enrolled (EnrolledCourse type)
        setEnrolledCourses([
          {
            id: "4",
            title: "Strategic Career Foundations",
            image:
              "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
            modules: 8,
            teacherName: "Sunita Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            tags: "Career Growth",
            language: ["Hindi", "English"],
            progress: 65,
            completedLessons: 6,
            totalLessons: 24,
          },
          {
            id: "5",
            title: "Confidence Building for Professionals",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
            modules: 8,
            teacherName: "Sunita Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
            tags: "Career Growth",
            language: ["Hindi"],
            progress: 65,
            completedLessons: 6,
            totalLessons: 24,
          },
          {
            id: "6",
            title: "Leadership Basics for Working Women",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
            modules: 8,
            teacherName: "Sunita Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            tags: "Career Growth",
            language: ["Hindi", "English"],
            progress: 65,
            completedLessons: 6,
            totalLessons: 24,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Enroll handler — per card loading
  const handleEnroll = (courseId: string) => {
    setLoadingCourseId(courseId);
    setTimeout(() => {
      setLoadingCourseId(null);
      console.log(`Enrolled in course ${courseId}`);
    }, 1500);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-8 px-4 py-6">
      {/* ===== SECTION 1: RECOMMENDED COURSES ===== */}
      <section>
        <h3 className="font-bold text-lg mb-4">
          Recommended Courses for You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="explore"
              onClick={() => router.push(`/learn/explore/${course.id}`)}
              onEnroll={() => handleEnroll(course.id)}
              enrollLoading={loadingCourseId === course.id}
              showButton={true}
            />
          ))}
        </div>
      </section>

      {/* ===== SECTION 2: MY COURSES (ENROLLED) ===== */}
      <section>
        <h3 className="font-bold text-lg mb-4">My Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="enrolled"
              onClick={() => router.push(`/learn/my-courses/${course.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyCoursesPage;