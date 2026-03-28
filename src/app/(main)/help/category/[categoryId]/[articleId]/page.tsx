// help/category/[categoryId]/[articleId]/page.tsx

"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import {
  getArticleById,
  getCategoryById,
} from "../../../_data/helpData";
import { Button } from "@/components/ui/button";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.categoryId as string;
  const articleId = params.articleId as string;

  const article = getArticleById(articleId);
  const category = getCategoryById(categoryId);

  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  if (!article || !category) {
    return (
      <div className="px-4 pb-8">
        <button
          onClick={() => router.push("/help")}
          className="mb-4 flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </button>
        <p className="text-neutral-500">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* ✅ Article Header — grey background */}
      <div className="rounded-t-2xl bg-neutral-50 px-6 py-8 ">
        <button
          onClick={() => router.push(`/help/category/${categoryId}`)}
          className="mb-4 flex items-center gap-2 text-sm text-neutral-600 
                     hover:text-neutral-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </button>

        <h1 className="text-xl font-semibold text-neutral-900">
          {article.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            {article.meta}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* ✅ Article Content */}
      <div className="mt-8 px-6 mx-4 space-y-5">
        {article.content.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-sm leading-7 text-neutral-600"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* ✅ Feedback Section — dark background */}
      <div className="mt-12 mx-4 rounded-xl bg-[#121212] p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">
          Was this article helpful?
        </h3>
        <p className="mt-1 text-sm text-white/60">
          Let us know if you found this article useful
        </p>



        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setFeedback("yes")}
            className={`rounded-xl px-6 py-5 text-sm font-medium transition
              ${
                feedback === "yes"
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-primary-500 text-white hover:bg-primary-600"
              }`}
          >
            Yes, it helped
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setFeedback("no")}
            className={`rounded-xl border px-6 py-5 text-sm font-medium transition
              ${
                feedback === "no"
                  ? "border-white bg-white/10 hover:bg-white/10 text-white hover:text-white"
                  : "border-white/40 text-white hover:bg-white/10 hover:text-white"
              }`}
          >
            No, I need more help
          </Button>
        </div>

        {feedback && (
          <p className="mt-4 text-sm text-white/70">
            {feedback === "yes"
              ? "Thank you for your feedback! 🎉"
              : "We're sorry to hear that. Please contact our support team for further assistance."}
          </p>
        )}
      </div>
    </div>
  );
}