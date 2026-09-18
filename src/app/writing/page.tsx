import type { Metadata } from "next";
import { ArticleRecords } from "@/components/ui/ArticleRecords";
import { PagePanel } from "@/components/ui/Portfolio";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles and notes by Emmanuel Gemegah on applied AI, automation, and reliable systems."
};

export default function WritingPage() {
  return (
    <PagePanel
      className="writing-panel"
      code="Form WR-06 · Writing register"
      title="Writing"
      intro="Engineering notes on applied AI, workflow automation, human oversight, and evidence-driven SEO systems."
    >
      <div className="content-section">
        <ArticleRecords />
      </div>
    </PagePanel>
  );
}
