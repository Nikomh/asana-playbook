import type { WorkflowPhase } from "./types";

// HINWEIS: Asana Custom-Field-Namen in `fields` können "TBD" enthalten,
// falls der genaue Board-Spaltenname noch nicht final bestätigt ist.

export const workflowPhases: readonly WorkflowPhase[] = [
  {
    id: "templates",
    order: 1,
    title: "Sales-Werkzeuge nutzen",
    purpose:
      "Vorlagen, Preislogiken und Textbausteine aus Knowledge & Templates nutzen und verlinken.",
    entryCriteria: "Eine Karte braucht Vorlage, Preislogik oder Textbaustein.",
    roleHints: {
      management: "stellt Standards bereit und entscheidet Sonderfälle.",
      trainer: "nutzt passende Vorlagen und verlinkt sie.",
    },
    minimumInfo: ["Link zur Vorlage", "kurzer Nutzungskontext"],
    fields: ["documentLink", "offerType"],
    checklist: ["Vorlage auswählen", "Link setzen", "keine Kopie erstellen"],
    aiHelp: ["passende Vorlage vorschlagen"],
    relatedPrompts: [],
    relatedAutomations: [],
    relatedHandoverGates: [],
    commonMistakes: ["Vorlagen als Aufgaben anlegen", "alte Dateien kopieren"],
    exitCriteria: "Vorlage ist verlinkt oder bewusst nicht nötig.",
  },
  {
    id: "lead-capture",
    order: 2,
    title: "Anfrage / Lead erfassen",
    purpose: "Jede konkrete Verkaufschance sichtbar machen.",
    entryCriteria: "Es gibt Kontakt, Anlass oder reaktivierbare Chance.",
    roleHints: {
      management: "trägt eigene und strategische Leads ein.",
      trainer: "trägt eigene Anfragen und Empfehlungen ein.",
    },
    minimumInfo: [
      "Kunde",
      "Ansprechpartner",
      "Lead-Typ",
      "Owner",
      "nächster Schritt",
    ],
    fields: ["leadType", "assignee", "priority", "followUpDate"],
    checklist: [
      "Lead-Typ setzen",
      "Owner setzen",
      "nächsten Schritt eintragen",
    ],
    aiHelp: ["E-Mail in Karte übersetzen", "Lead-Typ vorschlagen"],
    relatedPrompts: ["create-opportunity-card", "email-to-sales-card"],
    relatedAutomations: ["lead-needs-next-step"],
    relatedHandoverGates: [],
    commonMistakes: ["Lead bleibt im Postfach", "kein nächster Schritt"],
    exitCriteria: "Owner, Lead-Typ und nächster Schritt sind gesetzt.",
  },
  {
    id: "call-prep",
    order: 3,
    title: "Erstgespräch vorbereiten",
    purpose: "Gespräch fokussieren und Bedarfsklärung vorbereiten.",
    entryCriteria: "Lead ist relevant und Gespräch steht an.",
    roleHints: {
      management: "prüft strategische Leads oder Sonderfälle.",
      trainer: "bereitet eigene Gespräche mit Leitfragen vor.",
    },
    minimumInfo: [
      "Gesprächsziel",
      "Bedarfshypothese",
      "offene Fragen",
      "Termin",
    ],
    fields: ["supportNeeded", "priority"],
    checklist: ["Ziel klären", "5 Fragen notieren", "Annahmen markieren"],
    aiHelp: ["Agenda erstellen", "Fragen ableiten"],
    relatedPrompts: ["prepare-discovery-call"],
    relatedAutomations: ["meeting-prep-subtasks"],
    relatedHandoverGates: [],
    commonMistakes: [
      "Gespräch ohne Ziel",
      "keine Vorbereitung bei wichtigen Leads",
    ],
    exitCriteria: "Gespräch ist geführt oder bereit.",
  },
  {
    id: "call",
    order: 4,
    title: "Erstgespräch führen",
    purpose: "Bedarf, Ziel, Timing und Entscheidungslogik verstehen.",
    entryCriteria: "Gespräch findet statt.",
    roleHints: {
      management: "führt oder unterstützt strategische Gespräche.",
      trainer: "führt fachliche Gespräche ohne Preiszusage.",
    },
    minimumInfo: [
      "Kundensituation",
      "Bedarf",
      "Ziel",
      "offene Fragen",
      "nächster Schritt",
    ],
    fields: ["offerType", "supportNeeded"],
    checklist: [
      "Bedarf klären",
      "Erfolgskriterium klären",
      "nächsten Schritt vereinbaren",
    ],
    aiHelp: ["Notizen strukturieren"],
    relatedPrompts: ["structure-call-notes"],
    relatedAutomations: [],
    relatedHandoverGates: [],
    commonMistakes: ["Ergebnis bleibt mündlich", "Preisrahmen unklar"],
    exitCriteria: "Gesprächsergebnis ist dokumentiert.",
  },
  {
    id: "needs-clarification",
    order: 5,
    title: "Bedarf klären",
    purpose:
      "Aus Gesprächsnotizen einen angebotsfähigen Bedarf machen.",
    entryCriteria: "Erstgespräch wurde geführt.",
    roleHints: {
      management: "entscheidet Preis-, Scope- und Strategiefragen.",
      trainer:
        "liefert Angebotsinput und markiert Unterstützungsbedarf.",
    },
    minimumInfo: [
      "Bedarf",
      "Zielbild",
      "Format",
      "Timing",
      "offene Fragen",
    ],
    fields: ["offerType", "supportNeeded", "priority"],
    checklist: [
      "Gesprächsnotiz ergänzen",
      "Angebotsreife prüfen",
      "Lücken markieren",
    ],
    aiHelp: [
      "Notizen verdichten",
      "nächste Schritte extrahieren",
      "Lücken finden",
    ],
    relatedPrompts: [
      "structure-call-notes",
      "extract-next-steps",
      "offer-input-for-management",
    ],
    relatedAutomations: ["offer-readiness-check"],
    relatedHandoverGates: [],
    commonMistakes: [
      "nur 'braucht Angebot' notieren",
      "Kontext fehlt",
    ],
    exitCriteria:
      "Angebot kann erstellt oder Chance geparkt werden.",
  },
  {
    id: "offer-drafting",
    order: 6,
    title: "Angebot in Erstellung",
    purpose:
      "Angebot auf Basis des geklärten Bedarfs erstellen.",
    entryCriteria:
      "Bedarf und Angebotstyp sind ausreichend klar.",
    roleHints: {
      management: "entscheidet Preis, Umfang und Sonderfälle.",
      trainer:
        "liefert fachlichen Input und Aufwandsschätzung.",
    },
    minimumInfo: [
      "Angebotstyp",
      "Vorlagenlink",
      "Angebotslink",
      "Preis-/Scope-Notiz",
    ],
    fields: ["offerType", "offerStatus", "documentLink", "supportNeeded"],
    checklist: [
      "Vorlage verlinken",
      "Briefing erstellen",
      "Preis/Scope klären",
    ],
    aiHelp: ["Angebotsbriefing erstellen", "fehlende Infos markieren"],
    relatedPrompts: ["offer-input-for-management", "offer-decision-support"],
    relatedAutomations: ["offer-needs-document-link"],
    relatedHandoverGates: [],
    commonMistakes: [
      "Angebot startet bei null",
      "Freigabe läuft im Chat",
    ],
    exitCriteria: "Angebot ist final und versandbereit.",
  },
  {
    id: "offer-sent",
    order: 7,
    title: "Angebot versenden",
    purpose: "Angebot offiziell senden und Follow-up sichern.",
    entryCriteria: "Angebot ist final und freigegeben.",
    roleHints: {
      management: "versendet oder gibt Versand frei.",
      trainer:
        "versendet nach Freigabe und dokumentiert Versand.",
    },
    minimumInfo: ["Versanddatum", "Angebotslink", "Follow-up-Datum"],
    fields: ["offerStatus", "followUpDate", "documentLink"],
    checklist: ["Versand dokumentieren", "Follow-up-Datum setzen"],
    aiHelp: ["Begleitmail vorschlagen"],
    relatedPrompts: ["follow-up-email"],
    relatedAutomations: ["offer-sent-needs-follow-up"],
    relatedHandoverGates: [],
    commonMistakes: ["kein Follow-up gesetzt", "Angebotslink fehlt"],
    exitCriteria: "Angebot ist gesendet und Follow-up terminiert.",
  },
  {
    id: "follow-up",
    order: 8,
    title: "Follow-up steuern",
    purpose: "Offene Entscheidungen aktiv verfolgen.",
    entryCriteria:
      "Angebot wurde versendet oder Kontakt soll nachgefasst werden.",
    roleHints: {
      management: "prüft kritische oder hochwertige Chancen.",
      trainer:
        "hält eigene Kontakte nach und dokumentiert Rückmeldungen.",
    },
    minimumInfo: [
      "letzter Kontakt",
      "Rückmeldung",
      "Follow-up-Datum",
      "Status",
    ],
    fields: ["followUpDate", "priority", "offerStatus"],
    checklist: [
      "Rückmeldung dokumentieren",
      "nächste Aktion setzen",
      "Status klären",
    ],
    aiHelp: [
      "Follow-up-Mail formulieren",
      "Rückmeldung zusammenfassen",
    ],
    relatedPrompts: ["follow-up-email", "summarize-client-reply"],
    relatedAutomations: [
      "follow-up-reminder",
      "overdue-high-potential-follow-up",
    ],
    relatedHandoverGates: [],
    commonMistakes: [
      "Follow-up bleibt im Kopf",
      "Kundenantwort bleibt nur in E-Mail",
    ],
    exitCriteria:
      "Chance ist gewonnen, verloren, geparkt oder neu terminiert.",
  },
  {
    id: "won",
    order: 9,
    title: "Angebot angenommen",
    purpose:
      "Kundenzusage in übergabefähigen Auftrag übersetzen.",
    entryCriteria: "Kunde hat verbindlich zugesagt.",
    roleHints: {
      management:
        "prüft kritische Preis-, Scope- und Übergabeentscheidungen.",
      trainer:
        "dokumentiert Zusage und ergänzt Übergabeinformationen.",
    },
    minimumInfo: [
      "Annahmedatum",
      "finaler Angebotslink",
      "Scope",
      "Preis/Konditionen",
    ],
    fields: [
      "projectSetupNeeded",
      "deliveryHandoverNeeded",
      "invoiceHandoverNeeded",
      "documentLink",
    ],
    checklist: [
      "Projektanlage prüfen",
      "Delivery prüfen",
      "Rechnung/Admin prüfen",
    ],
    aiHelp: ["Übergabelücken prüfen"],
    relatedPrompts: ["won-check"],
    relatedAutomations: ["won-creates-handover-checklist"],
    // NOTE: Gate-IDs sind "project-setup", "delivery", "invoice-admin"
    // — bewusst verschieden von den Phase-IDs
    relatedHandoverGates: ["project-setup", "delivery", "invoice-admin"],
    commonMistakes: [
      "gewonnen als abgeschlossen behandeln",
      "Zusage bleibt im Postfach",
    ],
    exitCriteria: "Alle relevanten Übergabe-Gates sind angelegt.",
  },
  {
    id: "project-setup",
    order: 10,
    title: "Projektanlage vorbereiten",
    purpose:
      "Aus Auftrag ein startfähiges Kundenprojekt machen.",
    entryCriteria: "Projektanlage nötig ist gesetzt.",
    roleHints: {
      management:
        "prüft strategische Projekte oder unklaren Scope.",
      trainer:
        "liefert Kontext für Durchführung und Setup.",
    },
    minimumInfo: [
      "Projektname",
      "Kunde",
      "Zeitraum",
      "Format",
      "Owner",
      "Angebotslink",
    ],
    fields: ["projectSetupNeeded", "documentLink"],
    checklist: [
      "Projektname definieren",
      "Scope prüfen",
      "Projektlink ergänzen",
    ],
    aiHelp: ["Projektbriefing erstellen"],
    relatedPrompts: ["project-setup-briefing"],
    relatedAutomations: ["project-setup-needed"],
    relatedHandoverGates: ["project-setup"],
    commonMistakes: [
      "Projekt ohne Scope anlegen",
      "Angebotslink fehlt",
    ],
    exitCriteria: "Projekt ist angelegt oder Anlage bestätigt.",
  },
  {
    id: "delivery-handover",
    order: 11,
    title: "Übergabe an Delivery",
    purpose:
      "Delivery erhält vollständigen Kontext für Durchführung.",
    entryCriteria: "Delivery-Übergabe nötig ist gesetzt.",
    roleHints: {
      management: "sichert kritische Übergaben ab.",
      trainer:
        "bereitet eigene Durchführung mit Scope und Zielen vor.",
    },
    minimumInfo: [
      "Ziel",
      "Scope",
      "Termine",
      "Teilnehmende",
      "Besonderheiten",
      "Delivery-Owner",
    ],
    fields: ["deliveryHandoverNeeded", "documentLink"],
    checklist: [
      "Briefing erstellen",
      "Owner informieren",
      "offene Fragen markieren",
    ],
    aiHelp: ["Delivery-Briefing erstellen"],
    relatedPrompts: ["delivery-briefing"],
    relatedAutomations: ["delivery-handover-needed"],
    // Gate-ID ist "delivery" (nicht "delivery-handover")
    relatedHandoverGates: ["delivery"],
    commonMistakes: ["Übergabe nur im Chat", "Scope bleibt unklar"],
    exitCriteria: "Delivery bestätigt ausreichenden Kontext.",
  },
  {
    id: "invoice-admin",
    order: 12,
    title: "Übergabe an Rechnung/Admin",
    purpose: "Rechnungsstellung ohne Rückfragen ermöglichen.",
    entryCriteria: "Rechnungsübergabe nötig ist gesetzt.",
    roleHints: {
      management: "klärt Sonderkonditionen und Zahlungslogik.",
      trainer: "ergänzt Leistungsdaten und Kundeninfos.",
    },
    minimumInfo: [
      "Preis",
      "Rechnungsempfänger",
      "Adresse",
      "Zahlungsbedingungen",
      "Leistungsdatum",
    ],
    fields: ["invoiceHandoverNeeded", "documentLink"],
    checklist: [
      "Rechnungsinfos prüfen",
      "Lücken markieren",
      "Admin informieren",
    ],
    aiHelp: ["Rechnungsinformationen extrahieren"],
    relatedPrompts: ["invoice-check"],
    relatedAutomations: ["invoice-handover-needed"],
    relatedHandoverGates: ["invoice-admin"],
    commonMistakes: ["Admin muss Preis oder Adresse suchen"],
    exitCriteria: "Admin bestätigt Rechnungsfähigkeit.",
  },
  {
    id: "close",
    order: 13,
    title: "Sales-Karte abschließen",
    purpose:
      "Sales-Fall schließen, sobald relevante Übergaben erledigt sind.",
    entryCriteria:
      "Alle nötigen Gates sind erledigt oder bewusst nicht nötig.",
    roleHints: {
      management: "prüft nur kritische Fälle.",
      trainer:
        "schließt eigene Karten nach erledigter Übergabe.",
    },
    minimumInfo: ["Abschlussnotiz", "Links zu Folgeprojekt/Übergaben"],
    fields: ["offerStatus", "documentLink"],
    checklist: [
      "Gates prüfen",
      "Abschlussnotiz setzen",
      "Karte schließen",
    ],
    aiHelp: ["Abschlussnotiz erstellen"],
    relatedPrompts: [],
    relatedAutomations: ["ready-for-close-hint"],
    relatedHandoverGates: [],
    commonMistakes: ["Karte bleibt offen", "Übergabe unvollständig"],
    exitCriteria: "Karte ist abgeschlossen oder archiviert.",
  },
  {
    id: "archive",
    order: 14,
    title: "Archiv / Parken",
    purpose:
      "Nicht aktive Chancen bewusst schließen, lernen oder später reaktivieren.",
    entryCriteria:
      "Chance ist verloren, erledigt, geparkt oder später relevant.",
    roleHints: {
      management: "prüft wichtige Lost Deals und Reaktivierungen.",
      trainer: "setzt Archivgrund und Wiedervorlage.",
    },
    minimumInfo: [
      "Archivgrund",
      "kurzes Learning",
      "Reaktivierungsdatum falls geparkt",
    ],
    fields: ["archiveReason", "reactivationDate"],
    checklist: ["Grund setzen", "Learning notieren", "Wiedervorlage setzen"],
    aiHelp: ["Archivnotiz vorschlagen"],
    relatedPrompts: ["archive-reactivation-note"],
    relatedAutomations: ["archive-reason-required", "reactivation-reminder"],
    relatedHandoverGates: ["archive-reactivation"],
    commonMistakes: ["Karte löschen", "geparkt ohne Datum"],
    exitCriteria: "Karte ist bewusst archiviert oder reaktivierbar.",
  },
] as const;
