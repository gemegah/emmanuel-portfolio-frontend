import type { Tone } from "@/components/ui/Portfolio";

interface CaseSection {
  title: string;
  subtitle: string;
}

interface ProjectShowcaseLink {
  label: string;
  href: string;
}

interface ProjectShowcaseItem {
  title: string;
  workType: string;
  period: string;
  role: string;
  summary: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links: readonly ProjectShowcaseLink[];
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
  showcase?: readonly ProjectShowcaseItem[];
}

export const projects = [
  {
    slug: "ai-seo-growth-intelligence",
    code: "PR-0004",
    title: "AI SEO Strategist",
    category: "AI Workflow Engineering · SEO Analytics",
    summary: "Built an AI-assisted SEO workflow in n8n that brings together search performance, website analytics, keyword research, and technical crawl findings. The system turns that evidence into a focused Top 5 action plan, with supporting findings, business rationale, and confidence for each recommendation. My work focused on making recommendations traceable, keeping incomplete data visible, and helping someone decide what to work on next.",
    status: "In progress",
    tone: "clay",
    tags: ["n8n", "Google Search Console", "GA4", "Structured AI"],
    stamp: "n8n · Top 5",
    challenge: {
      title: "The problem",
      subtitle: "Scattered evidence, unclear next steps",
      facts: [
        { label: "Inputs", value: "Four complementary evidence sources" },
        { label: "Scope", value: "Up to five selected pages plus research topics" },
        { label: "Output", value: "Up to five prioritized, reviewable actions" },
      ],
      why: "Search visibility, website engagement, keyword opportunities, and technical health sit in different tools. Comparing them manually takes time, and a collection of metrics does not explain which action deserves attention. I brought these sources into one workflow so recommendations can be assessed alongside the findings that support them.",
    },
    solution: {
      title: "How it works",
      subtitle: "From four sources to a focused action plan",
      columns: ["Stage", "System behavior"],
      steps: [
        "Select a repeatable set of relevant pages and an explicit reporting window.",
        "Request page and query performance from Google Search Console, alongside organic landing-page analytics from GA4.",
        "Import OpenSEO keyword research and Screaming Frog crawl findings from CSV or JSON files.",
        "Wait for the evidence branches, match records by normalized URL, and retain source dates, coverage, and limitations.",
        "Analyze each page and carry unmatched keyword research forward as proposed content opportunities.",
        "Rank the strongest candidates across the selected scope, validate the response, and remove duplicate actions.",
        "Produce one HTML and structured JSON action plan for human review, with no more than five distinct recommendations.",
      ],
      notes: ["Four evidence sources", "Top 5 action plan", "Human review"],
    },
    workflow: {
      title: "Problems solved",
      subtitle: "Making the workflow dependable beyond one page",
      steps: [
        "Added synchronization points so a fast source cannot trigger a report before the other branches finish.",
        "Corrected processing modes and preserved item links so every selected page reaches analysis.",
        "Replaced positional joins with URL matching and mapped actual crawl-export headers to the evidence model.",
        "Kept failed and missing measurements visible instead of converting unavailable evidence into zero.",
        "Preserved unmatched research topics without attaching performance figures from unrelated pages.",
        "Validated recommendation fields, evidence references, priority, and confidence before the report is assembled.",
        "Used automated fixtures to check multiple pages, source failures, stale inputs, invalid model responses, and one combined report.",
      ],
    },
    coverage: {
      title: "Delivered work and strengths",
      subtitle: "Integration · Evidence handling · AI controls · Reporting",
      groups: [
        { title: "Integration", items: ["n8n", "Google Search Console", "GA4 Data API", "OpenSEO Imports", "Screaming Frog Imports", "CSV / JSON"] },
        { title: "Evidence handling", items: ["Repeatable Page Selection", "URL Matching", "Nested Query Evidence", "Source Dates", "Coverage Checks", "Research Opportunities"] },
        { title: "AI controls", items: ["Page-Level Analysis", "Cross-Page Prioritization", "Structured Responses", "Evidence Checks", "Duplicate Removal", "Human Review"] },
        { title: "Failure handling", items: ["Branch Synchronization", "Item Linking", "Missing-Data Handling", "Source Failure Isolation", "Stale-Data Flags", "Fixture Verification"] },
        { title: "Delivered artifacts", items: ["Importable Workflow", "Evidence Model", "Top 5 HTML / JSON Report", "Import Templates", "Setup Guide", "Automated Checks"] },
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
  {
    slug: "selected-web-product-design",
    code: "PR-0005",
    title: "Selected Web & Product Design Work",
    category: "Web & Product Design",
    summary: "A curated record of responsive client websites, product interfaces, and interactive prototypes, included as supporting design and frontend experience alongside my current AI systems focus.",
    status: null,
    tone: "olive",
    tags: ["UX/UI Design", "Responsive Web Design", "Frontend Implementation", "Figma Prototyping"],
    stamp: "Design · Build",
    challenge: {
      title: "The design brief",
      subtitle: "Clear journeys across different products and audiences",
      facts: [
        { label: "Scope", value: "Live websites and product interface work" },
        { label: "Contribution", value: "UX/UI, responsive frontend implementation, and prototyping" },
        { label: "Evidence", value: "Live destinations and public Figma prototypes" },
      ],
      why: "The work spans different audiences and decision paths, so each piece needed a clear hierarchy, responsive behavior, and an interface that made the next action easy to understand.",
    },
    solution: {
      title: "Design approach",
      subtitle: "From requirements to a testable interface",
      columns: ["Stage", "Design activity"],
      steps: [
        "Clarify the audience, primary task, content requirements, and constraints for each product.",
        "Structure the information and user journey around the decisions people need to make.",
        "Develop a visual system that supports the brand while keeping hierarchy and interaction states clear.",
        "Build or prototype the interface at high fidelity, including responsive behavior where the work moved into production.",
        "Review the result across screen sizes and refine usability, content presentation, and interaction details.",
      ],
      notes: ["Focus · Usability and hierarchy", "Delivery · Live sites and prototypes"],
    },
    workflow: {
      title: "Working process",
      subtitle: "A practical path from discovery to delivery",
      steps: [
        "Review the brief, brand materials, content, and technical constraints.",
        "Map the main journey and organize information around the user's next decision.",
        "Create interface directions and reusable visual patterns in Figma.",
        "Prototype key states and interactions before handoff or implementation.",
        "Translate approved designs into responsive frontend layouts where implementation was in scope.",
        "Check the finished experience for clarity, responsiveness, and consistent interaction behavior.",
      ],
    },
    coverage: {
      title: "Selected coverage",
      subtitle: "Client websites · Product design · Delivery methods",
      groups: [
        { title: "Client websites", items: ["Herts On Training", "Accra Coded", "Responsive Layouts", "Frontend Implementation"] },
        { title: "Product design", items: ["Air Control Products", "Onboarding Redesign", "User Flows", "Interactive Prototypes"] },
        { title: "Methods", items: ["Figma", "Information Architecture", "UX/UI Design", "Responsive QA"] },
      ],
    },
    showcase: [
      {
        title: "Herts On Training",
        workType: "Live website",
        period: "Current",
        role: "Design and frontend implementation",
        summary: "A responsive training website that organizes accredited first-aid and safety services around clear course discovery and booking paths.",
        image: {
          src: "/projects/selected-web-product-design/herts-on-training.webp",
          alt: "Herts On Training homepage with first-aid course messaging, booking actions, and workplace training imagery",
          width: 1440,
          height: 900,
        },
        links: [
          { label: "Visit the Herts On Training live site", href: "https://hertsontraining.co.uk/" },
        ],
      },
      {
        title: "Accra Coded",
        workType: "Live website",
        period: "Current",
        role: "Design and frontend implementation",
        summary: "A responsive wellness discovery website with an editorial visual system, local resource exploration, events, and community membership paths.",
        image: {
          src: "/projects/selected-web-product-design/accra-coded.webp",
          alt: "Accra Coded homepage with wellness messaging, resource actions, and editorial lifestyle imagery",
          width: 1440,
          height: 900,
        },
        links: [
          { label: "Visit the Accra Coded live site", href: "https://accracoded.com/" },
        ],
      },
      {
        title: "Air Control Products",
        workType: "Website redesign",
        period: "2025",
        role: "Product Designer",
        summary: "A product-led website redesign for a commercial and industrial HVAC supplier, covering product discovery, project proof, partner brands, and company information.",
        image: {
          src: "/projects/selected-web-product-design/air-control-products.webp",
          alt: "Air Control Products website redesign showing HVAC solutions, product categories, project work, partner brands, and customer content",
          width: 623,
          height: 2560,
        },
        links: [
          { label: "Open the Air Control Products Figma prototype", href: "https://www.figma.com/proto/dAf5XydGueoMsAdYjGO6LJ/My-Portfolio?node-id=730-171&t=uZMA4ulpitJ7kduG-1&scaling=min-zoom&content-scaling=fixed&page-id=680%3A217" },
        ],
      },
      {
        title: "Onboarding Redesign",
        workType: "Product experience redesign",
        period: "2024",
        role: "UI/UX Designer",
        summary: "A high-fidelity redesign of a multi-step onboarding experience, focused on explaining choices, reducing ambiguity, and creating a consistent progression into the product.",
        image: {
          src: "/projects/selected-web-product-design/onboarding-redesign.webp",
          alt: "Onboarding redesign mockups showing dark mobile and desktop screens for a multi-step sports game entry flow",
          width: 960,
          height: 960,
        },
        links: [
          { label: "Open the onboarding redesign Figma prototype", href: "https://www.figma.com/proto/dAf5XydGueoMsAdYjGO6LJ/My-Portfolio?node-id=258-30388&p=f&t=x3iDfnhPjlaW7xWL-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=290%3A33252&show-proto-sidebar=1" },
        ],
      },
    ],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];
