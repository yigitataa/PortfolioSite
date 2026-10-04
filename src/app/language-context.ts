import { createContext } from "react";

export type Language = "tr" | "en";
export const languageStorageKey = "portfolio-language";

export const LanguageContext = createContext({
  language: "tr" as Language,
  setLanguage: (() => {}) as (language: Language) => void,
});
