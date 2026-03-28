"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiLogOut, FiUser } from "react-icons/fi";

import type { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authThunks";
import { fetchUserProfileThunk } from "@/features/profile/profileThunks";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Why Shakti 2047", href: "/why" },
  { label: "AI Companion", href: "/ai-companion" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const isAuth = useAppSelector((s: RootState) => s.auth.isAuthenticated);
  const logoutLoading = useAppSelector((s) => s.auth.logoutLoading);

  // profile state
  const profileData = useAppSelector((s) => s.profile.data);
  const profileFetchStatus = useAppSelector((s) => s.profile.fetchStatus);

  // close on ESC + lock body scroll
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // ✅ fetch profile only when authenticated
  useEffect(() => {
    if (isAuth === true && !profileData && profileFetchStatus !== "loading") {
      dispatch(fetchUserProfileThunk());
    }
  }, [isAuth, dispatch, profileData, profileFetchStatus]);

  const fullName = useMemo(() => {
    const fn = profileData?.profile?.first_name?.trim() || "";
    const ln = profileData?.profile?.last_name?.trim() || "";
    return `${fn} ${ln}`.trim() || "My Account";
  }, [profileData]);

  const email = profileData?.email || "";
  const avatar = profileData?.profile?.profile_photo_url || "";

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      toast.success(res.message || "Logout successful");
      setDropdownOpen(false);
      setOpen(false);

      // landing pe hi raho, ya / pe le jao:
      router.replace("/");
      router.refresh(); // optional but helps sync server UI after cookie changes
    } catch (error) {
      const message = typeof error === "string" ? error : "Logout failed";
      toast.error(message);
      console.error("Logout failed:", error);
    }
  };

  const goTo = (href: string) => {
    setOpen(false);
    setDropdownOpen(false);
    router.push(href);
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-full px-4 lg:px-16">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/landingPage/logo.png"
              alt="Shakti 2047"
              width={112}
              height={64}
              priority
              className="h-16 w-28 object-contain"
            />
          </Link>

          {/* Center Links (desktop only) */}
          <div className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-sm font-medium transition-colors",
                    active
                      ? "text-primary-600"
                      : "text-zinc-900 hover:text-primary-600",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right section (desktop only) */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/explore"
              className="rounded-xl border border-primary-500 px-5 py-2 text-sm font-semibold text-primary-600 hover:bg-orange-50"
            >
              Explore Platform
            </Link>

            {/* ✅ Auth based UI */}
            {isAuth === null ? null : isAuth ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="grid h-10 w-10 place-items-center overflow-hidden rounded-full
                  bg-primary-500 text-white hover:bg-primary-600 transition"
                  aria-label="Profile"
                >
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-lg" />
                  )}
                </button>

                {dropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <button
                      type="button"
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() => setDropdownOpen(false)}
                      aria-label="Close menu"
                    />

                   
                    <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white py-2 z-20 shadow-lg border border-gray-100">
                      {/* Header with avatar + name/email */}
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100 shrink-0">
                          {avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={avatar}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full grid place-items-center text-gray-600">
                              <FiUser className="text-lg" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {fullName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {email || "—"}
                          </p>
                        </div>
                      </div>

                      {/* ✅ NEW: Dashboard */}
                      <button
                        type="button"
                        onClick={() => goTo("/home")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Dashboard
                      </button>

                      <button
                        type="button"
                        onClick={() => goTo("/settings/my-profile")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        My Profile
                      </button>

                      <div className="border-t border-gray-100 my-1" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2 disabled:opacity-50"
                      >
                        {logoutLoading ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                        ) : (
                          <FiLogOut className="text-base" />
                        )}
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Menu button (mobile) */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden rounded-lg border border-zinc-200 p-2"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7H20"
                stroke="#111"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12H20"
                stroke="#111"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 17H20"
                stroke="#111"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* RIGHT SIDEBAR (mobile) */}
      <div
        className={[
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <aside
          className={[
            "absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <div className="text-sm font-semibold text-zinc-900">Menu</div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg border border-zinc-200 p-2"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 6L6 18"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="flex flex-col gap-4">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "text-sm font-medium",
                      active ? "text-primary-600" : "text-zinc-900",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Link
                href="/explore"
                onClick={() => setOpen(false)}
                className="w-full rounded-xl border border-primary-500 px-4 py-2 text-center text-sm font-semibold text-primary-600"
              >
                Explore Platform
              </Link>

              {/* ✅ Auth based button in mobile menu */}
              {isAuth === null ? null : isAuth ? (
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="w-full rounded-xl bg-red-50 px-4 py-2 text-center text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-primary-500 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
