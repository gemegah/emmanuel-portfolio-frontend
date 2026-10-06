import type { ProjectSlug } from "@/data/projects";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] };

export interface ArticleSection {
  heading: string;
  blocks: readonly ArticleBlock[];
}

export interface ArticleSource {
  label: string;
  href: string;
  note: string;
}

export interface Article {
  code: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  projectStatus: "In progress" | null;
  tags: readonly string[];
  href: string;
  relatedProjectSlugs: readonly ProjectSlug[];
  sections: readonly ArticleSection[];
  sources: readonly ArticleSource[];
}

export const articles: readonly Article[] = [
  {
    code: "WR-0004",
    slug: "building-an-ai-seo-strategist-in-n8n",
    title: "Building an AI SEO Strategist: Turning Scattered Data into Prioritized Actions",
    excerpt: "How I built an n8n workflow that connects four SEO evidence sources, handles incomplete data, and turns page-level findings into a focused Top 5 action plan.",
    publishedAt: null,
    projectStatus: "In progress",
    tags: ["n8n", "Applied AI", "SEO Analytics", "Workflow Engineering"],
    href: "/writing/building-an-ai-seo-strategist-in-n8n",
    relatedProjectSlugs: ["ai-seo-growth-intelligence"],
    sections: [
      {
        heading: "The problem with having more SEO data",
        blocks: [
          { type: "paragraph", text: "A website can have search reports, analytics dashboards, keyword lists, and crawl exports while its owner still struggles to answer a simple question: what should I work on next? Each tool describes part of the situation. Someone has to compare those findings, decide which ones belong together, and turn them into a practical task." },
          { type: "paragraph", text: "I built AI SEO Strategist around that decision. My aim was to bring the evidence into one n8n workflow and produce a short list of recommendations that someone could inspect and act on. I chose a Top 5 action plan because prioritization matters more than filling another report with everything a tool can measure." },
          { type: "paragraph", text: "The central engineering problem was keeping the connection between a recommendation and its evidence clear as information moved through several sources and two AI analysis stages." },
        ],
      },
      {
        heading: "Giving each source a purpose",
        blocks: [
          { type: "paragraph", text: "I used four complementary sources. Google Search Console contributes search visibility: the pages and queries associated with impressions and clicks. GA4 contributes organic landing-page activity, including sessions and engagement. OpenSEO research contributes keyword demand, intent, and potential topic gaps. Screaming Frog contributes technical findings such as response codes, indexability, titles, and internal links." },
          { type: "paragraph", text: "These sources answer different questions. A page may attract attention in search but have a technical issue that deserves investigation. Keyword research may suggest a useful topic even when no corresponding page exists. Bringing the sources together lets the analyst consider those relationships while retaining where each finding came from." },
          { type: "paragraph", text: "I kept keyword estimates distinguishable from measured website performance. I also used manual CSV and JSON imports for the research and crawl data. That kept the first version manageable while preserving a clear record of the source and collection date." },
        ],
      },
      {
        heading: "Building a shared picture of each page",
        blocks: [
          { type: "paragraph", text: "I made page selection repeatable, with up to five relevant URLs during testing. The workflow uses an explicit reporting window so a recommendation can be traced back to the period it describes. Running the same selection again should mean inspecting the same pages, rather than receiving a different sample." },
          { type: "paragraph", text: "The next step was connecting records to the right page. I normalized URLs by removing fragments and known tracking parameters and applying a consistent trailing-slash rule. Meaningful query parameters remain intact. The join uses that normalized identity instead of assuming that records arrive in the same order." },
          { type: "paragraph", text: "Each page record keeps search queries, analytics, research, crawl findings, source dates, and coverage together. Unmatched keyword research also stays in the analysis as a proposed topic. It does not inherit performance figures from another page simply because it appears in the same input file." },
        ],
      },
      {
        heading: "The challenges that shaped the workflow",
        blocks: [
          { type: "paragraph", text: "Parallel branches introduced an important failure case: one source could reach the assembly step before the others. I added Merge nodes in Append mode as synchronization points, then performed the URL join after those branches completed. That separates waiting for evidence from deciding which records belong together." },
          { type: "paragraph", text: "Another issue was processing that looked correct for one page but handled only the first input. I corrected the per-item execution settings and preserved item links so the page identity follows each request and analysis result. The report needs contributions from the full selected scope." },
          { type: "paragraph", text: "Imports needed attention too. I replaced unsupported extraction settings and mapped actual Screaming Frog headers, including Address, Status Code, and Title 1. I also kept missing measurements separate from measured zero. A failed request becomes a visible limitation that the analyst and reviewer can consider." },
        ],
      },
      {
        heading: "Giving AI a focused responsibility",
        blocks: [
          { type: "paragraph", text: "I split AI analysis into two stages. The first receives one page or proposed-topic record and generates action candidates from that evidence. The second receives the records and candidates together and prioritizes the strongest actions across the selected scope. This gives the final planner context without asking it to interpret every raw export from scratch." },
          { type: "paragraph", text: "Each candidate has a defined shape: the page or topic, target keyword, finding, evidence, priority, recommended action, business reason, confidence, and limitations. Validation checks field types, supported priority and confidence values, and nonempty evidence. The final planner must reuse evidence from the validated candidates." },
          { type: "paragraph", text: "Those checks make errors easier to catch, but a valid response still needs judgment. I treat model explanations as recommendations for review. The supplied evidence remains the basis for deciding whether an action makes sense." },
        ],
      },
      {
        heading: "Making the output useful",
        blocks: [
          { type: "paragraph", text: "The report is designed around a decision rather than a page-by-page inventory. Every action explains what was found, what should change, why the change matters to the business, and how much confidence the evidence supports. The source findings and limitations appear beside the recommendation so the reviewer can assess its reasoning." },
          { type: "paragraph", text: "I added duplicate removal and enforced a maximum of five distinct actions. The workflow can return fewer when the evidence does not justify five. That keeps the format from encouraging filler recommendations merely to complete a list." },
          { type: "paragraph", text: "The output includes a readable HTML report and structured JSON. It also carries the reporting dates, pages analyzed, external collection dates, and missing or stale coverage. My goal is to make the next conversation specific: which action is worth taking, and what finding supports it?" },
        ],
      },
      {
        heading: "Checking behavior under difficult conditions",
        blocks: [
          { type: "paragraph", text: "I used a local verification harness with controlled fixtures to exercise the workflow's data-processing and validation logic. The two-page case checks that both pages reach analysis and contribute to one combined report. Other cases supply a failed GA4 response, missing source matches, real crawl-header names, and an unmatched research topic." },
          { type: "paragraph", text: "I also checked invalid model output, duplicate actions, unsupported final evidence, and more than five distinct recommendations. These cases examine whether the workflow preserves useful information and rejects results that break its contract. A convincing report is only useful if the processing behind it behaves predictably." },
          { type: "paragraph", text: "The fixtures provide repeatable checks of those behaviors. They helped me catch errors that a single successful page could conceal, and they give the implementation a practical way to detect regressions when its inputs or logic change." },
        ],
      },
      {
        heading: "What the project demonstrates",
        blocks: [
          { type: "paragraph", text: "The delivered work includes an importable n8n workflow, a structured evidence model, a Top 5 report format, CSV and JSON import support, templates, setup documentation, and automated checks. Together, those pieces show how I approached integration, data handling, troubleshooting, and AI-assisted analysis as one system." },
          { type: "paragraph", text: "The most useful lesson was that recommendation quality depends on the evidence path. Page identity, timing, source coverage, and missing-data behavior all influence what an analyst can reasonably conclude. Improving those foundations makes the model's role more focused and the report easier to inspect." },
          { type: "paragraph", text: "I kept the scope practical: a small page selection, four sources, and a concise report for human review. The project demonstrates the kind of applied AI engineering I value—connecting real tools, resolving concrete failure cases, and shaping the output around a decision someone needs to make." },
        ],
      },
    ],
    sources: [
      {
        label: "n8n — Merge node",
        href: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge/",
        note: "Documents how Append mode waits for connected inputs before emitting their records. The synchronization design described here is my application of that behavior.",
      },
      {
        label: "Google Search Console — Search Analytics query",
        href: "https://developers.google.com/webmaster-tools/v1/searchanalytics/query",
        note: "Reference for the search-performance dimensions, page filters, reporting dates, and response metrics used by the workflow.",
      },
      {
        label: "Google Analytics — runReport",
        href: "https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport",
        note: "Reference for constructing GA4 report requests with dimensions, metrics, date ranges, and filters.",
      },
      {
        label: "Screaming Frog — SEO Spider tabs",
        href: "https://www.screamingfrog.co.uk/seo-spider/user-guide/tabs/",
        note: "Reference for the crawl fields used in the import, including URL address, response code, indexability, and page title.",
      },
    ],
  },
  {
    code: "WR-0001",
    slug: "where-ai-belongs-in-an-automated-workflow",
    title: "Where AI Belongs in an Automated Workflow",
    excerpt: "A practical way to divide language understanding, database access, and permissions when engineering an AI assistant.",
    publishedAt: null,
    projectStatus: null,
    tags: ["AI engineering", "Workflow automation", "Security", "Authorization"],
    href: "/writing/where-ai-belongs-in-an-automated-workflow",
    relatedProjectSlugs: ["whatsapp-ai-assistant"],
    sections: [
      {
        heading: "Start with the decision being made",
        blocks: [
          { type: "paragraph", text: "A parent asking, “How much do I still owe?” creates several different problems." },
          { type: "paragraph", text: "The system needs to understand the message, identify the parent, determine which student they mean, verify that the parent is allowed to access that student’s information, and retrieve the correct balance. Those steps should not all be delegated to one model prompt." },
          { type: "paragraph", text: "Language interpretation is a useful place for AI. Identity, authorization, database access, and arithmetic require explicit application rules." },
          { type: "paragraph", text: "My Secure AI WhatsApp Assistant connects these concerns through an intent-routing workflow. The model helps classify what the parent is asking, while structured records handle student information and a retrieval system supports questions about school policies." },
          { type: "paragraph", text: "Anthropic distinguishes predefined workflows from agents that dynamically direct their own processes and tools. That distinction provides a useful architectural rule: use a controlled sequence when the process is known, and introduce model-directed decisions only where flexibility is valuable." },
        ],
      },
      {
        heading: "Separate understanding from permission",
        blocks: [
          { type: "paragraph", text: "For a fee request, the model can identify the intent and detect missing information. The application must then resolve the authenticated user’s permitted student records and apply that scope to the database query." },
          { type: "paragraph", text: "A student identifier supplied in a message must never become proof of access." },
          { type: "paragraph", text: "An OTP verifies control of a phone number or destination. It does not establish that the person controlling that number has permission to access every student record. That relationship must come from trusted enrollment data or a verified enrollment process." },
          { type: "paragraph", text: "This distinction is easy to miss when designing the happy path." },
          { type: "paragraph", text: "The response must also preserve the meaning of the underlying data. “No record found” is different from “zero balance.” A fluent answer that erases that distinction can mislead the parent even when the system appears to be working." },
        ],
      },
      {
        heading: "Route each request to the right system",
        blocks: [
          { type: "paragraph", text: "Different questions need different retrieval paths." },
          { type: "paragraph", text: "A balance or attendance request should use a deterministic query against an authorized student record. A question about admissions requirements or school policies can use retrieval-augmented generation grounded in approved documents." },
          { type: "paragraph", text: "The model can help select the route, but the application must validate the required fields before executing it." },
          { type: "paragraph", text: "This gives the model a focused responsibility:" },
          { type: "list", items: ["Interpret the language.", "Return a supported intent.", "Extract the required structured fields.", "Ask for clarification when information is missing."] },
          { type: "paragraph", text: "The surrounding system keeps responsibility for permissions, record selection, database operations, and consequential actions." },
        ],
      },
      {
        heading: "Treat failure as part of the workflow",
        blocks: [
          { type: "paragraph", text: "Consider three failures:" },
          { type: "list", items: ["The parent has two linked students.", "The database is temporarily unavailable.", "The model classifies a complaint as a balance inquiry."] },
          { type: "paragraph", text: "Each failure needs a different response." },
          { type: "paragraph", text: "The system should ask the parent to choose a student, report a temporary retrieval problem, or route the message for correction. Sending all three failures through a generic retry would hide what actually went wrong." },
          { type: "paragraph", text: "This is why I would evaluate authorization separately from response quality." },
          { type: "paragraph", text: "A useful test set should include:" },
          { type: "list", items: ["Unauthorized requests for another student", "Ambiguous student names", "Missing balance records", "Paraphrased intents", "Prompt-injection attempts", "Requests that fall outside supported categories", "Retrieval results that conflict with generated wording"] },
          { type: "paragraph", text: "The logs should preserve the tool result and the final answer so an evaluator can distinguish bad retrieval from bad wording." },
        ],
      },
      {
        heading: "Handle consequential actions differently",
        blocks: [
          { type: "paragraph", text: "Repeating a read is different from repeating a payment, complaint submission, or record update." },
          { type: "paragraph", text: "If a write request times out, the application should not automatically assume that it failed and execute it again. The operation needs a stable identifier, and the workflow should verify the existing outcome before retrying." },
          { type: "paragraph", text: "Consequential actions may also require human approval before execution. The approval must refer to a specific proposed action, user, record, and state." },
          { type: "paragraph", text: "The engineering goal is a system whose decisions can be explained and tested. A model can make the interface flexible while the surrounding application keeps access and actions controlled." },
        ],
      },
    ],
    sources: [
      {
        label: "Anthropic — Building effective agents",
        href: "https://www.anthropic.com/engineering/building-effective-agents",
        note: "The school workflow and proposed controls are my application of the workflow-versus-agent distinction.",
      },
    ],
  },
  {
    code: "WR-0002",
    slug: "engineering-human-approval-into-ai-workflows",
    title: "Engineering Human Approval Into AI Workflows",
    excerpt: "How to design approval steps that expose evidence, validate system state, and make consequential AI-assisted actions recoverable.",
    publishedAt: null,
    projectStatus: null,
    tags: ["AI engineering", "Human-in-the-loop", "Workflow automation", "Governance"],
    href: "/writing/engineering-human-approval-into-ai-workflows",
    relatedProjectSlugs: ["odoo-restaurant-operations", "whatsapp-ai-assistant", "ai-news-intelligence"],
    sections: [
      {
        heading: "An approval button is only the beginning",
        blocks: [
          { type: "paragraph", text: "Imagine an AI-assisted system recommending an inventory adjustment." },
          { type: "paragraph", text: "A manager sees “Approve correction?” with two buttons. The workflow technically includes human oversight, but the manager does not have enough information to make a responsible decision." },
          { type: "paragraph", text: "A useful approval step must expose the proposed change, its evidence, its consequences, and what happens if the recommendation is wrong." },
          { type: "paragraph", text: "That makes human approval an engineering problem as much as an interface problem. The workflow, data model, backend validation, and user interface must all refer to the same proposed action." },
        ],
      },
      {
        heading: "Show the proposed change",
        blocks: [
          { type: "paragraph", text: "Using restaurant inventory as an illustrative extension of my Odoo Restaurant Operations work, an approval record could show:" },
          { type: "list", items: ["The affected item", "The current quantity", "The proposed quantity", "The difference", "The records supporting the recommendation", "The time at which those records were collected", "The system or person that created the proposal"] },
          { type: "paragraph", text: "“Reduce stock by six units” is incomplete if the reviewer cannot see whether those units represent sales, waste, a counting discrepancy, or another event." },
          { type: "paragraph", text: "The interface should also distinguish observed data from an inferred explanation." },
          { type: "paragraph", text: "“Six fewer units were counted” may be an observation. “Staff failed to record six sales” is an allegation that requires additional evidence. A confident model-generated sentence must not make those statements appear equivalent." },
          { type: "paragraph", text: "The reviewer needs options that match the real operational process:" },
          { type: "list", items: ["Approve the proposed adjustment", "Edit the quantity", "Reject it with a reason", "Request a recount", "Escalate the discrepancy"] },
          { type: "paragraph", text: "Approval should apply to a specific proposed change, not to whatever the system generates next." },
        ],
      },
      {
        heading: "Connect approval to execution",
        blocks: [
          { type: "paragraph", text: "A proposed action can become stale before someone approves it." },
          { type: "paragraph", text: "If another staff member changes the inventory record while the proposal is waiting, the backend must compare the current state with the state used to create the recommendation. If they no longer match, the original approval should not execute silently." },
          { type: "paragraph", text: "The workflow should mark the proposal as stale, explain what changed, and request a fresh review." },
          { type: "paragraph", text: "This principle also applies to the Secure AI WhatsApp Assistant. If a write action is proposed for a student record, approval should remain tied to the authenticated requester, the affected record, the requested change, and the state that existed when the proposal was created." },
          { type: "paragraph", text: "After approval, the system should distinguish between:" },
          { type: "list", items: ["Approved", "Queued for execution", "Being applied", "Applied successfully", "Failed", "Reversed or compensated"] },
          { type: "paragraph", text: "If the request times out, the interface should not encourage repeated clicks before checking whether the action succeeded. A repeated write could create duplicate records or apply the same change more than once." },
        ],
      },
      {
        heading: "Preserve history and recovery",
        blocks: [
          { type: "paragraph", text: "For consequential records, recovery may require a compensating action instead of deleting history." },
          { type: "paragraph", text: "An inventory correction, account adjustment, or published content revision should retain:" },
          { type: "list", items: ["The original proposal", "The evidence presented to the reviewer", "The reviewer’s decision", "Any edits made during review", "The execution result", "Subsequent corrections"] },
          { type: "paragraph", text: "This creates an audit trail that can answer what the system proposed, what the person approved, and what the application actually changed." },
          { type: "paragraph", text: "The same pattern applies to the AI News Intelligence workflow. Generated summaries and draft posts can move into an editorial review stage, but publication should remain a separate, traceable action." },
        ],
      },
      {
        heading: "Measure whether approval helps",
        blocks: [
          { type: "paragraph", text: "Adding approval can create the appearance of safety without improving decisions. If reviewers receive too many low-quality requests or cannot understand the evidence, they may begin approving changes automatically." },
          { type: "paragraph", text: "A reasonable evaluation should measure:" },
          { type: "list", items: ["Whether reviewers notice deliberately incorrect proposals", "Whether they understand the effect of the proposed action", "How often they edit or reject recommendations", "How long responsible review takes", "How frequently approved actions fail during execution", "Whether users can recover from mistakes"] },
          { type: "paragraph", text: "Faster approval is not valuable if it simply encourages habitual clicking." },
          { type: "paragraph", text: "A useful human-in-the-loop system makes the next decision understandable and the resulting action traceable. The approval control earns its place by helping a person exercise judgment and by ensuring the software executes exactly what was reviewed." },
        ],
      },
    ],
    sources: [
      {
        label: "Microsoft Research — Guidelines for Human-AI Interaction",
        href: "https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/",
        note: "The inventory example is an illustrative extension of the Odoo project rather than a claim that its current POS implementation already performs AI-generated stock adjustments.",
      },
    ],
  },
  {
    code: "WR-0003",
    slug: "designing-ai-seo-growth-intelligence-system",
    title: "Designing an AI SEO Growth Intelligence System with GA4 and Search Console",
    excerpt: "The broader architecture behind AI SEO Strategist: a design exploration of daily analytics storage, transparent opportunity scoring, and constrained AI analysis.",
    publishedAt: null,
    projectStatus: "In progress",
    tags: ["GA4 Analytics", "Search Console", "AI SEO", "Data Workflows"],
    href: "/writing/designing-ai-seo-growth-intelligence-system",
    relatedProjectSlugs: ["ai-seo-growth-intelligence"],
    sections: [
      {
        heading: "SEO analytics should determine what happens next",
        blocks: [
          { type: "paragraph", text: "This article explores the broader architecture behind my AI SEO Strategist project. I have implemented a focused n8n MVP that combines four evidence sources and produces a Top 5 action plan. Daily storage, deterministic opportunity scoring, and scheduled reporting described below are broader design ideas rather than capabilities of that MVP." },
          { type: "paragraph", text: "I am designing an internal SEO Growth Intelligence system to answer a practical question: which SEO action should receive attention next if the goal is qualified traffic and leads?" },
          { type: "paragraph", text: "A conventional report can describe impressions, clicks, sessions, and average position. Those metrics become more useful when the system connects them to landing-page engagement and lead intent, identifies a specific opportunity, and preserves enough evidence for someone to review the recommendation." },
          { type: "paragraph", text: "The architecture therefore separates measurement, deterministic decision logic, AI interpretation, and human approval. The model does not receive a raw analytics export and decide what matters on its own." },
          { type: "paragraph", text: "The architecture is a design discussion. It gives the project a direction for deeper analytics while the implemented MVP concentrates on connecting evidence, validating recommendations, and producing a concise report." },
        ],
      },
      {
        heading: "Model the organic search-to-lead funnel",
        blocks: [
          { type: "paragraph", text: "The primary measurement path begins before a visitor reaches the website and continues beyond the landing page:" },
          { type: "list", items: ["Search impression", "Organic click", "Landing-page session", "Service or case-study engagement", "Contact intent", "Lead submission", "Qualified lead"] },
          { type: "paragraph", text: "Each stage needs a precise event or metric definition. A click on a booking link can show intent, but it does not prove that a consultation was booked. A locally validated contact form does not prove that a lead reached a backend, CRM, or inbox." },
          { type: "paragraph", text: "I would track service and case-study views, contact clicks, form starts, confirmed lead submissions, and confirmed bookings only where each event supports a real decision. Intent events and confirmed conversions must remain separate in reporting." },
          { type: "paragraph", text: "This distinction protects the opportunity engine from treating interface activity as commercial success." },
        ],
      },
      {
        heading: "Ingest Search Console and GA4 data",
        blocks: [
          { type: "paragraph", text: "The Search Console Search Analytics API supplies query, page, date, country, and device dimensions with clicks, impressions, CTR, and average position. Requests need an explicit date range, authenticated access to the property, and pagination where the result set exceeds one response." },
          { type: "paragraph", text: "Search Console results are subject to the platform's aggregation and row limits. The ingestion process must preserve the requested dimensions and data state instead of treating the response as a complete, transaction-level event log." },
          { type: "paragraph", text: "The GA4 Data API supplies landing-page, source or medium, session, user, engagement, and key-event data. Report requests need compatible dimensions and metrics, explicit date ranges, property access, and pagination for larger responses." },
          { type: "paragraph", text: "Each connector should validate the external response, log request context and failures without exposing credentials, and stop with a clear error when a required field is absent. Silent partial imports would make the downstream ranking appear more certain than the source data allows." },
        ],
      },
      {
        heading: "Normalize and store auditable daily records",
        blocks: [
          { type: "paragraph", text: "Search Console and GA4 describe related behavior through different measurement systems. Search Console clicks should not be expected to equal GA4 sessions, so the pipeline should join their observations only after normalizing the dimensions used for comparison." },
          { type: "paragraph", text: "URL normalization should resolve the chosen trailing-slash convention, fragments, relevant query parameters, hostname variants, and encoded paths. Date handling should preserve the reporting timezone and the exact period represented by each row." },
          { type: "paragraph", text: "The storage layer should keep source-specific daily records before producing a derived page-performance dataset:" },
          { type: "list", items: ["Search Console daily records by date, query, page, country, and device", "GA4 landing-page daily records with sessions, engagement, key events, and confirmed leads", "Derived page-performance records containing visibility, traffic, engagement, and conversion measures"] },
          { type: "paragraph", text: "Imports should use stable composite keys and idempotent upserts so a retry updates the intended daily record instead of creating a duplicate. Missing values must remain distinguishable from measured zeroes, and every record should retain its source and extraction time." },
        ],
      },
      {
        heading: "Detect opportunities with deterministic rules",
        blocks: [
          { type: "paragraph", text: "The opportunity engine should identify candidates with explicit, configurable rules before involving a language model." },
          { type: "list", items: ["High impressions and low CTR for a query or page that already ranks visibly", "Positions four through fifteen with enough search demand to justify focused optimization", "High conversion and low visibility, indicating a valuable page that needs more qualified traffic", "High traffic and low conversion, indicating possible intent, offer, CTA, or UX problems", "Meaningful declines across comparable 28-day periods", "Emerging queries with sustained growth in impressions, clicks, or position", "Potential keyword cannibalization where related queries appear across multiple landing pages"] },
          { type: "paragraph", text: "Each rule needs minimum data thresholds so small samples and minor changes do not generate noisy tasks. Trend comparisons must use comparable windows and should retain the baseline used to create the flag." },
          { type: "paragraph", text: "A cannibalization result is a diagnostic signal, not proof of a problem. The reviewer still needs to inspect intent, page purpose, and search-result behavior before deciding whether pages should be consolidated or differentiated." },
        ],
      },
      {
        heading: "Score opportunities before AI interpretation",
        blocks: [
          { type: "paragraph", text: "The system should calculate a transparent 0–100 score instead of asking the model to rank opportunities arbitrarily." },
          { type: "list", items: ["Search demand or impressions: 25%", "Ranking potential: 20%", "Current conversion performance: 25%", "Traffic trend: 10%", "Business relevance: 20%"] },
          { type: "paragraph", text: "The weights remain configurable, but each result must preserve the component values, thresholds, and score version used in the calculation. Priority labels map to the numeric result: Critical from 80 to 100, High from 60 to 79, Medium from 40 to 59, and Low below 40." },
          { type: "paragraph", text: "The numeric score does not remove judgment. Confidence, absolute opportunity size, minimum data volume, and estimated implementation effort should remain visible so a high percentage based on a very small sample does not outrank a larger, better-supported opportunity." },
        ],
      },
      {
        heading: "Constrain the AI analyst",
        blocks: [
          { type: "paragraph", text: "The LLM should receive one structured opportunity record containing its type, query or page, observed metrics, comparison values, score, score breakdown, and applicable business context." },
          { type: "paragraph", text: "The response should also be structured:" },
          { type: "list", items: ["Priority", "Evidence-based summary", "Reasoning tied to supplied values", "Specific recommended actions", "Uncertainty or checks still required"] },
          { type: "paragraph", text: "The model must never fabricate traffic, rankings, conversions, or revenue. It should distinguish observed values from estimates, avoid treating correlation as causation, and reject a recommendation when the supplied evidence is insufficient." },
          { type: "paragraph", text: "Schema validation should run before the analysis enters a report. The system should retain the opportunity input, rule and score breakdown, prompt version, model identifier, structured output, validation result, timestamp, and approval status." },
        ],
      },
      {
        heading: "Automate reporting without automating judgment",
        blocks: [
          { type: "paragraph", text: "The operating cadence separates data freshness from editorial judgment. A daily workflow fetches both analytics sources, normalizes records, performs idempotent upserts, and refreshes derived measures. A weekly workflow runs opportunity detection, calculates scores, requests AI interpretation, validates the output, and assembles a Markdown report." },
          { type: "paragraph", text: "The report should contain an executive summary, the top opportunities, visibility and traffic changes, conversion findings, emerging queries, pages requiring attention, and recommended actions for the week." },
          { type: "paragraph", text: "A person remains responsible for accepting, editing, rejecting, or deferring each recommendation. The workflow should record that decision and connect later performance observations to the intervention without claiming that a subsequent change proves causation." },
          { type: "paragraph", text: "This boundary also prevents the system from turning every recommendation into automatically published content. Google advises that generative tools can support research and structure, but scaled output without added value can violate spam policies. Human review is part of the system design, not a final cleanup step." },
        ],
      },
      {
        heading: "From broader architecture to a focused implementation",
        blocks: [
          { type: "paragraph", text: "The current website foundation includes route-specific metadata, canonical URLs, structured data, prerendered pages, crawl controls, and a base GA4 installation with intent events." },
          { type: "paragraph", text: "The n8n MVP implements page selection, Search Console and GA4 report requests, OpenSEO and Screaming Frog file imports, normalized evidence joins, two-stage AI analysis, and Top 5 report assembly. Local fixture checks cover multiple pages, incomplete sources, and invalid model responses." },
          { type: "paragraph", text: "Persistent daily records, numeric opportunity scores, and scheduled reporting remain broader architectural options. The focused implementation demonstrates how to connect the evidence and make its recommendations inspectable within a manageable workflow." },
        ],
      },
    ],
    sources: [
      {
        label: "Google Search Console — Search Analytics query",
        href: "https://developers.google.com/webmaster-tools/v1/searchanalytics/query",
        note: "Official reference for querying Search Console performance dimensions and metrics. The MVP implements report requests; this article explores a broader daily ingestion design.",
      },
      {
        label: "Google Analytics — GA4 Data API",
        href: "https://developers.google.com/analytics/devguides/reporting/data/v1/rest",
        note: "Official reference for programmatic GA4 reporting. The MVP implements report requests; persistent analytics storage and scheduled synchronization are broader design options.",
      },
      {
        label: "Google Search Central — Guidance on generative AI content",
        href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content",
        note: "Supports the boundary between AI-assisted analysis or drafting and accountable, value-adding human review.",
      },
    ],
  },
];
