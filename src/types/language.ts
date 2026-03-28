// src/types/language.ts

export interface Language {
    code: string;
    name: string;
  }
  
  export interface LanguageListResponse {
    success: boolean;
    languages: Language[];
  }
  
  export interface TranslationResponse {
    success: boolean;
    data: Record<string, string>;  // {welcome: "Welcome", login: "Login", ...}
  }
  
  export interface LanguageState {
    currentLang: string;
    languages: Language[];
    translations: Record<string, string>;
    loading: boolean;
    error: string | null;
  }