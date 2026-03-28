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
  selectMessageLoading,
} from "@/features/chatbot/chatbotSelectors";
import { LuRefreshCcw } from "react-icons/lu";

interface QuickTip {
  id: number;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}
 
const quickTipsData: QuickTip[] = [
  {
    id: 1,
    title: "Stuck on a Topic?",
    description: "Ask Sakhi to explain difficult concepts in simple language with examples.",
    actionText: "Explain this topic",
    actionLink: "#"
  },
  {
    id: 2,
    title: "Too Much to Read?",
    description: "Upload notes, PDFs, or documents and Sakhi will summarize them for you.",
    actionText: "Summarize my notes",
    actionLink: "#"
  },
  {
    id: 3,
    title: "Prepare for Interviews",
    description: "Practice common interview questions and get feedback on your answers.",
    actionText: "Start interview practice",
    actionLink: "#"
  }
];
 

export default function WellBeingChatPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const messages = useAppSelector(selectMessages);
  const sessionId = useAppSelector(selectSessionId);
  const persona = useAppSelector(selectCurrentPersona);
  const messageLoading = useAppSelector(selectMessageLoading);

  const [message, setMessage] = useState("");
   const [currentTipIndex, setCurrentTipIndex] = useState(0);
 
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!sessionId) router.push("/well-being");
  }, [sessionId, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const sendMessage = () => {
    const userMsg = message.trim();
    if (!userMsg || !sessionId) return;

    dispatch(sendMessageThunk({ sessionId, userMessage: userMsg }));
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

    const handlePrevTip = () => {
    setCurrentTipIndex((prev) => 
      prev === 0 ? quickTipsData.length - 1 : prev - 1
    );
  };
 
  const handleNextTip = () => {
    setCurrentTipIndex((prev) => 
      prev === quickTipsData.length - 1 ? 0 : prev + 1
    );
  };
 
  const currentTip = quickTipsData[currentTipIndex];

  return (
    <div className="p-0 sm:p-2">
      {/* -------- GRID -------- */}
      <div className="w-full grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1fr_340px]">
        {/* ================= LEFT — CHAT (STICKY) ================= */}
        {/*
          h-[100dvh]        → mobile: full viewport height
          lg:h-[calc(100vh-1rem)] → desktop: almost full viewport
          lg:sticky lg:top-2 → desktop: stays fixed while right scrolls
          flex flex-col      → header + body + input stacked
          overflow-hidden    → prevents outer overflow
        */}
        <section
          className="
            flex flex-col
            h-[88dvh]
            lg:h-[calc(85vh-1rem)]
            lg:sticky lg:top-2
            bg-white border border-border
            overflow-hidden
            rounded-none sm:rounded-2xl
          "
        >
          {/* ---------- HEADER ---------- */}
          <div className="flex items-center justify-between bg-primary-500 px-4 py-4 text-white shrink-0">
            <div className="flex items-center gap-3">
              <Image
                src={sakhiImg}
                alt="Companion"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border-2 border-white/70 object-cover"
              />
              <div>
                <h2 className="text-sm font-semibold">
                  {persona?.name || "Companion"}
                </h2>
                <p className="text-xs text-white/70">
                  {persona?.tagline || "Your AI companion"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (sessionId) dispatch(endChatSessionThunk(sessionId));
                  router.push("/well-being");
                }}
                className="flex items-center gap-1 bg-white text-black text-xs px-3 py-1 rounded-lg"
              >
                <LuRefreshCcw />
                Change
              </button>
              <IoSettingsOutline className="text-xl" />
            </div>
          </div>

          {/* ---------- CHAT BODY ---------- */}
          {/*
            flex-1        → takes remaining space
            overflow-hidden → contains children
            min-h-0       → CRITICAL: allows flex child to shrink below content size
          */}
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">
            {/* --- MESSAGES (SCROLLABLE) --- */}
            {/*
              flex-1          → fills available space
              overflow-y-auto → ONLY messages scroll, not the page
              min-h-0         → allows shrinking
            */}
            <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6">
              {messages.map((msg) =>
                msg.role === "user" ? (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[80%] sm:max-w-105 rounded-xl bg-primary-500 text-white px-4 py-2 text-sm wrap-break-word">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
                      ✨
                    </div>
                    <div className="max-w-[85%] sm:max-w-130 rounded-xl bg-gray-100 px-4 py-2 text-sm wrap-break-word">
                      {msg.content}
                    </div>
                  </div>
                ),
              )}

              {messageLoading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
                    ✨
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
                    typing...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* --- INPUT (ALWAYS VISIBLE AT BOTTOM) --- */}
            {/*
              ✅ shrink-0 → never shrinks, always visible
            */}
            <div className="bg-white p-3 sm:p-4 shrink-0">
              <div className="bg-primary-200 p-5 rounded-2xl">
                <div className="flex flex-wrap gap-2 mb-2">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => setMessage(p)}
                      className="text-[10px] sm:text-xs bg-purple-100 px-3 py-1 rounded-full text-primary-600"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2  rounded-xl px-3 py-2 bg-white border border-border">
                  <IoIosMic className="text-gray-500 shrink-0" />

                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    className="flex-1 outline-none text-sm "
                    placeholder="Type a message..."
                  />

                  <button
                    onClick={sendMessage}
                    className="bg-primary-500 text-white p-2 rounded-full shrink-0"
                  >
                    <BsFillSendFill />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RIGHT — SIDEBAR (SCROLLS NORMALLY) ================= */}
        <aside className="space-y-6 pb-6 pr-2">
          <div className="bg-white rounded-2xl p-4 h-48 sm:h-56 border border-border">
            <Image
              src={sakhiImg}
              alt="img"
              className="rounded-xl object-cover h-full w-full"
            />
          </div>
 <div className="rounded-2xl bg-white p-6 shrink-0 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Tips</h3>

            {/* Carousel Content */}
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {currentTip.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {currentTip.description}
                </p>
                <a
                  href={currentTip.actionLink}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
                >
                  {currentTip.actionText}
                  <span className="text-lg">💬</span>
                </a>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {currentTip.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {currentTip.description}
                </p>
                <a
                  href={currentTip.actionLink}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
                >
                  {currentTip.actionText}
                  <span className="text-lg">💬</span>
                </a>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {currentTip.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {currentTip.description}
                </p>
                <a
                  href={currentTip.actionLink}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
                >
                  {currentTip.actionText}
                  <span className="text-lg">💬</span>
                </a>
              </div>

              {/* Divider */}

              {/* Carousel Indicators */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {quickTipsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTipIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentTipIndex
                        ? "bg-orange-500 w-6"
                        : "bg-gray-300 w-2 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to tip ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
         
        </aside>
      </div>
    </div>
  );
}


