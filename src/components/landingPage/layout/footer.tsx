"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("newsletter:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0b0b0c] text-white">
      {/* Absolute CTA (does NOT affect footer layout) */}
      <div className="absolute inset-x-0 -top-40 md:-top-24 z-10  lg:-top-28">
        <div className="mx-auto max-w-full px-4 lg:px-16">
          <div className="relative overflow-hidden rounded-3xl bg-primary-400 px-6 py-10 sm:px-8 lg:px-14">
            {/* subtle diagonal pattern */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,0) 55%), repeating-linear-gradient(135deg, rgba(255,255,255,.12) 0 22px, rgba(255,255,255,0) 22px 60px)",
              }}
            />

            <div className="relative flex flex-col gap-0 lg:gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight leading-8 lg:leading-10 lg:text-4xl">
                  Begin your <br className="hidden sm:block" />
                  Shakti 2047 journey.
                </h2>
              </div>

              <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center md:gap-6">
                <p className="max-w-md text-sm leading-6 text-white/90">
                 Learn connect and act through an all in one platform designed to support women with pathways, mentors, events, AI support, and future opportunities.
                </p>

                <Link
                  href="/explore"
                  className="inline-flex w-fit items-center gap-3 rounded-xl bg-[#111] px-8 py-3 text-sm  text-white hover:bg-black text-nowrap"
                >
                  Find Your Next Step <span aria-hidden className="text-primary-500"><FaArrowRightLong size={15} /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer content (normal flow) */}
      {/* Important: top padding to "make space" for absolute CTA */}
      <div className="mx-auto max-w-full px-4 lg:px-16 pb-10 pt-28 sm:pt-32">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left: Logo + social */}
          <div className="flex flex-col gap-6">
<Link href="/" className="flex items-center gap-3">
            {/* Logo Image */}
            <Image
              src="/landingPage/footerLogo.png"         
              alt="Shakti 2047"
              width={44}
              height={44}
              priority
              className="h-16 w-28 object-contain"
            />
          </Link>

            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:opacity-90 hover:bg-[#f36a2f]"
                aria-label="Facebook"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:bg-[#f36a2f]"
                aria-label="Instagram"
              >
                <FaInstagram size={20}/>
              </Link>
            </div>
          </div>

          {/* Right: Newsletter */}
          <div className="md:justify-self-end">
            <h3 className="text-3xl font-semibold">Join Our Newsletter</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
              Get updates on webinars, mentor sessions, new learning paths, and
              product improvements.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 flex w-full max-w-xl items-center gap-3"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email your email"
                className="h-11 w-full flex-1 rounded-full border border-white/15 bg-transparent px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
              />

              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-white px-10 text-sm font-semibold text-primary-400 hover:bg-white/90"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/10" />

        {/* Bottom Row */}
        <div className="mt-6 flex flex-col gap-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/refund" className="hover:text-white">
              Refund Policy
            </Link>
            <Link href="/rules" className="hover:text-white">
              Community Rules
            </Link>
          </div>

          <div>© Copyright 2026 Made All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}