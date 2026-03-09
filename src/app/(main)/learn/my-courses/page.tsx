"use client";

import MyCourseCard from "@/components/MyCourseCard";

const courses = [
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 10,
    teacherName: "Priya Sharma",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: "Leadership",
    language: ["Hindi"],
  },
  {
    id: "2",
    title: "Digital Skills for Girls",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 8,
    teacherName: "Anjali Verma",
    teacherAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    tags: "Digital",
    language: ["Hindi", "English"],
  },
  {
    id: "3",
    title: "Self Confidence Training",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 12,
    teacherName: "Neha Gupta",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: "Personality",
    language: ["English"],
  },
   {
    id: "3",
    title: "Self Confidence Training",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 12,
    teacherName: "Neha Gupta",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: "Personality",
    language: ["English"],
  },
   {
    id: "3",
    title: "Self Confidence Training",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 12,
    teacherName: "Neha Gupta",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: "Personality",
    language: ["English"],
  },
   {
    id: "3",
    title: "Self Confidence Training",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 12,
    teacherName: "Neha Gupta",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: "Personality",
    language: ["English"],
  },
   {
    id: "3",
    title: "Self Confidence Training",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    modules: 12,
    teacherName: "Neha Gupta",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: "Personality",
    language: ["English"],
  },

];

const progresses = [
  { percentage: 60, completedLessons: 6, totalLessons: 10 },
  { percentage: 40, completedLessons: 3, totalLessons: 8 },
  { percentage: 80, completedLessons: 10, totalLessons: 12 },
  { percentage: 80, completedLessons: 10, totalLessons: 12 },
  { percentage: 80, completedLessons: 10, totalLessons: 12 },
  { percentage: 80, completedLessons: 10, totalLessons: 12 },
  { percentage: 80, completedLessons: 10, totalLessons: 12 },
  { percentage: 80, completedLessons: 10, totalLessons: 12 },
];

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <MyCourseCard
          key={course.id}
          course={course}
          progress={progresses[index]}
          onClick={() => console.log(course.title)}
        />
      ))}
    </div>
  );
}