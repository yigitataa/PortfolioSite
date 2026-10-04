import { useTheme } from "../app/useTheme";
import { useLanguage } from "../app/useLanguage";
import { imageAttributes } from "../lib/images";
import { useEffect, useState } from "react";

export function HeroBackdrop() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <div
      className="hero__backdrop"
      role="img"
      aria-label={t(
        "Yiğit Ata, deniz kenarında; temaya göre gündüz ve akşam atmosferi",
        "Yiğit Ata by the sea, with a daytime or evening atmosphere depending on the theme",
      )}
    >
      {ready && (
        <img
          className={`hero__scene hero__scene--${resolvedTheme}`}
          {...imageAttributes(`/images/hero-${resolvedTheme}.jpeg`)}
          sizes="(max-width: 767px) calc(180svh - 280px), 100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      )}
      <noscript>
        <img
          className="hero__scene"
          {...imageAttributes("/images/hero-light.jpeg")}
          sizes="100vw"
          alt=""
          loading="lazy"
        />
      </noscript>
      <div className="hero__reading-field" />
      <div className="hero__scene-shade" />
    </div>
  );
}
