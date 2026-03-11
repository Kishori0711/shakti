// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import type { IconType } from "react-icons";
// import {
//   FiHelpCircle,
//   FiSettings,
//   FiX,
//   FiChevronDown,
//   FiGlobe,
//   FiLogOut,
// } from "react-icons/fi";
// import { RiPlayReverseLargeFill } from "react-icons/ri";
// import { IoPlay } from "react-icons/io5";
// import { IoIosNotifications } from "react-icons/io";
// import Image from "next/image";

// import logoFull from "../../assets/logo/Shakti 2047 Final Logo CC.png";
// import logoMark from "../../assets/logo/smallLogo.png";

// import homeInactive from "../../assets/sidebar/home_deactive.svg";
// import homeActive from "../../assets/sidebar/home_active.svg";

// import learnInactive from "../../assets/sidebar/book_deactive.svg";
// import learnActive from "../../assets/sidebar/book_active.svg";

// import mentorsInactive from "../../assets/sidebar/userGroup_deactive.svg";
// import mentorsActive from "../../assets/sidebar/userGroup_active.svg";

// import eventsInactive from "../../assets/sidebar/calendar_deactive.svg";
// import eventsActive from "../../assets/sidebar/calendar_active.svg";

// import artsInactive from "../../assets/sidebar/art_deactive.svg";
// import artsActive from "../../assets/sidebar/art_active.svg";

// import socialInactive from "../../assets/sidebar/social_deactive.svg";
// import socialActive from "../../assets/sidebar/social_active.svg";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   collapsed: boolean;
//   onToggleCollapsed: () => void;
// };

// type SvgIconPair = {
//   active: string;
//   inactive: string;
//   alt?: string;
// };

// type Item = {
//   to: string;
//   label: string;
//   icon: SvgIconPair | IconType;
//   children?: { to: string; label: string }[];
// };

// const mainItems: Item[] = [
//   {
//     to: "/",
//     label: "Home",
//     icon: { active: homeActive, inactive: homeInactive, alt: "Home" },
//   },
//   {
//     to: "/learn",
//     label: "Learn",
//     icon: { active: learnActive, inactive: learnInactive, alt: "Learn" },
//     children: [
//       { to: "/learn/explore", label: "Explore" },
//       { to: "/learn/my-courses", label: "My Courses" },
//     ],
//   },
//   {
//     to: "/mentors",
//     label: "Mentors",
//     icon: { active: mentorsActive, inactive: mentorsInactive, alt: "Mentors" },
//   },
//   {
//     to: "/events",
//     label: "Events",
//     icon: { active: eventsActive, inactive: eventsInactive, alt: "Events" },
//   },
//   {
//     to: "/artsCulture",
//     label: "Arts & Culture",
//     icon: { active: artsActive, inactive: artsInactive, alt: "Arts & Culture" },
//   },
//   {
//     to: "/social",
//     label: "Social Feed",
//     icon: { active: socialActive, inactive: socialInactive, alt: "Social Feed" },
//   },
// ];

// const bottomItems: Item[] = [
//   { to: "/help", label: "Help", icon: FiHelpCircle },
//   { to: "/notifications", label: "Notifications", icon: IoIosNotifications },
//   { to: "/settings", label: "Settings", icon: FiSettings },
// ];

// function useMediaQuery(query: string) {
//   const get = () =>
//     typeof window !== "undefined" && window.matchMedia(query).matches;

//   const [matches, setMatches] = useState(get);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const mql = window.matchMedia(query);
//     const onChange = () => setMatches(mql.matches);
//     onChange();
//     mql.addEventListener?.("change", onChange);
//     return () => mql.removeEventListener?.("change", onChange);
//   }, [query]);

//   return matches;
// }

// function isSvgPair(icon: SvgIconPair | IconType): icon is SvgIconPair {
//   return typeof icon === "object";
// }

// function SidebarIcon({
//   icon,
//   isActive,
//   collapsed,
//   label,
// }: {
//   icon: SvgIconPair | IconType;
//   isActive: boolean;
//   collapsed: boolean;
//   label: string;
// }) {
//   if (isSvgPair(icon)) {
//     return (
//       <Image
//         src={isActive ? icon.active : icon.inactive}
//          width={28}
//          height={28}
//         alt={icon.alt ?? label}
//         className={collapsed ? "h-6 w-6 " : "h-6 w-6"}
//       />
//     );
//   }

