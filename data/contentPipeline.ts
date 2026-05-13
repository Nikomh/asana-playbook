// ─────────────────────────────────────────────────────────────
// Content-Pipeline — zentrales Datenmodell
// Erweitert data/playbooks.ts um tiefgehende interaktive Inhalte
// ─────────────────────────────────────────────────────────────

// ── Lifecycle ────────────────────────────────────────────────

export interface CPLifecyclePhase {
  nr: number;
  label: string;
  kurzbe: string;          // 1-Satz-Beschreibung
  wasPassiert: string;
  owner: string[];
  section: string;
  painPoints: string[];
  needs: string[];
  arbeitsweise: string[];
  promptId?: string;       // Referenz auf Prompt in cpPrompts
  automation?: string;
  definitionOfDone: string[];
}

export const cpLifecycle: CPLifecyclePhase[] = [
  {
    nr: 1,
    label: "Idee",
    kurzbe: "Eine Content-Idee entsteht — sofort festhalten.",
    wasPassiert:
      "Eine Idee entsteht — aus Beratungsarbeit, Kundenfragen, Markttrends oder internen Beobachtungen. Sie wird sofort als Task im Board erfasst. Kein Aufwand nötig, nur ein Titel und die grobe Richtung.",
    owner: ["Alle (P01, P02, P03, P04)"],
    section: "Backlog / Ideen",
    painPoints: [
      "Ideen entstehen in WhatsApp, Gesprächen oder E-Mails und verschwinden wieder",
      "Keine zentrale Sammlung — jede:r hat eine eigene Liste",
      "Gute Ideen aus Beratungsarbeit landen nie im Content",
    ],
    needs: ["Schnelle, reibungslose Ideen-Erfassung", "Niedrigschwellig — keine Pflichtfelder beim Anlegen"],
    arbeitsweise: [
      "Idee sofort als Task anlegen — Titel reicht als Einstieg",
      "Kanal und Zielgruppe können leer bleiben",
      "P02 und P04 liefern aktiv Themen aus Projekten und Ausbildungen",
    ],
    promptId: "cp-ideen",
    definitionOfDone: [
      "Task existiert mit aussagekräftigem Titel",
      "Grobe Einordnung: Kanal oder Zielgruppe genannt (optional)",
    ],
  },
  {
    nr: 2,
    label: "Themenprüfung",
    kurzbe: "Wöchentlich prüfen: Passt die Idee zur Strategie?",
    wasPassiert:
      "P01 und P03 sichten den Backlog wöchentlich. Themen werden bewertet: Passt das zur aktuellen Angebotslogik? Gibt es einen konkreten Anlass? Welche Zielgruppe profitiert? Nicht relevante Ideen werden archiviert.",
    owner: ["P01 (strategisch)", "P03 (operativ)"],
    section: "Backlog / Ideen",
    painPoints: [
      "Ad-hoc-Themen ohne Bezug zur Strategie entstehen unkontrolliert",
      "P01 entscheidet spontan, ohne Monatsplanung",
      "Zielgruppen werden nicht bewusst gewählt",
    ],
    needs: [
      "Klare Kriterien für Themenauswahl",
      "Monatsfokus: Welche Themen passen zu aktuellen Angeboten?",
    ],
    arbeitsweise: [
      "Wöchentliche 15-Minuten-Sitzung: Backlog → Geplant oder Archiv",
      "Kein Thema ohne Antwort auf: Für wen? Warum jetzt?",
      "Monatsplanung als Recurring Task im Board",
    ],
    automation: "Monatlich: Task 'Content-Planung durchführen' automatisch anlegen",
    definitionOfDone: [
      "Thema wurde bewertet: Priorisiert oder archiviert",
      "Monat / Quartal zugeordnet",
      "Grobe Zielgruppe definiert",
    ],
  },
  {
    nr: 3,
    label: "Planung",
    kurzbe: "Briefing vervollständigen: Zielgruppe, Kernaussage, CTA.",
    wasPassiert:
      "Freigegebene Themen bekommen ein vollständiges Briefing. P01 liefert Kernaussage und strategische Richtung, P03 ergänzt Kanalformat und Timing. Ohne vollständiges Briefing beginnt keine Produktion.",
    owner: ["P01 (Kernaussage, Strategie)", "P03 (Kanal, Format, Timing)"],
    section: "Geplant",
    painPoints: [
      "P03 muss aus unvollständigen Inputs Content bauen",
      "Kanalentscheidung fehlt oder kommt zu spät",
      "CTA wird vergessen oder ist unklar",
    ],
    needs: [
      "Pflichtfelder: Zielgruppe, Ziel, Kernaussage, CTA, Kanal",
      "Task-Template pro Content-Typ als Startpunkt",
    ],
    arbeitsweise: [
      "Task-Template verwenden (LinkedIn-Post, Newsletter, Artikel …)",
      "Briefing direkt in Task-Beschreibung — kein Extra-Dokument",
      "'Nächster Schritt' als Subtask sichtbar machen",
    ],
    definitionOfDone: [
      "Zielgruppe definiert",
      "Kernaussage in 1 Satz formuliert",
      "CTA benannt",
      "Kanal und Format entschieden",
      "Fälligkeitsdatum gesetzt",
    ],
  },
  {
    nr: 4,
    label: "Draft",
    kurzbe: "Rohentwurf erstellen — KI als Werkzeug, Mensch als Autor.",
    wasPassiert:
      "P03 erstellt den ersten Entwurf. KI kann Struktur, Einstieg oder Formulierungsalternativen liefern — aber immer als Rohmaterial. P03 überarbeitet auf Brand Voice, Klarheit und Anschlussfähigkeit. Kein unveränderter KI-Text geht in Review.",
    owner: ["P03 (primär)", "P01/P02 (Input auf Anfrage)"],
    section: "In Erstellung",
    painPoints: [
      "KI-Texte klingen formelhaft und generisch",
      "P03 muss stark überarbeiten weil Prompt-Vorlage fehlt",
      "Brand Voice ist nirgends dokumentiert",
      "P01 liefert manchmal KI-Drafts, die direkt weitergeleitet werden",
    ],
    needs: [
      "Brand-Voice-Regeln schriftlich dokumentiert",
      "Prompt-Bibliothek für Draft-Unterstützung",
      "Qualitätscheck vor Review: klingt das noch nach uns?",
    ],
    arbeitsweise: [
      "KI-Draft immer als Rohfassung markieren",
      "Brand-Voice-Checkliste vor Übergabe an Review abhaken",
      "Kundenzitate und Praxisbeispiele einbauen — das macht Texte einzigartig",
    ],
    promptId: "cp-draft",
    definitionOfDone: [
      "Text redigiert — klingt nicht generisch",
      "Kernaussage klar, kein Buzzword-Stapel",
      "CTA vorhanden und konkret",
      "Zielgruppe würde sich angesprochen fühlen",
    ],
  },
  {
    nr: 5,
    label: "Review",
    kurzbe: "P01 prüft Inhalt, Ton und strategische Stimmigkeit.",
    wasPassiert:
      "P03 verschiebt den Task in die Section 'Review P01'. P01 erhält automatisch die Zuweisung + Deadline. Review ist kein Lektorat, sondern strategische Prüfung: Passt das zur aktuellen Botschaft? Ist der CTA richtig?",
    owner: ["P01 (Reviewer)", "P03 (Author, wartet auf Feedback)"],
    section: "Review P01",
    painPoints: [
      "Freigabe läuft über Screenshots und WhatsApp",
      "Review geht in der Nachrichtenflut unter",
      "P03 wartet ohne klares Datum auf Rückmeldung",
      "Review-Frage fehlt — P01 weiß nicht was geprüft werden soll",
    ],
    needs: [
      "Klare Review-Section als einziger Freigabeweg",
      "Konkrete Review-Frage im Task",
      "Fälligkeit für P01-Feedback",
    ],
    arbeitsweise: [
      "Task-Kommentar immer mit Review-Frage: 'Bitte prüfen auf: Inhalt / Ton / CTA'",
      "P01 kommentiert direkt im Task — kein Chat",
      "Max. 1 Werktag Reaktionszeit",
    ],
    automation: "Task wechselt zu 'Review P01' → P01 als Assignee + Fälligkeit +1 Werktag",
    definitionOfDone: [
      "P01-Kommentar vorhanden",
      "Änderungswünsche umgesetzt oder begründet abgelehnt",
      "P01 hat OK gegeben",
    ],
  },
  {
    nr: 6,
    label: "Visual / Asset",
    kurzbe: "Grafik erstellen — direkt mit Canva-Template-Link.",
    wasPassiert:
      "P03 erstellt das passende Visual: LinkedIn-Grafik, Newsletter-Header oder Präsentationsfolie. Der Canva-Link wird sofort in den Task eingetragen. Kein Visual ohne direkten Datei-Link im Asana-Task.",
    owner: ["P03"],
    section: "In Erstellung",
    painPoints: [
      "Canva-Templates fehlen oder sind nicht auffindbar",
      "Dropbox-Bilderpool ist unstrukturiert — viel Suchaufwand",
      "Grafiken werden nicht mit dem Text koordiniert",
    ],
    needs: [
      "Canva-Template pro Content-Typ",
      "Canva-Link direkt im Asana-Task",
      "Definierte Bildsprache für jeden Kanal",
    ],
    arbeitsweise: [
      "Canva-Template öffnen → duplizieren → anpassen",
      "Fertige Datei in SharePoint/Canva verlinken — nicht als Anhang hochladen",
      "Visual und Text gemeinsam freigeben lassen",
    ],
    definitionOfDone: [
      "Canva-Datei verlinkt im Task",
      "Visual entspricht Kanal-Template",
      "Format und Maße stimmen",
    ],
  },
  {
    nr: 7,
    label: "Freigabe",
    kurzbe: "Finale OK durch P01 — dann ist Publishing möglich.",
    wasPassiert:
      "P01 gibt den finalen Content frei: Text ✓, Visual ✓, CTA ✓, Datum ✓. Nach Freigabe verschiebt P03 in 'Bereit zur Veröffentlichung'. Keine Veröffentlichung ohne dieses OK.",
    owner: ["P01 (Entscheidung)", "P03 (Ausführung)"],
    section: "Review P01 → Bereit zur Veröffentlichung",
    painPoints: [
      "Freigabe-Prozess hat mehrere Iterationen ohne Struktur",
      "Texte und Visuals werden separat freigegeben — Inkonsistenz",
      "Publishing startet bevor finale Freigabe vorliegt",
    ],
    needs: [
      "Finale Checkliste: Text, Visual, CTA, Datum alle OK?",
      "Eindeutige Freigabe-Aussage im Task-Kommentar",
    ],
    arbeitsweise: [
      "Freigabe = Kommentar 'FREIGEGEBEN für [Datum]'",
      "P03 verschiebt nach Freigabe sofort in 'Bereit zur Veröffentlichung'",
      "Kein Nachsteuern ohne erneuten Review-Task",
    ],
    automation: "Task wechselt zu 'Bereit zur Veröffentlichung' → P03 als Publishing-Owner",
    definitionOfDone: [
      "P01-Kommentar 'FREIGEGEBEN' vorhanden",
      "Veröffentlichungsdatum gesetzt",
      "Link zu Canva-Final im Task",
    ],
  },
  {
    nr: 8,
    label: "Veröffentlichung",
    kurzbe: "Content geht live — P03 ist Publishing-Owner.",
    wasPassiert:
      "P03 veröffentlicht den Content auf dem definierten Kanal. Nach Veröffentlichung wird der Link im Task hinterlegt und der Task in 'Veröffentlicht' verschoben. Automatisch startet ein Subtask für den Performance-Check nach 7 Tagen.",
    owner: ["P03"],
    section: "Bereit zur Veröffentlichung → Veröffentlicht",
    painPoints: [
      "Manuelles Scheduling ohne klare Zuständigkeit",
      "Veröffentlichungslink landet nicht im Asana-Task",
      "Kein Status wenn Content live ist",
    ],
    needs: [
      "Eindeutiger Publishing-Owner (immer P03)",
      "Kanal-Checkliste pro Content-Typ",
      "Link zu veröffentlichtem Content direkt im Task",
    ],
    arbeitsweise: [
      "Vor Veröffentlichung: Kanal-Checkliste abarbeiten",
      "Link sofort nach Veröffentlichung in Task eintragen",
      "Task zu 'Veröffentlicht' verschieben",
    ],
    automation: "Task wechselt zu 'Veröffentlicht' → Subtask 'Performance prüfen' mit Fälligkeit +7 Tage",
    definitionOfDone: [
      "Content ist live",
      "Link im Task hinterlegt",
      "Fälligkeit Performance-Check gesetzt",
    ],
  },
  {
    nr: 9,
    label: "Performance-Learning",
    kurzbe: "Nach 7 Tagen: Zahlen, Reaktionen und 1 Learning notieren.",
    wasPassiert:
      "P03 prüft nach 7 Tagen: Wie viele Impressionen? Wie viele Reaktionen? Welche Kommentare waren interessant? P01 ergänzt strategische Einschätzung. Beides landet als Kommentar im Task — schnell, strukturiert, wiederholbar.",
    owner: ["P03 (Zahlen)", "P01 (Strategie)"],
    section: "Performance / Learnings",
    painPoints: [
      "Keine systematische Auswertung — LinkedIn-Wirkung bleibt unklar",
      "Learnings verschwinden, gleiche Fehler wiederholen sich",
      "CleverReach-Daten werden nicht systematisch genutzt",
    ],
    needs: [
      "Einfache, schnelle Metriken (keine Analytics-Plattform nötig)",
      "Qualitatives Learning: was hat überraschend funktioniert?",
      "Gute Posts für Wiederverwertung markieren",
    ],
    arbeitsweise: [
      "Kommentarvorlage: 'Impressionen: X | Reaktionen: X | Learning: ...'",
      "Max. 5 Minuten Aufwand — kein Reporting-Aufwand",
      "Gute Reaktion → Tag 'Recycling' setzen",
    ],
    promptId: "cp-performance",
    automation: "Subtask 'Performance prüfen' fällig → Kommentarvorlage automatisch einfügen",
    definitionOfDone: [
      "Zahlen im Kommentar notiert",
      "1 konkretes Learning formuliert",
      "Recycling-Entscheidung getroffen",
    ],
  },
  {
    nr: 10,
    label: "Wiederverwertung",
    kurzbe: "Guter Content wird in anderen Formaten weitergelebt.",
    wasPassiert:
      "Starke LinkedIn-Posts werden zu Newsletter-Artikeln. Newsletter-Themen werden zu Webinar-Ideen. Praxisbeispiele fließen in Beratungs-Unterlagen. P03 entscheidet mit P01, was recycelt wird — und legt einen neuen Task an.",
    owner: ["P03 (Umsetzung)", "P01 (Entscheidung)"],
    section: "Performance / Learnings → neue Tasks in Backlog",
    painPoints: [
      "Content verpufft nach Veröffentlichung, kein Recycling",
      "Kein Prozess für Content → Sales oder Content → Knowledge Management",
      "Gute Erkenntnisse aus Content gehen verloren",
    ],
    needs: [
      "Explizite Recycling-Entscheidung als Prozessschritt",
      "Prompts für schnelle Format-Konvertierung",
      "Übergabe zu Sales wenn Lead-Signal erkennbar",
    ],
    arbeitsweise: [
      "Post mit hoher Resonanz → Prompt 'LinkedIn → Newsletter' nutzen",
      "Lead-Signal aus Kommentaren → Übergabe-Task an Sales to Service",
      "Evergreen-Content → Knowledge Management verlinken",
    ],
    promptId: "cp-recycling",
    definitionOfDone: [
      "Recycling-Entscheidung dokumentiert",
      "Ggf. neuer Content-Task angelegt",
      "Ggf. Übergabe an Sales oder Knowledge Management erfolgt",
    ],
  },
];

