import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

const staticPaths = ["/", "/about", "/contact", "/experience", "/projects", "/writing"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...projects.map(project => `/projects/${project.slug}` as const),
    ...articles.map(article => `/writing/${article.slug}` as const)
  ];

  return paths.map(path => ({
    url: new URL(path, siteUrl).toString()
  }));
}
