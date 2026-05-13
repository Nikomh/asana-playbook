// ── Static search index for Sales-to-Service section ─────────
// Built once at module load from all data files.
// Import from "@/data/sales-to-service".

import type { Audience, Priority } from "./types";
import { workflowPhases } from "./workflowPhases";
import { routines } from "./routines";
import { prompts } from "./prompts";
import { handoverGates } from "./handoverGates";
import { automations } from "./automations";
import { faqs } from "./faqs";
import { quickActions } from "./quickActions";

const BASE = "/playbooks/sales-to-service";

export type SearchItemType =
  | "phase"
  | "routine"
  | "prompt"
  | "gate"
  | "automation"
  | "faq"
  | "quickAction";

export interface SalesSearchItem {
  id: string;
  type: SearchItemType;
  title: string;
  subtitle: string;
  /** Pre-lowercased concatenation of all searchable text fields */
  searchText: string;
  url: string;
  /** null = not audience-specific (phases, gates, automations, FAQs) */
  audience: Audience | null;
  /** null = not phase-specific (phases themselves, gates, FAQs) */
  phase: string | null;
  /** non-null only for prompts */
  priority: Priority | null;
}

function text(...parts: (string | readonly string[])[]): string {
  return parts
    .flatMap((p) => (Array.isArray(p) ? p : [p]))
    .join(" ")
    .toLowerCase();
}

export const salesSearchIndex: readonly SalesSearchItem[] = [
  // Workflow phases
  ...workflowPhases.map((p) => ({
    id: `phase:${p.id}`,
    type: "phase" as const,
    title: p.title,
    subtitle: p.purpose,
    searchText: text(p.title, p.purpose, p.entryCriteria, p.exitCriteria, p.minimumInfo, p.checklist, p.commonMistakes),
    url: `${BASE}/workflow#phase-${p.id}`,
    audience: null,
    phase: null,
    priority: null,
  })),

  // Routines
  ...routines.map((r) => ({
    id: `routine:${r.id}`,
    type: "routine" as const,
    title: r.title,
    subtitle: r.purpose,
    searchText: text(r.title, r.purpose, r.output, r.steps),
    url: `${BASE}/routines#${r.id}`,
    audience: r.audience,
    phase: r.relatedPhases[0] ?? null,
    priority: null,
  })),

  // Prompts
  ...prompts.map((p) => ({
    id: `prompt:${p.id}`,
    type: "prompt" as const,
    title: p.title,
    subtitle: p.useWhen,
    searchText: text(p.title, p.useWhen, p.inputNeeded, p.expectedOutput, p.qualityCheck),
    url: `${BASE}/prompts#${p.id}`,
    audience: p.audience,
    phase: p.phase,
    priority: p.priority,
  })),

  // Handover gates
  ...handoverGates.map((g) => ({
    id: `gate:${g.id}`,
    type: "gate" as const,
    title: g.title,
    subtitle: g.trigger,
    searchText: text(g.title, g.trigger, g.doneWhen, g.minimumInfo, g.checklist, g.notAutomatic),
    url: `${BASE}/handoffs#${g.id}`,
    audience: null,
    phase: null,
    priority: null,
  })),

  // Automations
  ...automations.map((a) => ({
    id: `auto:${a.id}`,
    type: "automation" as const,
    title: a.title,
    subtitle: a.trigger,
    searchText: text(a.title, a.trigger, a.condition, a.action, a.benefit),
    url: `${BASE}/automations#${a.id}`,
    audience: null,
    phase: a.phase,
    priority: null,
  })),

  // FAQs
  ...faqs.map((f) => ({
    id: `faq:${f.id}`,
    type: "faq" as const,
    title: f.question,
    subtitle: f.answer,
    searchText: text(f.question, f.answer),
    url: `${BASE}/faq#${f.id}`,
    audience: null,
    phase: null,
    priority: null,
  })),

  // Quick Actions
  ...quickActions.map((qa) => ({
    id: `qa:${qa.id}`,
    type: "quickAction" as const,
    title: qa.label,
    subtitle: qa.goal,
    searchText: text(qa.label, qa.goal, qa.steps),
    url: `${BASE}/prompts#${qa.relatedPrompt}`,
    audience: qa.audience,
    phase: qa.phase,
    priority: null,
  })),
];