// ── Sections ─────────────────────────────────────────────────

export interface CPSection {
  name: string;
  bedeutung: string;
  kommtHinein: string;
  wirdWeitergeschoben: string;
  owner: string;
  typischerFehler: string;
  beispielTask: string;
  definitionOfDone: string;
}

export const cpSections: CPSection[] = [
  {
    name: "Backlog / Ideen",
    bedeutung: "Sammlung aller Themenideen ohne Bewertung",
    kommtHinein: "Jede neue Idee — sofort, ohne Nachdenken",
    wirdWeitergeschoben: "Nach Themenprüfung: priorisiert oder archiviert",
    owner: "P01 + P03 (Prüfung), alle (Einlieferung)",
    typischerFehler: "Zu viele Ideen ohne Entscheidung — Backlog wird Friedhofsliste",
    beispielTask: "LinkedIn-Idee: 'Warum Agile scheitert, wenn Teams zu groß sind'",
    definitionOfDone: "Thema bewertet und zugeordnet oder archiviert",
  },
  {
    name: "Geplant",
    bedeutung: "Priorisierte Themen mit vollständigem Briefing",
    kommtHinein: "Wenn Thema priorisiert und Monat/Woche zugeordnet ist",
    wirdWeitergeschoben: "Wenn Briefing vollständig und Produktion starten kann",
    owner: "P03",
    typischerFehler: "Kein Veröffentlichungsdatum, kein vollständiges Briefing",
    beispielTask: "LinkedIn-Post: 'OKR für Führungskräfte' — Zielgruppe: HR, CTA: Webinar-Anmeldung, Datum: 15.06.",
    definitionOfDone: "Pflichtfelder vollständig: Zielgruppe, Kernaussage, CTA, Kanal, Datum",
  },
  {
    name: "In Erstellung",
    bedeutung: "Draft oder Visual wird aktiv erstellt",
    kommtHinein: "Wenn Briefing vollständig ist und P03 startet",
    wirdWeitergeschoben: "Wenn Entwurf review-fähig ist",
    owner: "P03",
    typischerFehler: "KI-Text ohne Überarbeitung direkt in Review schieben",
    beispielTask: "LinkedIn-Post Draft: 'OKR für Führungskräfte' — Entwurf V1 fertig",
    definitionOfDone: "Text überarbeitet, Brand Voice geprüft, CTA klar",
  },
  {
    name: "Review P01",
    bedeutung: "Einziger Freigabeweg — keine Parallelprozesse via Chat",
    kommtHinein: "Wenn Draft reviewfähig ist (Inhalt + ggf. Visual fertig)",
    wirdWeitergeschoben: "Wenn P01 OK gegeben hat",
    owner: "P01 (Reviewer)",
    typischerFehler: "Review ohne konkrete Review-Frage — P01 weiß nicht was geprüft werden soll",
    beispielTask: "Review: 'OKR für Führungskräfte' — Bitte prüfen: Tonalität + CTA",
    definitionOfDone: "P01-Kommentar vorhanden, Änderungen umgesetzt, OK erteilt",
  },
  {
    name: "Bereit zur Veröffentlichung",
    bedeutung: "Finaler Content wartet auf Publishing-Termin",
    kommtHinein: "Nach P01-Freigabe, Veröffentlichungsdatum gesetzt",
    wirdWeitergeschoben: "Wenn veröffentlicht",
    owner: "P03 (Publishing-Owner)",
    typischerFehler: "Asset-Link oder Veröffentlichungsdatum fehlt",
    beispielTask: "LinkedIn-Post live am 15.06. — Canva-Datei verlinkt, Datum bestätigt",
    definitionOfDone: "Text + Visual final, Datum gesetzt, Link zu Canva-Datei im Task",
  },
  {
    name: "Veröffentlicht",
    bedeutung: "Live-Inhalte — Performance-Check läuft",
    kommtHinein: "Nach Veröffentlichung",
    wirdWeitergeschoben: "Nach 7 Tagen mit Performance-Learning → Performance/Learnings",
    owner: "P03",
    typischerFehler: "Kein Link zu veröffentlichtem Content im Task",
    beispielTask: "LinkedIn-Post live: Link im Task, Performance-Check fällig 22.06.",
    definitionOfDone: "Link vorhanden, Performance-Subtask angelegt",
  },
  {
    name: "Performance / Learnings",
    bedeutung: "Auswertung und Lernschleife",
    kommtHinein: "Nach 7 Tagen aus 'Veröffentlicht'",
    wirdWeitergeschoben: "Nach dokumentiertem Learning → Archiv oder Recycling-Task",
    owner: "P03 (Zahlen), P01 (Strategie)",
    typischerFehler: "Metriken nicht notiert, Learning-Kommentar leer",
    beispielTask: "Performance: 'OKR für Führungskräfte' — 4.2k Impressionen, 87 Reaktionen, Learning: ...",
    definitionOfDone: "Zahlen notiert, 1 Learning formuliert, Recycling-Entscheidung getroffen",
  },
  {
    name: "Archiv",
    bedeutung: "Abgeschlossene Inhalte mit dokumentierten Learnings",
    kommtHinein: "Nach vollständiger Auswertung",
    wirdWeitergeschoben: "Kein weiterer Ausgang",
    owner: "P03",
    typischerFehler: "Archiv enthält Tasks ohne Learning — Wissen geht verloren",
    beispielTask: "Archiviert: 'OKR für Führungskräfte' — Learning gespeichert",
    definitionOfDone: "Learning dokumentiert, Task vollständig abgeschlossen",
  },
];

