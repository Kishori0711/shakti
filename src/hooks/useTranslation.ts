// src/hooks/useTranslation.ts

"use client";

import { useCallback } from "react";
import { useAppSelector } from "@/store/hooks";

export const useTranslation = () => {
  const { translations, currentLang, loading } = useAppSelector(
    (state) => state.language
  );

  const t = useCallback(
    (key: string): string => {
      return translations[key] || key;
    },
    [translations]
  );

  return { t, currentLang, loading };
};