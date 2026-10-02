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
import { projects } from "../data/projects";
import { projectDetails } from "../data/projectDetails";
import { ProjectGrid } from "../projects/ProjectGrid";
import { ProjectEmptyState } from "../projects/ProjectEmptyState";
import { withViewTransition } from "../lib/viewTransition";

beforeEach(() => {
  Reflect.deleteProperty(document, "startViewTransition");
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("portfolio shell", () => {
  it("removes 404 indexing and canonical state when returning to a real route", async () => {
    window.history.replaceState({}, "", "/missing-page");
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() =>
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, follow",
      ),
    );
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    await user.click(
      within(screen.getByRole("main")).getByRole("link", {
        name: "Ana sayfaya dön →",
      }),
    );
    await waitFor(() =>
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        "content",
        "index, follow",
      ),
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      window.location.origin + "/",
    );
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      window.location.origin + "/social/portfolio.png",
    );
  });

  it("honors reduced motion for navigation and theme changes", async () => {
    const original = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      ...original(query),
      matches: query === "(prefers-reduced-motion: reduce)",
    }));
    const transition = vi.fn();
    Object.assign(document, { startViewTransition: transition });
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getAllByRole("button", { name: "Koyu temaya geç" })[0]!,
    );
    await user.click(screen.getAllByRole("link", { name: "Hakkımda" })[0]!);
    expect(transition).not.toHaveBeenCalled();
    await waitFor(() => expect(document.getElementById("main")).toHaveFocus());
  });

  it("scrolls to contact again when the same hero link is clicked twice", async () => {
    const user = userEvent.setup();
    render(<App />);
    const contact = document.getElementById("contact")!;
    const scrollIntoView = vi.fn();
    contact.scrollIntoView = scrollIntoView;
    const link = screen.getByRole("link", { name: "İletişime geç" });
    await user.click(link);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    await user.click(link);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2));
    expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: "smooth" });
  });

  it("tracks long project sections in desktop and mobile navigation", async () => {
    let scrollY = 0;
    const originalBounds = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        const starts: Record<string, number> = {
          home: 0,
          work: 800,
          contact: 4000,
        };
        if (this.id in starts)
          return {
            ...originalBounds.call(this),
            top: starts[this.id]! - scrollY,
          };
        return originalBounds.call(this);
      },
    );
    render(<App />);
    async function expectActive(label: string) {
      await waitFor(() => {
        for (const link of screen.getAllByRole("link", {
          name: label,
        }))
          expect(link).toHaveAttribute("aria-current", "page");
      });
    }
    await expectActive("Ana sayfa");
    scrollY = 700;
    fireEvent.scroll(window);
    await expectActive("Projelerim");
    scrollY = 2400;
    fireEvent.scroll(window);
    await expectActive("Projelerim");
    scrollY = 3900;
    fireEvent.scroll(window);
    await expectActive("İletişim");
    scrollY = 700;
    fireEvent.scroll(window);
    await expectActive("Projelerim");
    scrollY = 0;
    fireEvent.scroll(window);
    await expectActive("Ana sayfa");
  });

  it("renders TECHball and all six repository projects", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Yiğit ATA Bilgisayar Mühendisliği Öğrencisi",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Sadece üretiyorum\./).tagName).toBe("P");
    expect(
      screen.queryByRole("heading", { name: /fikirlerin ürüne/i }),
    ).not.toBeInTheDocument();
    expect(projects.map((project) => project.slug)).toEqual([
      "techball-web",
      "yatatodo",
      "yataquizing",
      "yataclimate",
      "yata-market",
      "kisisel-kitaplik",
      "yataoil",
    ]);
    for (const project of projects) {
      expect(
        screen.getByRole("link", {
          name: `${project.title} projesini incele`,
        }),
      ).toBeInTheDocument();
    }
    expect(projects[0]?.links?.github).toBeUndefined();
    for (const project of projects.slice(1)) {
      expect(project.links?.github).toContain(
        "github.com/yigitataa/YapaytechTasks/tree/main/",
      );
    }
  });

  it("navigates to about and keeps keyboard accessible links", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("link", { name: "Hakkımda" })[0]!);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Ürettikçe öğreniyorum.",
      }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.getElementById("main")).toHaveFocus());
  });

  it("changes theme on each click without opening a picker", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getAllByRole("button", { name: "Koyu temaya geç" })[0]!,
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
    expect(
      screen.queryByRole("group", { name: /tema/i }),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: "Açık temaya geç" })[0]!,
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("portfolio-theme")).toBe("light");
  });

  it("keeps empty project components safe", () => {
    const { container } = render(<ProjectGrid items={[]} />);
    expect(container.querySelector(".project-card")).toBeNull();
    render(<ProjectEmptyState />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Proje altyapısı hazır",
    );
  });

  it("opens a project detail with verified scope and Turkish labels", async () => {
    window.history.replaceState({}, "", "/work/kisisel-kitaplik");
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Kişisel Kitaplık" });
    expect(
      screen.getByRole("heading", { level: 1, name: "Kişisel Kitaplık" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Teknolojiler")).toBeInTheDocument();
    expect(
      screen.getByText(/Okuma günlüğü için React ekranı henüz eklenmedi/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Problem" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Veri ve gizlilik" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bağlam" })).toBeNull();
    expect(
      screen.getByRole("link", { name: "Kaynak kodu gör ↗" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/yigitataa/YapaytechTasks/tree/main/DB-Task-1",
    );
    expect(
      screen.getByRole("img", {
        name: "Kişisel Kitaplık kitap listesi, arama ve okuma durumu filtresi",
      }),
    ).toHaveAttribute(
      "src",
      "/media/projects/kisisel-kitaplik/01-kitapligim-1906.webp",
    );
  });

  it("references all supplied project screenshots", () => {
    const sources = projects.flatMap((project) => [
      project.cover.src,
      ...(project.gallery?.map((item) => item.src) ?? []),
    ]);
    expect(sources).toHaveLength(14);
    expect(new Set(sources).size).toBe(14);
    for (const source of sources) {
      expect(source).toMatch(/^\/projects\//);
    }
  });

  it("provides complete narratives and data notes for every project", () => {
    for (const project of projectDetails) {
      expect(project.narrative?.paragraphs.length).toBeGreaterThanOrEqual(5);
      expect(project.narrative?.dataAndPrivacy?.length).toBeGreaterThan(0);
    }
  });

  it("shows both supplied TECHball screenshots on its detail page", async () => {
    window.history.replaceState({}, "", "/work/techball-web");
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "TECHball web" });
    const choices = screen.getByRole("group", {
      name: "TECHball web ekran görüntüleri",
    });
    const story = screen.getByRole("heading", { name: "Problem" });
    expect(
      choices.compareDocumentPosition(story) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.getByRole("img", {
        name: "TECHball oyuncu listesi, filtreler ve taktik tahtası",
      }),
    ).toHaveAttribute(
      "src",
      "/media/projects/techball-web/01-oyuncular-2878.webp",
    );
    expect(
      screen.getByRole("button", {
        name: "Görsel 1: TECHball oyuncu listesi, filtreler ve taktik tahtası",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("switches TECHball screenshots with accessible gallery controls", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/work/techball-web");
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "TECHball web" });
    const scoutButton = screen.getByRole("button", {
      name: "Görsel 2: TECHball Scout AI yanıtı ve oyuncu sorgusu sonuçları",
    });
    await user.click(scoutButton);
    expect(scoutButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("img", {
        name: "TECHball Scout AI yanıtı ve oyuncu sorgusu sonuçları",
      }),
    ).toHaveAttribute(
      "src",
      "/media/projects/techball-web/02-scout-ai-2850.webp",
    );
    expect(screen.getAllByText(/salt okunur erişiyor/)[0]).toBeInTheDocument();
  });

  it("explains YataOil's data handling and verified scope", async () => {
    window.history.replaceState({}, "", "/work/yataoil");
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "YataOil" });
    expect(
      screen.getAllByText(/kalıcı önbelleğe yazılmıyor/)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/uçtan uca tamamlandığı henüz doğrulanmış değil/)[0],
    ).toBeInTheDocument();
  });

  it("uses immediate fallback for reduced motion", () => {
    const update = vi.fn();
    const start = vi.fn();
    Object.assign(document, { startViewTransition: start });
    withViewTransition(update, true);
    expect(update).toHaveBeenCalledOnce();
    expect(start).not.toHaveBeenCalled();
  });
});
