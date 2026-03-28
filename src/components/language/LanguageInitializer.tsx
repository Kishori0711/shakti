// src/components/LanguageInitializer.tsx

"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { getLanguages, getTranslations } from "@/features/language/languageThunk";  
import { setLanguageFromStorage } from "@/features/language/languageSlice";           

const LanguageInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initLanguage = async () => {
      // 1. Languages list fetch karo
      await dispatch(getLanguages());

      // 2. LocalStorage se saved language lo
      const savedLang = localStorage.getItem("selectedLanguage") || "en";
      dispatch(setLanguageFromStorage(savedLang));

      // 3. Us language ki translations fetch karo
      await dispatch(getTranslations(savedLang));
    };

    initLanguage();
  }, [dispatch]);

  return null;
};

export default LanguageInitializer;