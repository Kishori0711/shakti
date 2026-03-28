// src/redux/slices/languageSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageState } from "@/types/language";
import { getLanguages, getTranslations } from "./languageThunk";

const initialState: LanguageState = {
  currentLang: "en",
  languages: [],
  translations: {},
  loading: false,
  error: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguageFromStorage: (state, action: PayloadAction<string>) => {
      state.currentLang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.languages = action.payload;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTranslations.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLang = action.payload.code;
        state.translations = action.payload.translations;
      })
      .addCase(getTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLanguageFromStorage } = languageSlice.actions;
export default languageSlice.reducer;