// src/redux/thunks/languageThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/client/mainApi";  

// Languages list fetch karo
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/language");
      if (response.data.success) {
        return response.data.languages;
      }
      return rejectWithValue("Failed to fetch languages");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Translations fetch karo
export const getTranslations = createAsyncThunk(
  "language/getTranslations",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/language/${code}`);
      if (response.data.success) {
        return { code, translations: response.data.data };
      }
      return rejectWithValue("Failed to fetch translations");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);