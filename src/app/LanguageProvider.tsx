import { useEffect, useState, type ReactNode } from "react";
import {
  LanguageContext,
  languageStorageKey,
  type Language,
} from "./language-context";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Match the Turkish pre-render during hydration, then restore the preference.
  const [language, setLanguageState] = useState<Language>("tr");

  useEffect(() => {
    try {
      if (localStorage.getItem(languageStorageKey) === "en")
        setLanguageState("en");
    } catch {
      // Language switching remains available when storage is blocked.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(next: Language) {
    setLanguageState(next);
    try {
      localStorage.setItem(languageStorageKey, next);
    } catch {
      // Keep the selected language for this visit.
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
