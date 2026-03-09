"use client";

import React from "react";
import Card from "@/components/Card";

const courses = [
  {
    id: "1",
    title: "Leadership for Young Women",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
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
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
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
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
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
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
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
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800",
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
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
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
  return (
    <div className="grid grid-cols-3 gap-6 2">
      {courses.map((course) => (
        <Card
          key={course.id}
          course={course}
          onClick={() => console.log(course.title)}
        />
      ))}
    </div>
  );
};

export default Page;