import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MetadataRow, PagePanel, RecordCard, Tags } from "@/components/ui/Portfolio";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="project-detail">
      <PagePanel code={`FORM PR-02 · PROJECT ${project.code} · ${project.category}`} title={project.title} intro={project.summary}>
        <div className="project-toolbar">
          <Link className="inline-action" href="/projects"><span aria-hidden="true">←</span> all projects</Link>
          <a className="inline-action" href="#architecture">architecture <span aria-hidden="true">↘</span></a>
          {project.status ? <span className="record-count">Status · {project.status}</span> : null}
          <span className="project-stamp">{project.stamp}</span>
        </div>
        <div className="case-grid">
          <RecordCard code={`${project.code}.1`} title={project.challenge.title} subtitle={project.challenge.subtitle} tone="olive">
            <MetadataRow items={project.challenge.facts} />
            <h4 className="eyebrow">Why it matters</h4>
            <p>{project.challenge.why}</p>
          </RecordCard>
          <section className="case-section" id="architecture" aria-label={project.solution.title}>
            <RecordCard code={`${project.code}.2`} title={project.solution.title} subtitle={project.solution.subtitle} tone="ochre">
              <table className="workflow-table">
                <thead><tr><th scope="col">{project.solution.columns[0]}</th><th scope="col">{project.solution.columns[1]}</th></tr></thead>
                <tbody>{project.solution.steps.map((step, index) => <tr key={step}><th scope="row">{(index + 1).toString().padStart(2, "0")}</th><td>{step}</td></tr>)}</tbody>
              </table>
              <Tags items={project.solution.notes} />
            </RecordCard>
          </section>
        </div>
        <section className="case-section" aria-label={project.workflow.title}>
          <RecordCard code={`${project.code}.3`} title={project.workflow.title} subtitle={project.workflow.subtitle} tone="clay">
            <ul className="workflow-list">{project.workflow.steps.map(step => <li key={step}>{step}</li>)}</ul>
          </RecordCard>
        </section>
        <section className="case-section" aria-label={project.coverage.title}>
          <RecordCard code={`${project.code}.4`} title={project.coverage.title} subtitle={project.coverage.subtitle} tone="olive">
            {project.coverage.groups.map(group => <div className="coverage-group" key={group.title}><h4 className="eyebrow">{group.title}</h4><Tags items={group.items} /></div>)}
          </RecordCard>
        </section>
      </PagePanel>
    </div>
  );
}
