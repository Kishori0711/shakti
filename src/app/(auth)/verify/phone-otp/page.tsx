"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { OtpInput, Button } from "@/components/ui/FormInputs";
import {
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase/setup";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { firebaseAuth as firebaseAuthThunk } from "@/store/slices/auth/authThunks";
import { clearAuthError, clearAuthMessage } from "@/store/slices/auth/authSlice";

type Flow = "login" | "signup";

const RESEND_SECONDS = 30;

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

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

export default function PhoneOtpPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const flow = (sp.get("flow") as Flow) || "login";
  const { firebaseLoading } = useAppSelector((s) => s.auth);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // ✅ No useEffect setState: initial cooldown computed here
  const [cooldown, setCooldown] = useState<number>(() =>
    getRemainingCooldown("phoneOtpSentAt")
  );

  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  // countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const id = window.setInterval(() => {
      setCooldown((c) => Math.max(c - 1, 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [cooldown]);

  const ensureRecaptcha = async () => {
    if (recaptchaRef.current) return recaptchaRef.current;

    const el = document.getElementById("recaptcha-container");
    if (!el) throw new Error("reCAPTCHA container missing");

    const verifier = new RecaptchaVerifier(auth, el, { size: "invisible" });
    await verifier.render();
    recaptchaRef.current = verifier;
    return verifier;
  };

  const onVerify = async () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());

    try {
      const verificationId = sessionStorage.getItem("phoneVerificationId");
      if (!verificationId) {
        toast.error("OTP session expired. Please go back and resend OTP.");
        return;
      }

      const code = otp.join("");
      if (code.length !== 6) {
        toast.error("Please enter 6-digit OTP.");
        return;
      }

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const cred = await signInWithCredential(auth, credential);

      const idToken = await cred.user.getIdToken();
      await dispatch(firebaseAuthThunk({ idToken })).unwrap();

      sessionStorage.removeItem("phoneVerificationId");
      sessionStorage.removeItem("phoneOtpSentAt");

      toast.success(flow === "signup" ? "Signup successful" : "Login successful");
      router.replace("/");
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err));
    }
  };

  const onResend = async () => {
    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown}s to resend OTP.`);
      return;
    }

    try {
      const phoneRaw = sessionStorage.getItem("phoneNumber");
      if (!phoneRaw) {
        toast.error("Phone number missing. Please go back.");
        return;
      }

      const phone = normalizePhone(phoneRaw);

      try {
        recaptchaRef.current?.clear();
      } catch {
        // ignore
      }
      recaptchaRef.current = null;

      const verifier = await ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);

      sessionStorage.setItem("phoneVerificationId", confirmation.verificationId);
      sessionStorage.setItem("phoneOtpSentAt", Date.now().toString());

      setCooldown(RESEND_SECONDS);
      toast.success("OTP resent.");
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="w-full space-y-6 text-center">
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">Verify Your Account</h2>
        <p className="text-sm text-gray-500 mt-2">
          We&apos;ve sent a 6-digit OTP to your registered phone.
        </p>
      </div>

      <OtpInput length={6} value={otp} onChange={setOtp} autoFocus />

      <Button type="button" disabled={firebaseLoading} onClick={onVerify}>
        {firebaseLoading ? "Verifying..." : "Verify & Continue"}
      </Button>

      <p className="text-sm text-gray-600">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={firebaseLoading || cooldown > 0}
          className="text-[#562C85] font-semibold hover:underline disabled:opacity-60"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
        </button>
      </p>

      <div id="recaptcha-container" />
    </div>
  );
}