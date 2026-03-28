

"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FiGlobe, FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTranslations } from "@/features/language/languageThunk";

type Props = {
  collapsed: boolean;
};

/* ─── Portal Dropdown for Collapsed State (viewport-safe) ─── */
function CollapsedLangPortal({
  triggerRef,
  show,
  onEnter,
  onLeave,
  children,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
  show: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!show || !triggerRef.current) return;

    const MARGIN = 8;

    const update = () => {
      const trigger = triggerRef.current;
      const portal = portalRef.current;
      if (!trigger || !portal) return;

      const rect = trigger.getBoundingClientRect();
      const dropdownH = portal.offsetHeight;

      // Default position (right side, align top with trigger)
      let top = rect.top;

      // Clamp inside viewport (avoid cutting from bottom/top)
      if (top + dropdownH > window.innerHeight - MARGIN) {
        top = window.innerHeight - MARGIN - dropdownH;
      }
      if (top < MARGIN) top = MARGIN;

      const left = rect.right + 10;

      portal.style.top = `${top}px`;
      portal.style.left = `${left}px`;

      // Arrow align with trigger center (clamped within dropdown)
      let arrowTop = rect.top + rect.height / 2 - top;
      arrowTop = Math.max(12, Math.min(dropdownH - 12, arrowTop));
      portal.style.setProperty("--arrow-top", `${arrowTop}px`);
    };

    // after paint, measure height then position
    const raf = requestAnimationFrame(update);

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [show, triggerRef]);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      ref={portalRef}
      className="fixed z-999"
      // top/left are set by effect to ensure correct measurement & clamping
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>,
    document.body
  );
}

export default function LanguageSwitcher({ collapsed }: Props) {
  const dispatch = useAppDispatch();
  const { currentLang, languages, loading } = useAppSelector(
    (state) => state.language
  );

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Outside click — only for expanded state
  useEffect(() => {
    if (collapsed) return;

    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [collapsed]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLanguageChange = async (langCode: string) => {
    await dispatch(getTranslations(langCode));
    localStorage.setItem("selectedLanguage", langCode);
    document.cookie = `selectedLanguage=${langCode};path=/;max-age=31536000`;
    setLangOpen(false);
  };

  const currentLangName =
    languages.find((lang) => lang.code === currentLang)?.name ||
    currentLang.toUpperCase();

  // Hover handlers with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLangOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLangOpen(false);
    }, 250);
  };

  // ─── Expanded State (unchanged) ───
  if (!collapsed) {
    return (
      <div ref={langRef} className="relative">
        <button
          onClick={() => setLangOpen(!langOpen)}
          disabled={loading}
          className="w-full flex items-center gap-3 px-3 py-2.5
                     rounded-lg text-sm bg-gray-100
                     hover:bg-primary-100 transition-colors
                     disabled:opacity-50"
        >
          <FiGlobe size={18} />
          <span className="flex-1 text-left">{currentLangName}</span>
          <FiChevronDown
            className={`transition ${langOpen ? "rotate-180" : ""}`}
          />
        </button>

        {langOpen && (
          <div
            className="absolute bottom-full left-0 right-0 mb-2
                        bg-white border border-gray-200 rounded-lg
                        shadow-lg p-1.5 z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2
                  rounded text-sm transition-colors
                  ${
                    currentLang === lang.code
                      ? "bg-primary-500 text-white"
                      : "hover:bg-primary-100"
                  }
                `}
              >
                <span className="font-semibold">
                  {lang.code.toUpperCase()}
                </span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── Collapsed State — Right side Portal tooltip (viewport-safe) ───
  return (
    <div ref={langRef} className="relative">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        disabled={loading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full flex justify-center p-2.5 rounded-lg
                   bg-gray-100 hover:bg-primary-100 transition-colors
                   disabled:opacity-50"
        title={currentLangName}
      >
        <FiGlobe size={18} />
      </button>

      {/* Portal Dropdown */}
      <CollapsedLangPortal
        triggerRef={triggerRef}
        show={langOpen}
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
      >
        <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-45">
          {/* Left Arrow (uses --arrow-top set by portal) */}
          <div
            className="absolute -left-1.5
                        w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px]
                        border-transparent border-r-gray-200"
            style={{ top: "var(--arrow-top)" }}
          />

          {/* Title */}
          <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Language
          </div>

          <div className="border-t border-gray-100 mx-2 mb-1" />

          {/* Language Options */}
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5
                text-sm transition-colors
                ${
                  currentLang === lang.code
                    ? "bg-primary-50 text-primary-500 font-semibold"
                    : "text-gray-700 "
                }
              `}
            >
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                {lang.code.toUpperCase()}
              </span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </CollapsedLangPortal>
    </div>
  );
}
