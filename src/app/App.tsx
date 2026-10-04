import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Seo } from "./Seo";
import { PageShell } from "../components/layout/PageShell";
import { Hero } from "../sections/Hero";
import { Work } from "../sections/Work";
import { Contact } from "../sections/Contact";
import { useLanguage, useSite } from "./useLanguage";
import { LanguageProvider } from "./LanguageProvider";
import { Container } from "../components/layout/Container";
import { NotFoundPage } from "./NotFoundPage";

function HomePage() {
  const site = useSite();
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
  const { t } = useLanguage();
  const site = useSite();
  return (
    <>
      <Seo
        title={`${t("Hakkımda", "About")} | ${site.name}`}
        description={t(
          "Yiğit Ata: bilgisayar mühendisliği eğitimi, full-stack geliştirme stajı, web uygulamaları ve üreterek öğrenme yaklaşımı.",
          "Yiğit Ata: computer engineering studies, a full-stack development internship, web applications, and learning by building.",
        )}
      />
      <section className="about-page">
        <Container>
          <article
            className="about-article"
            aria-labelledby="about-article-title"
          >
            <header className="about-article__header">
              <span className="section-index">{t("Hakkımda", "About")}</span>
              <h1 id="about-article-title">
                {t("Ürettikçe", "I learn by")}{" "}
                <em>{t("öğreniyorum.", "building.")}</em>
              </h1>
            </header>
            <div className="about-article__body">
              <p className="about-article__lead">
                {t(
                  "Ben Yiğit Ata. Eskişehir Osmangazi Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Bilgisayarla başlayan merakımı, bugün uygulamalar geliştirerek sürdürüyorum.",
                  "I’m Yiğit Ata, a fourth-year Computer Engineering student at Eskişehir Osmangazi University. My curiosity began with computers, and today I continue exploring it by building applications.",
                )}
              </p>
              <p>
                {t(
                  "React ve TypeScript ile arayüzler, Node.js ve Express ile REST API’leri geliştiriyorum. MongoDB ve PostgreSQL ile veri modelleme, API entegrasyonu ve otomatik test üzerinde çalışıyorum.",
                  "I build interfaces with React and TypeScript, and REST APIs with Node.js and Express. I work on data modeling, API integration, and automated testing with MongoDB and PostgreSQL.",
                )}
              </p>
              <div className="about-article__profiles">
                <a className="text-link" href={site.cv} download>
                  {t("CV’yi indir ↓", "Download CV ↓")}
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
              <h2>{t("Bugünkü çalışmalarım", "What I’m working on today")}</h2>
              <p>
                {t(
                  "Ağustos ve Eylül 2026’da YAPAYTEK Bilişim ve Danışmanlık’ta MERN geliştirme stajı yaptım. Full-stack uygulamalar, REST servisleri, veri modelleme ve frontend/backend testleri üzerinde çalıştım. 2026’dan bu yana İZAR Hava Savunma Sistemleri ve Çelikkubbe TEKNOFEST yazılım geliştirme ekibinde yer alıyorum.",
                  "In August and September 2026, I completed a MERN development internship at YAPAYTEK Bilişim ve Danışmanlık. I worked on full-stack applications, REST services, data modeling, and frontend and backend tests. Since 2026, I have also been part of the İZAR Air Defense Systems and Çelikkubbe TEKNOFEST software development team.",
                )}
              </p>
              <p>
                {t(
                  "Web çalışmalarının yanında Python, OpenCV ve MediaPipe ile görüntü işleme; PIC16F877A, UART ve Python üzerinden seri haberleşme pratikleriyle öğrenmeye devam ediyorum.",
                  "Alongside web development, I continue learning through image processing with Python, OpenCV, and MediaPipe, and serial communication experiments using the PIC16F877A, UART, and Python.",
                )}
              </p>
              <h2>
                {t("Her şey merakla başladı", "It all started with curiosity")}
              </h2>
              <p>
                {t(
                  "Bilgisayarla henüz okuma yazma bilmezken tanıştım. Klavye ve fareyi kullanıyor, oyunlarda geçemediğim bölümleri tekrar tekrar deniyordum. Uzun uğraşların ardından, bazen hiç beklemediğim bir anda o bölümü geçmenin verdiği sevinci hâlâ hatırlıyorum.",
                  "I first encountered computers before I could read or write. I used the keyboard and mouse, trying again and again to get past difficult parts of games. I still remember the joy of finally getting through after many attempts, sometimes when I least expected it.",
                )}
              </p>
              <p>
                {t(
                  "Yıllar sonra bir uygulama geliştirirken aynı duyguyu yaşadığımda hangi mesleği yapmak istediğimi anladım. Bilgisayar benim için hep büyüleyici bir araç oldu. Onunla bir problemi çözebilmek, aklımdaki bir fikri çalışan bir şeye dönüştürebilmek, kendimi en güçlü hissettiğim anlardan biri.",
                  "Years later, when I felt that same excitement while building an application, I understood what I wanted to do for a living. Computers have always fascinated me. Solving a problem with one, or turning an idea into something that works, is one of the moments when I feel most capable.",
                )}
              </p>
              <h2>
                {t(
                  "Mühendislik, benim için teknik bir sanat",
                  "Engineering is a technical art to me",
                )}
              </h2>
              <p>
                {t(
                  "Günlerce, haftalarca, bazen yıllarca uğraşılan bir problemi bilgisayar yardımıyla çözmeyi bir sanat olarak görüyorum. O çözümün insanlara nasıl sunulduğu da eserin bir parçası. Linus Torvalds’ın Linux’u geliştirmesi ve dünyayla paylaşması, bu bakışın benim için en güçlü örneklerinden biri.",
                  "I see solving a problem with a computer, after days, weeks, or sometimes years of effort, as an art. How that solution is presented to people is part of the work too. Linus Torvalds developing Linux and sharing it with the world is one of the strongest examples of this perspective for me.",
                )}
              </p>
              <p>
                {t(
                  "Kendi uygulamalarımı geliştirirken de aynı düşünceyle hareket ediyorum. İyi bir uygulama, yalnızca işini yapan bir araç olmanın ötesine geçmeli. Kullanıcısına, sevdiği bir şarkıyı dinlerken ya da sevdiği bir filmi izlerken hissettiğine benzer bir keyif verebilmeli.",
                  "I approach my own applications with the same mindset. A good application should go beyond being a tool that does its job. It should give its users a sense of enjoyment similar to listening to a favorite song or watching a favorite film.",
                )}
              </p>
              <h2>{t("Sadece üretiyorum", "I just keep building")}</h2>
              <p>
                {t(
                  "Bugün ortaya koyduğum şey kusursuz olmayabilir. Ama yarın daha iyisini yapmanın yolu, bugün bir şey üretmekten geçiyor. Benim için 1, her zaman 0’dan daha iyi. Fikrin basit ya da zor, ucuz ya da maliyetli olmasından bağımsız olarak onu hayata geçirmeye çalışıyorum. Her deneme, bir sonrakine bir şey katıyor.",
                  "What I build today may not be perfect. But the way to build something better tomorrow is to create something today. For me, 1 is always better than 0. Whether an idea is simple or difficult, inexpensive or costly, I try to bring it to life. Every attempt adds something to the next.",
                )}
              </p>
              <p>
                {t(
                  "Yapay zekânın, henüz her teknik ayrıntıyı bilmeden de bir fikri hayata geçirmeye alan açmasını değerli buluyorum. Derin mühendislik bilgisinin yerini bütünüyle tutmasa da denemek, geliştirmek ve öğrenmek için yeni imkânlar sunuyor. Bu portfolyoyu da tek satır kodu kendim yazmadan, yapay zekâ desteğiyle geliştiriyorum. Sürecin sonunda yalnızca bir siteye değil, başladığımdan daha fazla bilgiye ve deneyime sahip olmak istiyorum.",
                  "I value how AI creates room to bring an idea to life without knowing every technical detail yet. Although it cannot fully replace deep engineering knowledge, it offers new ways to experiment, build, and learn. I am developing this portfolio with AI assistance, without writing a single line of code myself. At the end of the process, I want to have more than a website: I want more knowledge and experience than I started with.",
                )}
              </p>
            </div>
          </article>
        </Container>
      </section>
      <Contact />
    </>
  );
}

function ProjectLoading() {
  const { t } = useLanguage();
  return (
    <section className="not-found">
      <Container>
        <p role="status">{t("Proje yükleniyor…", "Loading project…")}</p>
      </Container>
    </section>
  );
}

const ProjectPage = lazy(() => import("../projects/ProjectPage"));

export function Portfolio() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PageShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/work/:slug"
              element={
                <Suspense fallback={<ProjectLoading />}>
                  <ProjectPage />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageShell>
      </LanguageProvider>
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
