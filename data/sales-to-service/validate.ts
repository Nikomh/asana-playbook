// ─────────────────────────────────────────────────────────────
// Sales to Service — Daten-Validierung
//
// Verwendung:
//   import { validateSalesToServiceData } from "@/data/sales-to-service/validate";
//   const result = validateSalesToServiceData();
//   if (!result.valid) console.error(result.errors);
//
// Kann in Tests, Build-Hooks oder Dev-Mode-Checks verwendet werden.
// ─────────────────────────────────────────────────────────────

import { workflowPhases } from "./workflowPhases";
import { prompts } from "./prompts";
import { automations } from "./automations";
import { handoverGates } from "./handoverGates";
import { routines } from "./routines";
import { quickActions } from "./quickActions";
import { roles } from "./roles";
import { faqs } from "./faqs";
import type { Audience, Priority, Sensitivity, Cadence, Wave, Stage } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    phases: number;
    prompts: number;
    automations: number;
    handoverGates: number;
    routines: number;
    quickActions: number;
    roles: number;
    faqs: number;
  };
}

// ── Erlaubte Werte ────────────────────────────────────────────

const VALID_AUDIENCES: readonly Audience[] = ["management", "trainer", "both"];
const VALID_PRIORITIES: readonly Priority[] = ["must-have", "should-have", "nice-to-have"];
const VALID_SENSITIVITIES: readonly Sensitivity[] = ["low", "medium", "high"];
const VALID_CADENCES: readonly Cadence[] = ["daily", "weekly", "biweekly", "monthly", "adHoc"];
const VALID_WAVES: readonly Wave[] = ["wave1", "wave2", "wave3"];
const VALID_STAGES: readonly Stage[] = ["sofort", "nachPilot"];

// ── Hilfsfunktionen ───────────────────────────────────────────

function isIn<T>(value: T, allowed: readonly T[]): boolean {
  return (allowed as T[]).includes(value);
}

function hasDuplicateIds(items: readonly { id: string }[], label: string): string[] {
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const item of items) {
    if (seen.has(item.id)) dupes.push(`${label}: Doppelte ID "${item.id}"`);
    seen.add(item.id);
  }
  return dupes;
}

// ── Hauptfunktion ─────────────────────────────────────────────

