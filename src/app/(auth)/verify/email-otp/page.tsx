"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { OtpInput, Button } from "../../../../components/ui/FormInputs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resendRegisterOtp, verifyRegisterOtp } from "@/features/auth/authThunks";
import { clearAuthError, clearAuthMessage } from "@/features/auth/authSlice";

const RESEND_SECONDS = 30;

function getRemainingCooldown(storageKey: string) {
  if (typeof window === "undefined") return 0;

  const sentAtStr = sessionStorage.getItem(storageKey);
  if (!sentAtStr) return 0;

  const sentAt = Number(sentAtStr);
  if (!Number.isFinite(sentAt)) return 0;

  const elapsed = Math.floor((Date.now() - sentAt) / 1000);
  return Math.max(RESEND_SECONDS - elapsed, 0);
}

function getErrorMessage(err: unknown) {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

export default function EmailOtpPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { pendingEmail, verifyOtpLoading, resendOtpLoading } = useAppSelector((s) => s.auth);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // ✅ No useEffect setState: initial cooldown computed here
  const [cooldown, setCooldown] = useState<number>(() =>
    getRemainingCooldown("emailOtpSentAt")
  );

  const emailFromQuery = sp.get("email");
  const email =
    emailFromQuery ||
    pendingEmail ||
    (typeof window !== "undefined" ? sessionStorage.getItem("pendingEmail") : null);

  // countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const id = window.setInterval(() => {
      setCooldown((c) => Math.max(c - 1, 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [cooldown]);

  const onVerify = async () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());

    try {
      if (!email) {
        toast.error("Email missing. Please go back and retry.");
        return;
      }

      const code = otp.join("");
      if (code.length !== 6) {
        toast.error("Please enter 6-digit OTP.");
        return;
      }

      await dispatch(verifyRegisterOtp({ email, otp: code })).unwrap();

      sessionStorage.removeItem("pendingEmail");
      sessionStorage.removeItem("emailOtpSentAt");

      toast.success("Email verified successfully");
      router.replace("/home");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  const onResend = async () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());

    try {
      if (cooldown > 0) {
        toast.error(`Please wait ${cooldown}s to resend OTP.`);
        return;
      }
      if (!email) {
        toast.error("Email missing. Please go back and retry.");
        return;
      }

      await dispatch(resendRegisterOtp({ email })).unwrap();

      sessionStorage.setItem("emailOtpSentAt", Date.now().toString());
      setCooldown(RESEND_SECONDS);

      toast.success("OTP resent to email");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="w-full space-y-6 text-center">
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">Verify Email</h2>
        <p className="text-sm text-gray-500 mt-2">
          We&apos;ve sent a 6-digit OTP to <span className="font-medium">{email ?? "-"}</span>
        </p>
      </div>

      <OtpInput length={6} value={otp} onChange={setOtp} autoFocus />

      <Button type="button" disabled={verifyOtpLoading} onClick={onVerify}>
        {verifyOtpLoading ? "Verifying..." : "Verify & Continue"}
      </Button>

      <p className="text-sm text-gray-600">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={resendOtpLoading || cooldown > 0}
          className="text-[#562C85] font-semibold hover:underline disabled:opacity-60"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : resendOtpLoading ? "Sending..." : "Resend OTP"}
        </button>
      </p>
    </div>
  );
}