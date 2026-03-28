// help/category/[categoryId]/page.tsx

"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { useHelpSearch } from "../../layout";
import {
  getCategoryById,
  getArticlesByCategory,
} from "../../_data/helpData";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { query } = useHelpSearch();

  const categoryId = params.categoryId as string;
  const category = getCategoryById(categoryId);
  const allArticles = getArticlesByCategory(categoryId);

  // ✅ Filter articles by search query
  const filteredArticles = useMemo(() => {
    if (!query.trim()) return allArticles;
    const q = query.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.meta.toLowerCase().includes(q)
    );
  }, [allArticles, query]);

  if (!category) {
    return (
      <div className="px-4 pb-8">
        <button
          onClick={() => router.push("/help")}
          className="mb-4 flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </button>
        <p className="text-neutral-500">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8">
      {/* ✅ Back button */}
      <button
        onClick={() => router.push("/help")}
        className="mb-6 flex items-center gap-2 text-sm text-neutral-600 
                   hover:text-neutral-900 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Help Center
      </button>

      {/* ✅ Category title + count */}
      <h2 className="text-xl font-semibold text-neutral-900">
        {category.title}
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        {filteredArticles.length} article{filteredArticles.length !== 1 && "s"}{" "}
        found
      </p>

      {/* ✅ Articles grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredArticles.map((article, idx) => {
          const highlighted = idx === 0;
          return (
            <button
              key={article.id}
              type="button"
              onClick={() =>
                router.push(`/help/category/${categoryId}/${article.id}`)
              }
              className={`group rounded-xl border bg-white p-6 text-left 
                         transition cursor-pointer hover:shadow-md
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
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500">
                    {article.desc}
                  </p>
                  <div className="mt-4 text-xs text-neutral-500">
                    {article.meta}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400">
          No articles found
          {query.trim() ? ` for "${query}"` : ""} in {category.title}.
        </p>
      )}
    </div>
  );
}