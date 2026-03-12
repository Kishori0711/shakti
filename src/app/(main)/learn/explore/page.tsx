"use client";

import { useState } from "react";
import FilterSelect from "@/components/filters/FilterSelect";
import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";

const courses = [
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.6,
    learners: 1240,
    price: 499,
    tags: "Leadership",
    language: ["Hindi"],
  },
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.6,
    learners: 1240,
    price: 499,
    tags: "Leadership",
    language: ["Hindi"],
  },
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.6,
    learners: 1240,
    price: 499,
    tags: "Leadership",
    language: ["Hindi"],
  },
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.6,
    learners: 1240,
    price: 499,
    tags: "Leadership",
    language: ["Hindi"],
  },
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.6,
    learners: 1240,
    price: 499,
    tags: "Leadership",
    language: ["Hindi"],
  },
  {
    id: "1",
    title: "Leadership for Young Women",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    modules: 8,
    teacherName: "Priya Sharma",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.6,
    learners: 1240,
    price: 499,
    tags: "Leadership",
    language: ["Hindi"],
  },
];

const Page = () => {
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [levels, setLevels] = useState("");
  const [sortbyPopular, setSortbyPopular] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-[#121632] text-2xl font-bold">Explore Courses</h2>
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="w-full md:max-w-sm">
          <Input placeholder="Search courses..." icon={FiSearch} />
        </div>
        <div className="flex flex-wrap gap-3 xl:ml-auto w-full xl:w-auto">
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
            placeholder="Sort by"
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

      {/* COURSE GRID */}
      <h6 className="text-[#121632] font-bold">Recommended Courses for You</h6>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onClick={() => console.log(course.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
