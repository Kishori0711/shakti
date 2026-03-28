"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

type BackButtonProps = {
  label?: string;
};

export default function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-black"
    >
      <FiArrowLeft /> {label}
    </button>
  );
}