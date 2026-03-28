"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePasswordThunk } from "@/features/profileForgotPassword/profileForgotPasswordThunk";
import { resetProfileForgotPasswordState } from "@/features/profileForgotPassword/profileForgotPasswordSlice";

type FieldKey = "currentPassword" | "newPassword" | "confirmNewPassword";

const PASSWORD_RULE_MESSAGE =
  "Password Required. Min 8 chars. Must contain: 1 uppercase, 1 number, 1 special character.";

const isStrongPassword = (password: string) => {
  const min8 = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return min8 && hasUpper && hasNumber && hasSpecial;
};

export default function LoginSecurityPage() {
  const dispatch = useAppDispatch();
  const { loading, success, message, error } = useAppSelector(
    (s) => s.profileForgotPassword
  );

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [newPasswordError, setNewPasswordError] = useState("");

  const [show, setShow] = useState<Record<FieldKey, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const fields = useMemo(
    () =>
      [
        { key: "currentPassword", label: "Current Password" },
        { key: "newPassword", label: "New Password" },
        { key: "confirmNewPassword", label: "Confirm New Password" },
      ] as { key: FieldKey; label: string }[],
    []
  );

  const onChange = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "newPassword" && newPasswordError) setNewPasswordError("");
    if (success || error) dispatch(resetProfileForgotPasswordState());
  };

  const toggleShow = (key: FieldKey) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSavePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = form;

    setNewPasswordError("");

    if (!currentPassword.trim()) {
      toast.error("Current password is required.");
      return;
    }

    // password rules -> show under input (NO toast)
    if (!newPassword.trim() || !isStrongPassword(newPassword)) {
      setNewPasswordError(PASSWORD_RULE_MESSAGE);
      return;
    }

    if (!confirmNewPassword.trim()) {
      toast.error("Confirm new password is required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    dispatch(updatePasswordThunk({ currentPassword, newPassword }));
  };

  useEffect(() => {
    if (success) {
      toast.success(message || "Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setNewPasswordError("");
      setShow({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
      });
      dispatch(resetProfileForgotPasswordState());
    }
  }, [success, message, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetProfileForgotPasswordState());
    }
  }, [error, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetProfileForgotPasswordState());
    };
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-neutral-900">
        Login &amp; Security
      </h2>

      {/* Password */}
      <div className="rounded-2xl border border-neutral-200 p-4">
        <div className="text-sm font-semibold text-neutral-900">Password</div>
        <div className="mt-1 text-xs text-neutral-500">
          Set a password that is unique.
        </div>

        <div className="mt-4 grid gap-3">
          {fields.map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <div className="text-xs text-neutral-500">{label}</div>

              <div className="relative">
                <input
                  type={show[key] ? "text" : "password"}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 pr-10 text-sm outline-none focus:border-orange-400"
                  placeholder="••••••••"
                  value={form[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => toggleShow(key)}
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-500 hover:text-neutral-800"
                  aria-label={show[key] ? "Hide password" : "Show password"}
                >
                  {show[key] ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                </button>
              </div>

              {/* Password rules error under "New Password" input */}
              {key === "newPassword" && newPasswordError ? (
                <div className="text-xs text-red-600">{newPasswordError}</div>
              ) : null}
            </div>
          ))}

          <div className="text-xs text-neutral-500">
            Can&apos;t remember your current password?{" "}
            <a href="#" className="text-primary-600 hover:underline">
              Reset your password
            </a>
          </div>

          <div>
            <button
              onClick={onSavePassword}
              disabled={loading}
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Password"}
            </button>
          </div>
        </div>
      </div>

      {/* 2FA (static) */}
      <div className="rounded-2xl border border-neutral-200 p-4">
        <div className="text-sm font-semibold text-neutral-900">
          Two-Factor Authentication
        </div>
        <div className="mt-1 text-xs text-neutral-500">
          Add an extra layer of security to your account. It is highly recommended.
        </div>

        <div className="mt-4">
          <button className="rounded-lg bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-600">
            Set up Authentication
          </button>
        </div>
      </div>
    </div>
  );
}