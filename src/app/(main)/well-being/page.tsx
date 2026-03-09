"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image, { type ImageProps } from "next/image";
import didiImg from "@/assets/WellBeing/didi.png";
import sakhiImg from "@/assets/WellBeing/sakhi.png";
import guruMaaImg from "@/assets/WellBeing/guruMaa.png";

type CompanionId = "didi" | "sakhi" | "guru-maa";

type Companion = {
  id: CompanionId;
  name: string;
  tagline: string;
  description: string;
  buttonLabel: string;
  cardBg: string;
  imageSrc: ImageProps["src"]; // must be inside /public
};

function CompanionCard({
  companion: c,
  isSelected,
  onSelect,
}: {
  companion: Companion;
  isSelected: boolean;
  onSelect: (id: CompanionId) => void;
}) {
  return (
    <section
      className={[
        "w-full max-w-md rounded-3xl border-4 bg-white",
        "transition-transform duration-200 hover:-translate-y-1",
        isSelected ? "border-purple-500" : "border-white",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-full flex-col rounded-[1.35rem] px-6 pb-4 pt-4 text-center text-gray-900",
          c.cardBg,
        ].join(" ")}
      >
        {/* Image */}
        <div className="mx-auto flex h-40 w-40 items-center justify-center">
          <Image
            src={c.imageSrc}
            alt={c.name}
            width={160}
            height={160}
            className="h-full w-full select-none object-contain"
            draggable={false}
            priority={false}
          />
        </div>

        {/* Text */}
        <h2 className="mt-2 text-sm font-semibold sm:text-sm">{c.name}</h2>

        <p className="mt-1 text-sm font-medium text-indigo-600">{c.tagline}</p>

        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-gray-600">
          {c.description}
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => onSelect(c.id)}
          className={[
            "mt-3 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white",
            "bg-[#5b2c83] hover:bg-[#4e2573]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          ].join(" ")}
        >
          {c.buttonLabel}
        </button>
      </div>
    </section>
  );
}

export default function WellBeingPage() {
  const router = useRouter();

  const companions: Companion[] = useMemo(
    () => [
      {
        id: "didi",
        name: "Didi",
        tagline: "Your Supportive Elder Sister",
        description:
          "Warm and understanding, offering clear guidance and steady encouragement.",
        buttonLabel: "Select Didi",
        cardBg: "bg-rose-50",
        imageSrc: didiImg,
      },
      {
        id: "sakhi",
        name: "Sakhi",
        tagline: "Your Trusted Friend",
        description:
          "Friendly, uplifting, and straightforward. Helps you stay motivated and positive.",
        buttonLabel: "Select Sakhi",
        cardBg: "bg-sky-50",
        imageSrc: sakhiImg,
      },
      {
        id: "guru-maa",
        name: "Guru Maa",
        tagline: "Your Wise Guide",
        description:
          "Reflective and insightful, sharing timeless wisdom to help you navigate life’s challenges.",
        buttonLabel: "Select Guru Maa",
        cardBg: "bg-violet-50",
        imageSrc: guruMaaImg,
      },
    ],
    []
  );

  const [selected, setSelected] = useState<CompanionId | null>(null);

  const onSelect = (id: CompanionId) => {
    setSelected(id);
    router.push("/well-being/chat");
  };

  return (
    <div className="min-h-screen w-full px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="text-center">
          <h1 className="text-lg font-semibold tracking-wide text-black sm:text-xl">
            Choose Your Companion
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
            Select the AI companion that feels right for you. Each has a unique
            personality to support your well-being journey.
          </p>
        </header>

        <main className="mt-8 grid grid-cols-1 justify-items-center gap-8 lg:grid-cols-3">
          {companions.map((c) => (
            <CompanionCard
              key={c.id}
              companion={c}
              isSelected={selected === c.id}
              onSelect={onSelect}
            />
          ))}
        </main>
      </div>
    </div>
  );
}