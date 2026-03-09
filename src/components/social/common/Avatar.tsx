"use client";

import Image, { type ImageProps } from "next/image";

type Props = {
  src: ImageProps["src"]; // ✅ string (remote/local) OR StaticImageData
  alt: string;
  size?: "sm" | "md" | "lg";
  ring?: "none" | "story";
  seen?: boolean;
  priority?: boolean;
};

const sizeMap = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
} as const;

const pxMap = {
  sm: 36,
  md: 44,
  lg: 56,
} as const;

export default function Avatar({
  src,
  alt,
  size = "md",
  ring = "none",
  seen,
  priority = false,
}: Props) {
  const ringClass =
    ring === "story"
      ? seen
        ? "ring-2 ring-zinc-300"
        : "ring-2 ring-violet-600"
      : "";

  const px = pxMap[size];

  return (
    <div className={`inline-flex rounded-full p-0.5 ${ringClass}`}>
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        priority={priority}
        className={`rounded-full bg-zinc-200 object-cover ${sizeMap[size]}`}
      />
    </div>
  );
}