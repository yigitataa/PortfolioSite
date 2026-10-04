import { useLanguage } from "../../app/useLanguage";

export function LanguageControl() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div
      className="language-control"
      role="group"
      aria-label={t("Dil seçimi", "Language selection")}
    >
      <button
        type="button"
        lang="tr"
        aria-label="Türkçe"
        aria-pressed={language === "tr"}
        onClick={() => setLanguage("tr")}
      >
        TR
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
