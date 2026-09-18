const message = "∆ SECURE AI ASSISTANTS · AUTHORIZATION · HUMAN APPROVAL   ∆ AGENTIC WORKFLOWS · APIS · WEBHOOKS   ∆ RETRIEVAL SYSTEMS · SOURCE GROUNDING   ∆ LLM EVALUATION · ERROR ANALYSIS · REGRESSION TESTING   ∆ BUILD · EVALUATE · DEPLOY";

export function Ticker() {
  return <div className="ticker"><div className="ticker-window"><div className="ticker-track"><span>{message}</span><span aria-hidden="true">{message}</span></div></div></div>;
}
