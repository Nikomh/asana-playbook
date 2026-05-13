import type { RoleInfo } from "./types";

export const roles: readonly RoleInfo[] = [
  {
    id: "management",
    label: "Geschäftsführung",
    coreNeed:
      "Überblick, Entscheidungssicherheit und saubere Übergaben ohne Mikromanagement.",
    responsibilities: [
      "eigene Leads führen",
      "Preis und Umfang entscheiden",
      "kritische Angebote prüfen",
      "Trainer/Berater unterstützen",
      "Übergaben absichern",
    ],
    guardrails: [
      "nicht jede Karte mikromanagen",
      "Preisentscheidungen nicht im Chat verstecken",
      "gewonnen nicht als abgeschlossen behandeln",
    ],
  },
  {
    id: "trainer",
    label: "Trainer / Berater",
    coreNeed:
      "Eigene Kundenchancen einfach führen und rechtzeitig Unterstützung einholen.",
    responsibilities: [
      "eigene Leads erfassen",
      "Gespräche dokumentieren",
      "Angebotsinput liefern",
      "Follow-ups terminieren",
      "Übergabeinfos ergänzen",
    ],
    guardrails: [
      "Zusagen nicht nur in E-Mail behalten",
      "Unterstützung sichtbar anfragen",
      "keine Preiszusagen ohne Abstimmung",
    ],
  },
  {
    id: "both",
    label: "Gemeinsame Verantwortung",
    coreNeed:
      "Jede aktive Chance hat Owner, nächsten Schritt und klare Übergabe.",
    responsibilities: [
      "aktive Chancen pflegen",
      "Follow-ups datieren",
      "Gesprächsergebnisse dokumentieren",
      "Vorlagen verlinken",
      "Archivgrund setzen",
    ],
    guardrails: [
      "keine Karte ohne nächsten Schritt",
      "keine Übergabe ohne Mindestinfos",
      "keine Vorlagen als Sales-Aufgaben",
    ],
  },
] as const;
