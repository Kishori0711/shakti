"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CourseCard, { type Course } from "./CourseCard";

const courses: Course[] = [
  {
    title: "Career Clarity Blueprint",
    category: "Career Growth",
    level: "Beginner",
    image: "/landingPage/event/img1.jpg",
    peopleAvatars: ["/landingPage/testimonials/img1.jpg", "/landingPage/testimonials/img2.webp", "/landingPage/testimonials/img3.avif"],
    extraCount: 4,
  },
  {
    title: "Leadership Skills for Professionals",
    category: "Leadership",
    level: "Medium",
    image: "/landingPage/event/img2.jpg",
    peopleAvatars: ["/landingPage/testimonials/img3.avif", "/landingPage/testimonials/img5.jpg", "/landingPage/testimonials/img6.webp"],
    extraCount: 4,
  },
  {
    title: "Career Switch Roadmap",
    category: "Career Switch",
    level: "Advance",
    image: "/landingPage/event/img3.jpg",
    peopleAvatars: ["/landingPage/testimonials/img3.avif", "/landingPage/testimonials/img5.jpg", "/landingPage/testimonials/img6.webp"],
    extraCount: 4,
  },
  {
    title: "Interview Confidence Kit",
    category: "Job Readiness",
    level: "Beginner",
    image: "/landingPage/event/img1.jpg",
    peopleAvatars: ["/landingPage/testimonials/img3.avif", "/landingPage/testimonials/img5.jpg", "/landingPage/testimonials/img6.webp"],
    extraCount: 4,
  },
  {
    title: "Personal Branding Playbook",
    category: "Growth",
    level: "Medium",
    image: "/landingPage/event/img2.jpg",
    peopleAvatars: ["/landingPage/testimonials/img1.jpg", "/landingPage/testimonials/img2.webp", "/landingPage/testimonials/img3.avif"],
    extraCount: 4,
  },
];

export default function FeaturedCoursesSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const el = itemRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  // Observe which card is most visible -> update active dot
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with highest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target) return;
        const idx = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      {
        root,
        threshold: [0.55, 0.7, 0.85],
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // keep refs length stable
  useMemo(() => {
    itemRefs.current = itemRefs.current.slice(0, courses.length);
  }, []);

  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto w-full max-w-full px-4 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-start">
          <h2 className="text-5xl font-medium tracking-tight text-neutral-900">
            Featured Courses
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-neutral-500 md:text-right">
            Explore focused learning journeys designed to help women build stronger
            foundations, prepare for leadership, and access future opportunities with
            confidence.
          </p>
        </div>

        {/* Horizontal scroll row (one line on all screens) */}
        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-2
                     [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {courses.map((course, i) => (
            <div
              key={course.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className="
                snap-start shrink-0
                w-[min(88vw,360px)]
                md:w-90
                lg:w-95
              "
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {courses.map((_, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to course ${i + 1}`}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  active ? "bg-primary-500" : "bg-neutral-300 hover:bg-neutral-400",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}