// ── Pain Points ───────────────────────────────────────────────

export type CPPainCategory = "Strategie" | "Qualität" | "Prozess" | "Assets" | "Daten" | "Übergaben";

export interface CPPainPoint {
  id: string;
  phase: string;
  kategorie: CPPainCategory;
  painPoint: string;
  wasPassiert: string;
  need: string;
  regel: string;
  asanaHebel: string;
  kiHebel?: string;
  automation?: string;
}

export const cpPainPoints: CPPainPoint[] = [
  {
    id: "pp-strategie-1",
    phase: "Themenprüfung",
    kategorie: "Strategie",
    painPoint: "Content entsteht ohne klare Strategie",
    wasPassiert: "Themen werden spontan und ad hoc entschieden, ohne Bezug zu Angeboten oder Zielgruppen.",
    need: "Monatliche Themenplanung mit Angebotslogik",
    regel: "Kein Content startet ohne Antwort auf: Für wen? Warum jetzt? Was soll passieren?",
    asanaHebel: "Recurring Task 'Content-Planung' monatlich, Custom Fields: Zielgruppe + Ziel",
    kiHebel: "Prompt: Themenideen aus Beratungsarbeit ableiten",
    automation: "Monatlich: Task 'Content-Planung' automatisch anlegen",
  },
  {
    id: "pp-strategie-2",
    phase: "Themenprüfung",
    kategorie: "Strategie",
    painPoint: "Zielgruppen nicht sauber getrennt",
    wasPassiert: "Posts richten sich gleichzeitig an Führungskräfte, HR und Teams — und treffen niemanden richtig.",
    need: "Eine Zielgruppe pro Content-Stück",
    regel: "Jeder Task hat genau eine Zielgruppe. Mehrere Zielgruppen = mehrere Tasks.",
    asanaHebel: "Custom Field 'Zielgruppe' als Pflichtfeld",
    kiHebel: "Prompt: Zielgruppen-Persona schärfen",
  },
  {
    id: "pp-qualitaet-1",
    phase: "Draft",
    kategorie: "Qualität",
    painPoint: "KI-Texte klingen generisch und formelhaft",
    wasPassiert: "ChatGPT-Drafts werden zu wenig überarbeitet. Brand Voice fehlt. P01 erkennt es im Review.",
    need: "Brand-Voice-Regeln + Qualitätscheck vor Review",
    regel: "KI liefert Rohmaterial, nicht finale Veröffentlichung. Jeder Draft wird von P03 redigiert.",
    asanaHebel: "Subtask 'Brand-Voice-Checkliste' in Draft-Tasks",
    kiHebel: "Prompt: Generischen Text verbessern (Brand Voice)",
  },
  {
    id: "pp-qualitaet-2",
    phase: "Draft",
    kategorie: "Qualität",
    painPoint: "Keine gemeinsame Prompt-Logik im Team",
    wasPassiert: "P01 und P03 nutzen verschiedene Prompts ohne abgestimmte Qualitätssicherung.",
    need: "Geteilte Prompt-Bibliothek mit klaren Qualitätskriterien",
    regel: "Prompts aus der Bibliothek nutzen — eigene Prompts erst nach Team-Test ergänzen.",
    asanaHebel: "Link zur Prompt-Bibliothek in Board-Beschreibung",
    kiHebel: "Zentrale Prompt-Bibliothek (diese Seite)",
  },
  {
    id: "pp-prozess-1",
    phase: "Review",
    kategorie: "Prozess",
    painPoint: "Freigaben über Screenshots und WhatsApp",
    wasPassiert: "P01 bekommt Screenshots per WhatsApp und antwortet per Nachricht — kein Tracking, keine Versionierung.",
    need: "Einziger Freigabeweg: Section 'Review P01' in Asana",
    regel: "Kein Review außerhalb von Asana. WhatsApp-Freigaben sind keine Freigaben.",
    asanaHebel: "Section 'Review P01' + Rule: P01 als Assignee + Fälligkeit",
    automation: "Task → 'Review P01': P01 Assignee + Fälligkeit +1 Werktag",
  },
  {
    id: "pp-prozess-2",
    phase: "Review",
    kategorie: "Prozess",
    painPoint: "P03 wartet ohne Deadline auf Feedback",
    wasPassiert: "Tasks liegen Tage in Review ohne Reaktion. P03 fragt per Chat nach.",
    need: "Automatische Fälligkeit für P01-Review",
    regel: "Review-Tasks haben immer eine Fälligkeit. Nach 1 Werktag: Erinnerung automatisch.",
    asanaHebel: "Rule: Fälligkeit automatisch bei Eingang in Review-Section",
    automation: "Fälligkeit überschritten + Status in Review: P01 Erinnerung",
  },
  {
    id: "pp-assets-1",
    phase: "Visual / Asset",
    kategorie: "Assets",
    painPoint: "Canva-Templates fehlen oder sind nicht auffindbar",
    wasPassiert: "Jede Grafik wird neu gestaltet. Kein Wiedererkennungswert, viel Zeitaufwand.",
    need: "Canva-Template pro Content-Typ, direkt im Task verlinkt",
    regel: "Kein Visual-Task ohne Canva-Link im Task. Template zuerst öffnen, dann anpassen.",
    asanaHebel: "Custom Field 'Canva-Link' + Subtask-Template für Visual-Erstellung",
  },
  {
    id: "pp-assets-2",
    phase: "Visual / Asset",
    kategorie: "Assets",
    painPoint: "Bilderpool in Dropbox ist unstrukturiert",
    wasPassiert: "P03 sucht Bilder, findet nichts Passendes, nutzt schlechte Alternativen.",
    need: "Strukturierter Bilderpool mit direktem Link aus Asana",
    regel: "Links statt Sucharbeit: Bilderpool-Link in Board-Beschreibung und Task-Templates.",
    asanaHebel: "Board-Beschreibung mit Link zu Bilderpool-Ordner",
  },
  {
    id: "pp-daten-1",
    phase: "Performance-Learning",
    kategorie: "Daten",
    painPoint: "Keine systematische Performance-Auswertung",
    wasPassiert: "Posts werden veröffentlicht, niemand schaut danach hin. Gleiche Fehler wiederholen sich.",
    need: "Performance-Check nach 7 Tagen als fester Prozessschritt",
    regel: "Kein veröffentlichter Content ohne Performance-Check. Subtask wird automatisch angelegt.",
    asanaHebel: "Rule: Subtask 'Performance prüfen' bei Verschiebung in 'Veröffentlicht'",
    kiHebel: "Prompt: Performance-Learnings strukturieren",
    automation: "Task → 'Veröffentlicht': Subtask mit Fälligkeit +7 Tage",
  },
  {
    id: "pp-daten-2",
    phase: "Performance-Learning",
    kategorie: "Daten",
    painPoint: "LinkedIn-Analytics werden nicht regelmäßig ausgewertet",
    wasPassiert: "Impressionen und Engagement bleiben unklar. Strategische Anpassungen werden nicht datenbasiert gemacht.",
    need: "Einfache, schnelle Metriken — keine Komplexität",
    regel: "5-Minuten-Check: Impressionen + Reaktionen + 1 qualitatives Learning. Kein Reporting.",
    asanaHebel: "Kommentarvorlage in Performance-Subtask",
    kiHebel: "Prompt: Performance-Learnings strukturieren und ableiten",
  },
  {
    id: "pp-uebergaben-1",
    phase: "Wiederverwertung",
    kategorie: "Übergaben",
    painPoint: "Leads aus Content landen nicht in Sales",
    wasPassiert: "Kommentare unter Posts signalisieren Interesse — niemand folgt dem nach.",
    need: "Klarer Trigger für Übergabe zu Sales to Service",
    regel: "Lead-Signal unter Post → Übergabe-Task an Sales to Service anlegen.",
    asanaHebel: "Task-Template 'Lead aus Content → Sales'",
  },
  {
    id: "pp-uebergaben-2",
    phase: "Wiederverwertung",
    kategorie: "Übergaben",
    painPoint: "Gute Inhalte werden nicht systematisch wiederverwendet",
    wasPassiert: "Starke Posts verpuffen. Newsletter und Webinar-Themen entstehen separat statt aufbauend.",
    need: "Explizite Recycling-Entscheidung als Prozessschritt",
    regel: "Nach Performance-Check: explizit entscheiden ob Recycling oder Archiv.",
    asanaHebel: "Tag oder Custom Field 'Recycling' für starke Posts",
    kiHebel: "Prompt: LinkedIn → Newsletter oder LinkedIn → Blogartikel",
    automation: "Starke Performance → Subtask 'Recycling prüfen?'",
  },
];

