import type { GlossaryEntry, WorkingRule } from "./types";

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: "Board",
    definition:
      "Ein Asana-Projekt, das einem bestimmten Bereich oder Thema gewidmet ist. Agile X nutzt Boards als operative Steuerungseinheit — jedes Board hat einen Owner und klare Verantwortlichkeiten.",
    beispiel: "Content & Marketing Kalender, Sales Operations & Angebotsarbeit",
  },
  {
    term: "Section",
    definition:
      "Eine Spalte oder Kategorie innerhalb eines Boards. Sections strukturieren den Workflow — ein Task wandert von Section zu Section und spiegelt damit seinen Status wider.",
    beispiel: "Neue Anfragen → Qualifizierung → Angebote in Arbeit → Gewonnen",
  },
  {
    term: "Task",
    definition:
      "Eine einzelne Arbeitseinheit in Asana. Jeder Task hat einen Titel, einen Owner, ein Fälligkeitsdatum und gehört zu einer Section. Subtasks sind kleinere Teilschritte innerhalb eines Tasks.",
    beispiel: "'LinkedIn-Post: Agile Missverständnisse' — Owner: P03, Fällig: 15.06.",
  },
  {
    term: "Subtask",
    definition:
      "Ein Task innerhalb eines anderen Tasks. Subtasks werden für einzelne Schritte eines größeren Auftrags genutzt — z.B. 'Entwurf schreiben', 'Review abwarten', 'Freigabe einholen' innerhalb eines Content-Tasks.",
  },
  {
    term: "Custom Field",
    definition:
      "Ein individuell definiertes Datenfeld das an Tasks angehängt wird. Agile X nutzt Custom Fields um Informationen wie Angebotstyp, Status, Priorität oder Kanal strukturiert zu speichern — ohne alles in den Task-Titel oder die Beschreibung zu schreiben.",
    beispiel: "Custom Field 'Kanal' mit Optionen: LinkedIn, Newsletter, Website",
  },
  {
    term: "Dokument-Link",
    definition:
      "Ein Link zu einem Dokument in SharePoint, OneDrive oder einem anderen System der direkt in einem Asana-Task hinterlegt ist. Ziel: Kein Suchen — alle relevanten Dateien sind per Klick erreichbar.",
    beispiel: "Task 'Angebot Pharmakunde' enthält Link zum Angebots-PDF in SharePoint",
  },
  {
    term: "Owner",
    definition:
      "Die Person die für einen Task oder ein Board hauptverantwortlich ist. Ein Task ohne Owner ist nicht vollständig. Bei Asana-Boards ist der Board Owner für die Pflege, Struktur und Routine zuständig.",
  },
  {
    term: "Übergabe (Handoff)",
    definition:
      "Der strukturierte Transfer eines Tasks oder Auftrags von einem Board in ein anderes. Eine gute Übergabe enthält: Auslöser, Mindestinformationen, Verantwortliche und Links zu allen relevanten Dokumenten.",
  },
  {
    term: "Asana Rule / Automatisierung",
    definition:
      "Eine automatische Aktion die ausgelöst wird wenn ein bestimmtes Ereignis eintritt. Beispiel: Wenn ein Task zu 'Gewonnen' wechselt, wird automatisch ein Subtask 'Übergabe vorbereiten' erstellt.",
    beispiel: "Trigger: Status = 'Blockiert' seit 7 Tagen → Aktion: P01 benachrichtigen",
  },
  {
    term: "Lifecycle",
    definition:
      "Der typische Weg den ein Task von der Entstehung bis zum Abschluss nimmt. Jedes Board hat einen Lifecycle der die Sections und ihren Zusammenhang beschreibt.",
    beispiel: "Sales Lifecycle: Anfrage → Qualifizierung → Angebot → Verhandlung → Entscheidung",
  },
  {
    term: "Board Owner",
    definition:
      "Die Person die ein Asana-Board pflegt, strukturiert und die Routinen dafür verantwortet. Der Board Owner ist nicht zwingend der Owner jedes einzelnen Tasks — aber er sorgt dafür, dass das Board funktioniert.",
  },
  {
    term: "Working Agreement",
    definition:
      "Eine gemeinsam vereinbarte Arbeitsregel für ein Board oder für das gesamte Team. Working Agreements werden direkt im Board dokumentiert und gelten für alle die im Board arbeiten.",
    beispiel: "Working Agreement: 'Jeder Task hat einen Owner. Tasks ohne Owner werden zurückgefragt.'",
  },
  {
    term: "SharePoint",
    definition:
      "Die Plattform für dauerhafte Dokumente, Playbooks und Vorlagen. SharePoint ist kein Asana-Ersatz — es ist die Ablage für Wissen das länger als ein Projekt gilt.",
  },
  {
    term: "Knowledge Management",
    definition:
      "Die dauerhafte Ablage und Pflege von wiederverwendbarem Wissen. Bei Agile X: SharePoint-Dokumentenbibliothek für Playbooks, SOPs und Vorlagen.",
  },
  {
    term: "SOP (Standard Operating Procedure)",
    definition:
      "Eine dokumentierte Schritt-für-Schritt-Anleitung für einen wiederkehrenden Prozess. SOPs liegen in SharePoint und werden bei Bedarf verlinkt — nicht in Asana abgespeichert.",
    beispiel: "SOP: 'Anmeldeprozess für IHK-Ausbildungen'",
  },
  {
    term: "Tactical Meeting",
    definition:
      "Das wöchentliche kurze Team-Meeting (15-30 Minuten) zur Klärung von Blockaden, offenen Punkten und Priorisierungen. Kein Statusbericht — nur was ist blockiert und was braucht Entscheidung.",
  },
];

