"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sakhiImg from "@/assets/WellBeing/video (1).png";
import { IoSettingsOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { IoIosMic } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  sendMessageThunk,
  endChatSessionThunk,
} from "@/features/chatbot/chatbotThunk";

import {
  selectMessages,
  selectSessionId,
  selectCurrentPersona,
  selectMessageLoading
} from "@/features/chatbot/chatbotSelectors";
import { LuRefreshCcw } from "react-icons/lu";

export default function WellBeingChatPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const messages = useAppSelector(selectMessages);
  const sessionId = useAppSelector(selectSessionId);
  const persona = useAppSelector(selectCurrentPersona);
 const messageLoading = useAppSelector(selectMessageLoading);
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) {
      router.push("/well-being");
    }
  }, [sessionId, router]);
  // auto scroll

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const sendMessage = () => {
    const userMsg = message.trim();
    if (!userMsg || !sessionId) return;

    dispatch(
      sendMessageThunk({
        sessionId,
        userMessage: userMsg,
      }),
    );

    setMessage("");
  };

  const quickPrompts = useMemo(
    () => [
      "Explain in Hindi",
      "Give me an example",
      "Summarize in 3 points",
      "What's the main idea?",
    ],
    [],
  );

  return (
    <div className="min-h-screen p-1">
      <div className="mx-auto grid w-full max-w-9xl grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* LEFT: Chat Panel */}
        <section className="overflow-hidden rounded-2xl bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-primary-500 px-2 py-4 text-white lg:px-4">
            <div className="flex items-center gap-2">
              <Image
                src={sakhiImg}
                alt="Companion"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border-2 border-white/70 object-cover"
              />

              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">
                    {persona?.name || "Companion"}
                  </h2>

                  <span className="rounded-md bg-emerald-400 px-2 py-0.5 text-xs font-semibold text-emerald-950">
                    Active
                  </span>
                </div>

                <p className="text-xs text-white/75">
                  {persona?.tagline || "Your AI companion"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (sessionId) {
                    dispatch(endChatSessionThunk(sessionId));
                  }
                  router.push("/well-being");
                }}
                className="inline-flex items-center gap-0 rounded-lg bg-white px-2 py-1 text-[8px] font-semibold text-gray-900 hover:bg-white/95 md:text-xs lg:gap-2 lg:px-4 lg:py-2"
              >
                <LuRefreshCcw className="h-5 w-5 text-gray-700" />
                Change Companion
              </button>

              <button className="grid h-10 w-10 place-items-center rounded-lg">
                <IoSettingsOutline className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex min-h-[100vh] flex-col">
            {/* Messages */}
            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {messages.map((msg) => {
                if (msg.role === "user") {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[420px] rounded-xl bg-primary-500 px-4 py-3 text-sm text-white">
                        {msg.content}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-500 text-white">
                      ✨
                    </div>

                    <div className="max-w-[520px] rounded-xl bg-[#f5f1ea] px-4 py-3 text-sm text-gray-800">
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {/* LOADING INDICATOR */}
              {messageLoading && (
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-500 text-white">
                    ✨
                  </div>
                  <div className="max-w-[520px] rounded-xl bg-[#f5f1ea] px-4 py-3">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="border border-border bg-primary-100 px-4 py-5 md:px-6 md:py-6 rounded-xl shrink-0">
              {/* Quick prompts */}
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => setMessage(p)}
                    className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-primary-500"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-3 rounded-xl border border-border  bg-white px-4 py-3">
                <button className="text-gray-500">
                  <IoIosMic className="h-6 w-6" />
                </button>

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Write a message"
                />

                <button
                  onClick={sendMessage}
                  className="
    grid place-items-center rounded-full 
    bg-gradient-to-br from-purple-500 to-primary-500 
    p-3 text-white shadow-md hover:shadow-lg 
    transition-all duration-200 active:scale-95
  "
                >
                  <BsFillSendFill className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Sidebar (unchanged) */}
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
            <h3 className="text-sm font-bold text-gray-900">
              Today&apos;s Reflection
            </h3>
            <p className="mt-3 text-sm italic text-gray-600">
              “She believed she could, so she did.”
            </p>
            <p className="mt-3 text-sm text-gray-700">— R.S. Grey</p>
          </div>

          {/* Focus */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="text-sm font-bold text-gray-900">
              Today&apos;s Focus
            </h3>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span>
                  Continue:{" "}
                  <span className="text-gray-500">Business Basics</span>
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
