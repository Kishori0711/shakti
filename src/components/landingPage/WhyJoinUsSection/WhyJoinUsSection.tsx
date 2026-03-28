import Image from "next/image";
import type { IconType } from "react-icons";
import {
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineHeart,
  HiOutlineCursorArrowRays,
} from "react-icons/hi2";

type Feature = {
  Icon: IconType;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    Icon: HiOutlineSparkles,
    title: "Less confusion",
    desc: "Guided onboarding and next best actions reduce decision fatigue from day one.",
  },
  {
    Icon: HiOutlineAcademicCap,
    title: "Better learning",
    desc: "Courses are aligned to goals and career stage instead of being dumped into a messy library.",
  },
  {
    Icon: HiOutlineHeart,
    title: "Real support",
    desc: "Mentors and AI Companion help users when they are stuck, not weeks later when momentum is gone.",
  },
  {
    Icon: HiOutlineCursorArrowRays,
    title: "Action over browsing",
    desc: "The platform is built to drive progress, not endless scrolling and false productivity.",
  },
];

export default function WhyJoinUsSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-full px-4 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-100 sm:aspect-[4/3]">
              <Image
                src="/landingPage/joinUs/img.webp"
                alt="Why join us"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
              Why Join Us
            </h2>

            <p className="mt-4 max-w-2xl text-base  text-zinc-500">
              Most platforms only provide information. Shakti 2047 is designed to
              create movement by connecting women to real learning, guidance,
              leadership preparation, and future opportunities.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {FEATURES.map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center text-primary-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="text-base font-semibold text-zinc-900">
                      {title}
                    </div>
                    <p className="mt-1 text-sm leading-5 text-zinc-500">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}