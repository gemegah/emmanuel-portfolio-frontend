import Link from "next/link";
import { ArticleRecords } from "@/components/ui/ArticleRecords";
import { PagePanel, RecordCard, SectionHeading, Tags } from "@/components/ui/Portfolio";
import { credentials, education, experience, profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <PagePanel code="Form HM-00 · Index of records" title="Overview" intro={profile.overview}>
      <div className="home-sections">
        <section className="content-section" aria-label="Experience">
          <SectionHeading code="Form EX-01 · Professional experience" title="Experience" href="/experience" action={`${experience.length} roles`} />
          <div className="card-grid">
            {experience.slice(0, 2).map(entry => <RecordCard key={entry.code} code={entry.code} title={entry.title} subtitle={entry.subtitle} tone={entry.homeTone} tags={entry.summaryTags}><p className="record-period">{entry.period}</p><p>{entry.summary}</p></RecordCard>)}
          </div>
        </section>
        <section className="content-section" aria-label="Featured projects">
          <SectionHeading code="Form PR-02 · Featured AI & cloud systems" title="Featured projects" href="/projects" action={`all ${projects.length} projects`} />
          <div className="card-grid">
            {projects.slice(0, 2).map(project => <RecordCard key={project.slug} code={project.code} title={project.title} subtitle={project.category} tone={project.tone}><p className="record-period">{project.status ? `Status · ${project.status}` : "Case study"}</p><p>{project.summary}</p><Tags items={project.tags.slice(0, 4)} /><Link className="inline-action" href={`/projects/${project.slug}`}>view project <span aria-hidden="true">↗</span></Link></RecordCard>)}
          </div>
        </section>
        <section className="content-section" aria-label="Certifications">
          <SectionHeading code="Form CR-03 · Credentials" title="Certifications" action={`${credentials.length} credentials`} />
          <div className="card-grid">
            {credentials.map(entry => <RecordCard key={entry.code} code={entry.code} title={entry.title} subtitle={entry.subtitle} tone={entry.tone} tags={entry.tags}><p className="record-period">{entry.period}</p><p>{entry.description}</p></RecordCard>)}
          </div>
        </section>
        <section className="content-section" aria-label="Education">
          <SectionHeading code="Form ED-04 · Education" title="Education" action="1 degree" />
          <div className="card-grid"><RecordCard code={education.code} title={education.title} subtitle={education.subtitle} tone={education.tone} tags={education.tags}><p className="record-period">{education.period}</p><p>{education.description}</p></RecordCard></div>
        </section>
        <section className="content-section" aria-label="Writing">
          <SectionHeading code="Form WR-06 · Writing" title="Writing" href="/writing" action="View writing" />
          <ArticleRecords limit={2} />
        </section>
      </div>
    </PagePanel>
  );
}
