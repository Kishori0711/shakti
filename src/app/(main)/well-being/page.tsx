"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import didiImg from "@/assets/WellBeing/didi.png";
import sakhiImg from "@/assets/WellBeing/sakhi.png";
import guruMaaImg from "@/assets/WellBeing/guruMaa.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPersonasThunk,
  startNewChatThunk,
} from "@/features/chatbot/chatbotThunk";
import { Skeleton } from "@/components/ui/skeleton";
import { selectPersonas } from "@/features/chatbot/chatbotSelectors";

type CompanionCardProps = {
  name: string;
  tagline: string;
  tone: string;
  image: any;
  cardBg: string;
  onSelect: () => void;
};

function CompanionCard({
  name,
  tagline,
  tone,
  image,
  cardBg,
  onSelect,
}: CompanionCardProps) {
  return (
    <section
      onClick={onSelect}
      className={`
    group
    w-full max-w-md cursor-pointer rounded-3xl border-3 border-white bg-white
    transition-all duration-200
    hover:-translate-y-1 hover:shadow-md
    hover:border-primary-500 hover:bg-primary-50/60
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
  `}
    >
      <div
        className={`flex h-full flex-col rounded-[1.35rem] px-6 pb-4 pt-4 text-center ${cardBg}`}
      >
        {/* Image */}
        <div className="mx-auto flex h-40 w-40 items-center justify-center">
          <Image
            src={image}
            alt={name}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        {/* Name */}
        <h2 className="mt-2 text-sm font-semibold sm:text-base">{name}</h2>

        {/* Tagline */}
        <p className="mt-1 text-sm font-medium text-primary-400">{tagline}</p>

        {/* Tone */}
        <p className="mx-auto mt-1 max-w-sm text-xs text-gray-600">{tone}</p>

        {/* Button */}
        <button
          onClick={onSelect}
          className="mt-3 w-full rounded-lg bg-primary-500 py-3 text-sm font-semibold text-white hover:bg-primary-800"
        >
          Select {name}
        </button>
      </div>
    </section>
  );
}

export default function WellBeingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.chatbot.personasLoading);
  const personas = useAppSelector(selectPersonas);

  useEffect(() => {
    dispatch(fetchPersonasThunk());
  }, [dispatch]);

  // Image mapping
  const personaImages: Record<string, any> = {
    aria: didiImg,
    elara: sakhiImg,
    mira: guruMaaImg,
  };

  // Background colors
  const personaBg: Record<string, string> = {
    aria: "bg-orange-100",
    elara: "bg-yellow-100",
    mira: "bg-red-100",
  };

  const onSelect = async (slug: string) => {
    const userId = "123";

    try {
      await dispatch(
        startNewChatThunk({
          personaName: slug,
          userId,
        }),
      ).unwrap();

      router.push("/well-being/chat");
    } catch (error) {
      console.error("Chat start failed", error);
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 ">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-lg font-semibold tracking-wide text-black sm:text-xl">
            Choose Your Companion
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
            Select the AI companion that feels right for you. Each has a unique
            personality to support your well-being journey.
          </p>
        </header>

        {/* Cards */}
        <main className="mt-8 grid grid-cols-1 justify-items-center gap-8 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full max-w-md rounded-3xl border border-border bg-white p-6 flex flex-col items-center gap-4"
                >
                  {/* Image */}
                  <Skeleton className="h-40 w-40 rounded-full" />

                  {/* Name */}
                  <Skeleton className="h-4 w-32" />

                  {/* Tagline */}
                  <Skeleton className="h-3 w-40" />

                  {/* Tone */}
                  <Skeleton className="h-3 w-48" />

                  {/* Button */}
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))
            : personas.map((p) => (
                <CompanionCard
                  key={p.slug}
                  name={p.name}
                  tagline={p.tagline}
                  tone={p.tone}
                  image={personaImages[p.slug]}
                  cardBg={personaBg[p.slug]}
                  onSelect={() => onSelect(p.slug)}
                />
              ))}
        </main>
      </div>
    </div>
  );
}
