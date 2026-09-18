import Link from "next/link";
import { contact } from "@/data/navigation";

export function Footer() {
  return <footer className="site-footer slab"><div className="footer-grid"><div><p className="eyebrow">Name</p><p className="footer-name">{contact.name}</p><p className="eyebrow footer-focus">Focus · Secure applied AI</p></div><div><p className="eyebrow">Contact</p><a className="footer-email" href={`mailto:${contact.email}`}>{contact.email}</a><Link className="inline-action" href="/contact">See all <span aria-hidden="true">↗</span></Link></div><div><p className="eyebrow">Colophon</p><p className="colophon">Built around practical AI engineering: secure workflows, grounded retrieval, measurable evaluation, and human oversight.</p></div></div><div className="micr" aria-hidden="true">⑆ 001 : 010101 ⑈ 2026 : EG ⑆ 001 : 010101 ⑈ 2026 : EG ⑆ 001 : 010101 ⑈ 2026 : EG ⑆</div></footer>;
}
