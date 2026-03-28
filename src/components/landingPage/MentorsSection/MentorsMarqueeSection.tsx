"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

type Mentor = { name: string; role: string; img: string };

const mentors: Mentor[] = [
  { name: "Ananya Kapoor", role: "Leadership Coach & Product Leader", img: "/landingPage/mentor/img1.webp" },
  { name: "Anjali Desai", role: "Business Coach at Self-employed", img: "/landingPage/mentor/img2.jpg" },
  { name: "Dr. Priya Mehta", role: "Financial Advisor, HDFC Bank", img: "/landingPage/mentor/img3.webp" },
  { name: "Monika", role: "Product Management Mentor", img: "/landingPage/mentor/img4.jpg" },
];

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  if (range === 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function MeetYourMentors() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const [setWidth, setSetWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const speed = 90; // px/sec

  // Measure: one set width + viewport width
  useEffect(() => {
    const setEl = firstSetRef.current;
    const viewEl = viewportRef.current;
    if (!setEl || !viewEl) return;

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;

      // one set exact width
      const w1 = setEl.scrollWidth;
      const snappedSet = Math.round(w1 * dpr) / dpr;

      // viewport/container width
      const w2 = viewEl.getBoundingClientRect().width;
      const snappedView = Math.round(w2 * dpr) / dpr;

      setSetWidth(snappedSet);
      setViewportWidth(snappedView);
    };

    requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(setEl);
    ro.observe(viewEl);

    return () => ro.disconnect();
  }, []);

  // How many copies needed so that at x ≈ -setWidth, remaining content >= viewportWidth
  const copies = useMemo(() => {
    if (!setWidth || !viewportWidth) return 2;
    return Math.max(2, Math.ceil(viewportWidth / setWidth) + 1);
  }, [setWidth, viewportWidth]);

  useAnimationFrame((_, delta) => {
    if (paused || !setWidth) return;

    const moveBy = (speed * delta) / 1000;
    const next = x.get() - moveBy;

    // keep x in [-setWidth, 0)
    x.set(wrap(next, -setWidth, 0));
  });

  return (
    <section className="w-full py-6">
      <div className="w-full max-w-full">
        <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-900">
          Meet Your Mentors
        </h2>

        <div ref={viewportRef} className="mt-8 w-full overflow-hidden">
          <motion.div
            className="will-change-transform transform-gpu"
            style={{ x }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex w-max flex-nowrap gap-0">
              {Array.from({ length: copies }).map((_, copyIndex) => (
                <div
                  key={copyIndex}
                  ref={copyIndex === 0 ? firstSetRef : undefined}
                  className="flex w-max shrink-0 flex-nowrap gap-0"
                  aria-hidden={copyIndex === 0 ? undefined : true}
                >
                  {mentors.map((m, idx) => (
                    <div
                      key={`${copyIndex}-${m.name}-${idx}`}
                      className="relative h-85 w-70 shrink-0 overflow-hidden bg-neutral-200"
                    >
                      <Image
                        src={m.img}
                        alt={copyIndex === 0 ? m.name : ""}
                        fill
                        className="object-cover"
                        sizes="280px"
                        // only first set priority; others can be normal
                        priority={copyIndex === 0}
                      />

                      <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-black/80 via-black/55 to-transparent" />

                      <div className="absolute inset-x-0 bottom-6 p-4 text-center text-white">
                        <div className="text-base font-semibold leading-tight">{m.name}</div>
                        <div className="mt-1 text-xs text-white/80">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}