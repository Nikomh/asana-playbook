// ── Sales-Prozess Automationen — Workshop-Ergebnis ───────────
// Priorisierung aus simuliertem Workshop mit Sales Ops, Asana-Adoption,
// Trainer/Berater und Admin/Übergabe-Perspektive.

export type AutomationPriority = "must" | "should" | "could";

export interface AutomationRule {
  id: string;
  number: number;
  title: string;
  lifecycle: string;
  painPoint: string;
  trigger: string;
  condition: string;
  action: string;
  subtasks?: readonly string[];
  whyThisPriority: string;
  guardrail: string;
  workshopNote?: string;
  priority: AutomationPriority;
  topRank?: number; // 1–7 if in the prioritized top set
}

export interface WontHaveRule {
  automation: string;
  reason: string;
}

export interface LifecycleGroup {
  phase: string;
  must: readonly string[];   // rule IDs
  should: readonly string[];
  could: readonly string[];
}

// ── Must Have ─────────────────────────────────────────────────

export const mustHaveRules: readonly AutomationRule[] = [
  {
    id: "rule-01",
    number: 1,
    title: "Neuer Lead braucht Mindestdaten",
    lifecycle: "Lead / Anfrage erfassen",
    painPoint: "Leads verschwinden oder sind nicht bearbeitbar.",
    trigger: "Neue Aufgabe wird im Board erstellt oder in Lead / Anfrage verschoben.",
    condition: "Kunde, Kontaktperson, Lead Type, Verantwortlicher oder Fälligkeitsdatum fehlt.",
    action:
      'Kommentar an Ersteller/Verantwortlichen: „Bitte Mindestdaten ergänzen: Kunde, Kontaktperson, Lead Type, Verantwortlicher, nächster Schritt mit Fälligkeitsdatum."',
    whyThisPriority:
      "Ohne Mindestdaten entsteht wieder das alte Kopf-/E-Mail-System.",
    guardrail: "Nicht automatisch ausfüllen, nur erinnern.",
    workshopNote:
      "Wir automatisieren hier keine Zuweisung. Der Mensch, der die Chance kennt, muss Owner und nächsten Schritt setzen.",
    priority: "must",
    topRank: 4,
  },
  {
    id: "rule-02",
    number: 2,
    title: "Lead ohne Verantwortlichen wird sichtbar",
    lifecycle: "Lead / Anfrage erfassen",
    painPoint: "Niemand fühlt sich zuständig.",
    trigger: "Aufgabe wird erstellt oder Status = Lead.",
    condition: "Verantwortlicher fehlt.",
    action:
      'Kommentar: „Bitte Verantwortliche:n setzen. Jede aktive Sales-Karte braucht genau eine Person."',
    whyThisPriority:
      "Ownership ist die Grundlage für jeden weiteren Workflow.",
    guardrail:
      "Nicht automatisch Geschäftsführung zuweisen, sonst wird GF Flaschenhals.",
    priority: "must",
    topRank: 5,
  },
  {
    id: "rule-03",
    number: 3,
    title: "Erstgespräch / Bedarf braucht nächsten Schritt",
    lifecycle: "Erstgespräch vorbereiten / führen / nachhalten",
    painPoint: "Gespräche werden geführt, aber Ergebnisse bleiben diffus.",
    trigger: "Status wird auf Erstgespräch oder Bedarf klären gesetzt.",
    condition: "Fälligkeitsdatum fehlt.",
    action:
      'Kommentar: „Bitte nächsten Schritt mit Datum setzen: Gespräch vorbereiten, Gespräch führen oder Gespräch nachhalten."',
    whyThisPriority: "Verhindert Karten ohne Bewegung.",
    guardrail:
      "Kein automatisches Datum setzen, weil Timing kontextabhängig ist.",
    priority: "must",
  },
  {
    id: "rule-04",
    number: 4,
    title: "Angebot in Erstellung braucht Leistung",
    lifecycle: "Angebot in Erstellung",
    painPoint: "Angebote starten ohne klaren Angebotstyp oder Scope.",
    trigger: "Status wird auf Angebot in Erstellung gesetzt.",
    condition: "Leistung fehlt.",
    action:
      'Kommentar: „Bitte Leistung setzen, damit passende Vorlage, Preislogik und Angebotsinput klar sind."',
    whyThisPriority:
      "Leistung ist der Schlüssel zur richtigen Vorlage und Übergabe.",
    guardrail: "Keine Preisentscheidung automatisieren.",
    priority: "must",
  },
  {
    id: "rule-05",
    number: 5,
    title: "Angebot versendet braucht Follow-up-Datum",
    lifecycle: "Angebot versenden",
    painPoint: "Angebote verschwinden nach Versand.",
    trigger: "Status wird auf Angebot versendet gesetzt.",
    condition: "Fälligkeitsdatum fehlt.",
    action:
      'Kommentar/Subtask: „Bitte Follow-up-Datum setzen. Angebot versendet ohne Follow-up ist nicht vollständig."',
    whyThisPriority:
      "Höchster direkter Impact auf Sales-Verlässlichkeit.",
    guardrail: "Asana soll kein Datum raten.",
    priority: "must",
    topRank: 1,
  },
  {
    id: "rule-06",
    number: 6,
    title: "Angebot versendet aktualisiert Letzter Kontakt",
    lifecycle: "Angebot versenden",
    painPoint: "Niemand sieht, wann zuletzt Kontakt war.",
    trigger: "Status wird auf Angebot versendet gesetzt.",
    condition: "Immer.",
    action:
      'Kommentar: „Bitte Letzter Kontakt auf Versanddatum aktualisieren."',
    whyThisPriority:
      "Letzter Kontakt ist zentral für Follow-up-Steuerung.",
    guardrail:
      "Falls Asana das Feld automatisch setzen kann: nur auf heutiges Datum setzen, wenn Versand tatsächlich heute erfolgt.",
    priority: "must",
  },
  {
    id: "rule-07",
    number: 7,
    title: "Follow-up fällig erinnert Verantwortlichen",
    lifecycle: "Follow-up / Rückmeldung steuern",
    painPoint: "Nachfassen bleibt im Kopf.",
    trigger: "Fälligkeitsdatum ist heute.",
    condition:
      "Status ist aktiv, nicht Gewonnen, Verloren, Geparkt oder Abgeschlossen.",
    action: 'Verantwortlichen benachrichtigen: „Follow-up heute fällig."',
    whyThisPriority: "Ersetzt mentale Erinnerung.",
    guardrail: "Keine Eskalation in Version 1. Erst Owner erinnern.",
    priority: "must",
    topRank: 2,
  },
  {
    id: "rule-08",
    number: 8,
    title: "Gewonnen erzeugt Übergabe-Checkliste",
    lifecycle: "Angebot angenommen / gewonnen",
    painPoint: "Gewonnen wird mit fertig verwechselt.",
    trigger: "Status wird auf Gewonnen gesetzt.",
    condition: "Immer.",
    action: "Subtasks erstellen für alle relevanten Übergabeschritte.",
    subtasks: [
      "Projektanlage prüfen",
      "Delivery-Briefing / Durchführungskontext ergänzen",
      "Rechnungsinfos prüfen",
      "Kunde, Kontaktperson, Leistung final prüfen",
      "Link zum Angebot / relevanten Dokument ergänzen",
    ],
    whyThisPriority: "Kritischster Übergabeschutz.",
    guardrail: "Subtasks nicht automatisch abhaken. Mensch prüft.",
    priority: "must",
    topRank: 3,
  },
  {
    id: "rule-09",
    number: 9,
    title: "Gewonnen ohne Kunde / Kontakt / Leistung wird markiert",
    lifecycle: "Angebot angenommen / gewonnen",
    painPoint: "Übergabe an Delivery/Admin ist nicht arbeitsfähig.",
    trigger: "Status wird auf Gewonnen gesetzt.",
    condition: "Kunde, Kontaktperson oder Leistung fehlt.",
    action:
      'Kommentar: „Diese Karte ist gewonnen, aber nicht übergabefähig. Bitte Kunde, Kontaktperson und Leistung ergänzen."',
    whyThisPriority:
      "Schützt Projektanlage, Delivery und Admin.",
    guardrail: "Nicht blockieren, aber sichtbar machen.",
    priority: "must",
    topRank: 6,
  },
  {
    id: "rule-10",
    number: 10,
    title: "Geparkt braucht Wiedervorlage",
    lifecycle: "Archiv / geparkt",
    painPoint: "Geparkte Chancen verschwinden dauerhaft.",
    trigger: "Status wird auf Geparkt oder Später wieder aufnehmen gesetzt.",
    condition: "Fälligkeitsdatum fehlt.",
    action:
      'Kommentar: „Bitte Wiedervorlage-Datum setzen oder bewusst als verloren markieren."',
    whyThisPriority: "Parken wird nicht zum Vergessen.",
    guardrail: "Kein automatisches Reaktivierungsdatum setzen.",
    priority: "must",
    topRank: 7,
  },
];

