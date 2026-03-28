// DeleteAccountPage.tsx (or your current file)

"use client";

import  { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DeleteAccountIcon from "@/assets/deleteIcon.png";

import { useAppDispatch } from "@/store/hooks";
import { deleteUserProfileThunk } from "@/features/profile/profileThunks";
import { logout } from "@/features/auth/authThunks";
import { resetProfileState } from "@/features/profile/profileSlice";

function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(); // ✅ ESC closes
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop (visual) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ✅ Click anywhere outside modal closes */}
      <div
        className="relative flex min-h-full items-center justify-center p-2"
        onMouseDown={onClose}
      >
        {/* ✅ Prevent inside clicks from closing */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-3xl bg-white px-8 py-6 shadow-2xl ring-1 ring-neutral-200 sm:px-4"
        >
          <div className="mx-auto flex flex-col items-center text-center">
            <div className="grid h-16 w-16 place-items-center ">
              <Image
                src={DeleteAccountIcon}
                alt="Delete account"
                className="h-16 w-16 object-contain"
                priority
              />
            </div>

            <h3
              id="delete-account-title"
              className="mt-2 text-xl font-extrabold tracking-tight text-neutral-900"
            >
              Delete My Account
            </h3>

            <p className="text-lg text-neutral-700">
              Permanently remove your account and associated data.
            </p>

            <p className="mt-2 text-base leading-relaxed text-neutral-500">
              Deleting your account is irreversible. All your data, including
              courses, mentor sessions, progress, and purchase history, will be
              permanently deleted.
            </p>

            <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row sm:justify-center sm:gap-6">
              <button
                type="button"
                onClick={onConfirm}
                disabled={!!loading}
                className="h-12 w-full rounded-2xl bg-red-500 px-4 text-base font-semibold text-white shadow-sm hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-72"
              >
                {loading ? "Deleting..." : "Delete Account"}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={!!loading}
                className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-base font-semibold text-neutral-900 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-72"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeleteAccountPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // 1) Delete profile
      const res = await dispatch(deleteUserProfileThunk()).unwrap();

      // 2) Logout (same approach as Navbar)
      try {
        await dispatch(logout()).unwrap();
      } catch {
        // even if logout api fails for some reason, we still clear local profile & redirect
      }

      dispatch(resetProfileState());

      toast.success(res?.message || "Account deleted successfully");
      setOpen(false);

      // redirect to login page (change path if your login route is different)
      router.replace("/login");
    } catch (error) {
      const message =
        typeof error === "string" ? error : "Failed to delete account";
      toast.error(message);
      console.error("Delete account failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-base font-semibold text-neutral-900">
        Delete Account
      </h2>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-neutral-600">
          This action is permanent. Please be careful.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 cursor-pointer"
          type="button"
        >
          Delete Account
        </button>
      </div>

      <DeleteConfirmModal
        open={open}
        onClose={() => {
          if (!loading) setOpen(false);
        }}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </div>
  );
}