// components/sidebar/AskAICard.tsx
"use client";

import React from "react";
import { Sparkles } from "lucide-react";

type AskAICardProps = {
  title?: string;
  subtitle?: string;
  onAskAI: () => void;
};

const AskAICard: React.FC<AskAICardProps> = ({
  title = "Ask AI to Explain This Course",
  subtitle = "Get instant explanations and examples.",
  onAskAI,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>

      <button
        onClick={onAskAI}
        className="w-full bg-gradient-to-b from-primary-400 to-primary-800 
                   hover:from-primary-600 hover:to-primary-700
                   text-white font-medium py-3 px-4 rounded-xl 
                   flex items-center justify-center gap-2 transition-all"
      >
        <Sparkles className="w-4 h-4" />
        Ask AI Now
      </button>
    </div>
  );
};

export default AskAICard;