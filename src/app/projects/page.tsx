import type { Metadata } from "next";
import Link from "next/link";
import { PagePanel, RecordCard, Tags } from "@/components/ui/Portfolio";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects in applied AI, workflow automation, and systems integration by Emmanuel Gemegah.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <PagePanel code="FORM PR-02 · SELECTED SYSTEMS" title="Projects" intro="Practical systems spanning applied AI, analytics, and operational automation.">
        <div className="project-toolbar"><span className="record-count">{projects.length.toString().padStart(2, "0")} records</span></div>
        <div className="card-grid">
          {projects.map(project => (
            <RecordCard key={project.slug} code={project.code} title={project.title} subtitle={project.category} tone={project.tone}>
              {project.status ? <p className="record-period">Status · {project.status}</p> : null}
              <p>{project.summary}</p>
              <Tags items={project.tags} />
              <Link className="inline-action" href={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>view project <span aria-hidden="true">↗</span></Link>
            </RecordCard>
          ))}
        </div>
      </PagePanel>
    </div>
  );
}
