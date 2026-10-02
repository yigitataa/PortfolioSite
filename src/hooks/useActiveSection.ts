import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function useActiveSection() {
  const { pathname } = useLocation();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = ["home", "work", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    function update() {
      frame = 0;
      // Section starts remain reliable even when a section spans many screens.
      const marker = window.innerHeight * 0.3;
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      }
      setActiveHash(current === "home" ? "" : `#${current}`);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  return pathname === "/" ? activeHash : "";
}