// ── Task Templates ─────────────────────────────────────────────

export interface CPTaskTemplate {
  id: string;
  typ: string;
  emoji: string;
  beschreibung: string;
  titelVorlage: string;
  pflichtInfos: string[];
  subtasks: string[];
  section: string;
  canvaHinweis?: string;
  promptId?: string;
}

export const cpTaskTemplates: CPTaskTemplate[] = [
  {
    id: "tmpl-linkedin",
    typ: "LinkedIn-Post",
    emoji: "💼",
    beschreibung: "Einzelner Post für LinkedIn — strategisch, praxisnah, mit klarem CTA.",
    titelVorlage: "LinkedIn-Post: [Thema] — [Zielgruppe]",
    pflichtInfos: [
      "Zielgruppe (genau eine)",
      "Ziel des Posts (Awareness / Lead / Engagement)",
      "Kernaussage in 1 Satz",
      "Konkrete CTA",
      "Veröffentlichungsdatum",
      "Canva-Link falls Visual nötig",
    ],
    subtasks: [
      "Hook & Angle definieren",
      "KI-Draft erstellen (Rohfassung)",
      "Draft überarbeiten (Brand Voice-Check)",
      "Visual in Canva erstellen",
      "Review P01 → Section wechseln",
      "Freigabe einholen",
      "Veröffentlichen + Link hinterlegen",
      "Performance nach 7 Tagen prüfen",
    ],
    section: "Geplant",
    canvaHinweis: "Vorlage 'LinkedIn-Grafik 1080x1080' öffnen und duplizieren",
    promptId: "cp-draft",
  },
  {
    id: "tmpl-newsletter",
    typ: "Newsletter-Ausgabe",
    emoji: "📧",
    beschreibung: "Monatliche oder anlassbezogene Newsletter-Ausgabe via Brevo/CleverReach.",
    titelVorlage: "Newsletter [Monat YYYY]: [Thema]",
    pflichtInfos: [
      "Thema und roter Faden",
      "Zielgruppe des Verteilers",
      "Haupt-CTA der Ausgabe",
      "Versanddatum",
      "Brevo-Kampagnen-Link (nach Erstellung)",
    ],
    subtasks: [
      "Thema und Struktur festlegen",
      "Hauptartikel schreiben (KI + Überarbeitung)",
      "Weitere Abschnitte (Tipps, Termine, News)",
      "Brevo-Kampagne anlegen + Template",
      "Review P01",
      "Testversand prüfen",
      "Versenden + Link hinterlegen",
      "Öffnungsrate nach 3 Tagen notieren",
    ],
    section: "Geplant",
    promptId: "cp-newsletter",
  },
  {
    id: "tmpl-webinar",
    typ: "Webinar-Kommunikation",
    emoji: "🎤",
    beschreibung: "Einladung und Nachfass für ein Webinar — koordiniert mit Ausbildung & Training.",
    titelVorlage: "Webinar-Komm: [Titel] — [Datum]",
    pflichtInfos: [
      "Webinar-Titel und Datum",
      "Zielgruppe",
      "Anmeldelink",
      "Hauptnutzen für Teilnehmende",
      "Verantwortliche für Einladung und Nachfass",
    ],
    subtasks: [
      "Einladungs-E-Mail schreiben",
      "LinkedIn-Post zur Ankündigung",
      "Erinnerungs-E-Mail (1 Tag vorher)",
      "Review P01",
      "Einladung versenden + Links hinterlegen",
      "Nachfass-E-Mail schreiben (nach Webinar)",
      "Nachfass LinkedIn-Post",
      "Auswertung: Anmeldungen, Teilnahme",
    ],
    section: "Geplant",
    promptId: "cp-webinar-nachfass",
  },
  {
    id: "tmpl-blogartikel",
    typ: "Blogartikel / Long-form",
    emoji: "📝",
    beschreibung: "Längerer Artikel für Website oder Fachpublikationen — SEO-relevant, dauerhaft nutzbar.",
    titelVorlage: "Blogartikel: [Titel] — [Zielgruppe]",
    pflichtInfos: [
      "Titel und Kernaussage",
      "Zielgruppe und Funnel-Ziel (Awareness / Consideration)",
      "Geplante Länge (ca. Wörter)",
      "Keywords falls vorhanden",
      "Veröffentlichungsort (Website, Medium, etc.)",
    ],
    subtasks: [
      "Gliederung erstellen (KI-Unterstützung)",
      "Abschnitte schreiben (KI + Überarbeitung)",
      "Praxisbeispiele einbauen",
      "Review P01",
      "SEO-Check (Titel, Beschreibung, Keywords)",
      "Veröffentlichen + Link hinterlegen",
      "LinkedIn-Post zur Bewerbung",
      "Performance nach 30 Tagen",
    ],
    section: "Geplant",
    promptId: "cp-draft",
  },
  {
    id: "tmpl-performance",
    typ: "Performance-Auswertung",
    emoji: "📊",
    beschreibung: "Strukturierte Auswertung eines veröffentlichten Inhalts — schnell, direkt im Asana-Task.",
    titelVorlage: "Performance: [Content-Titel] — [Datum]",
    pflichtInfos: [
      "Link zum veröffentlichten Content",
      "Auswertungszeitraum (7 Tage Standard)",
      "Kanal-Metriken (je nach Plattform)",
    ],
    subtasks: [
      "Zahlen aus LinkedIn / Brevo / Website holen",
      "Kommentar mit Metriken eintragen",
      "1 qualitatives Learning formulieren",
      "Recycling-Entscheidung treffen",
      "Ggf. neuen Task für Wiederverwertung anlegen",
    ],
    section: "Performance / Learnings",
    promptId: "cp-performance",
  },
];

