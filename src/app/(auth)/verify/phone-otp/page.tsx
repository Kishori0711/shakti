"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { OtpInput, Button } from "../../../../components/ui/FormInputs";
import {
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/setup";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

type Flow = "login" | "signup";

const RESEND_SECONDS = 30;
const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

export default function PhoneOtpPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const flow = (sp.get("flow") as Flow) || "login";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [cooldown, setCooldown] = useState(0);

  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  // cooldown timer (persist via sessionStorage)
  useEffect(() => {
    const sentAtStr = sessionStorage.getItem("phoneOtpSentAt");
    if (!sentAtStr) return;

    const sentAt = Number(sentAtStr);
    const elapsed = Math.floor((Date.now() - sentAt) / 1000);
    const remaining = Math.max(RESEND_SECONDS - elapsed, 0);
    setCooldown(remaining);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(t);
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
    setMsg(null);
    setLoading(true);

    try {
      const verificationId = sessionStorage.getItem("phoneVerificationId");
      if (!verificationId) throw new Error("OTP session expired. Please go back and resend OTP.");

      const code = otp.join("");
      if (code.length !== 6) throw new Error("Please enter 6-digit OTP.");

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const cred = await signInWithCredential(auth, credential);

      if (flow === "signup") {
        const name = sessionStorage.getItem("signupFullName") || "";
        if (name) await updateProfile(cred.user, { displayName: name });
      }

      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          uid: cred.user.uid,
          name: cred.user.displayName ?? "",
          phone: cred.user.phoneNumber ?? "",
          signupType: "phone",
          lastLoginAt: serverTimestamp(),
          ...(flow === "signup" ? { createdAt: serverTimestamp() } : {}),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // cleanup
      sessionStorage.removeItem("phoneVerificationId");
      sessionStorage.removeItem("phoneOtpSentAt");

      router.replace("/");
    } catch (err: any) {
      console.error(err);
      setMsg(err?.message ?? "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    setMsg(null);

    if (cooldown > 0) {
      setMsg(`Please wait ${cooldown}s to resend OTP.`);
      return;
    }

    setLoading(true);
    try {
      const phoneRaw = sessionStorage.getItem("phoneNumber");
      if (!phoneRaw) throw new Error("Phone number missing. Please go back.");

      const phone = normalizePhone(phoneRaw);

      // reset recaptcha
      try {
        recaptchaRef.current?.clear();
      } catch {}
      recaptchaRef.current = null;

      const verifier = await ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);

      sessionStorage.setItem("phoneVerificationId", confirmation.verificationId);
      sessionStorage.setItem("phoneOtpSentAt", Date.now().toString());

      setCooldown(RESEND_SECONDS);
      setMsg("OTP resent.");
    } catch (err: any) {
      console.error(err);
      setMsg(err?.message ?? "Failed to resend OTP");
    } finally {
      setLoading(false);
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

      {msg && (
        <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800">
          {msg}
        </div>
      )}

      {/* ✅ upgraded OTP input: auto move + paste */}
      <OtpInput length={6} value={otp} onChange={setOtp} autoFocus />

      <Button type="button" disabled={loading} onClick={onVerify}>
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>

      <p className="text-sm text-gray-600">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={loading || cooldown > 0}
          className="text-[#562C85] font-semibold hover:underline disabled:opacity-60"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
        </button>
      </p>
    </div>
  );
}