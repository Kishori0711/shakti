"use client";

import { motion } from "framer-motion";

const TEXT = "learn connect to grow and move forward with clear direction";

export default function MovingTextSection() {
  return (
    <section className="relative overflow-hidden bg-white ">
      {/* optional top spacing / content container */}
      <div className="mx-auto max-w-7xl px-6">
        {/* aap chahein to heading/paragraph add kar sakte ho */}
      </div>

      {/* Marquee */}
      <div className="relative mt-2 overflow-hidden">
        {/* fade edges (optional) */}
        <div className="pointer-events-none absolute inset-0 z-10 " />

        <motion.div
          className="flex w-max whitespace-nowrap"
          // Right-to-left continuous loop
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18, // speed control (lower = faster)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicate text for seamless loop */}
          <MarqueeText />
          <MarqueeText />
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeText() {
  return (
    <div className="flex items-center">
      <span className="mr-16 text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight text-zinc-200/60">
        {TEXT}
      </span>
    </div>
  );
}