export function validateSalesToServiceData(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Lookup-Sets für Cross-Reference-Checks
  const phaseIds = new Set(workflowPhases.map((p) => p.id));
  const promptIds = new Set(prompts.map((p) => p.id));
  const automationIds = new Set(automations.map((a) => a.id));
  const gateIds = new Set(handoverGates.map((g) => g.id));

  // ── 1. Doppelte IDs ─────────────────────────────────────────
  errors.push(...hasDuplicateIds(workflowPhases as unknown as { id: string }[], "Phase"));
  errors.push(...hasDuplicateIds(prompts as unknown as { id: string }[], "Prompt"));
  errors.push(...hasDuplicateIds(automations as unknown as { id: string }[], "Automation"));
  errors.push(...hasDuplicateIds(handoverGates as unknown as { id: string }[], "Gate"));
  errors.push(...hasDuplicateIds(routines as unknown as { id: string }[], "Routine"));
  errors.push(...hasDuplicateIds(quickActions as unknown as { id: string }[], "QuickAction"));
  errors.push(...hasDuplicateIds(roles as unknown as { id: string }[], "Role"));
  errors.push(...hasDuplicateIds(faqs as unknown as { id: string }[], "FAQ"));

  // ── 2. QuickAction-ID = Prompt-ID Kollision (Warning) ───────
  for (const qa of quickActions) {
    if (promptIds.has(qa.id)) {
      warnings.push(
        `QuickAction ID "${qa.id}" ist identisch mit Prompt ID "${qa.id}". ` +
          "Technisch harmlos, aber bei kollektionsübergreifenden Suchen beachten."
      );
    }
  }

  // ── 3. Phasen ───────────────────────────────────────────────
  for (const phase of workflowPhases) {
    // relatedPrompts
    for (const ref of phase.relatedPrompts) {
      if (!promptIds.has(ref)) {
        errors.push(`Phase "${phase.id}" → relatedPrompts: Prompt-ID "${ref}" nicht gefunden.`);
      }
    }
    // relatedAutomations
    for (const ref of phase.relatedAutomations) {
      if (!automationIds.has(ref)) {
        errors.push(`Phase "${phase.id}" → relatedAutomations: Automation-ID "${ref}" nicht gefunden.`);
      }
    }
    // relatedHandoverGates
    for (const ref of phase.relatedHandoverGates) {
      if (!gateIds.has(ref)) {
        errors.push(`Phase "${phase.id}" → relatedHandoverGates: Gate-ID "${ref}" nicht gefunden.`);
      }
    }
    // order muss positiv und eindeutig sein
    if (phase.order < 1) {
      errors.push(`Phase "${phase.id}": order muss >= 1 sein (ist ${phase.order}).`);
    }
  }

  // Prüfe Reihenfolge-Lücken
  const orders = workflowPhases.map((p) => p.order).sort((a, b) => a - b);
  for (let i = 0; i < orders.length; i++) {
    if (orders[i] !== i + 1) {
      warnings.push(`WorkflowPhase-Reihenfolge hat Lücke bei Nummer ${i + 1} (gefunden: ${orders[i]}).`);
      break;
    }
  }

  // ── 4. Prompts ──────────────────────────────────────────────
  for (const prompt of prompts) {
    if (!phaseIds.has(prompt.phase)) {
      errors.push(`Prompt "${prompt.id}": phase "${prompt.phase}" ist keine bekannte Phase-ID.`);
    }
    if (!isIn(prompt.audience, VALID_AUDIENCES)) {
      errors.push(`Prompt "${prompt.id}": audience "${prompt.audience as string}" ist kein gültiger Wert.`);
    }
    if (!isIn(prompt.priority, VALID_PRIORITIES)) {
      errors.push(`Prompt "${prompt.id}": priority "${prompt.priority as string}" ist kein gültiger Wert.`);
    }
    if (!isIn(prompt.sensitivity, VALID_SENSITIVITIES)) {
      errors.push(`Prompt "${prompt.id}": sensitivity "${prompt.sensitivity as string}" ist kein gültiger Wert.`);
    }
    if (!isIn(prompt.wave, VALID_WAVES)) {
      errors.push(`Prompt "${prompt.id}": wave "${prompt.wave as string}" ist kein gültiger Wert.`);
    }
    // Platzhalter-Check: Prompt-Text darf keine Echtdaten enthalten (Heuristik)
    if (/\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(prompt.prompt) && !prompt.prompt.includes("[")) {
      warnings.push(
        `Prompt "${prompt.id}": könnte echten Namen enthalten. ` +
          "Bitte prüfen, ob Platzhaltermuster [IN GROSSBUCHSTABEN] verwendet werden."
      );
    }
  }

  // ── 5. Automationen ─────────────────────────────────────────
  for (const auto of automations) {
    if (!phaseIds.has(auto.phase)) {
      errors.push(`Automation "${auto.id}": phase "${auto.phase}" ist keine bekannte Phase-ID.`);
    }
    if (!isIn(auto.recommendedStage, VALID_STAGES)) {
      errors.push(
        `Automation "${auto.id}": recommendedStage "${auto.recommendedStage as string}" ist kein gültiger Wert.`
      );
    }
  }

  // ── 6. Routinen ─────────────────────────────────────────────
  for (const routine of routines) {
    if (!isIn(routine.audience, VALID_AUDIENCES)) {
      errors.push(`Routine "${routine.id}": audience "${routine.audience as string}" ist kein gültiger Wert.`);
    }
    if (!isIn(routine.cadence, VALID_CADENCES)) {
      errors.push(`Routine "${routine.id}": cadence "${routine.cadence as string}" ist kein gültiger Wert.`);
    }
    for (const ref of routine.relatedPhases) {
      if (!phaseIds.has(ref)) {
        errors.push(`Routine "${routine.id}" → relatedPhases: Phase-ID "${ref}" nicht gefunden.`);
      }
    }
    for (const ref of routine.relatedPrompts) {
      if (!promptIds.has(ref)) {
        errors.push(`Routine "${routine.id}" → relatedPrompts: Prompt-ID "${ref}" nicht gefunden.`);
      }
    }
    if (routine.durationMinutes <= 0) {
      errors.push(`Routine "${routine.id}": durationMinutes muss > 0 sein.`);
    }
  }

  // ── 7. Quick Actions ────────────────────────────────────────
  for (const qa of quickActions) {
    if (!isIn(qa.audience, VALID_AUDIENCES)) {
      errors.push(`QuickAction "${qa.id}": audience "${qa.audience as string}" ist kein gültiger Wert.`);
    }
    if (!phaseIds.has(qa.phase)) {
      errors.push(`QuickAction "${qa.id}": phase "${qa.phase}" ist keine bekannte Phase-ID.`);
    }
    if (!promptIds.has(qa.relatedPrompt)) {
      errors.push(`QuickAction "${qa.id}" → relatedPrompt: Prompt-ID "${qa.relatedPrompt}" nicht gefunden.`);
    }
    if (qa.steps.length === 0) {
      warnings.push(`QuickAction "${qa.id}": steps-Array ist leer.`);
    }
  }

  // ── 8. Rollen ───────────────────────────────────────────────
  for (const role of roles) {
    if (!isIn(role.id, VALID_AUDIENCES)) {
      errors.push(`Role ID "${role.id}" muss ein gültiger Audience-Wert sein.`);
    }
  }
  // Alle drei Audience-Typen müssen als Rollen vorhanden sein
  for (const audience of VALID_AUDIENCES) {
    if (!roles.find((r) => r.id === audience)) {
      errors.push(`Fehlende Rolle für Audience "${audience}".`);
    }
  }

  // ── 9. FAQs ─────────────────────────────────────────────────
  for (const faq of faqs) {
    if (!faq.question.trim()) {
      errors.push(`FAQ "${faq.id}": question darf nicht leer sein.`);
    }
    if (!faq.answer.trim()) {
      errors.push(`FAQ "${faq.id}": answer darf nicht leer sein.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      phases: workflowPhases.length,
      prompts: prompts.length,
      automations: automations.length,
      handoverGates: handoverGates.length,
      routines: routines.length,
      quickActions: quickActions.length,
      roles: roles.length,
      faqs: faqs.length,
    },
  };
}

// ── Dev-Logging-Helfer ────────────────────────────────────────

/** Loggt Validierungsergebnis in der Konsole (nur in Entwicklung nutzen). */
export function logValidationResult(): void {
  const result = validateSalesToServiceData();
  const { valid, errors, warnings, stats } = result;

  console.group("Sales-to-Service Datenvalidierung");
  console.log("Status:", valid ? "✅ VALID" : "❌ FEHLER");
  console.log("Stats:", stats);
  if (errors.length > 0) {
    console.error("Fehler:");
    errors.forEach((e) => console.error(" •", e));
  }
  if (warnings.length > 0) {
    console.warn("Warnungen:");
    warnings.forEach((w) => console.warn(" •", w));
  }
  console.groupEnd();
}