// ── Prompts ───────────────────────────────────────────────────

export interface CPPrompt {
  id: string;
  situation: string;
  wann: string;
  promptText: string;
  variablen: string[];
  qualitaetscheck: string[];
  datenschutzHinweis?: string;
  tags: string[];
}

export const cpPrompts: CPPrompt[] = [
  {
    id: "cp-ideen",
    situation: "Ich brauche Content-Ideen",
    wann: "Vor der monatlichen Content-Planung oder wenn der Backlog leer wird",
    promptText: `Du bist Content-Strategin für ein agiles Beratungsunternehmen, das sich auf OKR-Einführung, agile Transformation und Ausbilder-Entwicklung spezialisiert hat.

Entwickle 8 konkrete LinkedIn-Post-Ideen für folgende Zielgruppe:
Zielgruppe: [ZIELGRUPPE — z.B. Führungskräfte in mittelständischen Unternehmen]
Aktueller Monatsfokus: [THEMA — z.B. Q3-Planung, Ausbilderqualifizierung]

Jede Idee als:
- Titel (max. 8 Wörter)
- Kernaussage (1 Satz)
- Warum jetzt? (Aktualität)
- Ziel des Posts: Awareness / Engagement / Lead

Kein generisches Wissen — zeige konkrete Praxiserfahrung.`,
    variablen: ["[ZIELGRUPPE]", "[THEMA]"],
    qualitaetscheck: [
      "Sind die Ideen spezifisch genug für diese Zielgruppe?",
      "Hat jede Idee einen klaren Grund 'Warum jetzt'?",
      "Entstammen die Ideen echter Beratungsarbeit?",
    ],
    datenschutzHinweis: "Keine Kundennamen oder Projektdetails eingeben.",
    tags: ["ideenfindung", "planung"],
  },
  {
    id: "cp-draft",
    situation: "Ich brauche einen LinkedIn-Draft",
    wann: "Wenn Briefing vollständig ist und Draft-Phase beginnt",
    promptText: `Du bist Redakteurin für ein agiles Beratungsunternehmen. Schreibe einen LinkedIn-Post basierend auf diesem Briefing:

Thema: [THEMA]
Zielgruppe: [ZIELGRUPPE]
Kernaussage: [KERNAUSSAGE IN 1 SATZ]
CTA: [GEWÜNSCHTE AKTION]

Anforderungen:
- Start mit Frage oder konkreter Beobachtung aus der Praxis (kein 'Ich möchte heute...')
- 150–250 Wörter
- 3–4 konkrete, umsetzbare Punkte
- Kein Buzzword-Stapel
- Ende mit CTA als Frage an die Community
- Ton: professionell, direkt, meinungsstark — kein Corporate-Sprech

Liefere 2 Varianten: A) sachlich-strukturiert, B) persönlich-erzählend`,
    variablen: ["[THEMA]", "[ZIELGRUPPE]", "[KERNAUSSAGE]", "[CTA]"],
    qualitaetscheck: [
      "Klingt das wie ein echter Mensch — nicht wie KI?",
      "Ist die Kernaussage in den ersten 2 Sätzen klar?",
      "Hat der Post einen konkreten CTA?",
      "Fehlt der Buzzword-Stapel (Synergien, innovativ, ganzheitlich)?",
    ],
    datenschutzHinweis: "Keine Kundennamen oder vertraulichen Projektinhalte eingeben.",
    tags: ["draft", "linkedin"],
  },
  {
    id: "cp-brand-voice",
    situation: "Ein KI-Text klingt zu generisch",
    wann: "Wenn ein Draft zu sehr nach ChatGPT klingt und überarbeitet werden muss",
    promptText: `Überarbeite folgenden Text so, dass er weniger nach KI klingt und mehr nach uns.

Unsere Stimme: direkt, praxisnah, meinungsstark, ohne Buzzwords.
Zielgruppe: [ZIELGRUPPE]

Text:
[TEXT EINFÜGEN]

Deine Aufgaben:
1. Buzzwords und Floskeln entfernen (z.B. 'ganzheitlich', 'nachhaltig', 'Synergien')
2. Abstrakte Aussagen durch konkrete Beispiele ersetzen
3. Passive Konstruktionen in aktive umwandeln
4. Hook-Formeln entfernen ('In einer Welt, in der...')
5. Klaren Standpunkt formulieren statt vage bleiben
6. Kernaussage behalten`,
    variablen: ["[ZIELGRUPPE]", "[TEXT EINFÜGEN]"],
    qualitaetscheck: [
      "Ist kein einziger Buzzword-Floskelsatz übrig?",
      "Hat jede Aussage ein konkretes Beispiel?",
      "Klingt es wie eine Person mit Meinung?",
    ],
    datenschutzHinweis: "Anonymisiert arbeiten — keine Kundennamen im Text.",
    tags: ["qualität", "brand-voice", "überarbeitung"],
  },
  {
    id: "cp-newsletter",
    situation: "Ich will einen LinkedIn-Post als Newsletter recyceln",
    wann: "Wenn ein Post gut performt hat und als Newsletter-Artikel weiterlebt",
    promptText: `Erweitere folgenden LinkedIn-Post zu einem Newsletter-Abschnitt von ca. 300 Wörtern.

LinkedIn-Post:
[POST EINFÜGEN]

Anforderungen für den Newsletter-Abschnitt:
- Einstieg: Kerngedanke direkt aufgreifen (nicht wiederholen)
- Ergänze 1-2 Praxisbeispiele oder Anwendungstipps
- Füge 3 konkrete Handlungsempfehlungen als Liste ein
- Abschluss mit CTA: [CTA — z.B. 'Mehr dazu im Webinar am...']
- Ton: etwas ausführlicher als LinkedIn, aber weiterhin klar und direkt`,
    variablen: ["[POST EINFÜGEN]", "[CTA]"],
    qualitaetscheck: [
      "Fügt der Newsletter-Text echten Mehrwert gegenüber dem Post hinzu?",
      "Sind die Handlungsempfehlungen konkret und umsetzbar?",
      "Passt der CTA zur aktuellen Kampagne?",
    ],
    datenschutzHinweis: "Keine Kundennamen im Post einfügen.",
    tags: ["recycling", "newsletter"],
  },
  {
    id: "cp-webinar-nachfass",
    situation: "Ich brauche ein Webinar-Nachfass-E-Mail",
    wann: "Nach einem abgeschlossenen Webinar, innerhalb von 24 Stunden",
    promptText: `Schreibe ein Nachfass-E-Mail für folgendes Webinar:

Webinar-Titel: [TITEL]
Datum: [DATUM]
Wichtigste Erkenntnisse: [3-4 STICHPUNKTE]
Nächster Schritt für Teilnehmende: [CTA — z.B. Erstgespräch, Download, Anmeldung]

Anforderungen:
- Betreffzeile: prägnant, keine Click-Bait
- 150-200 Wörter
- Einstieg: Danke ohne es überzutreiben (1 Satz)
- Kurzfassung der Kernerkenntnisse (3 Bullet Points)
- Klarer nächster Schritt
- Ton: professionell, warmherzig, nicht werblich`,
    variablen: ["[TITEL]", "[DATUM]", "[3-4 STICHPUNKTE]", "[CTA]"],
    qualitaetscheck: [
      "Ist der Einstieg nicht zu förmlich?",
      "Sind die Erkenntnisse konkret — nicht nur Zusammenfassung?",
      "Hat die E-Mail genau einen klaren nächsten Schritt?",
    ],
    datenschutzHinweis: "Keine Teilnehmerdaten eingeben.",
    tags: ["webinar", "nachfass", "e-mail"],
  },
  {
    id: "cp-performance",
    situation: "Ich will Performance-Learnings strukturieren",
    wann: "7 Tage nach Veröffentlichung beim Performance-Check",
    promptText: `Hilf mir, die folgenden Performance-Daten in verwertbare Learnings zu übersetzen:

Content: [TITEL / BESCHREIBUNG]
Kanal: [LINKEDIN / NEWSLETTER / etc.]
Zahlen: [IMPRESSIONEN, REAKTIONEN, KOMMENTARE, KLICKS etc.]
Besondere Beobachtungen: [KOMMENTARE, FRAGEN, REAKTIONEN die aufgefallen sind]

Erstelle:
1. Kurze Einschätzung: War der Post stark / mittel / schwach? (Begründung)
2. Was hat funktioniert? (1-2 Punkte)
3. Was würde ich anders machen?
4. Empfehlung: Recycling sinnvoll? (Ja / Nein / Überarbeiten)
5. 1 konkretes Learning für die nächste Erstellung`,
    variablen: ["[TITEL]", "[KANAL]", "[ZAHLEN]", "[BEOBACHTUNGEN]"],
    qualitaetscheck: [
      "Ist das Learning konkret genug um es beim nächsten Mal anzuwenden?",
      "Ist die Recycling-Empfehlung begründet?",
    ],
    datenschutzHinweis: "Keine Kundendaten oder vertraulichen Projektinfos eingeben.",
    tags: ["performance", "auswertung", "lernen"],
  },
  {
    id: "cp-recycling",
    situation: "Ich will Kundeninsights in Content übersetzen",
    wann: "Nach Workshops, Beratungsgesprächen oder Ausbildungen mit wiederverwendbaren Erkenntnissen",
    promptText: `Übersetze folgende Erkenntnis aus der Beratungsarbeit in 3 Content-Ideen:

Erkenntnis (anonymisiert): [BESCHREIBUNG — ohne Kundennamen]
Zielgruppe für Content: [ZIELGRUPPE]
Bevorzugte Formate: LinkedIn-Post, Newsletter, Blogpost

Jede Idee:
- Thema / Titel
- Warum ist das für die Zielgruppe relevant?
- Kernaussage in 1 Satz
- Empfohlener Einstieg (Hook-Idee)

Wichtig: Keine Kundendaten erwähnen. Verallgemeinere die Erkenntnis.`,
    variablen: ["[BESCHREIBUNG]", "[ZIELGRUPPE]"],
    qualitaetscheck: [
      "Sind alle Kundenbezüge vollständig anonymisiert?",
      "Sind die Ideen nah genug an der Erkenntnis — aber allgemein genug?",
    ],
    datenschutzHinweis: "NIEMALS: Kundennamen, Firmennamen oder erkennbare Projektdetails eingeben. Immer anonymisieren.",
    tags: ["recycling", "ideenfindung", "beratungsarbeit"],
  },
];

