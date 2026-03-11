"use client";

import React, { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import toast from "react-hot-toast";

import { auth } from "../../../lib/firebase/setup";
import AuthMethodSwitch from "../../../components/auth/AuthMethodSwitch";
import GoogleContinue from "../../../components/auth/GoogleContinue";
import {
  Input,
  PasswordInput,
  Checkbox,
  Button,
  InternationalPhoneInput,
} from "../../../components/ui/FormInputs";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendRegisterOtp } from "@/store/slices/auth/authThunks";
import { clearAuthError, clearAuthMessage } from "@/store/slices/auth/authSlice";

type Method = "email" | "phone";
const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

export default function SignupPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const method = ((sp.get("method") as Method) || "email") as Method;
  const { sendOtpLoading } = useAppSelector((s) => s.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [phone, setPhone] = useState("");
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const ensureRecaptcha = async () => {
    if (recaptchaRef.current) return recaptchaRef.current;

    const el = document.getElementById("recaptcha-container");
    if (!el) throw new Error("reCAPTCHA container missing");

    const verifier = new RecaptchaVerifier(auth, el, { size: "invisible" });
    await verifier.render();
    recaptchaRef.current = verifier;
    return verifier;
  };

  const onEmailSendOtp = async () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());

    if (!formData.terms) {
      toast.error("Please accept Terms & Privacy Policy.");
      return;
    }
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      await dispatch(
        sendRegisterOtp({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      sessionStorage.setItem("pendingEmail", formData.email);
      sessionStorage.setItem("emailOtpSentAt", Date.now().toString());

      toast.success("OTP sent to email");
      router.push(`/verify/email-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (e: any) {
      toast.error(typeof e === "string" ? e : "Failed to send OTP");
    }
  };

  const onPhoneSendOtp = async () => {
    if (!formData.terms) {
      toast.error("Please accept Terms & Privacy Policy.");
      return;
    }

    try {
      const phoneE164 = normalizePhone(phone);
      if (!phoneE164 || phoneE164.length < 8) {
        toast.error("Enter valid phone number.");
        return;
      }

      const verifier = await ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phoneE164, verifier);

      sessionStorage.setItem("phoneOtpSentAt", Date.now().toString());
      sessionStorage.setItem("phoneVerificationId", confirmation.verificationId);
      sessionStorage.setItem("phoneNumber", phoneE164);
      sessionStorage.setItem("phoneFlow", "signup");

      toast.success("OTP sent");
      router.push("/verify/phone-otp?flow=signup");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? "Failed to send OTP");
    }
  };

  const termsLabel = (
    <>
      I agree to Shakti&apos;s{" "}
      <Link href="#" className="text-primary-500 font-medium">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="#" className="text-primary-500 font-medium">
        Terms
      </Link>
    </>
  );

  const emailButtonDisabled =
    sendOtpLoading ||
    !formData.terms ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  const phoneButtonDisabled = !formData.terms;

  return (
    <div className="w-full space-y-3">
      <div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">Get Started Now</h2>
          <p className="text-sm text-gray-500">Create your account to begin your journey.</p>
        </div>
        <div className="mt-3">
          <AuthMethodSwitch />
        </div>
      </div>

      {method === "email" ? (
        <>
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordInput
            label="Create Password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Checkbox
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            label={termsLabel}
          />

          <Button type="button" disabled={emailButtonDisabled} onClick={onEmailSendOtp}>
            {sendOtpLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </>
      ) : (
        <>
          <InternationalPhoneInput
            label="Mobile Number"
            value={phone}
            onChange={setPhone}
            defaultCountry="in"
          />

          <Checkbox
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            label={termsLabel}
          />

          <Button type="button" disabled={phoneButtonDisabled} onClick={onPhoneSendOtp}>
            Send OTP
          </Button>

          <div id="recaptcha-container" />
        </>
      )}

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href={`/login?method=${method}`} className="text-primary-500 font-semibold hover:underline">
          Login Now
        </Link>
      </p>

      <div className="relative">
        <div className="border-t border-gray-200" />
        <span className="bg-white px-3 text-xs text-gray-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          OR
        </span>
      </div>

      <GoogleContinue text="Continue with Google" redirectTo="/" />
    </div>
  );
}