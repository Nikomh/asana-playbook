// ─────────────────────────────────────────────────────────────
// Sales to Service — Gemeinsame TypeScript-Typen
// Quelle: Codex-Content-Paket (validiert, bereinigt)
// ─────────────────────────────────────────────────────────────

// ── Enum-ähnliche Typen ───────────────────────────────────────

/** Zielgruppe für Rollen, Routinen, Prompts und Quick Actions */
export type Audience = "management" | "trainer" | "both";

/** Priorisierung von Prompts */
export type Priority = "must-have" | "should-have" | "nice-to-have";

/** Wiederholungsrhythmus für Routinen */
export type Cadence = "daily" | "weekly" | "biweekly" | "monthly" | "adHoc";

/** Rollout-Welle für Prompts */
export type Wave = "wave1" | "wave2" | "wave3";

/** Datenschutz-Sensitivität für Prompts */
export type Sensitivity = "low" | "medium" | "high";

/** Empfohlener Einführungszeitpunkt für Automationen */
export type Stage = "sofort" | "nachPilot";

// ── Interfaces ────────────────────────────────────────────────

/** Hinweise pro Rolle für eine Workflow-Phase */
export interface RoleHints {
  management: string;
  trainer: string;
}

/** Eine Phase im Sales-to-Service-Workflow */
export interface WorkflowPhase {
  /** Eindeutige ID — muss in allen relatedPhases-Verweisen verwendbar sein */
  id: string;
  /** Anzeigereihenfolge im Explorer */
  order: number;
  title: string;
  purpose: string;
  entryCriteria: string;
  roleHints: RoleHints;
  minimumInfo: readonly string[];
  /** Asana Custom Field-Namen (können "TBD" sein wenn noch nicht final) */
  fields: readonly string[];
  checklist: readonly string[];
  aiHelp: readonly string[];
  /** IDs aus prompts.ts */
  relatedPrompts: readonly string[];
  /** IDs aus automations.ts */
  relatedAutomations: readonly string[];
  /** IDs aus handoverGates.ts */
  relatedHandoverGates: readonly string[];
  commonMistakes: readonly string[];
  exitCriteria: string;
}

/** Rolleninformation (Geschäftsführung / Trainer / Gemeinsam) */
export interface RoleInfo {
  id: Audience;
  label: string;
  coreNeed: string;
  responsibilities: readonly string[];
  guardrails: readonly string[];
}

/** Wiederkehrende Routine (täglich / wöchentlich / etc.) */
export interface Routine {
  id: string;
  audience: Audience;
  cadence: Cadence;
  title: string;
  purpose: string;
  steps: readonly string[];
  /** IDs aus workflowPhases.ts */
  relatedPhases: readonly string[];
  /** IDs aus prompts.ts */
  relatedPrompts: readonly string[];
  durationMinutes: number;
  output: string;
}

/** KI-Prompt aus der Prompt Library */
export interface PromptItem {
  id: string;
  audience: Audience;
  /** ID einer Workflow-Phase */
  phase: string;
  title: string;
  priority: Priority;
  wave: Wave;
  useWhen: string;
  inputNeeded: string;
  /** Prompt-Text mit Platzhaltern in [GROSSBUCHSTABEN] */
  prompt: string;
  expectedOutput: string;
  qualityCheck: readonly string[];
  sensitivity: Sensitivity;
}

/** Asana-Automation / Rule */
export interface AutomationItem {
  id: string;
  title: string;
  /** ID einer Workflow-Phase */
  phase: string;
  trigger: string;
  condition: string;
  action: string;
  benefit: string;
  guardrail: string;
  recommendedStage: Stage;
}

/** Übergabe-Gate nach Annahme */
export interface HandoverGate {
  id: string;
  title: string;
  trigger: string;
  owner: string;
  participants: readonly string[];
  minimumInfo: readonly string[];
  checklist: readonly string[];
  aiSupport: string;
  notAutomatic: readonly string[];
  doneWhen: string;
}

/** FAQ-Eintrag */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Quick Action auf dem Dashboard */
export interface QuickAction {
  id: string;
  label: string;
  audience: Audience;
  /** ID einer Workflow-Phase */
  phase: string;
  goal: string;
  steps: readonly string[];
  /** ID eines Prompts aus prompts.ts */
  relatedPrompt: string;
}
