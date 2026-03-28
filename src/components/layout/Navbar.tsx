"use client";

import { FiBell, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { GiHeartPlus } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authThunks";
import { resetProfileState } from "@/features/profile/profileSlice";
import {
  fetchUserProfileThunk,
  fetchProfileCompletionThunk, // ✅ NEW (for progress bar)
} from "@/features/profile/profileThunks";
import { useTranslation } from "@/hooks/useTranslation";
import NotificationsModal from "@/components/notifications/NotificationsModal";

type Props = {
  title?: string;
  onMenuClick: () => void;
};

export default function Navbar({ title = "Dashboard", onMenuClick }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [notifOpen, setNotifOpen] = useState(false);

  const { t, loading } = useTranslation();

  const logoutLoading = useAppSelector((state) => state.auth.logoutLoading);

  // ✅ profile state
  const profileData = useAppSelector((state) => state.profile.data);
  const profileFetchStatus = useAppSelector(
    (state) => state.profile.fetchStatus
  );

  // ✅ completion state (for dropdown progress bar)
  const completion = useAppSelector((state) => state.profile.completion);
  const completionStatus = useAppSelector(
    (state) => state.profile.completionStatus
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isAuth = useAppSelector((s: RootState) => s.auth.isAuthenticated);
  console.log("Redux isAuthenticated flag:", isAuth);

  // ✅ Load profile once (if not present)
  useEffect(() => {
    if (!profileData && profileFetchStatus !== "loading") {
      dispatch(fetchUserProfileThunk());
    }
  }, [dispatch, profileData, profileFetchStatus]);

  useEffect(() => {
    if (!dropdownOpen) return;

    // ✅ already loaded hai to dobara call mat karo
    if (completionStatus === "succeeded" && completion) return;
    if (completionStatus === "loading") return;

    dispatch(fetchProfileCompletionThunk());
  }, [dropdownOpen, completionStatus, completion, dispatch]);

  const fullName = useMemo(() => {
    const fn = profileData?.profile?.first_name?.trim() || "";
    const ln = profileData?.profile?.last_name?.trim() || "";
    return `${fn} ${ln}`.trim() || "My Account";
  }, [profileData]);

  const email = profileData?.email || "";
  const avatar = profileData?.profile?.profile_photo_url || "";

  const completionPercentage = completion
    ? parseInt(completion.profile_completion, 10) || 0
    : 0;

  const completionLabel = useMemo(() => {
    const p = completionPercentage;
    if (p >= 100) return "Completed";
    if (p >= 80) return "You're almost there!";
    if (p >= 50) return "Keep going!";
    return "Let's get started";
  }, [completionPercentage]);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      dispatch(resetProfileState());
      toast.success(res.message || "Logout successful");
      setDropdownOpen(false);
      router.replace("/");
    } catch (error) {
      const message = typeof error === "string" ? error : "Logout failed";
      toast.error(message);
      console.error("Logout failed:", error);
    }
  };

  const goTo = (path: string) => {
    setDropdownOpen(false);
    router.push(path);
  };

  return (
    <header
      className="w-full rounded-2xl bg-white px-5 py-4
      flex items-center justify-between gap-3
      border border-gray-200 shadow-sm"
    >
      {/* Left section */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="xl:hidden grid h-10 w-10 place-items-center rounded-xl
  bg-primary-500 text-white shadow-sm hover:bg-primary-600 transition"
          aria-label="Open sidebar"
        >
          <FiMenu className="text-xl" />
        </button>

        <h1 className="truncate text-[16px] font-semibold text-gray-900">
          {title}
        </h1>
      </div>

      {/* Right section */}
      <div className="relative flex items-center gap-3">
        {/* Well-being button */}
        <button
          type="button"
          onClick={() => router.push("/well-being")}
          className="hidden sm:inline-flex items-center gap-2 cursor-pointer rounded-full
          bg-gray-900 text-white px-4 py-2.5 text-xs font-semibold
          hover:bg-gray-800 transition shadow-sm"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
            <GiHeartPlus className="text-base" />
          </span>
          {loading ? "Loading..." : t("shaktiAI")}
        </button>

        {/* Notification */}
        <button
          type="button"
          onClick={() => setNotifOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full cursor-pointer
          bg-gray-100 text-gray-700
          hover:bg-primary-50 hover:text-primary-600 transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />
        </button>

        {/* Profile menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center overflow-hidden rounded-full
            bg-primary-500 text-white
            hover:bg-primary-600 transition focus:outline-none"
            aria-label="Profile"
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt="Profile"
                className="h-full w-full object-cover cursor-pointer"
              />
            ) : (
              <FiUser className="text-lg cursor-pointer" />
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

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-76 rounded-xl bg-white py-2 z-20 shadow-lg border border-gray-100">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-primary-500 shrink-0">
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-white">
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

                {/* ✅ Profile Completion (Progress Bar) */}
                <div className=" border-b border-gray-100">
                  <div className="rounded-2xl  bg-white px-4 py-1">
                    <p className="text-sm font-medium text-gray-900">
                      Profile Completion
                    </p>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {completionStatus === "loading" ? (
                          <div className="mt-2 h-8 w-20 rounded bg-gray-100 animate-pulse" />
                        ) : (
                          <p className="mt-2 text-lg font-semibold text-gray-900">
                            {completionPercentage}%
                          </p>
                        )}
                      </div>
                      <div >
                        {completionStatus === "loading" ? (
                          <div className="h-9 w-32 rounded-full bg-gray-100 animate-pulse" />
                        ) : (
                          <div className="rounded-full bg-gray-50 px-4 py-2 text-xs text-gray-600 border border-gray-200">
                            {completionLabel}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all duration-500"
                        style={{
                          width: `${
                            completionStatus === "loading"
                              ? 0
                              : Math.min(Math.max(completionPercentage, 0), 100)
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => goTo("/settings/my-profile")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  {loading ? "Loading..." : t("myProfile")}
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/notifications")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  {loading ? "Loading..." : t("notifications")}
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
                  {loading ? "Loading..." : t("logout")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <NotificationsModal
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </header>
  );
}
