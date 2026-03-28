"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

function wrapNeg(x: number, distance: number) {
  // keep in [-distance, 0)
  if (!distance) return 0;
  return ((x % -distance) + -distance) % -distance;
}

type Props = {
  items: Testimonial[];
  direction: "rtl" | "ltr"; // rtl = right->left, ltr = left->right
  speed?: number; // px/sec
};

export default function TestimonialsMarqueeRow({
  items,
  direction,
  speed = 70,
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const [distance, setDistance] = useState(0);
  const [paused, setPaused] = useState(false);

  const loopItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.scrollWidth / 2; // one set width (because duplicated)
      setDistance(w); // no floor -> less jitter
    };

    requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || !distance) return;

    const dir = direction === "rtl" ? -1 : 1;
    const moveBy = (speed * delta) / 1000;

    const next = x.get() + dir * moveBy;
    x.set(wrapNeg(next, distance));
  });

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="will-change-transform" style={{ x }}>
        <div ref={trackRef} className="flex gap-6 py-3">
          {loopItems.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}