import type { Metadata } from "next";
import { MetadataRow, PagePanel, RecordCard } from "@/components/ui/Portfolio";
import { aboutRecords } from "@/data/profile";

export const metadata: Metadata = { title: "About", description: "Workflow-first AI engineering, grounded in evaluation, cloud systems, product design, and security governance." };

export default function AboutPage() {
  return <PagePanel className="about-panel" code="Form AB-04 · Profile & credentials" title="About" intro="Workflow-first AI engineering, grounded in evaluation, cloud systems, product design, and security governance.">
    <div className="profile-ledger content-section">
      {aboutRecords.map(entry => <div className="ledger-record" key={entry.code}>
        <div className={`ledger-marker tone-${entry.tone}`} aria-hidden="true"><strong>{entry.marker}</strong><span>{entry.markerCaption}</span></div>
        <RecordCard code={entry.code} title={entry.title} subtitle={entry.subtitle} tone={entry.tone} tags={entry.tags}>
          <MetadataRow items={entry.metadata} />
          <p>{entry.description}</p>
        </RecordCard>
      </div>)}
    </div>
  </PagePanel>;
}