//   const Icon = icon;
//   // color will inherit from parent (active -> white)
//   return (
//     <Icon className={collapsed ? "text-[22px] lg:text-2xl" : "text-[22px]"} />
//   );
// }

// function SideLink({
//   to,
//   label,
//   icon,
//   collapsed,
//   onClick,
// }: {
//   to: string;
//   label: string;
//   icon: SvgIconPair | IconType;
//   collapsed: boolean;
//   onClick?: () => void;
// }) {
//   const pathname = usePathname();

//   const isActive =
//     to === "/"
//       ? pathname === "/"
//       : pathname === to || pathname.startsWith(to + "/");

//   return (
//     <Link
//       href={to}
//       title={collapsed ? label : undefined}
//       onClick={onClick}
//       className={[
//         "flex items-center rounded-xl text-sm transition",
//         "gap-2 px-3 py-3",
//         collapsed ? "lg:justify-center lg:px-0 lg:gap-0" : "",
//         isActive
//           ? "bg-primary-500 text-white"
//           : "text-gray-900 hover:bg-primary-100",
//       ].join(" ")}
//     >
//       <SidebarIcon
//         icon={icon}
//         isActive={isActive}
//         collapsed={collapsed}
//         label={label}
//       />
//       <span className={["truncate", collapsed ? "lg:hidden" : ""].join(" ")}>
//         {label}
//       </span>
//     </Link>
//   );
// }

// export default function Sidebar({
//   open,
//   onClose,
//   collapsed,
//   onToggleCollapsed,
// }: Props) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const effectiveCollapsed = isDesktop ? collapsed : false;

//   const LANGUAGES = [
//     { code: "EN", label: "English" },
//     { code: "HI", label: "हिन्दी" },
//     { code: "TA", label: "தமிழ்" },
//   ] as const;

//   type Lang = (typeof LANGUAGES)[number];

//   const [language, setLanguage] = useState<Lang>(LANGUAGES[0]);
//   const [langOpen, setLangOpen] = useState(false);

//   const openDropdown = useMemo(() => {
//     if (effectiveCollapsed) return null;

//     const match = mainItems.find(
//       (it) => it.children?.length && pathname.startsWith(it.to)
//     );
//     return match?.to ?? null;
//   }, [pathname, effectiveCollapsed]);

//   const [flyout, setFlyout] = useState<{
//     parentTo: string;
//     top: number;
//     left: number;
//   } | null>(null);

//   const closeTimer = useRef<number | null>(null);

//   const cancelCloseFlyout = () => {
//     if (closeTimer.current) {
//       window.clearTimeout(closeTimer.current);
//       closeTimer.current = null;
//     }
//   };

//   const scheduleCloseFlyout = () => {
//     cancelCloseFlyout();
//     closeTimer.current = window.setTimeout(() => setFlyout(null), 120);
//   };

//   const openFlyout = (el: HTMLElement, parentTo: string) => {
//     const rect = el.getBoundingClientRect();
//     setFlyout({
//       parentTo,
//       top: rect.top,
//       left: rect.right + 12,
//     });
//   };

// useEffect(() => {
// if (!flyout) return;

// const id = window.setTimeout(() => {
// setFlyout(null);
// }, 0);

// return () => window.clearTimeout(id);
// }, [pathname, effectiveCollapsed, flyout]);

//   // If user visits parent route (/learn), send to first child
//   useEffect(() => {
//     const parent = mainItems.find(
//       (it) => it.children?.length && pathname === it.to
//     );
//     const first = parent?.children?.[0]?.to;
//     if (first && first !== pathname) router.replace(first);
//   }, [pathname, router]);

//   const handleLogout = () => {
//     router.replace("/login");
//     if (!isDesktop) onClose();
//   };

