import { useLanguage } from "../../app/useLanguage";
import { flushSync } from "react-dom";
import { useTheme } from "../../app/useTheme";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { withThemeTransition } from "../../lib/themeTransition";

export function ThemeControl({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const { resolvedTheme, setPreference } = useTheme();
  const reduceMotion = useReducedMotion();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      className={`theme-control${compact ? " theme-control--compact" : ""}`}
      type="button"
      aria-label={t(
        `${nextTheme === "dark" ? "Koyu" : "Açık"} temaya geç`,
        `Switch to ${nextTheme} theme`,
      )}
      title={t(
        `${nextTheme === "dark" ? "Koyu" : "Açık"} temaya geç`,
        `Switch to ${nextTheme} theme`,
      )}
      onClick={() =>
        withThemeTransition(
          () => flushSync(() => setPreference(nextTheme)),
          reduceMotion,
        )
      }
    >
      <span className="theme-control__glyph" aria-hidden="true">
        {resolvedTheme === "dark" ? "☀" : "☾"}
      </span>
      <span className="theme-control__label" aria-hidden="true">
        <span>{t("Tema", "Theme")}</span>
      </span>
    </button>
  );
}
