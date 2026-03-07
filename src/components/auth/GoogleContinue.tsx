"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/setup";
import GoogleButton from "./GoogleButton";

export default function GoogleContinue({
  text = "Continue with Google",
  redirectTo = "/",
}: {
  text?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onGoogle = async () => {
    setMsg(null);
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const cred = await signInWithPopup(auth, provider);

      // Firestore save/update
      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          uid: cred.user.uid,
          name: cred.user.displayName ?? "",
          email: cred.user.email ?? "",
          photoURL: cred.user.photoURL ?? "",
          loginType: "google",
          lastLoginAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      router.replace(redirectTo);
    } catch (err: any) {
      console.error(err);

      if (err?.code === "auth/popup-closed-by-user") {
        setMsg("Popup close ho gaya. Dubara try karo.");
      } else if (err?.code === "auth/account-exists-with-different-credential") {
        setMsg("Ye email kisi aur method se registered hai. Pehle us method se login karo.");
      } else {
        setMsg(err?.message ?? "Google login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <GoogleButton text={loading ? "Please wait..." : text} onClick={onGoogle} disabled={loading} />
      {msg && <p className="text-xs text-red-600">{msg}</p>}
    </div>
  );
}