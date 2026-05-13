import type { PromptItem } from "./types";

// DATENSCHUTZ-HINWEIS: Platzhalter in [GROSSBUCHSTABEN] dürfen keine
// Echtdaten enthalten. Kundennamen, Preise, Adressen etc. müssen vor
// Verwendung in externe KI-Tools anonymisiert werden.

export const prompts: readonly PromptItem[] = [
  // ── Management: Pipeline-Übersicht ─────────────────────────
  {
    id: "critical-opportunities",
    audience: "management",
    phase: "follow-up",
    title: "Kritische Chancen finden",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Vor dem Sales-to-Service-Review.",
    inputNeeded:
      "Liste relevanter Karten mit Status, Owner, Datum und letzter Notiz.",
    prompt: `Analysiere diese Sales-Karten.

Finde Karten mit:
- überfälligem Follow-up
- fehlendem nächsten Schritt
- versendetem Angebot ohne Rückmeldung
- gewonnenem Angebot ohne Übergabe
- hoher Priorität oder hohem Potenzial

Gib aus:
1. wichtigste Risiken
2. empfohlene nächste Aktion
3. zuständige Rolle
4. fehlende Information

Karten:
[HIER KARTENINFOS EINFÜGEN]`,
    expectedOutput: "priorisierte Risikoliste.",
    qualityCheck: [
      "Entscheidungen nicht blind übernehmen",
      "nur echte Risiken aufnehmen",
    ],
    sensitivity: "medium",
  },

  // ── Lead Capture ────────────────────────────────────────────
  {
    id: "create-opportunity-card",
    audience: "trainer",
    phase: "lead-capture",
    title: "Kundenchance formulieren",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Nach einem konkreten Kundenkontakt.",
    inputNeeded: "kurze Notiz zum Kontakt oder zur Chance.",
    prompt: `Formuliere aus dieser Notiz eine Sales-to-Service-Karte.

Gib aus:
- Kunde / Organisation
- Ansprechpartner
- Lead-Typ
- Anlass
- Bedarfshypothese
- nächster Schritt
- offene Fragen

Notiz:
[HIER NOTIZ EINFÜGEN]`,
    expectedOutput: "Kartenentwurf für Asana.",
    qualityCheck: [
      "keine Fakten erfinden",
      "nächsten Schritt konkret machen",
    ],
    sensitivity: "medium",
  },
  {
    id: "email-to-sales-card",
    audience: "trainer",
    phase: "lead-capture",
    title: "E-Mail in Sales-Karte umwandeln",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Wenn eine Anfrage per E-Mail kommt.",
    inputNeeded: "Kunden-E-Mail oder gekürzter Auszug.",
    prompt: `Extrahiere aus dieser Anfrage eine Sales-to-Service-Karte.

Gib aus:
- Kunde
- Ansprechpartner
- Lead-Typ
- Bedarf
- Dringlichkeit
- offene Fragen
- nächster Schritt

E-Mail:
[HIER E-MAIL EINFÜGEN]`,
    expectedOutput: "strukturierter Karteninhalt.",
    qualityCheck: [
      "sensible Daten entfernen",
      "E-Mail nicht ungeprüft übernehmen",
    ],
    sensitivity: "medium",
  },

  // ── Call Prep ───────────────────────────────────────────────
  {
    id: "prepare-discovery-call",
    audience: "both",
    phase: "call-prep",
    title: "Erstgespräch vorbereiten",
    priority: "should-have",
    wave: "wave1",
    useWhen: "Vor einem Erstgespräch.",
    inputNeeded: "Lead-Kontext und bisherige Notizen.",
    prompt: `Erstelle eine Erstgesprächsvorbereitung.

Gib aus:
1. Ziel des Gesprächs
2. 5 Kernfragen
3. mögliche Bedarfshypothesen
4. Risiken oder offene Punkte
5. gewünschter nächster Schritt

Kontext:
[HIER KONTEXT EINFÜGEN]`,
    expectedOutput: "kurze Gesprächsagenda.",
    qualityCheck: ["Fragen an Beziehung und Kontext anpassen"],
    sensitivity: "medium",
  },

  // ── Needs Clarification ─────────────────────────────────────
  {
    id: "structure-call-notes",
    audience: "both",
    phase: "needs-clarification",
    title: "Gesprächsnotizen strukturieren",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Direkt nach Gespräch oder Kundenkontakt.",
    inputNeeded: "Rohnotizen.",
    prompt: `Strukturiere diese Gesprächsnotizen.

Gib aus:
1. Kundensituation
2. Bedarf / Problem
3. gewünschtes Ergebnis
4. mögliches Format
5. Timing
6. offene Fragen
7. nächster Schritt
8. Infos für Angebot
9. Infos für Delivery

Notizen:
[HIER NOTIZEN EINFÜGEN]`,
    expectedOutput: "strukturierte Gesprächsnotiz.",
    qualityCheck: [
      "offene Fragen offen lassen",
      "keine Fakten erfinden",
    ],
    sensitivity: "medium",
  },
  {
    id: "extract-next-steps",
    audience: "both",
    phase: "needs-clarification",
    title: "Nächste Schritte extrahieren",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Wenn eine Karte keinen klaren nächsten Schritt hat.",
    inputNeeded: "Kartenbeschreibung oder Gesprächsnotiz.",
    prompt: `Extrahiere konkrete nächste Schritte.

Gib je Schritt aus:
- Aufgabe
- empfohlener Owner
- vorgeschlagenes Timing
- kurze Begründung
- ob Geschäftsführung eingebunden werden sollte

Text:
[HIER TEXT EINFÜGEN]`,
    expectedOutput: "kurze To-do-Liste.",
    qualityCheck: ["maximal 3 Schritte", "Owner und Datum prüfen"],
    sensitivity: "medium",
  },

  // ── Offer Drafting ──────────────────────────────────────────
  {
    id: "offer-input-for-management",
    audience: "trainer",
    phase: "offer-drafting",
    title: "Angebotsinput vorbereiten",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Wenn Trainer/Berater Input für ein Angebot liefern.",
    inputNeeded: "Bedarf, Gesprächsnotizen und Formatidee.",
    prompt: `Erstelle Angebotsinput für die Geschäftsführung.

Strukturiere:
1. Kunde und Kontext
2. Bedarf / Ziel
3. vorgeschlagenes Format
4. möglicher Umfang
5. fachlicher Nutzen
6. relevante Termine
7. offene Fragen
8. Preis-/Scope-Fragen

Input:
[HIER INPUT EINFÜGEN]`,
    expectedOutput: "kompaktes Angebotsbriefing.",
    qualityCheck: [
      "Preis nicht final entscheiden",
      "offene Fragen sichtbar lassen",
    ],
    sensitivity: "medium",
  },
  {
    id: "offer-decision-support",
    audience: "management",
    phase: "offer-drafting",
    title: "Angebotsentscheidung vorbereiten",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Wenn Preis, Umfang oder Variante entschieden werden müssen.",
    inputNeeded: "Bedarf, Optionen und Angebotsinput.",
    prompt: `Strukturiere diese Angebotsentscheidung.

Gib aus:
1. Entscheidungsfrage
2. relevante Fakten
3. mögliche Optionen
4. Chancen und Risiken
5. offene Informationen
6. empfohlene nächste Entscheidung

Wichtig:
Entscheide keinen Preis final.

Input:
[HIER INPUT EINFÜGEN]`,
    expectedOutput: "Entscheidungsgrundlage.",
    qualityCheck: [
      "finale Entscheidung bleibt menschlich",
      "keine Annahmen erfinden",
    ],
    sensitivity: "medium",
  },

  // ── Follow-up ───────────────────────────────────────────────
  {
    id: "follow-up-email",
    audience: "both",
    phase: "follow-up",
    title: "Follow-up-Mail formulieren",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Wenn ein Angebot oder Gespräch nachgefasst wird.",
    inputNeeded: "letzter Stand und Ziel der Mail.",
    prompt: `Formuliere eine kurze Follow-up-Mail.

Ziel:
[ZIEL EINFÜGEN]

Kontext:
[KONTEXT EINFÜGEN]

Ton:
professionell, klar, unaufdringlich.

Gib 2 Varianten:
1. sehr kurz
2. wärmer und persönlicher

Wichtig:
Keine falschen Zusagen machen.`,
    expectedOutput: "prüfbarer Mailentwurf.",
    qualityCheck: [
      "vor Versand prüfen",
      "Ton an Beziehung anpassen",
    ],
    sensitivity: "medium",
  },
  {
    id: "summarize-client-reply",
    audience: "both",
    phase: "follow-up",
    title: "Kundenrückmeldung zusammenfassen",
    priority: "should-have",
    wave: "wave1",
    useWhen: "Nach einer Antwort des Kunden.",
    inputNeeded: "Kundenantwort oder gekürzter Auszug.",
    prompt: `Fasse diese Kundenrückmeldung für die Sales-Karte zusammen.

Gib aus:
- Entscheidung / Signal
- offene Fragen
- Bedenken
- nächster Schritt
- empfohlener Status

Antwort:
[HIER ANTWORT EINFÜGEN]`,
    expectedOutput: "kurzes Statusupdate.",
    qualityCheck: [
      "Zusage nicht hineininterpretieren",
      "bei Unklarheit als unklar markieren",
    ],
    sensitivity: "medium",
  },

  // ── Won & Handover ──────────────────────────────────────────
  {
    id: "won-check",
    audience: "both",
    phase: "won",
    title: "Annahme-Check",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Sobald ein Angebot angenommen wurde.",
    inputNeeded: "Zusage, Angebotslink und Karteninfos.",
    prompt: `Prüfe diese gewonnene Sales-Karte.

Liste auf:
1. Infos für Projektanlage
2. Infos für Delivery
3. Infos für Rechnung/Admin
4. fehlende Informationen
5. empfohlene nächste Schritte

Wichtig:
Wenn die Zusage unklar ist, markiere sie als unklar.

Input:
[HIER KARTENINFOS EINFÜGEN]`,
    expectedOutput: "Gate-Check mit Lückenliste.",
    qualityCheck: [
      "Zusage manuell bestätigen",
      "fehlende Infos nicht erfinden",
    ],
    sensitivity: "medium",
  },
  {
    id: "project-setup-briefing",
    audience: "management",
    phase: "project-setup",
    title: "Projektanlage-Briefing",
    priority: "should-have",
    wave: "wave1",
    useWhen: "Vor Anlage eines Kundenprojekts.",
    inputNeeded: "Angebot, Scope, Zeitraum und Rollen.",
    prompt: `Erstelle ein Projektanlage-Briefing.

Gib aus:
- Projektname
- Kunde / Kontext
- Zeitraum
- Format / Leistung
- interner Owner
- relevante Links
- offene Punkte
- Hinweise für Delivery

Input:
[HIER INPUT EINFÜGEN]`,
    expectedOutput: "Projektanlage-Briefing.",
    qualityCheck: ["Scope mit Angebot abgleichen", "Links ergänzen"],
    sensitivity: "medium",
  },
  {
    id: "delivery-briefing",
    audience: "both",
    phase: "delivery-handover",
    title: "Delivery-Briefing erstellen",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Vor Übergabe an Durchführung.",
    inputNeeded: "Angebot, Notizen, Termine und Besonderheiten.",
    prompt: `Erstelle ein Delivery-Briefing.

Strukturiere:
1. Kunde und Kontext
2. Ziel der Maßnahme
3. vereinbarter Scope
4. Termine / Zeitraum
5. Teilnehmende oder Zielgruppe
6. Besonderheiten / Risiken
7. Materialbedarf
8. offene Fragen
9. relevante Links

Input:
[HIER INPUT EINFÜGEN]`,
    expectedOutput: "Delivery-Handoff.",
    qualityCheck: ["Scope prüfen", "Delivery-Owner bestätigen"],
    sensitivity: "high",
  },
  {
    id: "invoice-check",
    audience: "both",
    phase: "invoice-admin",
    title: "Rechnungsinfos prüfen",
    priority: "must-have",
    wave: "wave1",
    useWhen: "Vor Übergabe an Rechnung/Admin.",
    inputNeeded: "Angebot, Preisinfos und Rechnungsdaten.",
    prompt: `Prüfe Rechnungsinformationen.

Extrahiere:
1. Rechnungsempfänger
2. Rechnungsadresse
3. Preis / Honorar
4. Zahlungsbedingungen
5. PO / Bestellnummer
6. Leistungsdatum oder Zeitraum
7. Rechnungstext
8. fehlende Informationen
9. Rückfragen an Owner

Input:
[HIER INPUT EINFÜGEN]`,
    expectedOutput: "Rechnungscheck mit Lückenliste.",
    qualityCheck: [
      "keine Rechnung automatisch erzeugen",
      "Preis manuell prüfen",
    ],
    sensitivity: "high",
  },

  // ── Archive ─────────────────────────────────────────────────
  {
    id: "archive-reactivation-note",
    audience: "both",
    phase: "archive",
    title: "Archivnotiz formulieren",
    priority: "should-have",
    wave: "wave1",
    useWhen:
      "Wenn eine Chance verloren, geparkt oder später relevant ist.",
    inputNeeded: "letzter Stand und Grund für Pause/Absage.",
    prompt: `Formuliere eine Archiv- oder Parknotiz.

Gib aus:
1. empfohlener Archivgrund
2. kurzes Learning
3. falls geparkt: Reaktivierungsdatum
4. nächster Schritt bei Reaktivierung
5. kurze Asana-Notiz

Input:
[HIER INPUT EINFÜGEN]`,
    expectedOutput: "Archivnotiz und Wiedervorlage-Vorschlag.",
    qualityCheck: ["Datum prüfen", "nicht automatisch archivieren"],
    sensitivity: "medium",
  },
  {
    id: "sales-learnings",
    audience: "management",
    phase: "archive",
    title: "Sales-Learnings ableiten",
    priority: "should-have",
    wave: "wave1",
    useWhen: "Im monatlichen Review.",
    inputNeeded:
      "Auswahl gewonnener, verlorener und geparkter Karten.",
    prompt: `Leite aus diesen Sales-Fällen Monats-Learnings ab.

Gib aus:
1. wiederkehrende Muster
2. Gründe für Verzögerungen
3. Gründe für verlorene Chancen
4. Verbesserung für Follow-up oder Angebot
5. maximal 3 Prozessverbesserungen

Fälle:
[HIER FÄLLE EINFÜGEN]`,
    expectedOutput: "kurze Learnings und Verbesserungen.",
    qualityCheck: [
      "nicht zu viele Maßnahmen",
      "nur belegbare Muster",
    ],
    sensitivity: "medium",
  },
] as const;
