import type { Metadata } from "next";
import { MetadataRow, PagePanel, RecordCard } from "@/components/ui/Portfolio";
import { experience } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Experience",
  description: "AI evaluation, product leadership, consulting, and hands-on delivery.",
  path: "/experience"
});

export default function ExperiencePage() {
  return <PagePanel className="experience-panel" code="Form EX-01 · Professional experience" title="Experience" intro="AI evaluation, product leadership, consulting, and hands-on delivery.">
    <div className="card-grid content-section">
      {experience.map(entry => <RecordCard key={entry.code} code={entry.code} title={entry.title} subtitle={entry.subtitle} tone={entry.tone} tags={entry.tags}>
        <MetadataRow items={[{ label: "Period", value: entry.period }, { label: "Type", value: entry.type }, { label: "Location", value: entry.location }]} />
        <p>{entry.description}</p>
      </RecordCard>)}
    </div>
  </PagePanel>;
}
