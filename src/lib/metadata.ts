import type { Metadata } from "next";

export const siteUrl = new URL("https://emmanuelgemegah.online");

interface PageMetadata {
  title: string;
  description: string;
  path: `/${string}` | "/";
}

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Emmanuel Gemegah Portfolio",
      type: "website"
    }
  };
}
