"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      {/* max width so ultra-wide displays don't break the composition */}
      <div className="mx-auto w-full max-w-full px-6 sm:px-10 lg:px-16 py-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <div className="relative">
  {/* ONLY H1 absolute on desktop */}
  <h1 className="text-[62px] lg:absolute lg:left-0 lg:top-10 lg:w-[min(1500px,65vw)] lg:text-[clamp(78px,6.2vw,130px)] font-semibold leading-[0.95] tracking-tight text-neutral-900">
    Turn career confusion <br className="hidden lg:block" />
    into <span className="text-primary-500">confident</span> <br />
    action.
  </h1>

  {/* Content under heading */}
  <div className=" lg:mt-0 lg:pt-[clamp(240px,22vw,430px)]">
    <p className="max-w-xl text-base leading-relaxed text-neutral-500">
      Shakti 2047 is Asia&apos;s first comprehensive Digital and AI platform to connect
      women in the age group 18 onwards to their future pathway to success.
    </p>

    <div className="mt-7">
      <button
        type="button"
        className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
      >
        Explore Courses
      </button>
    </div>
  </div>
</div>

          {/* RIGHT */}
          <div className="relative z-10 flex justify-center lg:justify-end lg:-mt-6">
            <div className="w-full max-w-130 lg:max-w-none">
              {/* Make image size scale, but capped */}
              <div className="relative aspect-320/380 lg:aspect-430/380 w-full lg:w-[min(720px,42vw)] overflow-hidden rounded-[26px]">
                <Image
                  src="/landingPage/hero.png"
                  alt="Hero"
                  fill
                  priority
                  className="object-contain object-right"
                  sizes="(min-width: 1024px) 720px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}