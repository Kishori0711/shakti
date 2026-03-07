"use client";

import Image from "next/image";
import googleImg from "../../assets/auth/googleimg.png";

export default function GoogleButton({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition disabled:opacity-60"
    >
      <Image src={googleImg} alt="Google" width={16} height={16} />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </button>
  );
}