export const workingRules: WorkingRule[] = [
  {
    nr: 1,
    regel: "Keine Aufgabe ohne Owner.",
    begruendung:
      "Tasks ohne Owner werden nie erledigt. Wenn unklar ist wer zuständig ist, sofort klären — nicht einfach anlegen.",
  },
  {
    nr: 2,
    regel: "Kein Task ohne nächsten Schritt.",
    begruendung:
      "Der nächste konkrete Schritt muss erkennbar sein — als Subtask, Kommentar oder Fälligkeitsdatum. 'In Bearbeitung' ohne klare nächste Aktion ist kein Status.",
  },
  {
    nr: 3,
    regel: "Links statt Sucharbeit.",
    begruendung:
      "Jeder Task der auf ein Dokument verweist, enthält den direkten Link in Asana. Niemand soll in SharePoint oder OneDrive suchen müssen.",
  },
  {
    nr: 4,
    regel: "Board-Wechsel ist Übergabe — immer strukturiert.",
    begruendung:
      "Wenn ein Thema von einem Board in ein anderes wandert, wird das als Übergabe mit Mindestinfos gemacht — nicht als mündliche Weitergabe.",
  },
  {
    nr: 5,
    regel: "Automatisierung reduziert Notification-Flut — nicht erhöht.",
    begruendung:
      "Jede neue Asana-Rule wird daraufhin geprüft: Erhöht das Benachrichtigungen oder verringert es Sucharbeit? Im Zweifel: keine Rule.",
  },
  {
    nr: 6,
    regel: "Asana ist tägliche Steuerung, SharePoint ist dauerhaftes Wissen.",
    begruendung:
      "Ein Angebot, eine SOP oder ein Playbook gehört in SharePoint — nicht als Anhang in einen Asana-Task. Asana verlinkt auf SharePoint.",
  },
  {
    nr: 7,
    regel: "Custom Fields vollständig ausfüllen bevor ein Task in Review geht.",
    begruendung:
      "Unvollständige Custom Fields bedeuten: Berichterstattung und Suche funktionieren nicht. Vollständigkeit ist die Voraussetzung für jede Übergabe.",
  },
  {
    nr: 8,
    regel: "KI hilft bei Vorbereitung, Entwürfen und Strukturierung — ersetzt nicht fachliche Verantwortung.",
    begruendung:
      "KI-Outputs werden immer von der verantwortlichen Person geprüft. Kein KI-Entwurf geht ungeprüft nach außen.",
  },
  {
    nr: 9,
    regel: "Keine vertraulichen Daten in externe KI-Tools.",
    begruendung:
      "Kundennamen, Preise, Vertragsdetails, Mitarbeiterdaten, Steuerdaten — niemals in ChatGPT oder andere externe KI-Dienste eingeben. Anonymisiert arbeiten.",
  },
  {
    nr: 10,
    regel: "Compliance-Fristen haben immer höchste Priorität.",
    begruendung:
      "Gesetzliche und vertragliche Fristen (USt, IHK, Rechnungsstellung) werden nie niedrig priorisiert. Im Board als 'Hoch' markieren und 7-Tage-Vorwarnung einrichten.",
  },
];

export const toolMatrix = [
  {
    tool: "Asana",
    wofuer: "Tägliche Aufgabensteuerung, Projektmanagement, Workflows, Deadlines",
    nichtWofuer: "Dauerhafte Dokumente, Wissensspeicher, Dateispeicherung",
    beispiel: "Jeder Task, jeder Lifecycle, jede Übergabe",
  },
  {
    tool: "SharePoint",
    wofuer: "Playbooks, SOPs, Vorlagen, dauerhafte Arbeitsanweisungen, Projektordner",
    nichtWofuer: "Tagessteuerung, Aufgabenverwaltung",
    beispiel: "Angebotsvorlage, Ausbildungsunterlagen, Abschlussberichte",
  },
  {
    tool: "OneDrive",
    wofuer: "Persönliche Arbeitsdateien, Entwürfe vor SharePoint-Ablage",
    nichtWofuer: "Geteilte Teamdokumente, dauerhafte Ablage",
    beispiel: "Eigene Notizen, Entwürfe",
  },
  {
    tool: "Microsoft Loop",
    wofuer: "Kollaborative Entwürfe, Echtzeitbearbeitung mit mehreren Personen",
    nichtWofuer: "Dauerhaftes Wiki, Asana-Ersatz",
    beispiel: "Workshop-Canvas gemeinsam bearbeiten",
  },
  {
    tool: "Outlook / E-Mail",
    wofuer: "Externe Kommunikation mit Kunden, formale Angebote, Rechnungen",
    nichtWofuer: "Interne Aufgabensteuerung (→ Asana), Wissensablage (→ SharePoint)",
    beispiel: "Angebot versenden, Teilnehmereinladung",
  },
];
