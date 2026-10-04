import { useLanguage } from "../app/useLanguage";
export function ProjectEmptyState() {
  const { t } = useLanguage();
  return (
    <div className="project-empty" role="status">
      <span className="section-index">{t("Proje alanı", "Project space")}</span>
      <h2>{t("Yeni projeler için alan.", "Room for new projects.")}</h2>
      <p>
        {t(
          "Proje altyapısı hazır. Bu alanı doldurmak için",
          "The project setup is ready. Add a project to",
        )}{" "}
        <code>src/data/projects.ts</code>{" "}
        {t("dosyasına proje ekleyin.", "to fill this space.")}
      </p>
    </div>
  );
}
