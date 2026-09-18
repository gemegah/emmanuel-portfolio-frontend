import type { Tone } from "@/components/ui/Portfolio";

interface CaseSection {
  title: string;
  subtitle: string;
}

export interface Project {
  slug: string;
  code: string;
  title: string;
  category: string;
  summary: string;
  status: "In progress" | null;
  tone: Tone;
  tags: readonly string[];
  stamp: string;
  challenge: CaseSection & {
    facts: readonly { label: string; value: string }[];
    why: string;
  };
  solution: CaseSection & {
    columns: readonly [string, string];
    steps: readonly string[];
    notes: readonly string[];
  };
  workflow: CaseSection & { steps: readonly string[] };
  coverage: CaseSection & {
    groups: readonly { title: string; items: readonly string[] }[];
  };
}

export const projects = [
  {
    slug: "ai-seo-growth-intelligence",
    code: "PR-0004",
    title: "AI SEO Growth Intelligence Platform",
    category: "SEO Analytics · AI Engineering",
    summary: "An in-progress internal analytics architecture that combines Google Search Console and GA4 data with deterministic opportunity detection, configurable scoring, and constrained AI analysis to prioritize SEO work tied to qualified traffic and leads.",
    status: "In progress",
    tone: "clay",
    tags: ["Google Search Console", "GA4 Data API", "Opportunity Scoring", "Structured AI"],
    stamp: "GA4 · AI SEO",
    challenge: {
      title: "The challenge",
      subtitle: "Connect search visibility to business outcomes",
      facts: [
        { label: "Measurement", value: "Search impression through qualified lead" },
        { label: "Decision layer", value: "Deterministic rules before LLM analysis" },
        { label: "Delivery", value: "Daily data refresh and weekly recommendations" },
      ],
      why: "SEO reporting often stops at impressions, clicks, and sessions. This system is designed to connect organic visibility with landing-page engagement and lead intent, then convert the combined evidence into prioritized actions without allowing an AI model to invent findings or rank work arbitrarily.",
    },
    solution: {
      title: "System architecture",
      subtitle: "From analytics APIs to reviewable recommendations",
      columns: ["Stage", "System behavior"],
      steps: [
        "Collect query and landing-page performance through the Search Console Search Analytics API.",
        "Collect organic sessions, engagement, key events, and landing-page metrics through the GA4 Data API.",
        "Normalize dates and URLs before idempotently storing source-specific daily records.",
        "Build a derived page-performance dataset that preserves the differences between Search Console and GA4 measurements.",
        "Apply deterministic opportunity rules and calculate a configurable score with an auditable component breakdown.",
        "Send structured opportunities to an LLM for constrained explanation and recommended actions.",
        "Validate the output, retain human approval, and assemble the accepted opportunities into a weekly Markdown report.",
      ],
      notes: ["Status · In progress", "Mode · Internal analytics architecture"],
    },
    workflow: {
      title: "Growth intelligence workflow",
      subtitle: "Evidence, scoring, AI interpretation, and review",
      steps: [
        "Run daily Search Console and GA4 ingestion with explicit reporting dates, pagination, and bounded error handling.",
        "Normalize URL variants and date keys while preserving source, extraction time, and missing-value semantics.",
        "Upsert raw daily records without creating duplicates, then refresh the derived landing-page performance dataset.",
        "Detect high-impression low-CTR pages, ranking opportunities, conversion gaps, declines, emerging queries, and possible cannibalization.",
        "Calculate a 0–100 opportunity score from search demand, ranking potential, conversion performance, trend, and business relevance.",
        "Require structured AI output containing an evidence-based summary, reasoning, priority, and specific recommended actions.",
        "Log the scoring inputs and AI analysis, route recommendations through human review, and generate a weekly growth report.",
      ],
    },
    coverage: {
      title: "Technical coverage",
      subtitle: "Analytics · Data engineering · Decision controls",
      groups: [
        { title: "Analytics and APIs", items: ["Search Console Search Analytics API", "GA4 Data API", "Query Performance", "Landing-Page Performance", "Engagement Metrics", "Intent Events", "Organic Funnel"] },
        { title: "Data engineering and reliability", items: ["URL Normalization", "Date Normalization", "Source-Specific Daily Tables", "Derived Performance Dataset", "Idempotent Upserts", "Duplicate Prevention", "Explicit API Failures"] },
        { title: "SEO opportunity logic", items: ["High Impressions / Low CTR", "Ranking Opportunities", "High Conversion / Low Visibility", "High Traffic / Low Conversion", "Declining Traffic", "Emerging Queries", "Cannibalization Diagnostics"] },
        { title: "AI guardrails and observability", items: ["Deterministic Detection", "Configurable Scoring", "Structured Model Output", "Evidence-Grounded Recommendations", "Prompt + Model Versioning", "Human Approval", "Audit History"] },
        { title: "Delivery boundary", items: ["Implemented Technical SEO Foundation", "Current GA4 Intent Tracking", "Planned API Ingestion", "Planned Analytics Storage", "Planned Opportunity Engine", "Planned AI Analysis", "Planned Weekly Reporting"] },
      ],
    },
  },
  {
    slug: "whatsapp-ai-assistant",
    code: "PR-0001",
    title: "Secure AI WhatsApp Assistant",
    category: "Applied AI",
    summary: "A secure WhatsApp assistant that lets parents retrieve school information and authorized student records through natural-language conversations. It demonstrates agent orchestration, LLM routing, grounded retrieval, identity verification, guardrails, observability, and business-process automation.",
    status: null,
    tone: "olive",
    tags: ["Twilio WhatsApp", "n8n", "PostgreSQL", "RAG", "OTP Auth"],
    stamp: "Secure · RAG",
    challenge: {
      title: "The problem",
      subtitle: "Private data needs hard boundaries",
      facts: [
        { label: "Routine needs", value: "Fees, attendance, menus, admissions, and policies" },
        { label: "Private data", value: "Student balances and attendance records" },
        { label: "Core risk", value: "Identity, authorization, and invented answers" },
      ],
      why: "Parents repeatedly contact school staff for routine information. Automation can reduce that workload, but student-specific requests introduce privacy and authorization risks that a general chatbot cannot safely handle without verified identity, relationship checks, and grounded data access.",
    },
    solution: {
      title: "The solution",
      subtitle: "Authenticated, intent-aware routing",
      columns: ["Step", "System behavior"],
      steps: [
        "Receive the WhatsApp message through Twilio and match the sender to an authorized parent record.",
        "Unknown or unverified users complete a six-digit OTP flow with a five-minute expiration.",
        "Classify intent; route balances and attendance to PostgreSQL, and policy questions to the RAG pipeline.",
        "Validate required fields and the parent-to-student relationship before returning protected information.",
        "Return a concise answer, log the outcome, and send consequential write actions for human review.",
      ],
      notes: ["Access · Verified parents", "Mode · Read-only by default"],
    },
    workflow: {
      title: "Key workflow",
      subtitle: "From message to verified answer",
      steps: [
        "Receive an inbound WhatsApp message through Twilio and match the sender's phone number.",
        "Trigger short-lived OTP verification when the sender is unknown or unverified.",
        "Classify the request into a supported intent using structured model output.",
        "Route structured requests to PostgreSQL and policy questions to the grounded RAG pipeline.",
        "Validate required fields and confirm the parent-to-student relationship before disclosure.",
        "Format a concise WhatsApp-friendly response and validate it before sending.",
        "Log outcomes, handle failures safely, and escalate sensitive write actions for human review.",
      ],
    },
    coverage: {
      title: "System coverage",
      subtitle: "Technology · Intents · Safety controls",
      groups: [
        { title: "Technology", items: ["Twilio WhatsApp", "n8n", "PostgreSQL", "Supabase", "Pinecone", "OpenAI Models", "Embeddings", "Webhooks", "OTP Auth", "RAG", "Logging", "Alerting", "Human Review"] },
        { title: "Supported intents", items: ["Fee Balance", "7-Day Attendance", "Feeding Menu", "Admissions", "School Policies", "Complaints", "Other / Unsupported"] },
        { title: "Safety controls", items: ["Authorization Checks", "Deterministic Record Queries", "Short-Lived OTP", "Human Approval for Writes", "Fallbacks + Validation", "Regression + Injection Tests"] },
      ],
    },
  },
  {
    slug: "odoo-restaurant-operations",
    code: "PR-0002",
    title: "Odoo POS & Restaurant Operations Setup",
    category: "ERP · Docker · Integration",
    summary: "Set up a Docker-hosted Odoo 19 Community system for a single-branch restaurant in Accra, covering POS configuration, receipt formatting, tax breakdowns, and printer connectivity.",
    status: null,
    tone: "ochre",
    tags: ["Odoo 19 Community", "Docker", "POS", "Network Printing"],
    stamp: "Odoo · Docker",
    challenge: {
      title: "The challenge",
      subtitle: "Everyday service across POS and kitchen",
      facts: [
        { label: "Checkout", value: "Find products quickly during everyday service" },
        { label: "Receipts", value: "Readable layout with local tax components" },
        { label: "Order routing", value: "Reliable receipt and kitchen printing" },
      ],
      why: "The restaurant needed a system that supported everyday service—from finding products at checkout to producing readable receipts and routing orders to the kitchen. My involvement in stock checks, revenue reconciliation, and expense tracking helped translate operational needs into practical system requirements.",
    },
    solution: {
      title: "My approach",
      subtitle: "Hosting, POS configuration, and on-site devices",
      columns: ["Area", "Implementation"],
      steps: [
        "Ran Odoo 19 Community in Docker for a maintainable, isolated application environment.",
        "Organized POS product categories around day-to-day restaurant service.",
        "Refined receipt margins, layout, and tax-component presentation.",
        "Investigated receipt and kitchen printing across Odoo, the browser, local print bridge, and network.",
        "Worked within one POS terminal and a 4 GB RAM, Pentium-class on-site computer.",
      ],
      notes: ["Location · Accra", "Environment · Single branch"],
    },
    workflow: {
      title: "Key technical challenge",
      subtitle: "Network reachability was not enough",
      steps: [
        "Confirmed that the kitchen printer responded successfully to network-level checks.",
        "Reproduced the connection error returned by the application's local print bridge.",
        "Separated basic printer reachability from successful application-to-device communication.",
        "Traced the printing path from Docker-hosted Odoo through the browser, local print bridge, network, and printer.",
        "Reviewed configuration and connectivity rather than assuming the hardware had failed.",
        "Worked within the limits of the existing POS terminal, local network, and low-spec PC.",
        "Documented the boundary between software, hardware, and network issues for further resolution.",
      ],
    },
    coverage: {
      title: "Project coverage",
      subtitle: "Docker hosting · Delivered work · Contribution",
      groups: [
        { title: "Tools & systems", items: ["Odoo 19 Community", "POS Hardware", "Xprinter", "Network Printing", "Docker Hosting", "Local Print Bridge", "Receipt Templates", "Tax Configuration", "Product Categories", "Local Network", "ERP Settings", "Hardware Diagnosis", "Operations Mapping"] },
        { title: "Delivered work", items: ["POS Categories", "Receipt Formatting", "Tax Breakdowns", "Printer Testing", "Stock Checks", "Revenue Reconciliation", "Expense Tracking"] },
        { title: "Project contribution", items: ["ERP Configuration", "Systems Integration", "Operations Discovery", "Hardware Troubleshooting", "Network Diagnosis", "Requirements Translation"] },
      ],
    },
  },
  {
    slug: "ai-news-intelligence",
    code: "PR-0003",
    title: "AI News Intelligence & Content Automation",
    category: "AI Workflow Engineering",
    summary: "Built an automated news-intelligence workflow that monitors Paraguay immigration and expat developments, uses Claude for relevance analysis and draft content, and organizes traceable results in Google Sheets.",
    status: null,
    tone: "clay",
    tags: ["n8n", "Anthropic Claude", "Google Sheets", "Deduplication"],
    stamp: "n8n · Claude",
    challenge: {
      title: "The challenge",
      subtitle: "Scattered sources, relevance, and repeat runs",
      facts: [
        { label: "Discovery", value: "News spread across regional and industry sources" },
        { label: "Relevance", value: "Useful residency updates versus general news" },
        { label: "Repeat runs", value: "Recurring feeds can surface the same story" },
      ],
      why: "Manual review means finding articles, assessing their significance, summarizing them, and recording source details for editorial use. The workflow needed contextual relevance scoring, source traceability, inspectable filtering decisions, and reliable duplicate prevention across scheduled collection runs.",
    },
    solution: {
      title: "How the workflow works",
      subtitle: "Collection, AI processing, and editorial handoff",
      columns: ["Stage", "Workflow behavior"],
      steps: [
        "A scheduled n8n trigger collects articles through RSS and HTTP integrations.",
        "Code and merge nodes normalize headlines, source URLs, and publication dates.",
        "Claude scores relevance to Paraguay immigration, residency, SUACE, and expat life.",
        "Relevant items receive a summary, category, expat-impact note, and draft social post.",
        "Google Sheets stores accepted and rejected records; Slack and optional Docs support handoff.",
      ],
      notes: ["Output · Editorial review", "Guidance · Human verified"],
    },
    workflow: {
      title: "Duplicate prevention",
      subtitle: "Consistent article identity across runs",
      steps: [
        "Normalize source URLs before comparing incoming stories with existing spreadsheet records.",
        "Normalize headline formatting so presentation differences do not create duplicate entries.",
        "Create deduplication keys from stable article fields rather than relying on raw feed values.",
        "Read existing Google Sheets records before allowing new items into downstream processing.",
        "Filter recurring stories while preserving headline, URL, publication date, and source metadata.",
        "Keep deterministic identity checks separate from Claude's interpretive relevance assessment.",
        "Retain accepted and rejected outputs so filtering decisions remain visible and adjustable.",
      ],
    },
    coverage: {
      title: "Project coverage",
      subtitle: "Technology · Outputs · Engineering decisions",
      groups: [
        { title: "Technology", items: ["n8n", "Anthropic Claude", "Google Sheets", "RSS Integrations", "HTTP Integrations", "Code Nodes", "Merge Nodes", "Google Docs", "Slack", "Scheduled Triggers", "URL Normalization", "Dedup Keys", "Spreadsheet Routing"] },
        { title: "Structured outputs", items: ["Relevance Score", "Category", "English Summary", "Expat Impact", "Draft Social Post", "Accepted Tab", "Rejected Tab"] },
        { title: "Engineering decisions", items: ["AI for Interpretation", "Explicit Data Logic", "Source Traceability", "Inspectable Filtering", "Duplicate Controls", "Editorial Review"] },
      ],
    },
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];
