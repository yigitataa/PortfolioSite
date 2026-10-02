export function ProjectEmptyState() {
  return (
    <div className="project-empty" role="status">
      <span className="section-index">Proje alanı</span>
      <h2>Yeni projeler için alan.</h2>
      <p>
        Proje altyapısı hazır. Bu alanı doldurmak için{" "}
        <code>src/data/projects.ts</code> dosyasına proje ekleyin.
      </p>
    </div>
  );
}
