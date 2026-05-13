import type { Automation } from "./types";

export const automations: Automation[] = [
  // Content-Pipeline
  {
    board: "Content-Pipeline",
    trigger: "Task wechselt zu 'In Arbeit'",
    aktion: "Kommentar: 'Entwurf-Deadline bitte setzen' + Owner benachrichtigen",
    painPoint: "Entwürfe bleiben offen ohne Deadline",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Content-Pipeline",
    trigger: "Fälligkeitsdatum überschritten + Status nicht 'Live'",
    aktion: "Board Owner wird benachrichtigt, Task wird rot markiert",
    painPoint: "Veröffentlichungstermine werden vergessen",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Content-Pipeline",
    trigger: "Task in 'Freigabe' seit mehr als 2 Tagen ohne Änderung",
    aktion: "Erinnerung an P01 (Freigabe ausstehend)",
    painPoint: "Freigaben blockieren den Content-Flow",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Content-Pipeline",
    trigger: "Task wechselt zu 'Veröffentlicht'",
    aktion: "Subtask 'Auswertung anlegen' wird automatisch erstellt",
    painPoint: "Auswertungen werden vergessen",
    prioritaet: "mittel",
    status: "sofort",
  },
  {
    board: "Content-Pipeline",
    trigger: "Task bleibt 30 Tage in 'Ideen-Pool' ohne Fortschritt",
    aktion: "Kommentar: 'Noch relevant? Priorisieren oder archivieren.'",
    painPoint: "Ideen-Pool wird zur Friedhofsliste",
    prioritaet: "niedrig",
    status: "spaeter",
  },

  // Sales to Service
  {
    board: "Sales to Service",
    trigger: "Neuer Task in 'Neue Anfragen'",
    aktion: "Automatische Zuweisung an P01, Priorität auf 'Mittel'",
    painPoint: "Anfragen werden nicht rechtzeitig bearbeitet",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Sales to Service",
    trigger: "Task 5 Tage in 'Angebote in Arbeit' ohne Änderung",
    aktion: "Erinnerung an Owner: 'Angebot in Arbeit – Update nötig?'",
    painPoint: "Angebote dauern zu lang",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Sales to Service",
    trigger: "Entscheidungsdatum überschritten",
    aktion: "Board Owner wird benachrichtigt, Task rot markiert",
    painPoint: "Follow-ups werden vergessen",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Sales to Service",
    trigger: "Task wechselt zu 'Gewonnen'",
    aktion: "Subtask 'Übergabe an Delivery vorbereiten' automatisch erstellt + Fälligkeit in 3 Tagen",
    painPoint: "Übergaben an Delivery passieren zu spät oder unvollständig",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Sales to Service",
    trigger: "Task wechselt zu 'Verloren'",
    aktion: "Subtask 'Lernpunkt dokumentieren' erstellt",
    painPoint: "Verluste werden nicht analysiert",
    prioritaet: "mittel",
    status: "sofort",
  },

  // Client Delivery
  {
    board: "Client Delivery",
    trigger: "Task in 'Abschluss ausstehend' seit mehr als 14 Tagen",
    aktion: "Erinnerung an P02: 'Abschlussdoku noch ausstehend'",
    painPoint: "Projekte enden ohne Dokumentation",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Client Delivery",
    trigger: "Meilenstein-Datum erreicht",
    aktion: "Kommentar: 'Meilenstein-Review mit Kunden durchgeführt?' automatisch",
    painPoint: "Meilensteine werden übersehen",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Client Delivery",
    trigger: "Rechnungsstatus 'Ausstehend' seit mehr als 30 Tagen",
    aktion: "Erinnerung an P03 für Mahnwesen",
    painPoint: "Offene Rechnungen werden nicht verfolgt",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Client Delivery",
    trigger: "Task wechselt zu 'Abgeschlossen'",
    aktion: "Subtask 'Case Study prüfen?' erstellt + Subtask 'Folgeangebot überlegen?' erstellt",
    painPoint: "Kundenpotenzial nach Projektende nicht genutzt",
    prioritaet: "mittel",
    status: "spaeter",
  },

  // Ausbildung & Training
  {
    board: "Ausbildung & Training",
    trigger: "Startdatum in 4 Wochen + Teilnehmerzahl unter Minimum",
    aktion: "Alert an P04 und P01: 'TN-Zahl zu gering — Entscheidung nötig'",
    painPoint: "Zu späte Reaktion bei zu wenig Anmeldungen",
    prioritaet: "hoch",
    status: "plan-abhaengig",
  },
  {
    board: "Ausbildung & Training",
    trigger: "Kohorte wechselt zu 'Laufend'",
    aktion: "Subtask 'Feedback-Bögen vorbereiten' und 'Abwesenheitsliste anlegen' erstellt",
    painPoint: "Vorbereitung während laufender Ausbildung vergessen",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Ausbildung & Training",
    trigger: "Kohorte wechselt zu 'Abschluss & Auswertung'",
    aktion: "Subtasks: 'Zertifikate ausstellen', 'Rechnung stellen', 'Evaluation auswerten' erstellt",
    painPoint: "Abschluss-Aufgaben werden vergessen oder verzögert",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Ausbildung & Training",
    trigger: "Neue Anmeldung (Feld aktualisiert auf > 10 Teilnehmer)",
    aktion: "Kommentar: 'Bestätigungsmail an Teilnehmer senden'",
    painPoint: "Anmeldebestätigungen werden vergessen",
    prioritaet: "mittel",
    status: "plan-abhaengig",
  },

  // Internal Operations
  {
    board: "Internal Operations",
    trigger: "Compliance-relevanter Task 7 Tage vor Fälligkeit",
    aktion: "Priorität auf 'Hoch' setzen + Benachrichtigung an Owner",
    painPoint: "Compliance-Fristen werden verpasst",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Internal Operations",
    trigger: "Task in 'Blockiert' seit mehr als 7 Tagen",
    aktion: "Automatische Benachrichtigung an P01",
    painPoint: "Blockierte Tasks verschwinden ohne Eskalation",
    prioritaet: "hoch",
    status: "sofort",
  },
  {
    board: "Internal Operations",
    trigger: "Task in 'Wartet auf Input' seit mehr als 14 Tagen",
    aktion: "Kommentar: 'Follow-up extern nötig? Owner bitte prüfen.'",
    painPoint: "Externe Abhängigkeiten werden nicht verfolgt",
    prioritaet: "mittel",
    status: "sofort",
  },
  {
    board: "Internal Operations",
    trigger: "Erster des Monats",
    aktion: "Monatliche Tasks werden aktiviert und Owner benachrichtigt",
    painPoint: "Monatliche Aufgaben werden vergessen",
    prioritaet: "hoch",
    status: "spaeter",
  },
];

