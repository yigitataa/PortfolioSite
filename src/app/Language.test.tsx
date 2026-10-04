import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { languageStorageKey } from "./language-context";
import { projects, englishProjects } from "../data/projects";
import {
  projectDetails,
  projectDetailsForLanguage,
} from "../data/projectDetails";

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function choose(language: "Türkçe" | "English") {
  await userEvent
    .setup()
    .click(screen.getAllByRole("button", { name: language })[0]!);
}

describe("portfolio language selection", () => {
  it("translates the home page and metadata, synchronizes both controls, and restores Turkish", async () => {
    render(<App />);
    await choose("English");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toContain("Computer Engineering Student");
    expect(
      document.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute("content", "en_US");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      "Yiğit ATA Computer Engineering Student",
    );
    expect(
      screen.getByRole("heading", { name: "My projects." }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Your email address")).toHaveAttribute(
      "placeholder",
      "you@example.com",
    );
    expect(
      screen.getByRole("img", { name: /Yiğit Ata by the sea/ }),
    ).toBeInTheDocument();
    expect(localStorage.getItem(languageStorageKey)).toBe("en");
    for (const control of screen.getAllByRole("button", { name: "English" }))
      expect(control).toHaveAttribute("aria-pressed", "true");
    for (const project of englishProjects)
      expect(
        screen.getByRole("link", {
          name: `Explore ${project.title}`,
        }),
      ).toBeInTheDocument();
    await choose("Türkçe");
    expect(document.documentElement.lang).toBe("tr");
    expect(
      screen.getByRole("heading", { name: "Projelerim." }),
    ).toBeInTheDocument();
    expect(localStorage.getItem(languageStorageKey)).toBe("tr");
  });

  it("restores English after remounting and keeps it when navigating to About", async () => {
    const first = render(<App />);
    await choose("English");
    first.unmount();
    render(<App />);
    await userEvent
      .setup()
      .click(screen.getAllByRole("link", { name: "About" })[0]!);
    expect(
      await screen.findByRole("heading", { name: "I learn by building." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "It all started with curiosity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/without writing a single line of code myself/),
    ).toBeInTheDocument();
    expect(document.title).toBe("About | Yiğit ATA");
    expect(
      screen.queryByText("Her şey merakla başladı"),
    ).not.toBeInTheDocument();
  });

  it.each(projectDetailsForLanguage("en"))(
    "translates the full $slug detail, screenshots, story, privacy, and navigation",
    async (project) => {
      localStorage.setItem(languageStorageKey, "en");
      window.history.replaceState({}, "", `/work/${project.slug}`);
      render(<App />);
      expect(
        await screen.findByRole("heading", { level: 1, name: project.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(project.caseStudy!.solution)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Data and privacy" }),
      ).toBeInTheDocument();
      for (const paragraph of project.narrative!.dataAndPrivacy!)
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      fireEvent.click(
        screen.getByText("Project story and implementation details"),
      );
      for (const paragraph of project.narrative!.paragraphs)
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      expect(screen.getByAltText(project.cover.alt)).toBeInTheDocument();
      const original = projectDetails.find(
        (entry) => entry.slug === project.slug,
      )!;
      expect(screen.queryByText(original.description)).not.toBeInTheDocument();
      expect(
        screen.queryByText(original.caseStudy!.limits),
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:image:alt"]'),
      ).toHaveAttribute("content", `${project.title} project preview`);
      await choose("Türkçe");
      expect(
        screen.getByText(original.caseStudy!.solution),
      ).toBeInTheDocument();
      expect(screen.getByAltText(original.cover.alt)).toBeInTheDocument();
    },
  );

  it("preserves form input and translates an existing validation error when switching languages", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("E-posta adresin"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mesajın"), {
      target: { value: "short" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "Mesaj bırak." }));
    expect(screen.getByRole("alert")).toHaveTextContent("En az 10 karakterlik");
    await choose("English");
    expect(screen.getByLabelText("Your email address")).toHaveValue(
      "test@example.com",
    );
    expect(screen.getByLabelText("Your message")).toHaveValue("short");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "at least 10 characters",
    );
  });

  it("translates submission failure and success without making a real request", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error("Offline"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);
    fireEvent.change(screen.getByLabelText("E-posta adresin"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mesajın"), {
      target: { value: "A sufficiently long test message." },
    });
    fireEvent.submit(screen.getByRole("form", { name: "Mesaj bırak." }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Gönderimi doğrulayamadım",
    );
    await choose("English");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "I could not confirm the submission",
    );
    fireEvent.submit(screen.getByRole("form", { name: "Leave a message." }));
    expect(
      await screen.findByRole("heading", {
        name: "Your message reached the submission service.",
      }),
    ).toBeInTheDocument();
    await choose("Türkçe");
    expect(
      screen.getByRole("heading", {
        name: "Mesajın gönderim servisine ulaştı.",
      }),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("translates 404 and retains English when returning home", async () => {
    localStorage.setItem(languageStorageKey, "en");
    window.history.replaceState({}, "", "/missing");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "This page could not be found." }),
    ).toBeInTheDocument();
    await userEvent.setup().click(
      within(screen.getByRole("main")).getByRole("link", {
        name: "Back to home →",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "My projects." }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe("en"));
  });

  it("ignores invalid preferences and works when browser storage is blocked", async () => {
    localStorage.setItem(languageStorageKey, "invalid");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Projelerim." }),
    ).toBeInTheDocument();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    await choose("English");
    expect(
      screen.getByRole("heading", { name: "My projects." }),
    ).toBeInTheDocument();
    cleanup();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Projelerim." }),
    ).toBeInTheDocument();
  });

  it("keeps project destinations and media sources identical across languages", () => {
    expect(englishProjects).toHaveLength(projects.length);
    for (const [index, project] of englishProjects.entries()) {
      const original = projects[index]!;
      expect(project.slug).toBe(original.slug);
      expect(project.cover.src).toBe(original.cover.src);
      expect(project.links).toEqual(original.links);
      expect(project.gallery?.map((media) => media.src)).toEqual(
        original.gallery?.map((media) => media.src),
      );
    }
  });
});
