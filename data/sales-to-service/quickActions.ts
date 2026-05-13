import type { QuickAction } from "./types";

// HINWEIS: 3 Quick-Action-IDs sind identisch mit Prompt-IDs:
//   "won-check", "delivery-briefing", "invoice-check"
// Technisch harmlos (getrennte Arrays, unterschiedliche Typen),
// aber bei kollektionsübergreifenden Suchen explizit nach Typ filtern.

export const quickActions: readonly QuickAction[] = [
  {
    id: "new-lead",
    label: "Neue Chance eintragen",
    audience: "both",
    phase: "lead-capture",
    goal: "Lead sichtbar machen.",
    steps: [
      "Karte anlegen",
      "Lead-Typ setzen",
      "Owner setzen",
      "nächsten Schritt eintragen",
    ],
    relatedPrompt: "create-opportunity-card",
  },
  {
    id: "prepare-call",
    label: "Erstgespräch vorbereiten",
    audience: "both",
    phase: "call-prep",
    goal: "Gespräch fokussiert führen.",
    steps: [
      "Kontext prüfen",
      "Ziel formulieren",
      "5 Fragen vorbereiten",
    ],
    relatedPrompt: "prepare-discovery-call",
  },
  {
    id: "after-call",
    label: "Gespräch nachhalten",
    audience: "both",
    phase: "needs-clarification",
    goal: "Gespräch in Angebotsinput übersetzen.",
    steps: [
      "Rohnotizen einfügen",
      "Prompt nutzen",
      "nächsten Schritt setzen",
    ],
    relatedPrompt: "structure-call-notes",
  },
  {
    id: "request-support",
    label: "Unterstützung anfragen",
    audience: "trainer",
    phase: "offer-drafting",
    goal: "Preis-, Umfangs- oder Angebotsfrage sichtbar machen.",
    steps: [
      "Unterstützungsbedarf setzen",
      "Frage formulieren",
      "Angebotsinput ergänzen",
    ],
    relatedPrompt: "offer-input-for-management",
  },
  {
    id: "send-offer",
    label: "Angebot versenden",
    audience: "both",
    phase: "offer-sent",
    goal: "Angebot senden und Follow-up sichern.",
    steps: [
      "Angebotslink prüfen",
      "Versand dokumentieren",
      "Follow-up-Datum setzen",
    ],
    relatedPrompt: "follow-up-email",
  },
  {
    id: "follow-up-now",
    label: "Follow-up formulieren",
    audience: "both",
    phase: "follow-up",
    goal: "Rückmeldung klar und freundlich einholen.",
    steps: [
      "letzten Stand prüfen",
      "Entwurf erstellen",
      "Karte aktualisieren",
    ],
    relatedPrompt: "follow-up-email",
  },
  {
    id: "won-check",
    label: "Annahme prüfen",
    audience: "both",
    phase: "won",
    goal: "Gewonnen nicht mit abgeschlossen verwechseln.",
    steps: [
      "Annahme dokumentieren",
      "Gate-Check durchführen",
      "Übergaben prüfen",
    ],
    relatedPrompt: "won-check",
  },
  {
    id: "delivery-briefing",
    label: "Delivery-Briefing erstellen",
    audience: "both",
    phase: "delivery-handover",
    goal: "Durchführung mit klarem Kontext starten.",
    steps: [
      "Angebot/Notizen sammeln",
      "Briefing erstellen",
      "Owner bestätigen",
    ],
    relatedPrompt: "delivery-briefing",
  },
  {
    id: "invoice-check",
    label: "Rechnungsinfos prüfen",
    audience: "both",
    phase: "invoice-admin",
    goal: "Admin ohne Rückfragen ermöglichen.",
    steps: [
      "Preis prüfen",
      "Rechnungsdaten ergänzen",
      "Lücken markieren",
    ],
    relatedPrompt: "invoice-check",
  },
  {
    id: "archive-card",
    label: "Chance archivieren",
    audience: "both",
    phase: "archive",
    goal: "Pipeline sauber halten und Learning sichern.",
    steps: [
      "Archivgrund setzen",
      "Learning notieren",
      "ggf. Reaktivierungsdatum setzen",
    ],
    relatedPrompt: "archive-reactivation-note",
  },
] as const;
