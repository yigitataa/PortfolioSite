import { useLanguage } from "../app/useLanguage";
import { Seo } from "./Seo";
import { site } from "../data/site";
import { Container } from "../components/layout/Container";
import { TransitionLink } from "../components/layout/TransitionLink";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={`${t("Sayfa bulunamadı", "Page not found")} | ${site.name}`}
        description={t(
          "Aradığınız sayfa bulunamadı.",
          "The page you are looking for could not be found.",
        )}
      />
      <section className="not-found">
        <Container>
          <span className="section-index">404</span>
          <h1>{t("Bu sayfa bulunamadı.", "This page could not be found.")}</h1>
          <p>
            {t(
              "Adres değişmiş olabilir veya proje henüz erişilebilir olmayabilir.",
              "The address may have changed, or the project may not be available yet.",
            )}
          </p>
          <TransitionLink className="text-link" to="/">
            {t("Ana sayfaya dön →", "Back to home →")}
          </TransitionLink>
        </Container>
      </section>
    </>
  );
}
