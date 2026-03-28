// app/learn/explore/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/CouresCard";
import { ExploreCourse } from "@/types/courses";
import FilterSelect from "@/components/filters/FilterSelect";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { ActionDidRevalidateStaticAndDynamic } from "next/dist/shared/lib/action-revalidation-kind";

const ExplorePage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<ExploreCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [levels, setLevels] = useState("");
  const [sortbyPopular, setSortbyPopular] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  // ✅ API CALL — jab backend ready ho
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // 🔥 Abhi static, baad mein API lagao
        // const res = await fetch("/api/courses");
        // const data = await res.json();
        // setCourses(data);

        // Static data for now
        setCourses([
          {
            id: "1",
            title: "Leadership for Young Women",
            image:
              "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
            modules: 8,
            teacherName: "Priya Sharma",
            teacherAvatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            rating: 4.6,
            learners: 1240,
            price: 499,
            tags: "Leadership",
            language: ["Hindi", "English"],
            isNew: true,
          },
          {
            id: "2",
            title: "Career Growth Fundamentals",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
            modules: 6,
            teacherName: "Ananya Kapoor",
            teacherAvatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
            rating: 4.8,
            learners: 2150,
            price: 599,
            tags: "Career",
            language: ["Hindi"],
            isNew: true,
          },
          {
            id: "3",
            title: "Entrepreneurship Basics",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
            modules: 10,
            teacherName: "Sarah Johnson",
            teacherAvatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            rating: 4.9,
            learners: 3200,
            price: 799,
            tags: "Business",
            language: ["Hindi", "English"],
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId: string) => {
    setLoadingCourseId(courseId);
    // 🔥 Baad mein: await fetch("/api/enroll", { method: "POST", body: ... })
    setTimeout(() => {
      setLoadingCourseId(null);
    }, 1500);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6 px-4 py-6">
      <h2 className="text-[#121632] text-2xl font-bold">Explore Courses</h2>
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="w-full md:max-w-sm">
          <Input placeholder="Search course" icon={FiSearch} />
        </div>
        <div className="flex flex-wrap gap-3 xl:ml-auto w-full xl:w-auto">
          <FilterSelect
            placeholder="Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: "career", label: "Career Growth" },
              { value: "tech", label: "Technology" },
              { value: "business", label: "Business" },
            ]}
          />
           <FilterSelect
            placeholder="All Levels"
            value={levels}
            onChange={setLevels}
            options={[
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
            ]}
          />

          <FilterSelect
            placeholder="All Languages"
            value={language}
            onChange={setLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "hi", label: "Hindi" },
              { value: "es", label: "Spanish" },
            ]}
          />

         
          <FilterSelect
            placeholder="Sort by : Popular"
            value={sortbyPopular}
            onChange={setSortbyPopular}
            options={[
              { value: "popular", label: "Most Popular" },
              { value: "newest", label: "Newest" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
            ]}
          />
        </div>
      </div>
      {/* Recommended — with button */}

      {/* {ActionDidRevalidateStaticAndDynamic.type === 'recoommed '{

      }
      } */}
      <section>
        <h3 className="font-bold text-lg mb-4">Recommended Courses for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
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

      {/* Featured — without button */}
      <section>
        <h3 className="font-bold text-lg mb-4">Featured Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="explore"
              onClick={() => router.push(`/learn/explore/${course.id}`)}
              showButton={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
