export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  description: string;
  detailDescription?: string;
  year: number;
  status?:
    "shipped" | "active" | "archive" | "prototype" | "demo" | "educational";
  role?: string;
  stack: string[];
  tags: string[];
  layout?: "wide" | "standard" | "portrait";
  cover: { type: "image" | "video" | "interactive"; src?: string; alt: string };
  links?: { live?: string; github?: string };
  narrative?: {
    paragraphs: string[];
    dataAndPrivacy?: string[];
  };
  caseStudy?: {
    problem: string;
    solution: string;
    decision: string;
    limits: string;
    evidence: string;
  };
  gallery?: Array<{ type: "image" | "video"; src: string; alt: string }>;
  featured?: boolean;
  order?: number;
}
