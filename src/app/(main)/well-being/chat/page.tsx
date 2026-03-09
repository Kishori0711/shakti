"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sakhiImg from "@/assets/WellBeing/video (1).png"
import { LuRefreshCcw } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { BsFillSendFill } from "react-icons/bs";
import { IoIosMic } from "react-icons/io";

function IconSparkle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l1.2 4.3L17.5 8l-4.3 1.2L12 13.5l-1.2-4.3L6.5 8l4.3-1.7L12 2Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M19 12l.7 2.5L22 15l-2.3.5L19 18l-.7-2.5L16 15l2.3-.5L19 12Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

function IconPdf({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M14 6h14l6 6v28a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="#F3F4F6"
        stroke="#D1D5DB"
      />
      <path d="M28 6v8h8" fill="#E5E7EB" />
      <rect x="14" y="28" width="12" height="10" rx="2" fill="#DC2626" />
      <path
        d="M16.8 35v-4.6h1.8c1.1 0 1.8.6 1.8 1.6 0 1-.7 1.6-1.8 1.6h-.7V35h-1.1Zm1.1-2.2h.6c.4 0 .7-.2.7-.7s-.3-.7-.7-.7h-.6v1.4Z"
        fill="white"
      />
    </svg>
  );
}

function IconDownload({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M8 11l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Waveform() {
  const bars = Array.from({ length: 28 });
  return (
    <div className="flex items-center gap-[3px]" aria-hidden="true">
      {bars.map((_, i) => {
        const h = 6 + ((i * 13) % 18); // deterministic
        return (
          <div
            key={i}
            className="w-[3px] rounded-full bg-white/55"
            style={{ height: `${h}px` }}
          />
        );
      })}
    </div>
  );
}

export default function WellBeingChatPage() {
  const router = useRouter();

  const quickPrompts = useMemo(
    () => ["Explain in Hindi", "Give me an example", "Summarize in 3 points", "What's the main idea?"],
    []
  );

  const [message, setMessage] = useState("");



  return (
    <div className="min-h-screen p-1">
      <div className="mx-auto grid w-full max-w-9xl grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* LEFT: Chat Panel */}
        <section className="overflow-hidden rounded-2xl bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-[#5b2c83] px-2 py-4 text-white lg:px-4">
            <div className="flex items-center gap-2">
              <Image
                src={sakhiImg}
                alt="Sakhi"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border-2 border-white/70 object-cover"
                draggable={false}
                priority
              />

              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">Sakhi</h2>
                  <span className="rounded-md bg-emerald-400 px-2 py-0.5 text-xs font-semibold text-emerald-950">
                    Active
                  </span>
                </div>
                <p className="text-xs text-white/75">Your Best Friend</p>
              </div>
            </div>

            <div className="flex items-center gap-0 lg:gap-3">
              <button
                type="button"
                onClick={() => router.push("/well-being")}
                className="inline-flex items-center gap-0 rounded-lg bg-white px-2 py-1 text-[8px] font-semibold text-gray-900 hover:bg-white/95 md:text-xs lg:gap-2 lg:px-4 lg:py-2"
              >
                <LuRefreshCcw className="h-5 w-5 text-gray-700" />
                Change Companion
              </button>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-lg"
                aria-label="Settings"
              >
                <IoSettingsOutline className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex min-h-[78vh] flex-col">
            <div className="flex-1 space-y-7 px-6 py-6">
              {/* Assistant msg 1 */}
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#5b2c83] text-white">
                  <IconSparkle />
                </div>

                <div className="flex items-center gap-3">
                  <div className="max-w-[520px] rounded-xl bg-[#f5f1ea] px-4 py-3 text-sm text-gray-800">
                    Hey! How are you feeling right now?
                  </div>
                  <button type="button" className="text-gray-500 hover:text-gray-700" aria-label="Play message">
                    <HiOutlineSpeakerWave className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* User msg 1 */}
              <div className="flex justify-end">
                <div className="max-w-[420px] rounded-xl bg-[#5b2c83] px-4 py-3 text-sm text-white">
                  I’m feeling a bit stressed
                </div>
              </div>

              {/* Assistant msg 2 */}
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#5b2c83] text-white">
                  <IconSparkle />
                </div>

                <div className="flex items-center gap-3">
                  <div className="max-w-[560px] rounded-xl bg-[#f5f1ea] px-4 py-3 text-sm text-gray-800">
                    I get that. Tell me what’s stressing you the most.
                  </div>
                  <button type="button" className="text-gray-500 hover:text-gray-700" aria-label="Play message">
                    <HiOutlineSpeakerWave className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* User msg 2 */}
              <div className="flex justify-end">
                <div className="max-w-[420px] rounded-xl bg-[#5b2c83] px-4 py-3 text-sm text-white">
                  Too many tasks today.
                </div>
              </div>

              {/* Assistant msg 3 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#5b2c83] text-white">
                    <IconSparkle />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="max-w-[620px] rounded-xl bg-[#f5f1ea] px-4 py-3 text-sm text-gray-800">
                      Okay, let’s simplify it. What’s the first small thing you can finish in the next 10 minutes?
                    </div>
                    <button type="button" className="text-gray-500 hover:text-gray-700" aria-label="Play message">
                      <HiOutlineSpeakerWave className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Attachment card */}
                <div className="ml-13 sm:ml-[52px]">
                  <div className="flex w-full max-w-sm items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <IconPdf />
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-gray-900">Training_Handbook_Q2.pdf</p>
                        <p className="text-xs text-gray-500">2.3 MB</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-lg text-[#5b2c83] hover:bg-purple-50"
                      aria-label="Download"
                    >
                      <IconDownload />
                    </button>
                  </div>
                </div>

                {/* Audio bubble */}
                <div className="flex justify-end">
                  <div className="flex w-full max-w-md items-center gap-4 rounded-xl bg-[#5b2c83] px-4 py-3 text-white">
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/20"
                      aria-label="Play audio"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7L8 5Z" />
                      </svg>
                    </button>

                    <div className="flex-1">
                      <Waveform />
                    </div>

                    <div className="text-sm tabular-nums text-white/90">00:45</div>
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#f5f1ea] px-4 py-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                  </div>
                </div>
              </div>

              {/* Chat box */}
              <div className="rounded-2xl border border-gray-200 bg-[#fbf7f0] px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-[#5b2c83] hover:bg-purple-200"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                  <button type="button" className="text-gray-500 hover:text-gray-800" aria-label="Voice input">
                    <IoIosMic className="h-6 w-6" />
                  </button>

                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    placeholder="Write a message"
                  />

                  <button
                    type="button"
                    className="grid place-items-center rounded-full bg-gradient-to-br from-purple-500 to-[#5b2c83] p-3 text-white shadow-sm hover:opacity-95"
                    aria-label="Send"
                  >
                    <BsFillSendFill className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-2 lg:self-start">
          {/* Image card */}
          <div className="relative h-56 overflow-hidden rounded-2xl bg-white p-4">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={sakhiImg}
                alt="Companion"
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover"
                draggable={false}
                priority={false}
              />
            </div>
          </div>

          {/* Reflection */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="text-sm font-bold text-gray-900">Today&apos;s Reflection</h3>
            <p className="mt-3 text-sm italic text-gray-600">“She believed she could, so she did.”</p>
            <p className="mt-3 text-sm text-gray-700">— R.S. Grey</p>
          </div>

          {/* Focus */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="text-sm font-bold text-gray-900">Today&apos;s Focus</h3>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span>
                  Continue: <span className="text-gray-500">Business Basics</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-gray-500">Day 2 Of 7-Day Challenge</span>
              </li>
            </ul>
          </div>

          {/* Quick Tips */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="text-sm font-bold text-gray-900">Quick Tips</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>Take a 5-minute break every hour</li>
              <li>Stay hydrated - drink water regularly</li>
              <li>Practice gratitude before bed</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}