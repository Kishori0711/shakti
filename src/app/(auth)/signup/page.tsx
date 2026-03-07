"use client";

import React, { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
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

export default function SignupPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const method = ((sp.get("method") as Method) || "email") as Method;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    terms: false,
  });

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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

  const onPhoneSendOtp = async () => {
    setMsg(null);

    if (!formData.terms) {
      setMsg("Please accept Terms & Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const phoneE164 = normalizePhone(phone);
      if (!phoneE164 || phoneE164.length < 8) throw new Error("Enter valid phone number.");

      const verifier = await ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phoneE164, verifier);

      sessionStorage.setItem("phoneOtpSentAt", Date.now().toString());
      sessionStorage.setItem("phoneVerificationId", confirmation.verificationId);
      sessionStorage.setItem("phoneNumber", phoneE164);
      sessionStorage.setItem("phoneFlow", "signup");
      sessionStorage.setItem("signupFullName", formData.fullName);

      router.push("/verify/phone-otp?flow=signup");
    } catch (err: any) {
      console.error(err);
      setMsg(err?.message ?? "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

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

      {msg && (
        <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800">{msg}</div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
      />

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
          <Button type="button" disabled>
            Create Account (email backend later)
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
            label={
              <>
                I agree to Shakti&apos;s{" "}
                <Link href="#" className="text-[#562C85] font-medium">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#562C85] font-medium">
                  Terms
                </Link>
              </>
            }
          />

          <Button type="button" disabled={loading} onClick={onPhoneSendOtp}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href={`/login?method=${method}`} className="text-[#562C85] font-semibold hover:underline">
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