"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  FiHelpCircle,
  FiSettings,
  FiX,
  FiChevronDown,
  FiLogOut,
  FiGlobe,
} from "react-icons/fi";

import { RiPlayReverseLargeFill } from "react-icons/ri";
import { IoPlay } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

import logoFull from "@/assets/logo/Shakti 2047 Final Logo CC.png";
import logoMark from "@/assets/logo/smallLogo.png";

import homeInactive from "@/assets/sidebar/home_deactive.svg";
import homeActive from "@/assets/sidebar/home_active.svg";
import learnInactive from "@/assets/sidebar/book_deactive.svg";
import learnActive from "@/assets/sidebar/book_active.svg";
import mentorsInactive from "@/assets/sidebar/userGroup_deactive.svg";
import mentorsActive from "@/assets/sidebar/userGroup_active.svg";
import eventsInactive from "@/assets/sidebar/calendar_deactive.svg";
import eventsActive from "@/assets/sidebar/calendar_active.svg";
import artsInactive from "@/assets/sidebar/art_deactive.svg";
import artsActive from "@/assets/sidebar/art_active.svg";
import socialInactive from "@/assets/sidebar/social_deactive.svg";
import socialActive from "@/assets/sidebar/social_active.svg";

type SvgIcon = { active: string; inactive: string };

type Item = {
  to: string;
  label: string;
  icon: SvgIcon;
  children?: { to: string; label: string }[];
};

const MAIN_ITEMS: Item[] = [
  { to: "/", label: "Home", icon: { active: homeActive, inactive: homeInactive } },

  {
    to: "/learn",
    label: "Learn",
    icon: { active: learnActive, inactive: learnInactive },
    children: [
      { to: "/learn/explore", label: "Explore" },
      { to: "/learn/my-courses", label: "My Courses" },
    ],
  },

  { to: "/mentors", label: "Mentors", icon: { active: mentorsActive, inactive: mentorsInactive } },
  { to: "/events", label: "Events", icon: { active: eventsActive, inactive: eventsInactive } },
  { to: "/artsCulture", label: "Arts & Culture", icon: { active: artsActive, inactive: artsInactive } },
  { to: "/social", label: "Social Feed", icon: { active: socialActive, inactive: socialInactive } },
];

const BOTTOM_ITEMS = [
  { to: "/help", label: "Help", icon: FiHelpCircle },
  { to: "/notifications", label: "Notifications", icon: IoIosNotifications },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

type Props = {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

type Language = {
  code: "EN" | "HI" | "TA";
  label: string;
};

const LANGUAGES: Language[] = [
  { code: "EN", label: "English" },
  { code: "HI", label: "हिन्दी" },
  { code: "TA", label: "தமிழ்" },
];

export default function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapsed,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  /* ---------- AUTO EXPAND LOGIC ---------- */

  const defaultExpanded = useMemo(() => {
    const parent = MAIN_ITEMS.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.to))
    );
    return parent?.to ?? null;
  }, [pathname]);

  const [expandedItem, setExpandedItem] = useState<string | null>(defaultExpanded);

  /* ---------- LANGUAGE DROPDOWN ---------- */

  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- HELPERS ---------- */

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const handleNavClick = () => {
    if (window.innerWidth < 1024) onClose();
  };

  /* ---------- UI ---------- */

  return (
    <>
      {open && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-4 bottom-4 left-0 z-50
        w-64 lg:relative lg:top-0 lg:left-0
        transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "lg:w-20" : "lg:w-64"}
        rounded-2xl bg-white border border-gray-200 p-4 flex flex-col`}
      >

        {/* collapse button */}

        <button
          onClick={onToggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-6 h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white"
        >
          {collapsed ? <IoPlay /> : <RiPlayReverseLargeFill />}
        </button>

        {/* logo */}

        <div className="flex justify-between mb-3">
          <Link href="/">
            <Image
              src={collapsed ? logoMark : logoFull}
              alt="logo"
              width={collapsed ? 40 : 120}
            />
          </Link>

          <button onClick={onClose} className="lg:hidden">
            <FiX size={22} />
          </button>
        </div>

        {/* navigation */}

        <nav className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">

          {MAIN_ITEMS.map((item) => {
            const active = isActive(item.to);
            const hasChildren = !!item.children;
            const isExpanded = expandedItem === item.to;

            return (
              <div key={item.to}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setExpandedItem(isExpanded ? null : item.to);

                      if (!isExpanded) router.push(item.children![0].to);
                    } else {
                      router.push(item.to);
                    }

                    handleNavClick();
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-sm
                  ${collapsed ? "justify-center" : ""}
                  ${
                    active
                      ? "bg-primary-500 text-white"
                      : "text-gray-900 hover:bg-primary-100"
                  }`}
                >
                  <Image
                    src={active ? item.icon.active : item.icon.inactive}
                    alt=""
                    width={22}
                    height={22}
                  />

                  {!collapsed && (
                    <>
                      <span>{item.label}</span>

                      {hasChildren && (
                        <FiChevronDown
                          className={`ml-auto transition ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* submenu */}

                {hasChildren && isExpanded && !collapsed && (
                  <div className="ml-6 mt-2 pl-4 border-l border-gray-300 space-y-1">

                    {item.children!.map((child) => {
                      const childActive = pathname.startsWith(child.to);

                      return (
                        <Link
                          key={child.to}
                          href={child.to}
                          className={`block py-2 px-3 text-sm rounded relative
                          ${
                            childActive
                              ? "text-primary-500 font-semibold"
                              : "text-gray-700 hover:bg-primary-100"
                          }`}
                        >
                          {childActive && (
                            <span className="absolute -left-[17px] top-0 h-full w-[3px] bg-primary-500" />
                          )}

                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* bottom links */}

          <div className="pt-3 mt-3 border-t border-gray-300 space-y-1">
            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm
                  ${
                    active
                      ? "bg-primary-500 text-white"
                      : "text-gray-900 hover:bg-primary-100"
                  }`}
                >
                  <Icon size={20} />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </div>

        </nav>

    <div className="pt-4 space-y-2 mt-auto shrink-0">
          {/* Language */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm bg-gray-100 hover:bg-primary-200"
            >
              <FiGlobe size={20} />
              <span className="flex-1 text-left">{selectedLanguage.label}</span>
              <FiChevronDown
                className={`transition ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm
                    ${
                      selectedLanguage.code === lang.code
                        ? "bg-primary-500 text-white"
                        : "hover:bg-primary-100"
                    }`}
                  >
                    <span className="font-semibold">{lang.code}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={() => router.push("/login")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:text-primary-500 hover:bg-primary-100"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}