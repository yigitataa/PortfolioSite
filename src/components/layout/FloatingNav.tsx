import { useLanguage } from "../../app/useLanguage";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navigation } from "../../data/navigation";
import { projects } from "../../data/projects";
import { site } from "../../data/site";
import { spring } from "../../lib/motion";
import { GlassSurface } from "../glass/GlassSurface";
import { ScrollProgress } from "../motion/ScrollProgress";
import { LanguageControl } from "./LanguageControl";
import { ThemeControl } from "./ThemeControl";
import { TransitionLink } from "./TransitionLink";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function FloatingNav() {
  const { t } = useLanguage();
  const location = useLocation();
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(location.pathname !== "/");
  const linksRef = useRef<HTMLDivElement>(null);
  const [linksWidth, setLinksWidth] = useState<number>();
  const activeHash = useActiveSection();
  const items = navigation.filter(
    (item) => !item.requiresProjects || projects.length > 0,
  );

  useEffect(() => {
    const links = linksRef.current;
    if (!links) return;
    const measure = () => {
      const width = links.getBoundingClientRect().width;
      if (width > 0) setLinksWidth(width);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(links);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setCompact(true);
      return;
    }
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!(entry?.isIntersecting ?? false)),
      { threshold: 0.5 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div
      className={`floating-nav ${compact ? "floating-nav--compact" : ""}`}
      style={
        linksWidth
          ? ({ "--nav-links-width": `${linksWidth}px` } as CSSProperties)
          : undefined
      }
    >
      <GlassSurface
        variant="strong"
        shape="rounded"
        interactive
        className="floating-nav__surface"
      >
        <nav aria-label={t("Ana gezinme", "Main navigation")}>
          <TransitionLink
            to="/"
            className="floating-nav__brand"
            aria-label={t(`${site.name}, ana sayfa`, `${site.name}, home`)}
          >
            <span className="floating-nav__brand-full" aria-hidden="true">
              {site.name}
            </span>
            <span className="floating-nav__brand-short" aria-hidden="true">
              YA
            </span>
          </TransitionLink>
          <div ref={linksRef} className="floating-nav__links">
            {items.map((item) => {
              const active =
                item.href === "/"
                  ? location.pathname === "/" && !activeHash
                  : item.href === "/about"
                    ? location.pathname === "/about"
                    : (item.href === "/#work" &&
                        location.pathname.startsWith("/work/")) ||
                      (location.pathname === "/" &&
                        item.href.endsWith(activeHash) &&
                        Boolean(activeHash));
              return (
                <TransitionLink
                  key={item.href}
                  to={item.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <motion.span
                      className="nav-link__active"
                      layoutId={reduce ? undefined : "desktop-active"}
                      transition={reduce ? { duration: 0 } : spring.responsive}
                    />
                  )}
                  {t(
                    item.label,
                    {
                      "/": "Home",
                      "/#work": "Projects",
                      "/about": "About",
                      "/#contact": "Contact",
                    }[item.href] ?? item.label,
                  )}
                </TransitionLink>
              );
            })}
          </div>
          <div className="nav-controls">
            <LanguageControl />
            <ThemeControl compact={compact} />
          </div>
        </nav>
        <ScrollProgress />
      </GlassSurface>
    </div>
  );
}
