// help/layout.tsx

"use client";

import React, { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

// ✅ Search context
type HelpSearchContextType = {
  query: string;
  setQuery: (q: string) => void;
};

const HelpSearchContext = createContext<HelpSearchContextType>({
  query: "",
  setQuery: () => {},
});

export const useHelpSearch = () => useContext(HelpSearchContext);


export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  // ✅ Translation hook
  const { t , loading} = useTranslation();

  const segments = pathname.split("/").filter(Boolean);
  const isArticleDetail =
    segments.length >= 4 &&
    segments[0] === "help" &&
    segments[1] === "category";

  const showHero = !isArticleDetail;

  return (
    <HelpSearchContext.Provider value={{ query, setQuery }}>
      <div className="bg-white rounded-2xl">
        <div className="mx-auto max-w-full">
          {showHero && (
            <section className="rounded-t-2xl border border-neutral-800 bg-[#121212] p-6 text-white sm:p-8">
              <h1 className="text-xl font-semibold sm:text-2xl">
                {t("help_center")}
              </h1>

              <p className="mt-4 text-sm leading-6 text-white/70">
                &quot;Your gateway to Shakti 2047: Find quick solutions across
                eight categories from community building and account security to
                real-time tracking and seamless payments. We are committed to an
                empowered user experience; if you need help, our support team is
                just a click away. Join us in shaping a resilient and
                self-reliant future.&quot;
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                {/* ✅ ShadCN Button */}
                <Button
                  variant="outline"
                  className="w-fit rounded-full border-white/40 bg-white/5 px-5 py-6 text-white
                             hover:bg-white/10 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat with Support
                </Button>

                <a
                  href="tel:+911234567890"
                  className="w-fit text-sm text-white/85 underline underline-offset-4 hover:text-white"
                >
                  +91 123 456 7890
                </a>

                <a
                  href="mailto:support@shakti2047.com"
                  className="w-fit text-sm text-white/85 underline underline-offset-4 hover:text-white"
                >
                  support@shakti2047.com
                </a>
              </div>
            </section>
          )}

          {showHero && (
            <div className="mt-8 flex justify-center px-4">
              <div className="relative w-full max-w-2xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for help articles, guides, and FAQs..."
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary-300"
                />
              </div>
            </div>
          )}

          <div className={showHero ? "mt-8" : ""}>{children}</div>
        </div>
      </div>
    </HelpSearchContext.Provider>
  );
}