// ── Automations ───────────────────────────────────────────────

export interface CPAutomation {
  id: string;
  titel: string;
  trigger: string;
  aktion: string;
  warum: string;
  painPoint: string;
  prioritaet: "hoch" | "mittel" | "niedrig";
  umsetzbar: "sofort" | "spaeter" | "optional";
  notificationCheck: string;
  setupSchritte: string[];
}

export const cpAutomations: CPAutomation[] = [
  {
    id: "auto-review",
    titel: "Review-Übergabe an P01",
    trigger: "Task wechselt in Section 'Review P01'",
    aktion: "P01 wird als Assignee gesetzt + Fälligkeit auf morgen (+1 Werktag)",
    warum: "Freigaben dürfen nicht im Nichts verschwinden. P01 braucht eine klare Aufgabe mit Deadline.",
    painPoint: "Freigabe über WhatsApp / geht unter",
    prioritaet: "hoch",
    umsetzbar: "sofort",
    notificationCheck: "Nur P01 wird benachrichtigt — kein Team-Spam",
    setupSchritte: [
      "Asana Board öffnen → Rules",
      "Trigger: 'Task wird in Section verschoben' → 'Review P01'",
      "Aktion 1: 'Assignee setzen' → P01",
      "Aktion 2: 'Fälligkeit setzen' → '1 Tag ab heute'",
    ],
  },
  {
    id: "auto-publishing",
    titel: "Publishing-Owner setzen",
    trigger: "Task wechselt in Section 'Bereit zur Veröffentlichung'",
    aktion: "P03 wird als Assignee gesetzt",
    warum: "Veröffentlichungen müssen klar P03 gehören — kein Interpretationsspielraum.",
    painPoint: "Unklare Zuständigkeit bei Veröffentlichung",
    prioritaet: "hoch",
    umsetzbar: "sofort",
    notificationCheck: "Nur P03 wird benachrichtigt",
    setupSchritte: [
      "Asana Board → Rules",
      "Trigger: 'Task in Section' → 'Bereit zur Veröffentlichung'",
      "Aktion: 'Assignee setzen' → P03",
    ],
  },
  {
    id: "auto-performance",
    titel: "Performance-Check nach 7 Tagen",
    trigger: "Task wechselt in Section 'Veröffentlicht'",
    aktion: "Subtask 'Performance prüfen' mit Fälligkeit +7 Tage automatisch erstellen",
    warum: "Performance-Checks passieren nur wenn sie automatisch getriggert werden. Kein manuelles Erinnern.",
    painPoint: "Keine systematische Performance-Auswertung",
    prioritaet: "hoch",
    umsetzbar: "sofort",
    notificationCheck: "Subtask erscheint im Board von P03 — kein separates Notification",
    setupSchritte: [
      "Asana Board → Rules",
      "Trigger: 'Task in Section' → 'Veröffentlicht'",
      "Aktion: 'Subtask erstellen' mit Titel 'Performance prüfen: Impressionen / Reaktionen / Learning' + Fälligkeit +7 Tage",
    ],
  },
  {
    id: "auto-planung",
    titel: "Monatliche Content-Planung",
    trigger: "Erster Werktag des Monats",
    aktion: "Recurring Task 'Content-Planung [Monat]' in Backlog erstellen und P01 + P03 zuweisen",
    warum: "Content-Strategie passiert nur wenn ein fester Termin sie erzwingt. Ad-hoc ist der Feind.",
    painPoint: "Content entsteht ohne Strategie",
    prioritaet: "hoch",
    umsetzbar: "spaeter",
    notificationCheck: "Task erscheint im Board beider Personen — kein Push",
    setupSchritte: [
      "Asana Board → Rules",
      "Trigger: 'Monatlich' → 'Erster Tag'",
      "Aktion: 'Task erstellen' in Backlog mit Titel 'Content-Planung [Monat]' + Assignees P01 + P03",
    ],
  },
  {
    id: "auto-review-erinnerung",
    titel: "Review-Erinnerung bei Fälligkeitsüberschreitung",
    trigger: "Fälligkeit eines Review-Tasks überschritten (Task noch in 'Review P01')",
    aktion: "Erinnerungs-Kommentar im Task: 'Review ausstehend — bitte bis [neues Datum] rückmelden'",
    warum: "Ohne Erinnerung verstauben Review-Tasks.",
    painPoint: "P03 wartet ohne Deadline auf Feedback",
    prioritaet: "mittel",
    umsetzbar: "sofort",
    notificationCheck: "Kommentar im Task — kein separater Notification",
    setupSchritte: [
      "Asana Board → Rules",
      "Trigger: 'Fälligkeit überschritten' + 'Task in Section: Review P01'",
      "Aktion: 'Kommentar hinzufügen' mit Text 'Review noch ausstehend — bitte Rückmeldung bis [Datum]'",
    ],
  },
  {
    id: "auto-recycling",
    titel: "Recycling-Prüfung für starke Posts",
    trigger: "Performance-Subtask erledigt (manual oder auto)",
    aktion: "Subtask 'Recycling prüfen?' mit P01 + P03 + 3 Tage Fälligkeit erstellen",
    warum: "Recycling passiert nie wenn es kein System erzwingt. Dieser Trigger macht es sichtbar.",
    painPoint: "Content verpufft, kein Recycling",
    prioritaet: "mittel",
    umsetzbar: "optional",
    notificationCheck: "Subtask erscheint nur für P01 und P03",
    setupSchritte: [
      "Asana Board → Rules",
      "Trigger: 'Subtask als erledigt markiert' wenn Titel enthält 'Performance prüfen'",
      "Aktion: 'Subtask erstellen' mit Titel 'Recycling prüfen: Lohnt sich ein neues Format?' + Fälligkeit +3 Tage",
    ],
  },
];