//   return (
//     <>
//       {/* Overlay (mobile/tablet) */}
//       <button
//         type="button"
//         onClick={onClose}
//         className={`fixed inset-0 z-40 bg-black/40 lg:hidden transition-all duration-300 ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         aria-label="Close sidebar overlay"
//       />

//       <aside
//         className={[
//           "fixed top-4 bottom-4 left-4 z-50 w-64",
//           "transition-[width,transform] duration-500 ease-in-out",
//           open ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]",
//           "lg:relative lg:top-0 lg:bottom-0 lg:left-0 lg:z-auto lg:translate-x-0 lg:h-full lg:shrink-0",
//           effectiveCollapsed ? "lg:w-20" : "lg:w-64",
//           "rounded-2xl bg-white border border-gray-200 p-4",
//           "flex flex-col",
//         ].join(" ")}
//       >
//         {/* Collapse button (desktop only) */}
//         <button
//           type="button"
//           onClick={onToggleCollapsed}
//           className="hidden lg:flex absolute -right-3 top-6 h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white shadow-sm hover:opacity-90 transition"
//           aria-label={effectiveCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//           title={effectiveCollapsed ? "Expand" : "Collapse"}
//         >
//           {effectiveCollapsed ? <IoPlay /> : <RiPlayReverseLargeFill />}
//         </button>

//         {/* Logo + close */}
//         <div className="flex items-start justify-between">
//           <Link
//             href="/"
//             onClick={() => {
//               if (!isDesktop) onClose();
//             }}
//             className="flex w-fit items-start justify-start"
//             aria-label="Go to Home"
//             title="Home"
//           >
//             <Image
//               src={logoFull}
//               alt="Shakti 2047"
//               width={200}
//               height={56}
//               priority
//               className={[
//                 "h-16 w-auto object-contain object-left",
//                 effectiveCollapsed ? "lg:hidden" : "",
//               ].join(" ")}
//             />
//             <Image
//               src={logoMark}
//               alt="Logo"
//               width={56}
//               height={56}
//               className={
//                 effectiveCollapsed
//                   ? "hidden h-14 w-14 object-contain lg:block"
//                   : "hidden"
//               }
//             />
//           </Link>

//           <button
//             type="button"
//             onClick={onClose}
//             className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary-200 text-primary-700 hover:bg-primary-50"
//             aria-label="Close sidebar"
//           >
//             <FiX />
//           </button>
//         </div>

//         {/* nav scroll */}
//         <div className="mt-2 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none]">
//           <nav className="space-y-1">
//             {mainItems.map((it) => {
//               const hasChildren = !!it.children?.length;

//               const groupActive = hasChildren
//                 ? pathname.startsWith(it.to)
//                 : it.to === "/"
//                   ? pathname === "/"
//                   : pathname === it.to;

//               if (!hasChildren) {
//                 return (
//                   <div key={it.to}>
//                     <SideLink
//                       to={it.to}
//                       label={it.label}
//                       icon={it.icon}
//                       collapsed={effectiveCollapsed}
//                       onClick={() => {
//                         if (!isDesktop) onClose();
//                       }}
//                     />
//                   </div>
//                 );
//               }

//               const firstChildTo = it.children![0].to;
//               const isOpen = !effectiveCollapsed && openDropdown === it.to;

//               return (
//                 <div key={it.to}>
//                   <button
//                     type="button"
//                     title={effectiveCollapsed ? it.label : undefined}
//                     aria-expanded={isOpen}
//                     onMouseEnter={(e) => {
//                       if (effectiveCollapsed && isDesktop) {
//                         cancelCloseFlyout();
//                         openFlyout(e.currentTarget, it.to);
//                       }
//                     }}
//                     onMouseLeave={() => {
//                       if (effectiveCollapsed && isDesktop) scheduleCloseFlyout();
//                     }}
//                     onFocus={(e) => {
//                       if (effectiveCollapsed && isDesktop) {
//                         cancelCloseFlyout();
//                         openFlyout(e.currentTarget, it.to);
//                       }
//                     }}
//                     onBlur={() => {
//                       if (effectiveCollapsed && isDesktop) scheduleCloseFlyout();
//                     }}
//                     onClick={() => {
//                       router.push(firstChildTo);
//                       if (!isDesktop) onClose();
//                     }}
//                     className={[
//                       "flex w-full items-center rounded-xl text-sm transition",
//                       "gap-2 px-3 py-3",
//                       effectiveCollapsed
//                         ? "lg:justify-center lg:px-0 lg:gap-0"
//                         : "",
//                       groupActive
//                         ? "bg-primary-500 text-white"
//                         : "text-gray-900 hover:bg-primary-100",
//                     ].join(" ")}
//                   >
//                     <SidebarIcon
//                       icon={it.icon}
//                       isActive={groupActive}
//                       collapsed={effectiveCollapsed}
//                       label={it.label}
//                     />

//                     <span
//                       className={[
//                         "truncate",
//                         effectiveCollapsed ? "lg:hidden" : "",
//                       ].join(" ")}
//                     >
//                       {it.label}
//                     </span>

//                     {!effectiveCollapsed && (
//                       <FiChevronDown
//                         className={[
//                           "ml-auto text-base opacity-90 transition-transform",
//                           isOpen ? "rotate-180" : "",
//                         ].join(" ")}
//                       />
//                     )}
//                   </button>

//                   {/* Submenu */}
//                   {!effectiveCollapsed && isOpen && (
//                     <div className="ml-8 mt-1 space-y-1">
//                       {it.children!.map((child) => {
//                         const childActive = pathname === child.to;

//                         return (
//                           <Link
//                             key={child.to}
//                             href={child.to}
//                             onClick={() => {
//                               if (!isDesktop) onClose();
//                             }}
//                             className={[
//                               "block rounded-md text-sm py-2 pr-3",
//                               "border-l-2 pl-3",
//                               childActive
//                                 ? "text-primary-300 font-semibold border-primary-300"
//                                 : "text-gray-900 border-transparent hover:text-primary-400",
//                             ].join(" ")}
//                           >
//                             {child.label}
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           <div className="mt-6 border-t border-gray-200 pt-4">
//             <nav className="space-y-1">
//               {bottomItems.map((it) => (
//                 <SideLink
//                   key={it.to}
//                   to={it.to}
//                   label={it.label}
//                   icon={it.icon}
//                   collapsed={effectiveCollapsed}
//                   onClick={() => {
//                     if (!isDesktop) onClose();
//                   }}
//                 />
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Language + Logout */}
//         <div className="mt-4 pt-4">
//           <div className="relative">
//             <button
//               type="button"
//               title={
//                 effectiveCollapsed ? `Language: ${language.label}` : undefined
//               }
//               onClick={() => {
//                 if (effectiveCollapsed) return;
//                 setLangOpen((v) => !v);
//               }}
//               className={[
//                 "w-full flex items-center gap-2",
//                 "rounded-full border border-primary-200 bg-primary-50",
//                 "px-4 py-3 text-sm font-medium text-gray-900",
//                 "hover:bg-primary-100 transition-colors",
//                 effectiveCollapsed ? "lg:justify-center lg:px-0 lg:gap-0" : "",
//               ].join(" ")}
//               aria-expanded={langOpen}
//             >
//               <FiGlobe className={effectiveCollapsed ? "text-[20px]" : "text-[18px]"} />
//               <span className={effectiveCollapsed ? "lg:hidden" : ""}>
//                 {language.label}
//               </span>

//               {!effectiveCollapsed && (
//                 <FiChevronDown
//                   className={[
//                     "ml-auto text-base opacity-70 transition-transform",
//                     langOpen ? "rotate-180" : "",
//                   ].join(" ")}
//                 />
//               )}
//             </button>

//             {!effectiveCollapsed && langOpen && (
//               <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl bg-white shadow-lg p-3 border border-primary-200">
//                 <div className="space-y-2">
//                   {LANGUAGES.map((lng) => {
//                     const selected = lng.code === language.code;
//                     return (
//                       <button
//                         key={lng.code}
//                         type="button"
//                         onClick={() => {
//                           setLanguage(lng);
//                           setLangOpen(false);
//                           if (!isDesktop) onClose();
//                         }}
//                         className={[
//                           "w-full flex items-center gap-4 rounded-lg px-3 py-2 text-sm",
//                           selected ? "bg-primary-500" : "hover:bg-primary-100",
//                         ].join(" ")}
//                       >
//                         <span className="w-10 text-gray-900">{lng.code}</span>
//                         <span
//                           className={[
//                             "text-gray-900",
//                             selected ? "font-semibold text-white" : "",
//                           ].join(" ")}
//                         >
//                           {lng.label}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={handleLogout}
//             title={effectiveCollapsed ? "Logout" : undefined}
//             className={[
//               "mt-2 w-full flex items-center gap-2 rounded-lg px-3 py-3 text-sm transition",
//               "text-gray-900 hover:bg-primary-100 hover:text-gray-800",
//               effectiveCollapsed ? "lg:justify-center lg:px-0 lg:gap-0" : "",
//             ].join(" ")}
//           >
//             <FiLogOut className={effectiveCollapsed ? "text-[20px]" : "text-[18px]"} />
//             <span className={effectiveCollapsed ? "lg:hidden" : ""}>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Flyout (collapsed + desktop) */}
//       {effectiveCollapsed &&
//         isDesktop &&
//         flyout &&
//         (() => {
//           const parent = mainItems.find((x) => x.to === flyout.parentTo);
//           if (!parent?.children?.length) return null;

//           return (
//             <div
//               className="fixed z-50 w-60 bg-white shadow-lg rounded-xl border border-gray-200 ml-4"
//               style={{ top: flyout.top, left: flyout.left }}
//               onMouseEnter={cancelCloseFlyout}
//               onMouseLeave={scheduleCloseFlyout}
//             >
//               <div className="absolute -left-2 top-3 h-4 w-4 rotate-45 bg-white pointer-events-none border-l border-b border-gray-200" />

//               <div className="px-4 py-3 border-b border-gray-100">
//                 <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   {parent.label}
//                 </div>
//               </div>

//               <div className="p-2">
//                 {parent.children.map((child) => {
//                   const childActive = pathname === child.to;
//                   return (
//                     <Link
//                       key={child.to}
//                       href={child.to}
//                       className={[
//                         "block rounded-lg px-3 py-2 text-sm transition-colors",
//                         childActive
//                           ? "text-primary-500 font-semibold bg-[#5b2a86]/10"
//                           : "text-gray-900 hover:bg-gray-100",
//                       ].join(" ")}
//                       onClick={() => setFlyout(null)}
//                     >
//                       {child.label}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })()}
//     </>
//   );
// }


"use client";

import { useState } from "react";
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

import logoFull from "../../assets/logo/Shakti 2047 Final Logo CC.png";
import logoMark from "../../assets/logo/smallLogo.png";

import homeInactive from "../../assets/sidebar/home_deactive.svg";
import homeActive from "../../assets/sidebar/home_active.svg";
import learnInactive from "../../assets/sidebar/book_deactive.svg";
import learnActive from "../../assets/sidebar/book_active.svg";
import mentorsInactive from "../../assets/sidebar/userGroup_deactive.svg";
import mentorsActive from "../../assets/sidebar/userGroup_active.svg";
import eventsInactive from "../../assets/sidebar/calendar_deactive.svg";
import eventsActive from "../../assets/sidebar/calendar_active.svg";
import artsInactive from "../../assets/sidebar/art_deactive.svg";
import artsActive from "../../assets/sidebar/art_active.svg";
import socialInactive from "../../assets/sidebar/social_deactive.svg";
import socialActive from "../../assets/sidebar/social_active.svg";

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
  {
    to: "/artsCulture",
    label: "Arts & Culture",
    icon: { active: artsActive, inactive: artsInactive },
  },
  {
    to: "/social",
    label: "Social Feed",
    icon: { active: socialActive, inactive: socialInactive },
  },
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");

  const handleNavClick = () => {
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-4 bottom-4 left-4 z-50 w-64 lg:relative lg:top-0 lg:bottom-0 lg:left-0 lg:z-auto lg:h-full
          transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          rounded-2xl bg-white border border-gray-200 p-4 flex flex-col
        `}
      >
        {/* Collapse Button */}
        <button
          onClick={onToggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-6 h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white hover:opacity-90 transition"
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <IoPlay /> : <RiPlayReverseLargeFill />}
        </button>

        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" onClick={handleNavClick} className="flex items-center">
            <Image
              src={logoFull}
              alt="Logo"
              width={100}
              priority
              className={collapsed ? "hidden lg:hidden" : "h-auto"}
            />
            <Image
              src={logoMark}
              alt="Logo"
              width={40}
              className={collapsed ? "hidden lg:block h-auto" : "hidden"}
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-primary-100 rounded-lg"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-hide [-webkit-scrollbar:none] [scrollbar-width:none] [-ms-overflow-style:none]">
          {MAIN_ITEMS.map((item) => {
            const active = isActive(item.to);
            const hasChildren = !!item.children?.length;
            const isExpanded = expandedItem === item.to;
            
            // Check if any child is active
            const anyChildActive = hasChildren && item.children?.some(child => isActive(child.to));

            return (
              <div key={item.to}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      // Redirect to first child
                      router.push(item.children![0].to);
                      // Expand submenu
                      setExpandedItem(isExpanded ? item.to : item.to);
                      handleNavClick();
                    } else {
                      router.push(item.to);
                      handleNavClick();
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition
                    ${collapsed ? "lg:justify-center lg:px-0 lg:gap-0" : ""}
                    ${active || anyChildActive ? "bg-primary-500 text-white" : "text-gray-900 hover:bg-primary-100"}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <Image
                    src={active || anyChildActive ? item.icon.active : item.icon.inactive}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                  <span className={collapsed ? "lg:hidden" : "truncate"}>
                    {item.label}
                  </span>
                  {hasChildren && !collapsed && (
                    <FiChevronDown
                      className={`ml-auto transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      size={18}
                    />
                  )}
                </button>

                {/* Submenu - Auto expand when active */}
                {hasChildren && (isExpanded || anyChildActive) && !collapsed && (
                  <div className="ml-6 mt-1 space-y-1 pl-3">
                    {item.children!.map((child) => {
                      const childActive = isActive(child.to);
                      return (
                        <Link
                          key={child.to}
                          href={child.to}
                          onClick={handleNavClick}
                          className={`
                            block py-2 px-2 text-sm rounded transition border-l-2
                            ${
                              childActive
                                ? "text-primary-500 font-semibold bg-primary-50 border-primary-500"
                                : "text-gray-700 hover:text-primary-500 hover:bg-gray-50 border-gray-300"
                            }
                          `}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Items (Scrollable) */}
          <div className="pt-2 mt-2 border-t border-gray-200 space-y-1">
            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={handleNavClick}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition
                    ${collapsed ? "lg:justify-center lg:px-0 lg:gap-0" : ""}
                    ${active ? "bg-primary-500 text-white" : "text-gray-900 hover:bg-primary-100"}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section - Fixed */}
        <div className=" pt-4 space-y-2 mt-auto shrink-0">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                bg-gray-100 hover:bg-primary-200 text-gray-900
                ${collapsed ? "lg:justify-center lg:px-0 lg:gap-0" : ""}
              `}
              title={collapsed ? "Language" : undefined}
            >
              <FiGlobe size={20} />
              <span className={collapsed ? "lg:hidden" : "flex-1 text-left"}>
                {selectedLanguage.label}
              </span>
              {!collapsed && (
                <FiChevronDown
                  size={16}
                  className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {/* Language Dropdown Menu */}
            {langOpen && !collapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLangOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition
                      ${
                        selectedLanguage.code === lang.code
                          ? "bg-primary-500 text-white font-semibold"
                          : "text-gray-900 hover:bg-primary-100"
                      }
                    `}
                  >
                    <span className="font-semibold min-w-8">{lang.code}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              router.push("/login");
              handleNavClick();
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
              text-gray-900 hover:bg-primary-50 hover:text-primary-600
              ${collapsed ? "lg:justify-center lg:px-0 lg:gap-0" : ""}
            `}
            title={collapsed ? "Logout" : undefined}
          >
            <FiLogOut size={20} />
            <span className={collapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}