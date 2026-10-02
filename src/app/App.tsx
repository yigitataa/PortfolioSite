import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Seo } from "./Seo";
import { PageShell } from "../components/layout/PageShell";
import { Hero } from "../sections/Hero";
import { Work } from "../sections/Work";
import { Contact } from "../sections/Contact";
import { site } from "../data/site";
import { Container } from "../components/layout/Container";
import { NotFoundPage } from "./NotFoundPage";

function HomePage() {
  return (
    <>
      <Seo
        title={`${site.name} | ${site.title}`}
        description={site.description}
      />
      <Hero />
      <Work />
      <Contact />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Seo
        title={`Hakkımda | ${site.name}`}
        description="Yiğit Ata: bilgisayar mühendisliği eğitimi, full-stack geliştirme stajı, web uygulamaları ve üreterek öğrenme yaklaşımı."
      />
      <section className="about-page">
        <Container>
          <article
            className="about-article"
            aria-labelledby="about-article-title"
          >
            <header className="about-article__header">
              <span className="section-index">Hakkımda</span>
              <h1 id="about-article-title">
                Ürettikçe <em>öğreniyorum.</em>
              </h1>
            </header>
            <div className="about-article__body">
              <p className="about-article__lead">
                Ben Yiğit Ata. Eskişehir Osmangazi Üniversitesi Bilgisayar
                Mühendisliği 4. sınıf öğrencisiyim. Bilgisayarla başlayan
                merakımı, bugün uygulamalar geliştirerek sürdürüyorum.
              </p>
              <p>
                React ve TypeScript ile arayüzler, Node.js ve Express ile REST
                API’leri geliştiriyorum. MongoDB ve PostgreSQL ile veri
                modelleme, API entegrasyonu ve otomatik test üzerinde
                çalışıyorum.
              </p>
              <div className="about-article__profiles">
                <a className="text-link" href={site.cv} download>
                  CV’yi indir ↓
                </a>
                <a
                  className="text-link"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  className="text-link"
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </div>
              <h2>Bugünkü çalışmalarım</h2>
              <p>
                Ağustos ve Eylül 2026’da YAPAYTEK Bilişim ve Danışmanlık’ta MERN
                geliştirme stajı yaptım. Full-stack uygulamalar, REST
                servisleri, veri modelleme ve frontend/backend testleri üzerinde
                çalıştım. 2026’dan bu yana İZAR Hava Savunma Sistemleri ve
                Çelikkubbe TEKNOFEST yazılım geliştirme ekibinde yer alıyorum.
              </p>
              <p>
                Web çalışmalarının yanında Python, OpenCV ve MediaPipe ile
                görüntü işleme; PIC16F877A, UART ve Python üzerinden seri
                haberleşme pratikleriyle öğrenmeye devam ediyorum.
              </p>
              <h2>Her şey merakla başladı</h2>
              <p>
                Bilgisayarla henüz okuma yazma bilmezken tanıştım. Klavye ve
                fareyi kullanıyor, oyunlarda geçemediğim bölümleri tekrar tekrar
                deniyordum. Uzun uğraşların ardından, bazen hiç beklemediğim bir
                anda o bölümü geçmenin verdiği sevinci hâlâ hatırlıyorum.
              </p>
              <p>
                Yıllar sonra bir uygulama geliştirirken aynı duyguyu yaşadığımda
                hangi mesleği yapmak istediğimi anladım. Bilgisayar benim için
                hep büyüleyici bir araç oldu. Onunla bir problemi çözebilmek,
                aklımdaki bir fikri çalışan bir şeye dönüştürebilmek, kendimi en
                güçlü hissettiğim anlardan biri.
              </p>
              <h2>Mühendislik, benim için teknik bir sanat</h2>
              <p>
                Günlerce, haftalarca, bazen yıllarca uğraşılan bir problemi
                bilgisayar yardımıyla çözmeyi bir sanat olarak görüyorum. O
                çözümün insanlara nasıl sunulduğu da eserin bir parçası. Linus
                Torvalds’ın Linux’u geliştirmesi ve dünyayla paylaşması, bu
                bakışın benim için en güçlü örneklerinden biri.
              </p>
              <p>
                Kendi uygulamalarımı geliştirirken de aynı düşünceyle hareket
                ediyorum. İyi bir uygulama, yalnızca işini yapan bir araç
                olmanın ötesine geçmeli. Kullanıcısına, sevdiği bir şarkıyı
                dinlerken ya da sevdiği bir filmi izlerken hissettiğine benzer
                bir keyif verebilmeli.
              </p>
              <h2>Sadece üretiyorum</h2>
              <p>
                Bugün ortaya koyduğum şey kusursuz olmayabilir. Ama yarın daha
                iyisini yapmanın yolu, bugün bir şey üretmekten geçiyor. Benim
                için 1, her zaman 0’dan daha iyi. Fikrin basit ya da zor, ucuz
                ya da maliyetli olmasından bağımsız olarak onu hayata geçirmeye
                çalışıyorum. Her deneme, bir sonrakine bir şey katıyor.
              </p>
              <p>
                Yapay zekânın, henüz her teknik ayrıntıyı bilmeden de bir fikri
                hayata geçirmeye alan açmasını değerli buluyorum. Derin
                mühendislik bilgisinin yerini bütünüyle tutmasa da denemek,
                geliştirmek ve öğrenmek için yeni imkânlar sunuyor. Bu
                portfolyoyu da tek satır kodu kendim yazmadan, yapay zekâ
                desteğiyle geliştiriyorum. Sürecin sonunda yalnızca bir siteye
                değil, başladığımdan daha fazla bilgiye ve deneyime sahip olmak
                istiyorum.
              </p>
            </div>
          </article>
        </Container>
      </section>
      <Contact />
    </>
  );
}

const ProjectPage = lazy(() => import("../projects/ProjectPage"));

export function Portfolio() {
  return (
    <ThemeProvider>
      <PageShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/work/:slug"
            element={
              <Suspense
                fallback={
                  <section className="not-found">
                    <Container>
                      <p role="status">Proje yükleniyor…</p>
                    </Container>
                  </section>
                }
              >
                <ProjectPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageShell>
    </ThemeProvider>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Portfolio />
    </BrowserRouter>
  );
}
