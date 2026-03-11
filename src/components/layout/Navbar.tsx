"use client";

import { FiBell, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { GiHeartPlus } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth/authThunks";

type Props = {
  title?: string;
  onMenuClick: () => void;
};

export default function Navbar({
  title = "Dashboard",
  onMenuClick,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const logoutLoading = useAppSelector((state) => state.auth.logoutLoading);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      toast.success(res.message || "Logout successful");
      setDropdownOpen(false);
      router.replace("/login");
    } catch (error) {
      const message = typeof error === "string" ? error : "Logout failed";
      toast.error(message);
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className="w-full rounded-2xl bg-white px-5 py-4
      flex items-center justify-between gap-3
      border border-gray-200 shadow-sm"
    >
      {/* Left section */}
      <div className="flex items-center gap-3 min-w-0">
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
      <div className="flex items-center gap-3 relative">
        
        {/* Well-being button */}
        <button
          type="button"
          onClick={() => router.push("/well-being")}
          className="hidden sm:inline-flex items-center gap-2 rounded-full
          bg-gray-900 text-white px-4 py-2.5 text-xs font-semibold
          hover:bg-gray-800 transition shadow-sm"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
            <GiHeartPlus className="text-base" />
          </span>

          Well-being Support
        </button>

        {/* Notification */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full
          bg-gray-100 text-gray-700
          hover:bg-primary-50 hover:text-primary-600 transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />
        </button>

        {/* Login/Signup or User Profile Dropdown */}
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="inline-flex items-center gap-2 rounded-full
            bg-primary-500 text-white px-4 py-2.5 text-sm font-semibold
            hover:bg-primary-600 transition shadow-sm"
          >
            Sign Up / Login
          </button>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="grid h-10 w-10 place-items-center rounded-full
              bg-primary-500 text-white
              hover:bg-primary-600 transition focus:outline-none"
              aria-label="Profile"
            >
              <FiUser className="text-lg" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                
                {/* Dropdown Content */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">My Account</p>
                    <p className="text-xs text-gray-500">Manage your profile</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => router.push("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    My Profile
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => router.push("/settings")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    Settings
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
        )}

      </div>
    </header>
  );
}