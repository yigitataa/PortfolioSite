import { useLanguage } from "../../app/useLanguage";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { FloatingNav } from "./FloatingNav";
import { MobileDock } from "./MobileDock";
import { Footer } from "./Footer";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function PageShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const previousLocation = useRef(location.key);
  useEffect(() => {
    const navigated = previousLocation.current !== location.key;
    previousLocation.current = location.key;
    if (location.hash) {
      const id = location.hash.slice(1);
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
        });
        if (target && navigated) {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      });
      return () => cancelAnimationFrame(frame);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (navigated)
        document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash, location.key, reduceMotion]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("İçeriğe geç", "Skip to content")}
      </a>
      <header>
        <FloatingNav />
        <MobileDock />
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
