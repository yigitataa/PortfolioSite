import { Seo } from "./Seo";
import { site } from "../data/site";
import { Container } from "../components/layout/Container";
import { TransitionLink } from "../components/layout/TransitionLink";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title={`Sayfa bulunamadı | ${site.name}`}
        description="Aradığınız sayfa bulunamadı."
      />
      <section className="not-found">
        <Container>
          <span className="section-index">404</span>
          <h1>Bu sayfa bulunamadı.</h1>
          <p>
            Adres değişmiş olabilir veya proje henüz erişilebilir olmayabilir.
          </p>
          <TransitionLink className="text-link" to="/">
            Ana sayfaya dön →
          </TransitionLink>
        </Container>
      </section>
    </>
  );
}