export const automationAntiPatterns = [
  {
    antiPattern: "Benachrichtigung bei jeder Task-Änderung",
    problem: "Führt zu Notification-Flut, die alle ignorieren",
    besser: "Nur bei Statuswechsel in kritische Sections (Blockiert, Freigabe, Überfällig)",
  },
  {
    antiPattern: "Alle Team-Mitglieder bei jeder Automation benachrichtigen",
    problem: "Jeder ignoriert Meldungen, weil sie nicht relevant sind",
    besser: "Nur den direkten Owner und die nächste Verantwortliche benachrichtigen",
  },
  {
    antiPattern: "Täglich wiederkehrende Erinnerungen für dieselbe Aufgabe",
    problem: "Nervt, wird ignoriert, erzeugt Reaktanz",
    besser: "Einmalige Erinnerung zum richtigen Zeitpunkt, dann eskalieren wenn keine Reaktion",
  },
  {
    antiPattern: "Automation ohne klaren Handlungsauftrag",
    problem: "Benachrichtigung kommt an, aber niemand weiß was zu tun ist",
    besser: "Jede Automation-Nachricht enthält: Was, Warum, Wer soll handeln, Was ist der nächste Schritt",
  },
  {
    antiPattern: "Zu viele Subtasks automatisch erstellen",
    problem: "Board wird unübersichtlich, echte Prioritäten verschwinden",
    besser: "Maximal 2-3 Subtasks pro Automation, nur für wirklich kritische Folgeschritte",
  },
];

export const automationBoards = [
  "Content-Pipeline",
  "Sales to Service",
  "Client Delivery",
  "Ausbildung & Training",
  "Internal Operations",
];
