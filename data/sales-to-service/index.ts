// ─────────────────────────────────────────────────────────────
// Sales to Service — Barrel Export
// Importiere alle Daten und Typen aus diesem einen Einstiegspunkt:
//   import { prompts, workflowPhases, ... } from "@/data/sales-to-service";
// ─────────────────────────────────────────────────────────────

// Typen
export type {
  Audience,
  Priority,
  Cadence,
  Wave,
  Sensitivity,
  Stage,
  RoleHints,
  WorkflowPhase,
  RoleInfo,
  Routine,
  PromptItem,
  AutomationItem,
  HandoverGate,
  FaqItem,
  QuickAction,
} from "./types";

// Daten
export { roles } from "./roles";
export { workflowPhases } from "./workflowPhases";
export { routines } from "./routines";
export { prompts } from "./prompts";
export { automations } from "./automations";
export { handoverGates } from "./handoverGates";
export { faqs } from "./faqs";
export { quickActions } from "./quickActions";

// Suchindex
export type { SearchItemType, SalesSearchItem } from "./searchIndex";
export { salesSearchIndex } from "./searchIndex";

// Validierung
export type { ValidationResult } from "./validate";
export { validateSalesToServiceData, logValidationResult } from "./validate";

// ── Lookup-Helpers ────────────────────────────────────────────

import { workflowPhases } from "./workflowPhases";
import { prompts } from "./prompts";
import { automations } from "./automations";
import { handoverGates } from "./handoverGates";
import { routines } from "./routines";
import { quickActions } from "./quickActions";
import type { Audience, WorkflowPhase, PromptItem, AutomationItem, HandoverGate, Routine, QuickAction } from "./types";

export function getPhaseById(id: string): WorkflowPhase | undefined {
  return workflowPhases.find((p) => p.id === id);
}

export function getPromptById(id: string): PromptItem | undefined {
  return prompts.find((p) => p.id === id);
}

export function getAutomationById(id: string): AutomationItem | undefined {
  return automations.find((a) => a.id === id);
}

export function getGateById(id: string): HandoverGate | undefined {
  return handoverGates.find((g) => g.id === id);
}

export function getPromptsByPhase(phaseId: string): PromptItem[] {
  return prompts.filter((p) => p.phase === phaseId) as PromptItem[];
}

export function getAutomationsByPhase(phaseId: string): AutomationItem[] {
  return automations.filter((a) => a.phase === phaseId) as AutomationItem[];
}

export function getRoutinesByAudience(audience: Audience): Routine[] {
  return routines.filter(
    (r) => r.audience === audience || r.audience === "both"
  ) as Routine[];
}

export function getQuickActionsByAudience(audience: Audience): QuickAction[] {
  return quickActions.filter(
    (qa) => qa.audience === audience || qa.audience === "both"
  ) as QuickAction[];
}

export function getRelatedPromptsForPhase(phaseId: string): PromptItem[] {
  const phase = getPhaseById(phaseId);
  if (!phase) return [];
  return phase.relatedPrompts
    .map((id) => getPromptById(id))
    .filter((p): p is PromptItem => p !== undefined);
}

export function getRelatedAutomationsForPhase(phaseId: string): AutomationItem[] {
  const phase = getPhaseById(phaseId);
  if (!phase) return [];
  return phase.relatedAutomations
    .map((id) => getAutomationById(id))
    .filter((a): a is AutomationItem => a !== undefined);
}

export function getRelatedGatesForPhase(phaseId: string): HandoverGate[] {
  const phase = getPhaseById(phaseId);
  if (!phase) return [];
  return phase.relatedHandoverGates
    .map((id) => getGateById(id))
    .filter((g): g is HandoverGate => g !== undefined);
}
