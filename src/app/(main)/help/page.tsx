// help/page.tsx

"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Users, BookOpen, User, FileText } from "lucide-react";
import { useHelpSearch } from "./layout";
import { categories, articles, faqs } from "./_data/helpData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ✅ Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-5 w-5 text-white" />,
  BookOpen: <BookOpen className="h-5 w-5 text-white" />,
  User: <User className="h-5 w-5 text-white" />,
};

function getIcon(name: string) {
  return iconMap[name] || <Users className="h-5 w-5 text-white" />;
}

export default function HelpCenterPage() {
  const router = useRouter();
  const { query } = useHelpSearch();

  // ✅ Popular articles (first article from each category)
  const popularArticles = useMemo(() => {
    const seen = new Set<string>();
    return articles
      .filter((a) => {
        if (seen.has(a.categoryId)) return false;
        seen.add(a.categoryId);
        return true;
      })
      .slice(0, 4);
  }, []);

  // ✅ Filtered data based on search
  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredPopular = useMemo(() => {
    if (!query.trim()) return popularArticles;
    const q = query.toLowerCase();
    return popularArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.meta.toLowerCase().includes(q)
    );
  }, [query, popularArticles]);

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      {/* ✅ CATEGORIES */}
      <section className="px-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Browse by Category
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => router.push(`/help/category/${cat.id}`)}
              className="rounded-xl border border-neutral-200 bg-white p-6 text-left
                         shadow-[0_0_0_rgba(0,0,0,0)] transition
                         hover:border-primary-500 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-500">
                  {getIcon(cat.iconName)}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-neutral-900">
                    {cat.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    {cat.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.tags.map((tag, idx) => (
                      <span
                        key={`${cat.id}-${idx}`}
                        className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-neutral-500">
                    {cat.count} articles
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <p className="mt-6 text-center text-sm text-neutral-400">
            No categories found for &quot;{query}&quot;
          </p>
        )}
      </section>

      {/* ✅ POPULAR ARTICLES */}
      <section className="mt-12 px-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Popular Articles
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredPopular.map((a, idx) => {
            const highlighted = idx === 0;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() =>
                  router.push(`/help/category/${a.categoryId}/${a.id}`)
                }
                className={`group rounded-xl border bg-white p-6 text-left transition cursor-pointer
                  ${
                    highlighted
                      ? "border-primary-500"
                      : "border-neutral-200 hover:border-primary-500"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <FileText className="mt-0.5 h-6 w-6 shrink-0 text-neutral-900" />
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500">{a.desc}</p>
                    <div className="mt-4 text-xs text-neutral-500">
                      {a.meta}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredPopular.length === 0 && (
          <p className="mt-6 text-center text-sm text-neutral-400">
            No articles found for &quot;{query}&quot;
          </p>
        )}
      </section>

      {/* ✅ FAQ — ShadCN Accordion */}
      <section className="mt-12 pb-6 px-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Frequently Asked Questions
        </h2>

        {filteredFaqs.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-1"
            className="mt-6 space-y-4"
          >
            {filteredFaqs.map((f) => (
              <AccordionItem
                key={f.id}
                value={f.id}
                className="rounded-xl border border-neutral-200 bg-white px-5"
              >
                <AccordionTrigger className="py-4 text-base font-medium text-neutral-900 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-neutral-500">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="mt-6 text-center text-sm text-neutral-400">
            No FAQs found for &quot;{query}&quot;
          </p>
        )}
      </section>
    </>
  );
}