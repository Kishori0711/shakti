// components/AskAIChatModal.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Mic, Send, Download } from "lucide-react";
import type { AIChatMessage } from "@/types/courses";
import { IoSparklesSharp } from "react-icons/io5";

type AskAIChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle?: string;
};

const staticMessages: AIChatMessage[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Hello! I'm here to help you understand this lesson better. What would you like me to explain?",
  },
  {
    id: "2",
    role: "user",
    content:
      "Good morning Richard 👋, now you can start from introduce yourself",
  },
  {
    id: "3",
    role: "ai",
    content:
      'Great question about "dsf"! In simple terms, understanding your target market means knowing exactly who your customers are. Think of it like this - if you\'re selling handmade pickles, your target market might be health-conscious families in your neighborhood who value homemade products. This helps you focus your efforts on the right people.',
  },
];

const quickActions = [
  { label: "Explain in Hindi", color: "bg-orange-500 text-white" },
  { label: "Give me an example", color: "bg-orange-100 text-orange-700" },
  { label: "Summarize in 3 points", color: "bg-orange-100 text-orange-700" },
  { label: "What's the main idea?", color: "bg-orange-100 text-orange-700" },
];

const AskAIChatModal: React.FC<AskAIChatModalProps> = ({
  isOpen,
  onClose,
  lessonTitle = "Understanding Your Market",
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>(staticMessages);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Small delay to ensure DOM is ready before triggering animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      // Wait for slide-out animation to finish before unmounting
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Small delay so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Don't render anything if not open and not animating
  if (!isOpen && !isAnimating) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    const aiReply: AIChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content:
        "This is a static response. AI integration will be added later. " +
        "Your question was: " +
        inputValue,
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInputValue("");
  };

  const handleQuickAction = (label: string) => {
    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: label,
    };

    const aiReply: AIChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: `This is a static response for "${label}". AI integration coming soon.`,
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end ">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className={`relative h-full w-full max-w-md bg-white rounded-tl-2xl rounded-bl-2xl shadow-2xl
                    flex flex-col transition-transform duration-300 ease-out
                    ${isVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg text-white bg-primary-500 
                          flex items-center justify-center"
            >
              <span className="text-lg"><IoSparklesSharp /></span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                AI Learning Assistant
              </h3>
              <p className="text-xs text-gray-500">
                Explaining: {lessonTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* ===== MESSAGES ===== */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary-500 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-800 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Static PDF attachment */}
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
              <button
                className="inline-flex items-center gap-2 px-3 py-1.5 
                               bg-primary-500 text-white text-xs rounded-full 
                               mb-3"
              >
                Send PDF
              </button>

              <div
                className="flex items-center gap-3 bg-white rounded-lg 
                            p-3 border"
              >
                <div
                  className="w-10 h-10 bg-primary-100 rounded-lg flex 
                              items-center justify-center shrink-0"
                >
                  <span className="text-primary-600 text-xs font-bold">PDF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Training_Handbook_Q2.pdf
                  </p>
                  <p className="text-xs text-gray-500">2.3 MB</p>
                </div>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Download className="w-4 h-4 text-primary-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full 
                              animate-bounce"
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full 
                              animate-bounce [animation-delay:0.1s]"
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full 
                              animate-bounce [animation-delay:0.2s]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="px-4 py-2 flex flex-wrap gap-2 shrink-0">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.label)}
              className={`text-xs px-3 py-1.5 rounded-full ${action.color} 
                         transition-colors hover:opacity-90`}
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* ===== INPUT ===== */}
        <div className="p-4  shrink-0">
          <div
            className="flex items-center gap-2 bg-white border border-border rounded-lg 
                        px-4 py-2"
          >
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <Mic className="w-5 h-5 text-primary-500" />
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Write a message"
              className="flex-1 bg-transparent text-sm outline-none 
                         placeholder:text-gray-400"
            />

            <button
              onClick={handleSend}
              className="w-8 h-8 bg-primary-500 hover:bg-primary-600 
                         rounded-full flex items-center justify-center 
                         transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAIChatModal;