"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import { LuFileClock } from "react-icons/lu";
import {
  FiHelpCircle,
  FiSettings,
  FiX,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authThunks";
import JoinCommunityCard from "../JoinCommunityCard";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import { resetProfileState } from "@/features/profile/profileSlice";

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
  labelKey: string;
  icon: SvgIcon;
  children?: { to: string; labelKey: string }[];
};

const MAIN_ITEMS: Item[] = [
  {
    to: "/home",
    labelKey: "home",
    icon: { active: homeActive, inactive: homeInactive },
  },
  {
    to: "/learn",
    labelKey: "learn",
    icon: { active: learnActive, inactive: learnInactive },
    children: [
      { to: "/learn/explore", labelKey: "explore" },
      { to: "/learn/my-courses", labelKey: "myCourses" },
    ],
  },
  {
    to: "/mentors",
    labelKey: "mentors",
    icon: { active: mentorsActive, inactive: mentorsInactive },
  },
  // {
  //   to: "/events",
  //   labelKey: "events",
  //   icon: { active: eventsActive, inactive: eventsInactive },
  // },
  {
    to: "/events",
    labelKey: "Events",
    icon: { active: eventsActive, inactive: eventsInactive },
    children: [
      { to: "/events/upcoming-events", labelKey: "Upcoming Events" },
      { to: "/events/my-events", labelKey: "MY Events" },
    ],
  },
  {
    to: "/well-being",
    labelKey: "wellBeing",
    icon: { active: socialActive, inactive: socialInactive },
  },
  {
    to: "/newsfeed",
    labelKey: "News_feed",
    icon: { active: artsActive, inactive: artsInactive },
    children: [
      { to: "/newsfeed/explore", labelKey: "explore" },
      { to: "/newsfeed/my-feed", labelKey: "myFeed" },
    ],
  },
];

const BOTTOM_ITEMS = [
  { to: "/help", labelKey: "help_support", icon: FiHelpCircle },
  { to: "/purchase-history", labelKey: "Purchase History", icon: LuFileClock },
  { to: "/notifications", labelKey: "notifications", icon: IoIosNotifications },
  { to: "/settings", labelKey: "settings", icon: FiSettings },
];

type Props = {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

/* ─── Portal-based Tooltip ─── */
function PortalTooltip({
  triggerRef,
  show,
  children,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
  show: boolean;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({
        top: rect.top,
        left: rect.right + 8,
      });
    }
  }, [show, triggerRef]); 

  if (!mounted || !show) return null;

  return createPortal(
    <div className="fixed z-200" style={{ top: pos.top, left: pos.left }}>
      {children}
    </div>,
    document.body,
  );
}

/* ─── Simple Tooltip ─── */
function SimpleTooltip({
  children,
  label,
  collapsed,
}: {
  children: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  if (!collapsed) return <>{children}</>;

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <PortalTooltip triggerRef={triggerRef} show={show}>
        <div
          className="bg-gray-900 text-white text-xs font-medium 
                        rounded-md px-3 py-2 shadow-lg whitespace-nowrap
                        flex items-center"
        >
          <div
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 
                          w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px]
                          border-transparent border-r-gray-900"
          />
          {label}
        </div>
      </PortalTooltip>
    </div>
  );
}

/* ─── Dropdown Tooltip ─── */
function DropdownTooltip({
  children,
  label,
  subItems,
  collapsed,
  isActive,
  onSubClick,
  pathname,
  t,
}: {
  children: React.ReactNode;
  label: string;
  subItems: { to: string; labelKey: string }[];
  collapsed: boolean;
  isActive: boolean;
  onSubClick: (to: string) => void;
  pathname: string;
  t: (key: string) => string;
}) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!collapsed) return <>{children}</>;

  return (
    <div ref={triggerRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      <PortalTooltip triggerRef={triggerRef} show={show}>
        <div
          className="bg-white rounded-xl shadow-xl border border-gray-200 
                     py-2 min-w-45"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div
            className="absolute -left-1.5 top-5 
                          w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px]
                          border-transparent border-r-gray-200"
          />
          <div
            className={`px-4 py-2 text-sm font-semibold
              ${isActive ? "text-primary-500" : "text-gray-800"}`}
          >
            {label}
          </div>
          <div className="border-t border-gray-100 mx-2" />
          <div className="py-1">
            {subItems.map((sub) => {
              const childActive = pathname.startsWith(sub.to);
              return (
                <button
                  key={sub.to}
                  onClick={() => {
                    onSubClick(sub.to);
                    setShow(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-sm transition-colors
                    ${
                      childActive
                        ? "text-primary-500 font-semibold bg-primary-50"
                        : "text-gray-600 hover:bg-primary-50 hover:text-primary-500"
                    }
                  `}
                >
                  {t(sub.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </PortalTooltip>
    </div>
  );
}

export default function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapsed,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logoutLoading = useAppSelector((state) => state.auth.logoutLoading);
  const { t, loading } = useTranslation();

  // ✅ Find which dropdown parent the current route belongs to
  const activeDropdownParent = useMemo(() => {
    const parent = MAIN_ITEMS.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.to)),
    );
    return parent?.to ?? null;
  }, [pathname]);

  // ✅ Track which dropdown is visually OPEN (expanded)
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    activeDropdownParent,
  );

  // ✅ When route changes, auto-close dropdowns that are NOT active
  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;

      // Check if current path belongs to any dropdown
      const currentParent =
        MAIN_ITEMS.find((item) =>
          item.children?.some((child) => pathname.startsWith(child.to)),
        )?.to ?? null;

      if (currentParent) {
        // ✅ Route is inside a dropdown → keep only that dropdown open
        setOpenDropdown(currentParent);
      } else {
        // ✅ Route is NOT inside any dropdown → close all dropdowns
        setOpenDropdown(null);
      }
    }
  }, [pathname]);

  const [showCommunityCard] = useState(true);

  // ✅ isActive checks if current route matches the item
  // For dropdown parents, only active if a child route is active
  const isActive = (to: string, hasChildren: boolean) => {
    if (hasChildren) {
      // Dropdown parent is active ONLY if current route is inside its children
      const item = MAIN_ITEMS.find((i) => i.to === to);
      return (
        item?.children?.some((child) => pathname.startsWith(child.to)) ?? false
      );
    }
    return to === "/" ? pathname === "/" : pathname.startsWith(to);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1280) onClose();
  };

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      dispatch(resetProfileState());
      toast.success(res.message || "Logout successful");
      router.replace("/");
    } catch (error) {
      const message = typeof error === "string" ? error : "Logout failed";
      toast.error(message);
    }
  };

  return (
    <>
      {open && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 xl:hidden"
        />
      )}

      <aside
        className={`
          fixed top-4 bottom-4 left-0 z-50
          w-64
          xl:relative xl:top-0 xl:left-0
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
          ${collapsed ? "xl:w-20" : "xl:w-64"}
          rounded-2xl bg-white border border-gray-200
          p-4 flex flex-col
        `}
      >
        <button
          onClick={onToggleCollapsed}
          className="hidden xl:flex absolute -right-3 top-6 h-7 w-7
                     items-center justify-center rounded-lg
                     bg-primary-500 text-white"
        >
          {collapsed ? <IoPlay /> : <RiPlayReverseLargeFill />}
        </button>

        <div className="flex justify-between mb-3 shrink-0">
          <Link href="/">
            <Image
              src={collapsed ? logoMark : logoFull}
              alt="logo"
              width={collapsed ? 40 : 120}
            />
          </Link>
          <button onClick={onClose} className="xl:hidden">
            <FiX size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
          {MAIN_ITEMS.map((item) => {
            const hasChildren = !!item.children;
            const active = isActive(item.to, hasChildren);
            const isExpanded = openDropdown === item.to;

            const TooltipWrapper = hasChildren
              ? ({ children: c }: { children: React.ReactNode }) => (
                  <DropdownTooltip
                    label={t(item.labelKey)}
                    subItems={item.children!}
                    collapsed={collapsed}
                    isActive={active}
                    pathname={pathname}
                    t={t}
                    onSubClick={(to) => {
                      router.push(to);
                      handleNavClick();
                    }}
                  >
                    {c}
                  </DropdownTooltip>
                )
              : ({ children: c }: { children: React.ReactNode }) => (
                  <SimpleTooltip label={t(item.labelKey)} collapsed={collapsed}>
                    {c}
                  </SimpleTooltip>
                );

            return (
              <div
                key={item.to}
                className={item.to === "/well-being" ? "xl:hidden" : ""}
              >
                <TooltipWrapper>
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        if (collapsed) {
                          // Collapsed mode → navigate to first child
                          router.push(item.children![0].to);
                        } else {
                          // ✅ Toggle dropdown open/close — DO NOT navigate
                          setOpenDropdown(isExpanded ? null : item.to);
                        }
                      } else {
                        // Non-dropdown item → navigate directly
                        router.push(item.to);
                      }
                      handleNavClick();
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg
                      w-full text-sm transition-colors
                      ${collapsed ? "justify-center" : ""}
                      ${
                        active
                          ? "bg-primary-500 text-white"
                          : "text-gray-900 hover:bg-primary-100"
                      }
                    `}
                  >
                    <Image
                      src={active ? item.icon.active : item.icon.inactive}
                      alt=""
                      width={22}
                      height={22}
                    />
                    {!collapsed && (
                      <>
                        <span>{t(item.labelKey)}</span>
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
                </TooltipWrapper>

                {/* ✅ Children shown when dropdown is open AND not collapsed */}
                {hasChildren && isExpanded && !collapsed && (
                  <div className="ml-6 mt-2 pl-4 border-l border-gray-300 space-y-1">
                    {item.children!.map((child) => {
                      const childActive = pathname.startsWith(child.to);
                      return (
                        <Link
                          key={child.to}
                          href={child.to}
                          onClick={handleNavClick}
                          className={`
                            block py-2 px-3 text-sm rounded relative
                            ${
                              childActive
                                ? "text-primary-500 font-semibold"
                                : "text-gray-700 hover:bg-primary-100"
                            }
                          `}
                        >
                          {childActive && (
                            <span className="absolute -left-4.25 top-0 h-full w-0.75 bg-primary-500" />
                          )}
                          {t(child.labelKey)}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 mt-3 border-t border-gray-300 space-y-1">
            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <SimpleTooltip
                  key={item.to}
                  label={t(item.labelKey)}
                  collapsed={collapsed}
                >
                  <Link
                    href={item.to}
                    onClick={handleNavClick}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg text-sm
                      ${collapsed ? "justify-center" : ""}
                      ${
                        active
                          ? "bg-primary-500 text-white"
                          : "text-gray-900 hover:bg-primary-100"
                      }
                    `}
                  >
                    <Icon size={20} />
                    {!collapsed && t(item.labelKey)}
                  </Link>
                </SimpleTooltip>
              );
            })}
          </div>
        </nav>

        <div className="pt-3 mt-auto shrink-0 space-y-2">
          {showCommunityCard && !collapsed && (
            <JoinCommunityCard
              title=" Stay Connected"
              description="Join the Shakti 2047 WhatsApp community for quick updates, discussions, and opportunities."
              buttonText="Join Community"
              whatsappLink="https://chat.whatsapp.com/your-link"
            />
          )}

          {showCommunityCard && collapsed && (
            <SimpleTooltip label="Join Community" collapsed={collapsed}>
              <button
                onClick={() =>
                  window.open("https://chat.whatsapp.com/your-link", "_blank")
                }
                className="w-full flex justify-center p-3 rounded-lg
                            hover:bg-primary-100 transition-colors"
              >
                <Image
                  src={"/Mask group.svg"}
                  alt="Welcome"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              </button>
            </SimpleTooltip>
          )}

          <LanguageSwitcher collapsed={collapsed} />

          <SimpleTooltip
            label={loading ? "Loading..." : t("logout")}
            collapsed={collapsed}
          >
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm text-gray-700 hover:text-red-500
                hover:bg-red-50 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${collapsed ? "justify-center" : ""}
              `}
            >
              {logoutLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              ) : (
                <FiLogOut size={18} />
              )}
              {!collapsed && (
                <span>{loading ? "Loading..." : t("logout")}</span>
              )}
            </button>
          </SimpleTooltip>
        </div>
      </aside>
    </>
  );
}

// text-xs   = 12px
// text-sm   = 14px
// text-base = 16px (normal)
// text-lg   = 18px
// text-xl   = 20px
// text-2xl  = 24px