// ── Should Have ───────────────────────────────────────────────

export const shouldHaveRules: readonly AutomationRule[] = [
  {
    id: "rule-11",
    number: 11,
    title: "Niedrige Konfidenz erzeugt Klärungsfrage",
    lifecycle: "Lead / Bedarf klären / Angebot",
    painPoint:
      "Unsichere Chancen laufen weiter, ohne dass klar ist, was fehlt.",
    trigger: "Konfidenz wird auf Niedrig gesetzt.",
    condition: "Status ist aktiv.",
    action:
      'Kommentar: „Was fehlt, um die Konfidenz zu erhöhen? Bitte offene Frage oder nächsten Klärungsschritt ergänzen."',
    whyThisPriority:
      "Hilft bei Qualifikation, ohne zu viel Prozessdruck.",
    guardrail: "Nicht jede niedrige Konfidenz eskalieren.",
    priority: "should",
  },
  {
    id: "rule-12",
    number: 12,
    title: "Hohe Konfidenz + Angebot versendet wird priorisiert",
    lifecycle: "Angebot versendet / Follow-up",
    painPoint: "Heiße Chancen gehen im Alltag unter.",
    trigger: "Status = Angebot versendet und Konfidenz = Hoch.",
    condition: "Fälligkeitsdatum vorhanden.",
    action:
      'Kommentar: „Hohe Konfidenz: Follow-up aktiv im Blick behalten." Optional GF als Collaborator.',
    whyThisPriority: "Gute Chancen bekommen Aufmerksamkeit.",
    guardrail:
      "GF erst nach Pilot automatisch hinzufügen, sonst Mikromanagement-Risiko.",
    priority: "should",
  },
  {
    id: "rule-13",
    number: 13,
    title: "Letzter Kontakt ist zu alt",
    lifecycle: "Follow-up / Rückmeldung steuern",
    painPoint: "Karten wirken aktiv, obwohl lange nichts passiert ist.",
    trigger:
      "Wiederkehrend wöchentlich oder per Regel, falls Asana Datumslogik erlaubt.",
    condition: "Letzter Kontakt älter als X Tage und Status aktiv.",
    action:
      'Kommentar: „Letzter Kontakt ist älter als X Tage. Bitte Status prüfen: nachfassen, parken oder archivieren."',
    whyThisPriority:
      "Bereinigt Pipeline und verhindert veraltete Karten.",
    guardrail: "X gemeinsam definieren, z. B. 14 oder 30 Tage.",
    priority: "should",
  },
  {
    id: "rule-14",
    number: 14,
    title: "Bestandskunde mit hoher Konfidenz sichtbar machen",
    lifecycle: "Lead erfassen / Qualifikation",
    painPoint:
      "Bestandskundenchancen sind wertvoll, aber nicht immer priorisiert.",
    trigger: "Lead Type = Bestandskunde.",
    condition: "Konfidenz = Hoch oder leer.",
    action:
      'Kommentar: „Bestandskundenchance: bitte Priorität und nächsten Schritt prüfen."',
    whyThisPriority:
      "Bestandskunden sind oft schneller konvertierbar.",
    guardrail: "Nicht automatisch gewinnen oder eskalieren.",
    priority: "should",
  },
  {
    id: "rule-15",
    number: 15,
    title: "Angebot in Erstellung ohne Fälligkeit",
    lifecycle: "Angebot in Erstellung",
    painPoint: "Angebote bleiben halbfertig.",
    trigger: "Status = Angebot in Erstellung.",
    condition: "Fälligkeitsdatum fehlt.",
    action:
      'Kommentar: „Bitte Fälligkeitsdatum für Angebotsentwurf oder Versand setzen."',
    whyThisPriority: "Reduziert Angebotsstau.",
    guardrail: "Nicht automatisch Deadline setzen.",
    priority: "should",
  },
  {
    id: "rule-16",
    number: 16,
    title: "Verloren braucht kurzen Grund",
    lifecycle: "Archiv / verloren",
    painPoint: "Verlorene Chancen erzeugen kein Learning.",
    trigger: "Status wird auf Verloren gesetzt.",
    condition: "Keine aktuelle Kommentarnotiz oder Feld für Grund fehlt.",
    action:
      'Kommentar: „Bitte kurz Lost Reason dokumentieren: Preis, Timing, Fit, Wettbewerb, keine Rückmeldung, anderes."',
    whyThisPriority: "Macht späteres Lernen möglich.",
    guardrail: "Kein großes Lost-Deal-Formular. Ein Satz reicht.",
    priority: "should",
  },
];

