import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

import { ThemeContext } from "./theme-context";
import type { ThemePreference } from "./theme-context";
const key = "portfolio-theme";

function readPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(key);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const resolvedTheme =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;

  useEffect(() => {
    setPreferenceState(readPreference());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#171c27" : "#f5f7fa",
      );
  }, [resolvedTheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    const dark =
      next === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : next === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      if (next === "system") localStorage.removeItem(key);
      else localStorage.setItem(key, next);
    } catch {
      // Theme still works when storage is blocked.
    }
  }, []);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme, setPreference],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
