import type { FaqItem } from "./types";

export const faqs: readonly FaqItem[] = [
  {
    id: "what-belongs-here",
    question: "Was gehört ins Sales-to-Service-Board?",
    answer:
      "Konkrete Kundenchancen vom Lead bis zur Übergabe. Keine Vorlagen, Delivery-Steuerung oder Rechnungsdetails.",
  },
  {
    id: "where-templates-live",
    question: "Wo liegen Angebotsvorlagen?",
    answer:
      "In Knowledge & Templates. In Sales-Karten werden sie nur verlinkt.",
  },
  {
    id: "when-create-card",
    question: "Wann lege ich eine Sales-Karte an?",
    answer:
      "Sobald es einen konkreten Kontakt, Anlass oder reaktivierbare Chance gibt.",
  },
  {
    id: "inbound-outbound",
    question: "Sind Inbound und Outbound eigene Spalten?",
    answer:
      "Nein. Nutze das Feld Lead-Typ, damit keine parallelen Pipelines entstehen.",
  },
  {
    id: "won-is-done",
    question: "Ist 'angenommen' schon erledigt?",
    answer:
      "Nein. Erst Projektanlage, Delivery und Rechnung/Admin prüfen.",
  },
  {
    id: "who-owns-card",
    question: "Wer ist für eine Karte verantwortlich?",
    answer:
      "Genau eine Person als Owner. Andere können unterstützen.",
  },
  {
    id: "follow-up-rule",
    question: "Was ist die wichtigste Follow-up-Regel?",
    answer: "Follow-up ohne Datum ist kein Follow-up.",
  },
  {
    id: "ki-decisions",
    question: "Was darf KI nicht entscheiden?",
    answer:
      "Keine Preise, Angebotsfreigaben, Kundenzusagen oder Kundennachrichten ohne Prüfung.",
  },
  {
    id: "archive-use",
    question: "Was passiert mit verlorenen Chancen?",
    answer:
      "Archivieren mit Grund. Geparkte Chancen bekommen ein Reaktivierungsdatum.",
  },
  {
    id: "chat-vs-asana",
    question: "Reicht eine Übergabe im Chat?",
    answer:
      "Nein. Ergebnisse müssen in der Sales-Karte sichtbar sein.",
  },
] as const;
