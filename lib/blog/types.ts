import type { ComponentType } from "react";

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  published: string;
  updated: string;
  keywords: string[];
  readingMinutes: number;
  /** Slug of an entry in AUTHORS. */
  author: string;
  toc: { id: string; label: string }[];
  faqs: { q: string; a: string }[];
  Body: ComponentType;
};
