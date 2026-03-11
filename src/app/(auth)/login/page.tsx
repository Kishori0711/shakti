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
import { login as loginThunk } from "@/store/slices/auth/authThunks";
import { clearAuthError, clearAuthMessage } from "@/store/slices/auth/authSlice";

type Method = "email" | "phone";
const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

export default function LoginPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const method = ((sp.get("method") as Method) || "email") as Method;
  const { loginLoading } = useAppSelector((s) => s.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [phone, setPhone] = useState("");
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
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

  const onEmailLogin = async () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());

    if (!formData.email || !formData.password) {
      toast.error("Email and password required");
      return;
    }

    try {
      await dispatch(
        loginThunk({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.remember,
        })
      ).unwrap();

      toast.success("Login successful");
      router.replace("/");
    } catch (e: any) {
      toast.error(typeof e === "string" ? e : "Login failed");
    }
  };

  const onPhoneSendOtp = async () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());

    try {
      const phoneE164 = normalizePhone(phone);
      if (!phoneE164 || phoneE164.length < 8) {
        toast.error("Enter valid phone number.");
        return;
      }

      const verifier = await ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phoneE164, verifier);

      sessionStorage.setItem("phoneVerificationId", confirmation.verificationId);
      sessionStorage.setItem("phoneNumber", phoneE164);
      sessionStorage.setItem("phoneFlow", "login");
      sessionStorage.setItem("phoneOtpSentAt", Date.now().toString());

      toast.success("OTP sent");
      router.push("/verify/phone-otp?flow=login");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? "Failed to send OTP");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500">Enter your credentials to access your account.</p>
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
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              label="Remember me"
            />
            <Link href="#" className="text-sm font-medium text-primary-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="button" disabled={loginLoading} onClick={onEmailLogin}>
            {loginLoading ? "Please wait..." : "Sign In"}
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

          <Button type="button" onClick={onPhoneSendOtp}>
            Send OTP
          </Button>

          <div id="recaptcha-container" />
        </>
      )}

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href={`/signup?method=${method}`} className="text-primary-500 font-semibold hover:underline">
          Create Now
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