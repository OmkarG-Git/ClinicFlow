// lib/navigation/get-breadcrumbs.ts

import { ROUTE_METADATA } from "@/constants/metadata/route-metadata";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function getBreadcrumbs(
  pathname: string
): BreadcrumbItem[] {
  const segments = pathname
    .split("/")
    .filter(Boolean);

  // Ignore the role prefix (/owner, /doctor, /receptionist)
  const [, ...routeSegments] = segments;

  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = `/${segments[0]}`;

  for (const segment of routeSegments) {
    currentPath += `/${segment}`;

    const metadata =
      ROUTE_METADATA[
        currentPath as keyof typeof ROUTE_METADATA
      ];

    if (!metadata) continue;

    breadcrumbs.push({
      label: metadata.title,
      href:
        currentPath === pathname
          ? undefined
          : currentPath,
    });
  }

  return breadcrumbs;
}