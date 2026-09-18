import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PagePanel, Tags } from "@/components/ui/Portfolio";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();

  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();

  const relatedProjects = article.relatedProjectSlugs.map(projectSlug => {
    const project = projects.find(item => item.slug === projectSlug);
    if (!project) throw new Error(`Missing related project: ${projectSlug}`);
    return project;
  });

  return (
    <div className="article-detail">
      <PagePanel className="article-panel" code={`FORM WR-06 · ${article.code}`} title={article.title} intro={article.excerpt}>
        <div className="article-toolbar">
          <Link className="inline-action" href="/writing"><span aria-hidden="true">←</span> all writing</Link>
          {article.projectStatus ? <span className="record-count">Project · {article.projectStatus}</span> : null}
        </div>
        <Tags items={article.tags} />
        <article className="article-sheet">
          {article.sections.map((section, sectionIndex) => {
            const headingId = `${article.slug}-section-${sectionIndex + 1}`;
            return (
              <section className="article-section" key={section.heading} aria-labelledby={headingId}>
                <p className="eyebrow">{article.code}.{String(sectionIndex + 1).padStart(2, "0")}</p>
                <h2 id={headingId}>{section.heading}</h2>
                <div className="article-copy">
                  {section.blocks.map((block, blockIndex) => block.type === "paragraph"
                    ? <p key={`${section.heading}-paragraph-${blockIndex}`}>{block.text}</p>
                    : <ul key={`${section.heading}-list-${blockIndex}`}>{block.items.map(item => <li key={item}>{item}</li>)}</ul>)}
                </div>
              </section>
            );
          })}
          <section className="article-section" aria-labelledby={`${article.slug}-related`}>
            <p className="eyebrow">Related systems</p>
            <h2 id={`${article.slug}-related`}>Related projects</h2>
            <div className="article-actions">
              {relatedProjects.map(project => <Link className="inline-action" href={`/projects/${project.slug}`} key={project.slug}>{project.title} <span aria-hidden="true">↗</span></Link>)}
            </div>
          </section>
          <section className="article-section" aria-labelledby={`${article.slug}-sources`}>
            <p className="eyebrow">References</p>
            <h2 id={`${article.slug}-sources`}>Sources</h2>
            <ul className="source-list">
              {article.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer noopener">{source.label} <span aria-hidden="true">↗</span></a><p>{source.note}</p></li>)}
            </ul>
          </section>
        </article>
      </PagePanel>
    </div>
  );
}
