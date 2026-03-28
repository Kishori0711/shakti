"use client";

import TestimonialsMarqueeRow from "./TestimonialsMarqueeRow";
import { type Testimonial } from "./TestimonialCard";

const testimonials: Testimonial[] = [
  {
    name: "Ritika",
    role: "Career Switcher",
    text: "Shakti 2047 helped me stop overthinking my career switch. The recommended mentor gave me a realistic roadmap instead of generic advice.",
    avatar: "/landingPage/testimonials/img1.jpg",
  },
  {
    name: "Ananya",
    role: "Working Professional",
    text: "The platform made learning feel organized. I did not waste time guessing what course to take next. The recommendations were actually relevant.",
    avatar: "/landingPage/testimonials/img2.webp",
  },
  {
    name: "Neha",
    role: "Founder",
    text: "The AI Companion was surprisingly useful when I felt overwhelmed. It helped me calm down and focus on one next step instead of spiraling.",
    avatar: "/landingPage/testimonials/img3.avif",
  },
  {
    name: "Samar",
    role: "Student",
    text: "Clear guidance and quick direction. I could finally see a path instead of random tutorials.",
    avatar: "/landingPage/testimonials/img4.webp",
  },
  {
    name: "Priya",
    role: "Product Designer",
    text: "Mentor feedback was practical and actionable. Helped me improve my portfolio fast.",
    avatar: "/landingPage/testimonials/img5.jpg",
  },
  {
    name: "Karan",
    role: "Software Engineer",
    text: "Loved the structured approach and how everything connected step-by-step.",
    avatar: "/landingPage/testimonials/img5.jpg",
  },
];

export default function TestimonialsSection() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);

  return (
    <section className="w-full bg-white pt-4 pb-44">
      <div className="mx-auto w-full max-w-full">
        {/* Top heading area */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-16  max-w-full m-auto ">
          <div className="select-none text-[70px] font-semibold tracking-tight text-neutral-200 md:text-[8rem] lg:text-[10rem]">
            Testimonials
          </div>

          <h2 className="text-5xl font-semibold leading-tight text-neutral-900">
            What People <br className="hidden lg:block" />
            Say About Us
          </h2>
        </div>

        {/* rows */}
        <div className=" space-y-6">
          {/* Row 1: Right -> Left */}
          <TestimonialsMarqueeRow items={row1} direction="rtl" speed={75} />

          {/* Row 2: Left -> Right */}
          <TestimonialsMarqueeRow items={row2} direction="ltr" speed={65} />
        </div>
      </div>
    </section>
  );
}
