"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { source } from "@/lib/source";

interface PageInfo {
  name: string;
  url: string;
  description?: string;
}

interface PaginationProps {
  list?: string[];
  previous?: PageInfo | null;
  next?: PageInfo | null;
}

export function Pagination({ list, previous, next }: PaginationProps) {
  if (previous !== undefined || next !== undefined) {
    if (!previous && !next) return null;

    return (
      <div
        className={cn(
          "grid gap-4 pb-6",
          previous && next ? "grid-cols-2" : "grid-cols-1",
        )}
      >
        {previous && <PaginationItem item={previous} type="previous" />}
        {next && <PaginationItem item={next} type="next" />}
      </div>
    );
  }

  if (list) {
    try {
      const allPages = source
        .getPages()
        .filter((page) => page.url.startsWith("/docs"));

      const tree = source.getPageTree("/docs");
      const orderedSlugs: string[] = [];

      function flattenTree(node: any) {
        if (node.url) orderedSlugs.push(node.url);
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(flattenTree);
        }
      }
      if (Array.isArray(tree)) {
        tree.forEach(flattenTree);
      } else if (tree && typeof tree === "object") {
        flattenTree(tree);
      }

      const docsPages = orderedSlugs
        .map((slug) => allPages.find((p) => p.url === slug))
        .filter(Boolean);

      const currentSlug = `/docs/${list.join("/")}`;
      const currentIndex = docsPages.findIndex(
        (page) => page?.url === currentSlug,
      );

      if (currentIndex === -1) return null;

      const previousPage =
        currentIndex > 0 ? docsPages[currentIndex - 1] : null;
      const nextPage =
        currentIndex < docsPages.length - 1
          ? docsPages[currentIndex + 1]
          : null;

      const previousPageInfo: PageInfo | null = previousPage
        ? {
            name:
              previousPage.data.title ||
              previousPage.slugs[previousPage.slugs.length - 1],
            url: previousPage.url,
            description: previousPage.data.description,
          }
        : null;

      const nextPageInfo: PageInfo | null = nextPage
        ? {
            name:
              nextPage.data.title || nextPage.slugs[nextPage.slugs.length - 1],
            url: nextPage.url,
            description: nextPage.data.description,
          }
        : null;

      if (!previousPageInfo && !nextPageInfo) return null;

      return (
        <div
          className={cn(
            "grid gap-4 pb-6",
            previousPageInfo && nextPageInfo ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          {previousPageInfo && (
            <PaginationItem item={previousPageInfo} type="previous" />
          )}
          {nextPageInfo && <PaginationItem item={nextPageInfo} type="next" />}
        </div>
      );
    } catch (error) {
      console.error("Error calculating pagination:", error);
      return null;
    }
  }

  return null;
}

function PaginationItem({
  item,
  type,
}: {
  item: PageInfo;
  type: "previous" | "next";
}) {
  const Icon = type === "previous" ? ChevronLeft : ChevronRight;

  return (
    <Link
      href={item.url}
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground @max-lg:col-span-full",
        type === "next" && "text-end",
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-1.5 font-medium",
          type === "next" && "flex-row-reverse",
        )}
      >
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p>{item.name}</p>
      </div>
      {item.description && (
        <p className="text-fd-muted-foreground truncate">{item.description}</p>
      )}
    </Link>
  );
}
