"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../lib/firebase/setup"; 
import GoogleButton from "./GoogleButton";

import { useAppDispatch } from "@/store/hooks";
import { googleAuth } from "@/store/slices/auth/authThunks";

export default function GoogleContinue({
  text = "Continue with Google",
  redirectTo = "/",
}: {
  text?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onGoogle = async () => {
    setMsg(null);
    setLoading(true);

    try {
      // 1) Firebase Google Sign-in (only to get idToken)
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const cred = await signInWithPopup(auth, provider);
      const idToken = await cred.user.getIdToken();

      // 2) Backend exchange (cookies will be set by backend)
      await dispatch(googleAuth({ idToken })).unwrap();

      // 3) Redirect
      router.replace(redirectTo);
    } catch (err: any) {
      console.error(err);

      // Firebase errors
      if (err?.code === "auth/popup-closed-by-user") {
        setMsg("Popup close ho gaya. Dubara try karo.");
        return;
      }
      if (err?.code === "auth/account-exists-with-different-credential") {
        setMsg("Ye email kisi aur method se registered hai. Pehle us method se login karo.");
        return;
      }

      // Thunk/backend errors (unwrap string rejectValue)
      setMsg(typeof err === "string" ? err : err?.message ?? "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <GoogleButton
        text={loading ? "Please wait..." : text}
        onClick={onGoogle}
        disabled={loading}
      />
      {msg && <p className="text-xs text-red-600">{msg}</p>}
    </div>
  );
}