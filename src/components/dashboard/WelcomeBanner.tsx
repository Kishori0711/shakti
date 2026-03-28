// src/components/WelcomeBanner.tsx

"use client";

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppSelector } from "@/store/hooks";
import { selectFullName } from "@/features/profile/profileSlice";
import { Button } from "../ui/button";

const WelcomeBanner = () => {
  const { t, loading } = useTranslation();
  const fullName = useAppSelector(selectFullName);

  return (
    <section className="relative h-full w-full overflow-hidden rounded-2xl border border-primary-50 bg-secondary-100 p-8 lg:p-6">
      <div className="flex h-full items-center">
        {/* LEFT */}
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-tight">
            {loading ? "Loading..." : t("welcomeBack")}, {fullName}
          </h1>

          <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-700">
            {loading ? "Loading..." : t("personalizedGrowthPathIntro")}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="default"
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-5 font-semibold shadow-sm"
            >
              Define Career Archetype
            </Button>

            <Button
              variant="default"
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-5 font-semibold shadow-sm"
            >
              Explore How It Works
            </Button>
          </div> 
        </div>

        {/* RIGHT */}
<div className="relative hidden h-full flex-[0_0_38%] xl:block">
  {/* orange circle */}
  <div className="absolute right-0.5 top-48 h-[clamp(220px,22vw,320px)] w-[clamp(200px,20vw,320px)] -translate-y-1/2 rounded-full bg-primary-500" />

          {/* image */}
          <Image
            src="/wellcomeimg.png"
            alt="Welcome"
            width={300}
            height={260}
            className="absolute right-14 h-[clamp(210px,26vh,280px)] w-auto object-contain"
            priority
          />

          {/* sparkles */}
          <div className="absolute right-8 top-6">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 4l2.6 10.2L35 17l-10.4 2.8L22 30l-2.6-10.2L9 17l10.4-2.8L22 4z"
                fill="#F6A623"
                opacity="0.9"
              />
              <path
                d="M35 25l1.6 6.2L43 33l-6.4 1.8L35 41l-1.6-6.2L27 33l6.4-1.8L35 25z"
                fill="#FF6B6B"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
