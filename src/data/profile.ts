import type { Tone } from "@/components/ui/Portfolio";
import { contact } from "@/data/navigation";

export interface ProfileRecord {
  code: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: readonly string[];
  tone: Tone;
}

export interface ExperienceRecord extends ProfileRecord {
  type: string;
  location: string;
  summary: string;
  summaryTags: readonly string[];
  homeTone: Tone;
}

export const profile = {
  name: contact.name,
  role: "AI Automation Engineer · Applied AI",
  email: contact.email,
  overview: "I build secure agentic workflows, retrieval systems, evaluation loops, and cloud automation for real business operations.",
  colophon: "Built around practical AI engineering: secure workflows, grounded retrieval, measurable evaluation, and human oversight.",
} as const;

export const experience: readonly ExperienceRecord[] = [
  { code: "EX-0001", title: "Senior AI Data Trainer", subtitle: "Invisible Technologies", period: "Jul 2024 – Present", type: "Remote", location: "Distributed team", tone: "olive", homeTone: "olive",
    summary: "Evaluate, classify, score, edit, and fact-check LLM outputs. Turn reasoning, factuality, relevance, and instruction-following failures into repeatable quality decisions and regression tests.",
    description: "Evaluate, classify, score, edit, and fact-check LLM outputs against detailed quality criteria. Identify reasoning, factuality, relevance, style, and instruction-following failures while collaborating with QA stakeholders and mentoring junior trainers.",
    summaryTags: ["LLM evaluation", "Fact-checking", "Error analysis", "Quality systems"],
    tags: ["LLM evaluation", "Fact-checking", "Error analysis", "Quality rubrics", "Regression testing", "AI safety", "Mentoring", "QA collaboration", "Governance"] },
  { code: "EX-0002", title: "Lead Product Designer", subtitle: "Fantasy Gold Ghana", period: "Apr 2023 – Jun 2024", type: "Product leadership", location: "Mobile + web", tone: "ochre", homeTone: "ochre",
    summary: "Led mobile and web product design, simplifying onboarding and core game flows to reduce friction and accelerate time to value across fantasy-sports experiences.",
    description: "Led product design across fantasy-sports experiences. Redesigned onboarding and core game flows, reduced the journey to three primary steps, and clarified entry into Head-to-Head and Four Corners formats.",
    summaryTags: ["Product discovery", "UX design", "Prototyping", "Experimentation"],
    tags: ["Product discovery", "UX design", "Prototyping", "User flows", "Usability", "Experimentation", "Handoff"] },
  { code: "EX-0003", title: "User Experience Consultant", subtitle: "Contract projects", period: "May 2024 – Jul 2024", type: "Contract", location: "Ecommerce · fintech · industrial", tone: "clay", homeTone: "clay",
    summary: "Designed and delivered websites and software interfaces across ecommerce, fintech, and industrial use cases.",
    description: "Designed and delivered websites and software interfaces across ecommerce, fintech, and industrial use cases, combining research, information architecture, SEO, analytics, and implementation support.",
    summaryTags: ["UX research", "Information architecture", "Implementation"],
    tags: ["UX research", "Information architecture", "Fintech dashboards", "SEO", "Analytics", "Implementation", "Stakeholder delivery"] },
  { code: "EX-0004", title: "UX Intern", subtitle: "Npontu Technologies", period: "Oct 2022 – Dec 2022", type: "Internship", location: "Technology delivery", tone: "olive", homeTone: "olive",
    summary: "Supported product and user-experience work through interface analysis, design iteration, and cross-functional collaboration.",
    description: "Supported product and user-experience work in a technology delivery environment through interface analysis, design iteration, and cross-functional collaboration.",
    summaryTags: ["Interface analysis", "Design iteration", "Collaboration"],
    tags: ["Interface analysis", "Design iteration", "Prototyping", "Product thinking", "Collaboration", "Handoff", "User experience", "Tech delivery", "Communication"] },
];

export const credentials: readonly ProfileRecord[] = [
  { code: "CR-0001", title: "AWS Certified Cloud Practitioner", subtitle: "Amazon Web Services", period: "Certified", tone: "olive", description: "Cloud fundamentals supporting secure serverless applications, managed services, deployment, access control, and resilient AI infrastructure.", tags: ["AWS", "Serverless", "Cloud security"] },
  { code: "CR-0002", title: "ISO/IEC 27001 Lead Auditor", subtitle: "Information security", period: "Certified", tone: "ochre", description: "Risk assessment, control design, audit thinking, information-security management, and continual improvement for trustworthy AI systems.", tags: ["ISO 27001", "Risk assessment", "Control design", "Governance"] },
];

export const education: ProfileRecord = { code: "ED-0001", title: "Bachelor of Science in Information Technology", subtitle: "University of Ghana", period: "2019 – 2023", tone: "clay", description: "Foundation in software development, databases, networking, cloud systems, human-computer interaction, and information systems.", tags: ["Software development", "Databases", "Networking", "Cloud systems"] };

export interface LedgerRecord {
  code: string;
  marker: string;
  markerCaption: string;
  title: string;
  subtitle: string;
  tone: Tone;
  metadata: readonly { label: string; value: string }[];
  description: string;
  tags: readonly string[];
}

export const aboutRecords: readonly LedgerRecord[] = [
  { code: "AB-0001", marker: "AI", markerCaption: "Now", title: "AI Automation Engineer", subtitle: "Applied AI · Workflow Systems", tone: "olive",
    metadata: [{ label: "Positioning", value: "Build · evaluate · deploy" }, { label: "Focus", value: "Secure, useful automation" }],
    description: "I build AI-powered systems that connect language models to business data, APIs, and operational workflows. I separate deterministic logic from generative behavior, define permission boundaries, and add validation, monitoring, and human approval where errors carry real consequences.",
    tags: ["Agentic workflows", "RAG", "Structured outputs", "LLM evaluation", "Human-in-the-loop", "Authorization", "API integration", "Observability", "Regression testing", "Product discovery", "Cloud automation"] },
  { code: "AB-0002", marker: "UG", markerCaption: "2023", title: "Education & Credentials", subtitle: "University of Ghana · AWS · ISO 27001", tone: "ochre",
    metadata: [{ label: "Degree", value: "BSc Information Technology · 2019–2023" }, { label: "Certifications", value: "AWS Cloud Practitioner · ISO/IEC 27001 Lead Auditor" }],
    description: "My information-technology foundation spans software development, databases, networking, cloud systems, HCI, and information systems. AWS certification supports deployed AI infrastructure; ISO 27001 training strengthens risk, controls, auditability, and continual improvement.",
    tags: ["Software development", "Databases", "Networking", "Cloud systems", "HCI", "Information systems", "AWS", "ISO 27001", "Risk controls", "Auditability"] },
];
