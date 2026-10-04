import { useLanguage } from "../app/useLanguage";
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
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [request, setRequest] = useState(emptyRequest);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [messageError, setMessageError] = useState(false);
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
    if (field === "message") setMessageError(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeSubmission.current) return;
    if (request.message.trim().length < 10) {
      setMessageError(true);
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
          <span className="section-index">{t("İletişim", "Contact")}</span>
          <h2 aria-label={t("Bana Ulaşabilirsin", "Get in touch")}>
            {t("Bana", "Get in")}
            <br />
            <em>{t("Ulaşabilirsin", "touch")}</em>
          </h2>
          <div className="contact-section__details">
            <div>
              <span>{t("E-posta", "Email")}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <GlassButton type="button" onClick={copyEmail} aria-live="polite">
                {copied
                  ? t("Kopyalandı ✓", "Copied ✓")
                  : t("E-postayı kopyala", "Copy email")}
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
                {t("CV’yi indir ↓", "Download CV ↓")}
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
              <h3>
                {t(
                  "Mesajın gönderim servisine ulaştı.",
                  "Your message reached the submission service.",
                )}
              </h3>
              <p>
                {t(
                  "Gönderim servisi mesajını kabul etti. Yanıt için bıraktığın e-posta adresini kullanacağım.",
                  "The submission service accepted your message. I will reply using the email address you provided.",
                )}
              </p>
              <p className="contact-ticket__reference">
                {t("Gönderim referansı:", "Submission reference:")}{" "}
                <strong>{reference}</strong>
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
                {t("Yeni bir mesaj yaz", "Write another message")}
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
              <h3 id="contact-ticket-title">
                {t("Mesaj bırak.", "Leave a message.")}
              </h3>
              <p className="contact-ticket__description">
                {t(
                  "Birkaç satır yeterli. Mesajın e-postama iletilir; sana e-posta ile yanıt veririm.",
                  "A few lines are enough. Your message is forwarded to my inbox, and I will reply by email.",
                )}
              </p>
              <fieldset disabled={status === "sending"}>
                <legend className="visually-hidden">
                  {t(
                    "İletişim bilgilerin ve mesajın",
                    "Your contact details and message",
                  )}
                </legend>
                <label htmlFor="contact-email">
                  {t("E-posta adresin", "Your email address")}
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder={t("sana@ornek.com", "you@example.com")}
                    value={request.email}
                    onChange={(event) =>
                      updateRequest("email", event.target.value)
                    }
                  />
                </label>
                <label htmlFor="contact-message">
                  {t("Mesajın", "Your message")}
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    placeholder={t(
                      "Aklındaki fikri veya ihtiyacını kısaca anlat…",
                      "Briefly describe your idea or what you need…",
                    )}
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
                    {t(
                      "En az 10 karakterlik bir mesaj yazabilir misin?",
                      "Please write a message with at least 10 characters.",
                    )}
                  </span>
                )}
                <div className="contact-ticket__honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">
                    {t("Bu alanı boş bırak", "Leave this field empty")}
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
                  {status === "sending"
                    ? t("Gönderiliyor…", "Sending…")
                    : t("Mesajı gönder", "Send message")}
                  {status !== "sending" && <span aria-hidden="true"> ↗</span>}
                </GlassButton>
              </fieldset>
              <p className="contact-ticket__privacy">
                {t(
                  "E-posta adresin ve mesajın FormSubmit aracılığıyla bana iletilir. E-posta adresini sana dönmek için kullanırım.",
                  "Your email address and message are forwarded to me through FormSubmit. I use your email address to reply to you.",
                )}
              </p>
              {status === "sending" && (
                <p role="status" className="contact-ticket__feedback">
                  {t(
                    "Mesajın iletiliyor, lütfen bekle.",
                    "Your message is being sent. Please wait.",
                  )}
                </p>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  ref={feedbackRef}
                  tabIndex={-1}
                  className="contact-ticket__feedback"
                >
                  <p>
                    {t(
                      "Gönderimi doğrulayamadım. Mesajın burada duruyor; tekrar deneyebilirsin.",
                      "I could not confirm the submission. Your message is still here; you can try again.",
                    )}
                  </p>
                </div>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
