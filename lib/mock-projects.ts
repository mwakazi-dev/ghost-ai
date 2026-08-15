export interface Project {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
  updatedAt: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj_1",
    name: "E-Commerce Platform",
    slug: "e-commerce-platform",
    owned: true,
    updatedAt: "2026-08-15",
  },
  {
    id: "proj_2",
    name: "Auth Service",
    slug: "auth-service",
    owned: true,
    updatedAt: "2026-08-14",
  },
  {
    id: "proj_3",
    name: "Data Pipeline",
    slug: "data-pipeline",
    owned: true,
    updatedAt: "2026-08-10",
  },
];

export const MOCK_SHARED_PROJECTS: Project[] = [
  {
    id: "proj_4",
    name: "Payment Gateway",
    slug: "payment-gateway",
    owned: false,
    updatedAt: "2026-08-12",
  },
  {
    id: "proj_5",
    name: "Notification System",
    slug: "notification-system",
    owned: false,
    updatedAt: "2026-08-08",
  },
];

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