// ── Could Have ────────────────────────────────────────────────

export const couldHaveRules: readonly AutomationRule[] = [
  {
    id: "rule-17",
    number: 17,
    title: "Reaktivierung fällig",
    lifecycle: "Archiv / später wieder aufnehmen",
    painPoint: "Wiedervorlagen werden übersehen.",
    trigger: "Fälligkeitsdatum ist heute.",
    condition: "Status = Später wieder aufnehmen oder Geparkt.",
    action:
      'Kommentar: „Bitte entscheiden: reaktivieren, weiter parken oder verloren schließen."',
    whyThisPriority:
      "Nützlich, aber erst wenn Parken regelmäßig genutzt wird.",
    guardrail: "Nicht automatisch zurück in Lead verschieben.",
    priority: "could",
  },
  {
    id: "rule-18",
    number: 18,
    title: "Wöchentlicher Sales Cleanup Task",
    lifecycle: "Gesamter Workflow",
    painPoint: "Board veraltet langsam.",
    trigger: "Wöchentlich, z. B. Montag 09:00.",
    condition: "Immer.",
    action:
      'Wiederkehrende Aufgabe erstellen: „Sales-to-Service Cleanup: überfällige, gewonnene und geparkte Karten prüfen."',
    whyThisPriority: "Unterstützt Team-Routine.",
    guardrail: "Nur eine Team-Routine, keine vielen Reminder.",
    priority: "could",
  },
  {
    id: "rule-19",
    number: 19,
    title: "Trainer-Karte mit Unterstützungsbedarf sichtbar machen",
    lifecycle: "Lead / Angebot",
    painPoint:
      "Trainer/Berater brauchen Unterstützung, aber es fehlt ein dediziertes Feld.",
    trigger:
      "Kommentar enthält @GF, Preisfrage, Scopefrage oder Tag Unterstützung benötigt.",
    condition: "Karte ist aktiv.",
    action: "Geschäftsführung als Collaborator hinzufügen.",
    whyThisPriority:
      "Hilft Trainer/Berater, Unterstützung sichtbar zu machen.",
    guardrail:
      "Nur nutzen, wenn ein klares Marker-Wort vereinbart ist.",
    priority: "could",
  },
  {
    id: "rule-20",
    number: 20,
    title: "Konfidenz leer bei Angebot versendet",
    lifecycle: "Angebot versendet",
    painPoint: "Offen, wie realistisch die Chance ist.",
    trigger: "Status = Angebot versendet.",
    condition: "Konfidenz leer.",
    action:
      'Kommentar: „Bitte Konfidenz einschätzen: niedrig, mittel oder hoch."',
    whyThisPriority: "Hilft beim Priorisieren.",
    guardrail: "Nicht zu viele Pflichtfelder am Anfang.",
    priority: "could",
  },
];

