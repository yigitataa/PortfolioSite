import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";
import { contactEndpoint } from "../lib/contact";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

async function fillRequest() {
  const user = userEvent.setup();
  await user.type(
    screen.getByLabelText("E-posta adresin"),
    "deniz@example.com",
  );
  await user.type(
    screen.getByLabelText("Mesajın"),
    "Bir web projesi hakkında konuşmak istiyorum.",
  );
  return user;
}

function providerResponse(
  success: boolean | string,
  message = "Form submitted successfully",
  ok = true,
) {
  return { ok, json: async () => ({ success, message }) };
}

describe("contact requests", () => {
  it("shows the email and simplified contact form", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: "Bana Ulaşabilirsin" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/WhatsApp/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Adın")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "yatafb@gmail.com" }),
    ).toHaveAttribute("href", "mailto:yatafb@gmail.com");
  });

  it("keeps incomplete or whitespace-only requests from being sent", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
    expect(fetchMock).not.toHaveBeenCalled();
    await user.type(
      screen.getByLabelText("E-posta adresin"),
      "deniz@example.com",
    );
    await user.type(screen.getByLabelText("Mesajın"), "          ");
    await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("En az 10 karakterlik");
    expect(screen.getByLabelText("Mesajın")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText("Mesajın")).toHaveFocus();
  });

  it("sends the reply address and reference, then shows a confirmed success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(providerResponse("true"));
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    const user = await fillRequest();
    await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
    expect(
      await screen.findByRole("heading", {
        name: "Mesajın gönderim servisine ulaştı.",
      }),
    ).toBeInTheDocument();
    const [endpoint, options] = fetchMock.mock.calls[0]!;
    expect(endpoint).toBe(contactEndpoint);
    const payload = JSON.parse(options.body);
    expect(payload).toMatchObject({
      email: "deniz@example.com",
      _replyto: "deniz@example.com",
      message: "Bir web projesi hakkında konuşmak istiyorum.",
      _honey: "",
    });
    expect(payload).not.toHaveProperty("name");
    expect(payload).not.toHaveProperty("topic");
    expect(payload.reference).toMatch(/^YA-[A-F0-9]{8}$/);
    expect(payload._subject).toContain(payload.reference);
    expect(screen.getByRole("status")).toHaveTextContent(payload.reference);
    await user.click(
      screen.getByRole("button", { name: "Yeni bir mesaj yaz" }),
    );
    expect(screen.getByLabelText("E-posta adresin")).toHaveValue("");
    await waitFor(() =>
      expect(screen.getByLabelText("E-posta adresin")).toHaveFocus(),
    );
    expect(screen.getByLabelText("Mesajın")).toHaveValue("");
  });

  it.each([
    [false, "Failed", true],
    [true, "Failed", false],
    [true, "Please activate your form by confirming your email", true],
  ])(
    "preserves the request for provider failures or activation requirements (%s, %s, %s)",
    async (success, message, ok) => {
      const fetchMock = vi
        .fn()
        .mockResolvedValue(providerResponse(success, message, ok));
      vi.stubGlobal("fetch", fetchMock);
      render(<Contact />);
      const user = await fillRequest();
      await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Gönderimi doğrulayamadım",
      );
      expect(
        screen.queryByRole("heading", {
          name: "Mesajın gönderim servisine ulaştı.",
        }),
      ).not.toBeInTheDocument();
      expect(screen.getByLabelText("Mesajın")).toHaveValue(
        "Bir web projesi hakkında konuşmak istiyorum.",
      );
      expect(screen.getByLabelText("E-posta adresin")).toHaveValue(
        "deniz@example.com",
      );
      expect(screen.queryByText(/WhatsApp/i)).not.toBeInTheDocument();
      const initialReference = JSON.parse(
        fetchMock.mock.calls[0]![1].body,
      ).reference;
      await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
      await screen.findByRole("alert");
      expect(JSON.parse(fetchMock.mock.calls[1]![1].body).reference).toBe(
        initialReference,
      );
    },
  );

  it("handles a network failure without clearing the message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Network unavailable")),
    );
    render(<Contact />);
    const user = await fillRequest();
    await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Mesajın burada duruyor",
    );
    expect(screen.getByLabelText("Mesajın")).not.toHaveValue("");
  });

  it("blocks duplicate submissions and cancels the request on unmount", async () => {
    const fetchMock = vi.fn(
      (_url: string, { signal }: { signal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    const user = await fillRequest();
    await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
    expect(
      screen.getByRole("button", { name: "Gönderiliyor…" }),
    ).toBeDisabled();
    expect(screen.getByLabelText("Mesajın")).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const signal = fetchMock.mock.calls[0]![1].signal;
    cleanup();
    expect(signal.aborted).toBe(true);
  });

  it("returns to an editable form after the 20 second timeout", async () => {
    const fetchMock = vi.fn(
      (_url: string, { signal }: { signal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    await fillRequest();
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    // Avoid user-event's own timer while the form's timeout is under test.
    await act(async () => {
      screen.getByRole("button", { name: "Mesajı gönder" }).click();
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20000);
    });
    vi.useRealTimers();
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Mesajı gönder" })).toBeEnabled();
    expect(screen.getByLabelText("Mesajın")).not.toHaveValue("");
  });
});
