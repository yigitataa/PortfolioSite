import { useEffect, useRef, useState, type FormEvent } from "react";
import { Section } from "../components/layout/Section";
import { GlassButton } from "../components/glass/GlassButton";
import { Reveal } from "../components/motion/Reveal";
import { site } from "../data/site";
import { submitContactRequest, type ContactRequest } from "../lib/contact";
import { contactEndpoint } from "../lib/contact";

const emptyRequest: ContactRequest = {
  email: "",
  message: "",
};

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [request, setRequest] = useState(emptyRequest);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [reference, setReference] = useState("");
  const activeSubmission = useRef<AbortController | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(
    () => () => {
      activeSubmission.current?.abort();
      activeSubmission.current = null;
    },
    [],
  );

  useEffect(() => {
    if (status === "success" || status === "error")
      feedbackRef.current?.focus();
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  function updateRequest(field: keyof ContactRequest, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
    // A changed message is a new request; unchanged retries keep their reference.
    setReference("");
    if (status === "error") setStatus("idle");
    if (field === "message") setMessageError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeSubmission.current) return;
    if (request.message.trim().length < 10) {
      setMessageError("En az 10 karakterlik bir mesaj yazabilir misin?");
      messageRef.current?.focus();
      return;
    }

    const honeypot = String(
      new FormData(event.currentTarget).get("_honey") ?? "",
    );
    if (honeypot) return;
    const ticketReference =
      reference || `YA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const controller = new AbortController();
    activeSubmission.current = controller;
    setReference(ticketReference);
    setStatus("sending");
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      await submitContactRequest(
        request,
        ticketReference,
        honeypot,
        controller.signal,
      );
      if (!controller.signal.aborted) setStatus("success");
    } catch {
      // Route changes abort the request and must not update an unmounted form.
      if (activeSubmission.current === controller) {
        setError(
          "Gönderimi doğrulayamadım. Mesajın burada duruyor; tekrar deneyebilirsin.",
        );
        setStatus("error");
      }
    } finally {
      window.clearTimeout(timeout);
      if (activeSubmission.current === controller)
        activeSubmission.current = null;
    }
  }

  return (
    <Section id="contact" className="contact-section" environment="cool">
      <div className="contact-section__grid">
        <Reveal className="contact-section__intro">
          <span className="section-index">İletişim</span>
          <h2 aria-label="Bana Ulaşabilirsin">
            Bana
            <br />
            <em>Ulaşabilirsin</em>
          </h2>
          <div className="contact-section__details">
            <div>
              <span>E-posta</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <GlassButton type="button" onClick={copyEmail} aria-live="polite">
                {copied ? "Kopyalandı ✓" : "E-postayı kopyala"}
              </GlassButton>
            </div>
          </div>
          <div className="contact-section__actions">
            {site.github && (
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            )}
            {site.cv && (
              <a href={site.cv} download>
                CV’yi indir ↓
              </a>
            )}
          </div>
        </Reveal>

        <Reveal className="contact-ticket" delay={0.08}>
          {status === "success" ? (
            <div
              className="contact-ticket__success"
              ref={feedbackRef}
              tabIndex={-1}
              role="status"
            >
              <span className="contact-ticket__check" aria-hidden="true">
                ✓
              </span>
              <h3>Mesajın gönderim servisine ulaştı.</h3>
              <p>
                Gönderim servisi mesajını kabul etti. Yanıt için bıraktığın
                e-posta adresini kullanacağım.
              </p>
              <p className="contact-ticket__reference">
                Gönderim referansı: <strong>{reference}</strong>
              </p>
              <GlassButton
                type="button"
                onClick={() => {
                  setRequest(emptyRequest);
                  setReference("");
                  setStatus("idle");
                  window.requestAnimationFrame(() => emailRef.current?.focus());
                }}
              >
                Yeni bir mesaj yaz
              </GlassButton>
            </div>
          ) : (
            <form
              action={contactEndpoint.replace("/ajax/", "/")}
              method="post"
              aria-labelledby="contact-ticket-title"
              aria-busy={status === "sending"}
              onSubmit={submit}
            >
              <h3 id="contact-ticket-title">Mesaj bırak.</h3>
              <p className="contact-ticket__description">
                Birkaç satır yeterli. Mesajın e-postama iletilir; sana e-posta
                ile yanıt veririm.
              </p>
              <fieldset disabled={status === "sending"}>
                <legend className="visually-hidden">
                  İletişim bilgilerin ve mesajın
                </legend>
                <label htmlFor="contact-email">
                  E-posta adresin
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="sana@ornek.com"
                    value={request.email}
                    onChange={(event) =>
                      updateRequest("email", event.target.value)
                    }
                  />
                </label>
                <label htmlFor="contact-message">
                  Mesajın
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    placeholder="Aklındaki fikri veya ihtiyacını kısaca anlat…"
                    aria-invalid={messageError ? true : undefined}
                    aria-describedby={
                      messageError ? "contact-message-error" : undefined
                    }
                    value={request.message}
                    onChange={(event) =>
                      updateRequest("message", event.target.value)
                    }
                  />
                </label>
                {messageError && (
                  <span
                    id="contact-message-error"
                    className="contact-ticket__feedback"
                    role="alert"
                  >
                    {messageError}
                  </span>
                )}
                <div className="contact-ticket__honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">
                    Bu alanı boş bırak
                    <input
                      id="contact-website"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="contact-ticket__submit"
                >
                  {status === "sending" ? "Gönderiliyor…" : "Mesajı gönder"}
                  {status !== "sending" && <span aria-hidden="true"> ↗</span>}
                </GlassButton>
              </fieldset>
              <p className="contact-ticket__privacy">
                E-posta adresin ve mesajın FormSubmit aracılığıyla bana
                iletilir. E-posta adresini sana dönmek için kullanırım.
              </p>
              {status === "sending" && (
                <p role="status" className="contact-ticket__feedback">
                  Mesajın iletiliyor, lütfen bekle.
                </p>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  ref={feedbackRef}
                  tabIndex={-1}
                  className="contact-ticket__feedback"
                >
                  <p>{error}</p>
                </div>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
