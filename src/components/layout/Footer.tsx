import { Link, useLocation } from "react-router";
import { site } from "../../data/site";
import { Container } from "./Container";
import { LocalTime } from "./LocalTime";

export function Footer() {
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
          {site.email && <a href={`mailto:${site.email}`}>E-posta</a>}
          {site.cv && (
            <a href={site.cv} download>
              CV’yi indir ↓
            </a>
          )}
          <Link to={location.pathname === "/" ? "/#home" : "/"}>
            {location.pathname === "/" ? "Yukarı dön ↑" : "Ana sayfaya dön →"}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
