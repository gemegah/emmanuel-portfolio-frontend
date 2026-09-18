import type { Metadata } from "next";
import { PagePanel, RecordCard } from "@/components/ui/Portfolio";
import { contact } from "@/data/navigation";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation about AI automation, applied AI roles, and reliable workflow systems." };

export default function ContactPage() {
  return <PagePanel className="contact-panel" code="Form CT-07 · Start a conversation" title="Contact" intro="Choose the channel that works best for you.">
    <div className="card-grid contact-grid content-section">
      <RecordCard code="CT-0001" title="Email" subtitle="Start a conversation" tone="clay">
        <a className="contact-link" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span></a>
        <p>Best for roles, project briefs, and a clear written trail.</p>
      </RecordCard>
      <RecordCard code="CT-0002" title="LinkedIn" subtitle="Professional profile" tone="olive">
        <a className="contact-link" href={contact.linkedin} target="_blank" rel="noreferrer noopener">linkedin.com/in/emmanuelgemegah <span aria-hidden="true">↗</span></a>
        <p>Professional background, credentials, and direct conversation.</p>
      </RecordCard>
      <RecordCard code="CT-0003" title="GitHub" subtitle="Code and repositories" tone="ochre">
        <a className="contact-link" href={contact.github} target="_blank" rel="noreferrer noopener">github.com/gemegah <span aria-hidden="true">↗</span></a>
        <p>Project repositories, architecture, and implementation notes.</p>
      </RecordCard>
    </div>
  </PagePanel>;
}