// ── Handoffs ──────────────────────────────────────────────────

export interface CPHandoff {
  id: string;
  von: string;
  nach: string;
  richtung: "ausgehend" | "eingehend";
  ausloeser: string;
  mindestInfos: string[];
  verantwortlich: string;
  pflichtFelder: string[];
  typischeFehler: string[];
  checklisteText: string;
}

export const cpHandoffs: CPHandoff[] = [
  {
    id: "cp-to-sales",
    von: "Content-Pipeline",
    nach: "Sales to Service",
    richtung: "ausgehend",
    ausloeser: "Ein Kommentar, eine DM oder eine Reaktion unter einem Post signalisiert konkretes Interesse",
    mindestInfos: [
      "Link zum veröffentlichten Content der das Interesse ausgelöst hat",
      "Kurze Beschreibung des Signals: Was hat die Person geschrieben/gefragt?",
      "Kanal (LinkedIn-DM, E-Mail, Kommentar)",
      "Grober Eindruck: Wie konkret ist das Interesse?",
    ],
    verantwortlich: "P03 (erkennt Signal) → P01 (bewertet und startet Kontakt)",
    pflichtFelder: ["Angebotstyp", "Nächster Schritt"],
    typischeFehler: [
      "Signal wird bemerkt aber niemand leitet es weiter",
      "Übergabe zu spät — Interessent hat sich anderweitig entschieden",
    ],
    checklisteText: `Übergabe: Content-Pipeline → Sales to Service
━━━━━━━━━━━━━━━━━━━━━━━━
☐ Link zum Content: [URL]
☐ Signal beschrieben: [Was hat die Person gesagt/gefragt?]
☐ Kanal: [LinkedIn / E-Mail / Kommentar]
☐ Einschätzung Konkretheit: [Hoch / Mittel / Niedrig]
☐ P01 informiert für nächsten Schritt`,
  },
  {
    id: "cp-to-knowledge",
    von: "Content-Pipeline",
    nach: "Knowledge Management / SharePoint",
    richtung: "ausgehend",
    ausloeser: "Ein Inhalt ist dauerhaft wiederverwendbar: Evergreen-Artikel, bewährte Vorlage, SOP",
    mindestInfos: [
      "Finaler Text oder Vorlage (Link oder Datei)",
      "Kategorie: Vorlage / Artikel / SOP / Prompt",
      "Ablage-Pfad in SharePoint",
      "Wer pflegt diesen Inhalt langfristig?",
    ],
    verantwortlich: "P03",
    pflichtFelder: ["SharePoint-Link"],
    typischeFehler: [
      "Guter Inhalt bleibt nur im Asana-Task — wird nie dauerhaft abgelegt",
      "Ablage ohne klaren Pfad — niemand findet ihn wieder",
    ],
    checklisteText: `Übergabe: Content-Pipeline → Knowledge Management
━━━━━━━━━━━━━━━━━━━━━━━━
☐ Inhalt beschrieben: [Was ist das?]
☐ Typ: [Vorlage / Artikel / SOP / Prompt]
☐ SharePoint-Link: [URL]
☐ Ablage-Pfad bestätigt
☐ Pflegeverantwortung: [Wer hält es aktuell?]`,
  },
  {
    id: "delivery-to-cp",
    von: "Client Delivery",
    nach: "Content-Pipeline",
    richtung: "eingehend",
    ausloeser: "Ein Projektabschluss, Workshop oder Beratungsmandat liefert eine Story oder Erkenntnis die als Content nutzbar ist",
    mindestInfos: [
      "Anonymisierte Beschreibung der Erkenntnis / Story",
      "Bestätigung: Hat der Kunde der Nutzung zugestimmt?",
      "Zielgruppe für den Content",
      "Empfohlenes Format (LinkedIn, Newsletter, Artikel)",
    ],
    verantwortlich: "P02 (liefert Erkenntnis) → P03 (Content-Erstellung)",
    pflichtFelder: ["Kanal", "Format"],
    typischeFehler: [
      "Erkenntnis wird erzählt aber nie als Task angelegt",
      "Kundendaten nicht anonymisiert bevor Weitergabe",
    ],
    checklisteText: `Übergabe: Client Delivery → Content-Pipeline
━━━━━━━━━━━━━━━━━━━━━━━━
☐ Erkenntnis / Story (anonymisiert): [Beschreibung]
☐ Kunden-Freigabe bestätigt: [Ja / Nein / Anonym genug]
☐ Zielgruppe für Content: [Wer soll das lesen?]
☐ Empfohlenes Format: [LinkedIn / Newsletter / Artikel]
☐ Task in Content-Pipeline angelegt`,
  },
  {
    id: "ausbildung-to-cp",
    von: "Ausbildung & Training",
    nach: "Content-Pipeline",
    richtung: "eingehend",
    ausloeser: "Teilnehmerfragen oder Diskussionen in Ausbildungen liefern Content-Ideen",
    mindestInfos: [
      "Frage oder Thema (ohne Teilnehmernamen)",
      "Kontext: In welcher Ausbildung / welchem Format?",
      "Einschätzung: Ist das für unsere Zielgruppe relevant?",
    ],
    verantwortlich: "P04 / P02 → P03",
    pflichtFelder: [],
    typischeFehler: [
      "Gute Fragen werden in Ausbildungen notiert aber nie weitergegeben",
    ],
    checklisteText: `Übergabe: Ausbildung & Training → Content-Pipeline
━━━━━━━━━━━━━━━━━━━━━━━━
☐ Thema / Frage (anonym): [Beschreibung]
☐ Kontext: [Format / Modul]
☐ Relevanz für Zielgruppe: [Ja / Möglicherweise]
☐ Task in Backlog / Ideen angelegt`,
  },
];

