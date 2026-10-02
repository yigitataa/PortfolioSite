export interface NavigationItem {
  label: string;
  href: string;
  requiresProjects?: boolean;
}

export const navigation: NavigationItem[] = [
  { label: "Ana sayfa", href: "/" },
  { label: "Projelerim", href: "/#work", requiresProjects: true },
  { label: "Hakkımda", href: "/about" },
  { label: "İletişim", href: "/#contact" },
];
