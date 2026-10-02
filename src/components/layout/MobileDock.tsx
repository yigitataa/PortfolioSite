import { motion } from "motion/react";
import { useLocation } from "react-router";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navigation } from "../../data/navigation";
import { projects } from "../../data/projects";
import { spring } from "../../lib/motion";
import { GlassDock } from "../glass/GlassDock";
import { ThemeControl } from "./ThemeControl";
import { TransitionLink } from "./TransitionLink";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function MobileDock() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const activeHash = useActiveSection();
  const items = navigation.filter(
    (item) => !item.requiresProjects || projects.length > 0,
  );
  return (
    <>
      <div className="mobile-dock">
        <GlassDock label="Mobil gezinme">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? location.pathname === "/" && !activeHash
                : item.href === "/about"
                  ? location.pathname === "/about"
                  : (item.href === "/#work" &&
                      location.pathname.startsWith("/work/")) ||
                    (location.pathname === "/" &&
                      Boolean(activeHash) &&
                      item.href.endsWith(activeHash));
            return (
              <TransitionLink
                key={item.href}
                to={item.href}
                className="mobile-dock__link"
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    className="mobile-dock__active"
                    layoutId={reduce ? undefined : "mobile-active"}
                    transition={reduce ? { duration: 0 } : spring.responsive}
                  />
                )}
                {item.label}
              </TransitionLink>
            );
          })}
        </GlassDock>
      </div>
      <div className="mobile-theme glass glass--strong glass--pill">
        <ThemeControl compact />
      </div>
    </>
  );
}