// ── Onboarding ────────────────────────────────────────────────

export interface CPOnboardingItem {
  id: string;
  phase: string;
  aufgabe: string;
  hinweis?: string;
}

export const cpOnboarding: CPOnboardingItem[] = [
  // Tag 1–2
  { id: "ob-01", phase: "Tag 1–2", aufgabe: "Playbook-Dashboard lesen: Was ist die Content-Pipeline?" },
  { id: "ob-02", phase: "Tag 1–2", aufgabe: "Alle 8 Sections im Board verstehen (Lifecycle lesen)" },
  { id: "ob-03", phase: "Tag 1–2", aufgabe: "3 aktuelle Tasks öffnen und prüfen: Owner, Datum, Custom Fields vollständig?" },
  { id: "ob-04", phase: "Tag 1–2", aufgabe: "Eigene Rolle klären: Was entscheide ich allein, was braucht P01-OK?" },
  { id: "ob-05", phase: "Tag 1–2", aufgabe: "Canva-Templates-Ordner lokalisieren und Testduplizierung machen" },

  // Woche 1
  { id: "ob-06", phase: "Woche 1", aufgabe: "Ersten eigenen Task von Backlog bis Review führen" },
  { id: "ob-07", phase: "Woche 1", aufgabe: "Review-Routine einrichten: Wann prüfe ich täglich das Board?" },
  { id: "ob-08", phase: "Woche 1", aufgabe: "Erste Asana-Rule testen (Review-Übergabe an P01)" },
  { id: "ob-09", phase: "Woche 1", aufgabe: "Einen Prompt aus der Bibliothek in echtem Task nutzen", hinweis: "Prompts-Seite aufrufen" },
  { id: "ob-10", phase: "Woche 1", aufgabe: "Pain-Point-Map durchlesen: Welche 3 Punkte sind jetzt am relevantesten?" },
  { id: "ob-11", phase: "Woche 1", aufgabe: "Mit P01 klären: Wie ist der Freigabe-Rhythmus? Wann schaut P01 ins Board?" },

  // Woche 2
  { id: "ob-12", phase: "Woche 2", aufgabe: "Ersten Performance-Check durchführen (7-Tage-Auswertung)" },
  { id: "ob-13", phase: "Woche 2", aufgabe: "Content-Planung für den aktuellen Monat strukturieren" },
  { id: "ob-14", phase: "Woche 2", aufgabe: "Fehlende Vorlagen oder Canva-Templates identifizieren und anlegen" },
  { id: "ob-15", phase: "Woche 2", aufgabe: "Weekly Review: Was steckt fest? Was ist diese Woche fällig?" },
  { id: "ob-16", phase: "Woche 2", aufgabe: "Offene Fragen und Unklarheiten sammeln für P01-Abstimmung" },

  // Danach
  { id: "ob-17", phase: "Danach", aufgabe: "Playbook monatlich verbessern: Was fehlt? Was stimmt nicht mehr?" },
  { id: "ob-18", phase: "Danach", aufgabe: "Automationen nachschärfen sobald Routinen klar sind" },
  { id: "ob-19", phase: "Danach", aufgabe: "Wiederkehrende Aufgaben standardisieren (Task-Templates, Prompts)" },
  { id: "ob-20", phase: "Danach", aufgabe: "Vierteljährliches Review: Welche Pain Points sind gelöst? Welche neu?" },
];

// ── Rollenübersicht ────────────────────────────────────────────

export const cpRoles = [
  {
    kuerzel: "P01",
    name: "CEO / Strategie",
    hauptverantwortung: "Strategische Richtung, fachliche Stimme, finale Freigabe",
    routine: [
      "Review-Queue 2–3× pro Woche prüfen (max. 15 Min.)",
      "Monatliche Content-Planung gemeinsam mit P03",
      "Performance-Einschätzung nach 7 Tagen",
    ],
    darf: [
      "Inhaltliche Ablehnung ohne Detailbegründung",
      "Themen ad hoc aus Backlog priorisieren",
    ],
    darfNicht: [
      "Review über WhatsApp abwickeln",
      "Freigabe-Tasks länger als 1 Werktag liegen lassen",
    ],
  },
  {
    kuerzel: "P03",
    name: "Marketing / Backoffice",
    hauptverantwortung: "Content-Produktion, Publishing, Performance-Tracking",
    routine: [
      "Täglicher Board-Check: Was steckt fest?",
      "Wöchentliche Planung: Was kommt nächste Woche?",
      "Performance-Check 7 Tage nach Veröffentlichung",
    ],
    darf: [
      "Tasks im Backlog priorisieren (mit P01-Bestätigung)",
      "Eigenständig Draft erstellen und in Review schieben",
      "Prompt-Bibliothek erweitern (nach Teamabstimmung)",
    ],
    darfNicht: [
      "Content ohne P01-Freigabe veröffentlichen",
      "KI-Texte unüberarbeitet weitergeben",
      "Kundeninfos in externe KI-Tools eingeben",
    ],
  },
  {
    kuerzel: "P02",
    name: "Beratung / OKR-Coach",
    hauptverantwortung: "Inhaltliche Impulse aus Beratungsarbeit",
    routine: [
      "Nach Projekten / Workshops: 1–2 Content-Ideen in Backlog",
      "Fachliche Inputs auf Anfrage von P03",
    ],
    darf: ["Ideen direkt in Backlog eintragen"],
    darfNicht: ["Briefings ohne Zielgruppe und Kernaussage übergeben"],
  },
  {
    kuerzel: "P04",
    name: "Operations / Ausbildung",
    hauptverantwortung: "Ideen aus Ausbildungen liefern, Webinar-Support",
    routine: ["Teilnehmerfragen als Content-Ideen weiterleiten"],
    darf: ["Ideen in Backlog eintragen"],
    darfNicht: ["Teilnehmerdaten in Content-Tasks eintragen"],
  },
];

// ── Grundregeln ────────────────────────────────────────────────

export const cpGrundregeln = [
  "Kein Content ohne Zielgruppe.",
  "Kein Content ohne Ziel oder CTA.",
  "Kein Review ohne konkrete Review-Frage.",
  "Keine Veröffentlichung ohne Dokument- oder Asset-Link.",
  "Kein veröffentlichter Content ohne Performance-Check nach 7 Tagen.",
  "KI liefert Rohmaterial — Mensch ist Autor.",
  "Links statt Sucharbeit: Alle Assets direkt im Task verlinkt.",
  "Board-Wechsel ist Übergabe — strukturiert, mit Mindestinfos.",
  "Automatisierung schafft Klarheit — keine Notification-Flut.",
  "Keine vertraulichen Daten in externe KI-Tools.",
];

// ── Wenn-Dann Shortcuts ────────────────────────────────────────

export const cpWennDann = [
  { wenn: "Ich eine neue Content-Idee habe", dann: "Task in Backlog / Ideen anlegen — Titel reicht", href: "/playbooks/content-pipeline/workflow" },
  { wenn: "Ich einen LinkedIn-Draft brauche", dann: "Prompt 'LinkedIn-Draft' öffnen und kopieren", href: "/playbooks/content-pipeline/prompts" },
  { wenn: "Ein KI-Text generisch klingt", dann: "Prompt 'Brand Voice' öffnen", href: "/playbooks/content-pipeline/prompts" },
  { wenn: "Content freigegeben werden soll", dann: "In Section 'Review P01' verschieben", href: "/playbooks/content-pipeline/workflow" },
  { wenn: "Ein Post veröffentlicht wurde", dann: "Performance-Check nach 7 Tagen einplanen", href: "/playbooks/content-pipeline/lifecycle#performance-learning" },
  { wenn: "Ich weiß welches Board zuständig ist", dann: "Board-Übergabe strukturiert durchführen", href: "/playbooks/content-pipeline/handoffs" },
  { wenn: "Ich als Board Owner starte", dann: "14-Tage-Onboarding beginnen", href: "/playbooks/content-pipeline/onboarding" },
  { wenn: "Ich Automationen einrichten will", dann: "Automation-Seite mit Setup-Schritten öffnen", href: "/playbooks/content-pipeline/automations" },
];
