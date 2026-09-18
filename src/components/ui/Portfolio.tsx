import Link from "next/link";
import type { ReactNode } from "react";

export type Tone = "olive" | "clay" | "ochre";

export function PagePanel({ code, title, intro, children, className }: { code: string; title: string; intro: string; children: ReactNode; className?: string }) {
  return <main id="main-content" className={`page-panel slab${className ? ` ${className}` : ""}`}><div className="page-heading"><p className="eyebrow">{code}</p><h1>{title}</h1><p className="page-intro">{intro}</p></div>{children}</main>;
}

export function SectionHeading({ code, title, href, action }: { code: string; title: string; href?: string; action?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{code}</p><h2>{title}</h2></div>{action && (href ? <Link className="inline-action" href={href}>{action} <span aria-hidden="true">↗</span></Link> : <span className="record-count">{action}</span>)}</div>;
}

export function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tags" aria-label="Topics">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function RecordCard({ code, title, subtitle, tone, tags, children }: { code: string; title: string; subtitle: string; tone: Tone; tags?: readonly string[]; children: ReactNode }) {
  return <article className={`record-card tone-${tone}`}><span className="record-index">{code}</span><svg className="paperclip" aria-hidden="true" viewBox="-3 -3 34 77" fill="none"><path d="M8 68l0-52c0-3.31371 2.68629-6 6-6 3.31371 0 6 2.68629 6 6l0 44c0 5.52285-4.47715 10-10 10-5.52285 0-10-4.47715-10-10l0-46c0-7.73199 6.26801-14 14-14 7.73199 0 14 6.26801 14 14l0 48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg><div className="record-header"><h3>{title}</h3><p>{subtitle}</p></div><div className="record-body">{children}{tags && <Tags items={tags} />}</div></article>;
}

export function MetadataRow({ items }: { items: readonly { label: string; value: string }[] }) {
  return <dl className="metadata-row">{items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