// ── Won't Have ────────────────────────────────────────────────

export const wontHaveRules: readonly WontHaveRule[] = [
  {
    automation: "Status automatisch auf Gewonnen setzen",
    reason: "Kundenzusagen brauchen menschliche Interpretation.",
  },
  {
    automation: "Verantwortlichen automatisch erraten",
    reason: "Falsche Zuweisung erzeugt mehr Chaos als Nutzen.",
  },
  {
    automation: "Angebot automatisch versenden",
    reason: "Kundenkommunikation braucht menschliche Freigabe.",
  },
  {
    automation: "Preis oder Leistung automatisch festlegen",
    reason: "Wirtschaftlich und strategisch zu sensibel.",
  },
  {
    automation: "Karte automatisch archivieren",
    reason: "Risiko, wertvolle Chancen zu verlieren.",
  },
  {
    automation: "Geschäftsführung bei jeder überfälligen Karte hinzufügen",
    reason: "Führt zu Notification-Flut und Mikromanagement.",
  },
  {
    automation: "Follow-up-Datum automatisch setzen",
    reason: "Timing hängt von Beziehung und Kontext ab.",
  },
  {
    automation: "Delivery oder Rechnung automatisch als erledigt markieren",
    reason: "Übergabe braucht Bestätigung.",
  },
];

// ── Top 7 ─────────────────────────────────────────────────────

export const top7: readonly { rank: number; ruleId: string; why: string }[] = [
  {
    rank: 1,
    ruleId: "rule-05",
    why: "Größter Sales-Hebel: kein Angebot ohne Follow-up.",
  },
  {
    rank: 2,
    ruleId: "rule-07",
    why: "Verhindert verlorene Chancen durch vergessenes Nachfassen.",
  },
  {
    rank: 3,
    ruleId: "rule-08",
    why: "Verhindert Service-/Admin-Bruch nach Annahme.",
  },
  {
    rank: 4,
    ruleId: "rule-01",
    why: "Verhindert Pipeline-Chaos durch fehlende Mindestdaten.",
  },
  {
    rank: 5,
    ruleId: "rule-02",
    why: "Ownership ist Grundbedingung jedes weiteren Schritts.",
  },
  {
    rank: 6,
    ruleId: "rule-09",
    why: "Schützt Übergabequalität an Delivery und Admin.",
  },
  {
    rank: 7,
    ruleId: "rule-10",
    why: "Verhindert, dass Parken zum dauerhaften Vergessen wird.",
  },
];

// ── Combined export ───────────────────────────────────────────

export const allRules: readonly AutomationRule[] = [
  ...mustHaveRules,
  ...shouldHaveRules,
  ...couldHaveRules,
];
