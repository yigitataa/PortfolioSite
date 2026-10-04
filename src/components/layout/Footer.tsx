import { useLanguage } from "../../app/useLanguage";
import { Link, useLocation } from "react-router";
import { site } from "../../data/site";
import { Container } from "./Container";
import { LocalTime } from "./LocalTime";

export function Footer() {
  const { t } = useLanguage();
  const location = useLocation();
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__main">
          <strong>{site.name}</strong>
          <LocalTime />
        </div>
        <div className="site-footer__links">
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`}>{t("E-posta", "Email")}</a>
          )}
          {site.cv && (
            <a href={site.cv} download>
              {t("CV’yi indir ↓", "Download CV ↓")}
            </a>
          )}
          <Link to={location.pathname === "/" ? "/#home" : "/"}>
            {location.pathname === "/"
              ? t("Yukarı dön ↑", "Back to top ↑")
              : t("Ana sayfaya dön →", "Back to home →")}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
