import { useLanguage, useSite } from "../app/useLanguage";
import { Link } from "react-router";
import { motion } from "motion/react";
import { projects } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { duration, ease } from "../lib/motion";
import { Container } from "../components/layout/Container";
import { Magnetic } from "../components/motion/Magnetic";
import { TransitionLink } from "../components/layout/TransitionLink";
import { HeroBackdrop } from "./HeroBackdrop";
import "@fontsource-variable/geist";

export function Hero() {
  const { t } = useLanguage();
  const site = useSite();
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 22 };
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <Container className="hero__inner">
        <div className="hero__content">
          <div className="hero__copy">
            <motion.h1
              id="hero-title"
              aria-label={`${site.name} ${site.title}`}
              initial={initial}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? duration.instant : duration.cinematic,
                ease: ease.out,
              }}
            >
              <span className="hero__name">{site.name}</span>
              <span className="hero__role">
                <em>{site.title}</em>
              </span>
            </motion.h1>
            <motion.div
              className="hero__bottom"
              initial={initial}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? duration.instant : duration.slow,
                delay: reduce ? 0 : 0.24,
                ease: ease.out,
              }}
            >
              <p className="hero__subtitle">
                {site.hero.subtitle} <span>{site.description}</span>
              </p>
              <div className="hero__actions">
                {projects.length > 0 ? (
                  <Magnetic>
                    <Link
                      className="action-link glass-button glass-button--primary"
                      to="/#work"
                    >
                      {t("Projelerimi incele", "Explore my projects")}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </Magnetic>
                ) : (
                  <Magnetic>
                    <TransitionLink
                      className="action-link glass-button glass-button--primary"
                      to="/about"
                    >
                      {t("Hakkımda", "About")}
                      <span aria-hidden="true">→</span>
                    </TransitionLink>
                  </Magnetic>
                )}
                <Link className="action-link glass-button" to="/#contact">
                  {t("İletişime geç", "Get in touch")}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero__profiles">
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a href={site.cv} download>
                  {t("CV’yi indir ↓", "Download CV ↓")}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
