"use client";

import React, { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
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


type Method = "email" | "phone";

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

export default function LoginPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const method = ((sp.get("method") as Method) || "email") as Method;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [phone, setPhone] = useState(""); 

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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
    setMsg(null);
    setLoading(true);
    try {
      // email backend later (demo only)
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setMsg("Email login (demo). Backend integration pending.");
    } catch (err: any) {
      setMsg(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onPhoneSendOtp = async () => {
    setMsg(null);
    setLoading(true);

    try {
      const phoneE164 = normalizePhone(phone);
      if (!phoneE164 || phoneE164.length < 8) throw new Error("Enter valid phone number.");

      const verifier = await ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phoneE164, verifier);

      sessionStorage.setItem("phoneVerificationId", confirmation.verificationId);
      sessionStorage.setItem("phoneNumber", phoneE164);
      sessionStorage.setItem("phoneFlow", "login");

      router.push("/verify/phone-otp?flow=login");
    } catch (err: any) {
      console.error(err);
      setMsg(err?.message ?? "Failed to send OTP");
    } finally {
      setLoading(false);
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

      {msg && (
        <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800">
          {msg}
        </div>
      )}

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
            {/* only email */}
            <Link href="#" className="text-sm font-medium text-[#562C85] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="button" disabled={loading} onClick={onEmailLogin}>
            {loading ? "Please wait..." : "Sign In"}
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

          <Button type="button" disabled={loading} onClick={onPhoneSendOtp}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href={`/signup?method=${method}`} className="text-[#562C85] font-semibold hover:underline">
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