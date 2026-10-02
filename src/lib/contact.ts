import { site } from "../data/site";

export interface ContactRequest {
  email: string;
  message: string;
}

export const contactEndpoint = `https://formsubmit.co/ajax/${site.email}`;

export async function submitContactRequest(
  request: ContactRequest,
  reference: string,
  honeypot: string,
  signal: AbortSignal,
) {
  const response = await fetch(contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: request.email.trim(),
      message: request.message.trim(),
      reference,
      _replyto: request.email.trim(),
      _subject: `[Portföy ${reference}] İletişim talebi`,
      _template: "table",
      _honey: honeypot,
    }),
    signal,
  });
  const result: { success?: boolean | string; message?: string } =
    await response.json();
  if (
    !response.ok ||
    (result.success !== true && result.success !== "true") ||
    /activat|confirm your|confirmation email|verify.{0,20}email/i.test(
      result.message ?? "",
    )
  ) {
    throw new Error("Contact submission was not confirmed.");
  }
}
