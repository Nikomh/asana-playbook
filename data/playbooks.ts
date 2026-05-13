import type { Playbook } from "./types";

export const playbooks: Playbook[] = [
  {
    id: "content-pipeline",
    slug: "content-pipeline",
    titel: "Content-Pipeline",
    board: "Content & Marketing Kalender",
    bereich: "Marketing",
    farbe: "blue",
    kurzfassung:
      "Steuert den gesamten Content-Workflow von der Idee bis zur Veröffentlichung. Sorgt dafür, dass Inhalte rechtzeitig freigegeben, konsistent produziert und nachverfolgt werden.",
    boardZweck:
      "Der Content & Marketing Kalender ist das zentrale Steuerungsinstrument für alle Marketing-Inhalte. Er macht den Status jedes Contents sichtbar, koordiniert Review und Freigabe und verhindert, dass Inhalte im E-Mail-Postfach oder in Chat-Nachrichten verschwinden.",
    rollen: [
      {
        kuerzel: "P03",
        name: "Marketing / Backoffice",
        verantwortung: "Board Owner, Produktion, Koordination, Veröffentlichung",
      },
      {
        kuerzel: "P01",
        name: "CEO / Strategie",
        verantwortung: "Finale Freigabe aller nach außen gehenden Inhalte",
      },
      {
        kuerzel: "P02",
        name: "Beratung / OKR-Coach",
        verantwortung: "Inhaltliche Zulieferung für Beratungsthemen, Fachreviews",
      },
    ],
    lifecycle: [
      {
        label: "Idee",
        description: "Eine Themenidee wird angelegt. Kein Aufwand nötig, nur festhalten.",
        asanaSection: "Ideen-Pool",
      },
      {
        label: "Briefing",
        description: "Idee wird konkretisiert: Kanal, Format, Zielgruppe, grobe Botschaft.",
        asanaSection: "In Arbeit",
      },
      {
        label: "Entwurf",
        description: "Text oder Bildmaterial wird erstellt. KI kann hier unterstützen.",
        asanaSection: "In Arbeit",
      },
      {
        label: "Internes Review",
        description: "Fachliche Prüfung durch P02 oder P01 – inhaltlich, nicht formal.",
        asanaSection: "Review",
      },
      {
        label: "Freigabe",
        description: "P01 gibt das finale OK für Veröffentlichung.",
        asanaSection: "Freigabe",
      },
      {
        label: "Produktion",
        description: "Finale Aufbereitung: Grafik, Formatierung, Planung.",
        asanaSection: "Geplant",
      },
      {
        label: "Veröffentlichung",
        description: "Content geht live. Link wird in Asana eingetragen.",
        asanaSection: "Veröffentlicht",
      },
      {
        label: "Auswertung",
        description: "Reichweite, Reaktionen und Learnings werden notiert.",
        asanaSection: "Archiv",
      },
    ],
    sections: [
      {
        name: "Ideen-Pool",
        zweck: "Sammlung aller Themenideen ohne Bearbeitung",
        einzug: "Jede neue Idee sofort hier ablegen",
        ausgang: "Idee wird zu Briefing → In Arbeit",
      },
      {
        name: "In Arbeit",
        zweck: "Inhalte in aktiver Bearbeitung (Briefing + Entwurf)",
        einzug: "Aus Ideen-Pool, wenn Ressource vorhanden",
        ausgang: "Entwurf fertig → Review",
      },
      {
        name: "Review",
        zweck: "Fachliches Review durch P02 oder P01",
        einzug: "Aus In Arbeit, wenn Entwurf vollständig",
        ausgang: "Review abgeschlossen → Freigabe",
      },
      {
        name: "Freigabe",
        zweck: "Finale Freigabe durch P01 vor Veröffentlichung",
        einzug: "Aus Review, wenn kein größerer Überarbeitungsbedarf",
        ausgang: "Freigegeben → Geplant / Veröffentlicht",
      },
      {
        name: "Geplant",
        zweck: "Content ist freigegeben und terminiert",
        einzug: "Nach Freigabe durch P01",
        ausgang: "Veröffentlichungstermin erreicht → Veröffentlicht",
      },
      {
        name: "Veröffentlicht",
        zweck: "Live-Inhalte mit Link und Datum",
        einzug: "Nach Veröffentlichung",
        ausgang: "Nach 4 Wochen → Archiv",
      },
      {
        name: "Archiv",
        zweck: "Abgeschlossene und ausgewertete Inhalte",
        einzug: "Aus Veröffentlicht nach Auswertung",
        ausgang: "Kein weiterer Ausgang",
      },
    ],
    guteAufgabe: [
      "Titel enthält Kanal und Format (z.B. 'LinkedIn-Post: Agile Missverständnisse')",
      "Fälligkeitsdatum ist gesetzt",
      "Owner ist klar benannt",
      "Custom Field 'Status' ist aktuell",
      "Entwurf-Link oder Datei ist angehängt",
      "Bei Freigabe-Tasks: 'Freigabe benötigt bis [Datum]' im Titel oder Beschreibung",
    ],
    customFields: [
      {
        name: "Kanal",
        typ: "Dropdown",
        werte: "LinkedIn, Newsletter, Website, Webinar, Instagram, Sonstiges",
        pflicht: true,
        hinweis: "Bestimmt Format und Tonalität",
      },
      {
        name: "Format",
        typ: "Dropdown",
        werte: "Post, Artikel, Video, Infografik, Newsletter, Landingpage",
        pflicht: true,
      },
      {
        name: "Zielgruppe",
        typ: "Dropdown",
        werte: "Führungskräfte, HR, Teams, Ausbilder, Interessenten",
        pflicht: false,
      },
      {
        name: "Content-Status",
        typ: "Dropdown",
        werte: "Idee, Briefing, Entwurf, Review, Freigabe, Geplant, Live, Archiviert",
        pflicht: true,
      },
      {
        name: "Verantwortliche Person",
        typ: "Person",
        pflicht: true,
      },
      {
        name: "Veröffentlichungsdatum",
        typ: "Datum",
        pflicht: false,
        hinweis: "Bei 'Geplant' immer pflicht",
      },
    ],
    ownerRoutine: [
      {
        rhythmus: "täglich",
        aufgabe: "Board-Check: Steckt etwas in Review oder Freigabe fest?",
        hinweis: "Rückmeldung an P01 wenn Freigabe > 2 Tage ausstehend",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Ideen-Pool sichten: Welche Ideen können diese Woche in Arbeit?",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Veröffentlichungsplanung: Inhalte terminieren und in 'Geplant' einreihen",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Auswertung: LinkedIn-Reichweite, Newsletter-Öffnungsrate notieren",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Archiv aufräumen: Erledigte Tasks schließen, Lernpunkte festhalten",
      },
    ],
    uebergaben: [
      "Content-Pipeline → Sales to Service: Wenn ein Webinar oder Event Lead-Potenzial hat",
      "Content-Pipeline → Knowledge Management: Wenn ein Artikel als dauerhaftes Ressource gilt",
    ],
    painPointRegeln: [
      {
        painPoint: "Freigaben bleiben wochenlang stecken",
        symptom: "P01 sieht Freigabe-Tasks nicht rechtzeitig",
        regel: "Freigabe-Tasks erhalten Fälligkeitsdatum + werden P01 direkt zugewiesen. Bei > 2 Tage ohne Reaktion: kurze Nachricht an P01.",
      },
      {
        painPoint: "Ideen gehen verloren (WhatsApp, E-Mail)",
        symptom: "Gute Ideen tauchen nie wieder auf",
        regel: "Jede Idee — egal woher — kommt sofort als Task in 'Ideen-Pool'. Keine Idee bleibt im Chat.",
      },
      {
        painPoint: "Kein einheitliches Format",
        symptom: "Jeder Post sieht anders aus, kein Wiedererkennungswert",
        regel: "Für jeden Kanal gibt es eine Vorlage in SharePoint. Vor Entwurf wird die Vorlage geöffnet.",
      },
      {
        painPoint: "Veröffentlichungstermine werden vergessen",
        symptom: "Content ist fertig, wird aber nicht live gestellt",
        regel: "Jeder Content in 'Geplant' hat zwingend ein Fälligkeitsdatum. Asana-Regel schickt Erinnerung 1 Tag vorher.",
      },
    ],
    automatisierungen: [
      "Task wechselt zu 'In Arbeit' → Owner erhält Kommentar: 'Entwurf bitte bis [Datum]'",
      "Fälligkeitsdatum überschritten + Status nicht 'Live' → Board Owner wird benachrichtigt",
      "Task in 'Freigabe' seit > 2 Tagen → Automatische Erinnerung an P01",
      "Task wird zu 'Veröffentlicht' → Subtask 'Auswertung anlegen' wird automatisch erstellt",
    ],
    kiArbeitsweisen: [
      "Themenrecherche: KI schlägt 10 Themenideen basierend auf aktuellem Marktumfeld vor",
      "Erststruktur: KI liefert Gliederung für Blogartikel oder LinkedIn-Post",
      "Textentwurf: KI erstellt Rohtext, den P03 dann redigiert und an die Unternehmenssprache anpasst",
      "Bildunterschriften und Headlines: KI generiert 5 Varianten, beste wird ausgewählt",
      "Newsletter-Kurzfassung: Langer Artikel wird von KI in 3-Satz-Zusammenfassung kondensiert",
      "NIEMALS: Fertige Texte ohne menschliches Redigat veröffentlichen",
      "NIEMALS: Kundennamen, Projektdetails oder interne Zahlen in KI-Tools eingeben",
    ],
    doDont: {
      dos: [
        "Jede Idee sofort in den Ideen-Pool eintragen",
        "Custom Fields vollständig ausfüllen bevor Task in Review geht",
        "Freigabe-Deadline klar kommunizieren",
        "Vorlagen aus SharePoint nutzen",
        "Links zu fertigen Entwürfen immer in den Task einfügen",
        "Auswertung nach jeder Veröffentlichung kurz notieren",
      ],
      donts: [
        "Inhalte direkt ohne Freigabe veröffentlichen",
        "Ideen in WhatsApp oder E-Mail lassen",
        "Tasks ohne Owner oder Datum anlegen",
        "Kundennamen in KI-Tools eingeben",
        "Fertige KI-Texte ungeprüft publizieren",
        "Aufgaben in 'Review' ohne Kommentar liegen lassen",
      ],
    },
    erste14Tage: [
      "Tag 1: Board-Übersicht verschaffen — welche Inhalte sind gerade in Arbeit?",
      "Tag 1: Alle Custom Fields verstehen und prüfen, ob sie korrekt gefüllt sind",
      "Tag 2: SharePoint-Ordner für Content-Vorlagen lokalisieren",
      "Tag 3: Mit P01 klären: Welche Freigabe-Frist ist realistisch?",
      "Tag 5: Ersten eigenen Content von Idee bis Briefing durchlaufen",
      "Tag 7: Wöchentliche Board-Routine einrichten (Kalender-Blocker)",
      "Tag 10: Ideen-Pool sichten und erste Priorisierung machen",
      "Tag 14: Erstes Review mit P01: Was funktioniert am Board gut, was nicht?",
    ],
    offeneFragen: [
      "Welche Kanäle haben Priorität 2026? (LinkedIn vs. Newsletter vs. Website)",
      "Wer ist zuständig für Grafik-Erstellung — intern oder extern (Kati)?",
      "Gibt es ein Budget für Content-Tools oder Werbeanzeigen?",
      "Wie werden Webinar-Anmeldungen mit der Content-Pipeline verknüpft?",
    ],
  },
  {
    id: "sales-to-service",
    slug: "sales-to-service",
    titel: "Sales to Service",
    board: "Sales Operations & Angebotsarbeit",
    bereich: "Vertrieb",
    farbe: "amber",
    kurzfassung:
      "Steuert den gesamten Vertriebsprozess von der ersten Anfrage bis zur Übergabe an die Delivery. Macht Anfragen, Angebote und Entscheidungen für alle sichtbar.",
    boardZweck:
      "Der Sales Operations & Angebotsarbeit-Board ist das CRM-Herzstück des Unternehmens — bis ein dediziertes CRM eingeführt wird. Er verhindert, dass Anfragen im E-Mail-Postfach verschwinden, macht den Stand aller Angebote transparent und sorgt für saubere Übergaben an die Delivery.",
    rollen: [
      {
        kuerzel: "P01",
        name: "CEO / Strategie",
        verantwortung: "Board Owner, Qualifizierung, Angebotsfreigabe, Kundengespräche",
      },
      {
        kuerzel: "P02",
        name: "Beratung / OKR-Coach",
        verantwortung: "Inhaltliche Angebotserstellung, Beratungsleistungen kalkulieren",
      },
      {
        kuerzel: "P03",
        name: "Marketing / Backoffice",
        verantwortung: "Administrative Angebotsunterstützung, Ablage, Wiedervorlagen",
      },
    ],
    lifecycle: [
      {
        label: "Anfrage eingetroffen",
        description: "Eine Kundenanfrage kommt rein — per E-Mail, Telefon, Formular oder Empfehlung.",
        asanaSection: "Neue Anfragen",
      },
      {
        label: "Qualifizierung",
        description: "P01 bewertet: Passt das zu uns? Welches Budget? Welcher Zeitraum? Welche Leistung?",
        asanaSection: "Qualifizierung",
      },
      {
        label: "Angebot in Arbeit",
        description: "Angebot wird erstellt. Vorlage aus SharePoint, inhaltliche Details von P02.",
        asanaSection: "Angebote in Arbeit",
      },
      {
        label: "Angebot versendet",
        description: "Angebot geht raus. Wiedervorlagetermin wird gesetzt.",
        asanaSection: "Verhandlung / Follow-up",
      },
      {
        label: "Verhandlung",
        description: "Rückfragen, Anpassungen, Nachverhandlung. Alle Versionen in SharePoint.",
        asanaSection: "Verhandlung / Follow-up",
      },
      {
        label: "Entscheidung",
        description: "Kunde sagt Ja oder Nein.",
        asanaSection: "Gewonnen / Verloren",
      },
      {
        label: "Übergabe",
        description: "Bei Ja: Übergabe an Client Delivery oder Ausbildung & Training.",
        asanaSection: "Übergabe ausstehend",
      },
    ],
    sections: [
      {
        name: "Neue Anfragen",
        zweck: "Inbox für alle eingehenden Anfragen",
        einzug: "Jede Anfrage sofort, ohne Bewertung",
        ausgang: "Nach Erstbewertung: Qualifizierung oder Archiv",
      },
      {
        name: "Qualifizierung",
        zweck: "Prüfung ob Anfrage zu Agile X passt",
        einzug: "Aus Neue Anfragen",
        ausgang: "Passend → Angebote in Arbeit | Nicht passend → Archiv",
      },
      {
        name: "Angebote in Arbeit",
        zweck: "Angebote in aktiver Erstellung",
        einzug: "Aus Qualifizierung",
        ausgang: "Angebot fertig → Verhandlung / Follow-up",
      },
      {
        name: "Verhandlung / Follow-up",
        zweck: "Versendete Angebote mit offener Entscheidung",
        einzug: "Nach Angebotsversand",
        ausgang: "Ja → Gewonnen | Nein → Verloren",
      },
      {
        name: "Gewonnen",
        zweck: "Bestätigte Aufträge, Übergabe vorbereiten",
        einzug: "Nach Kundenzusage",
        ausgang: "Übergabe abgeschlossen → Archiv",
      },
      {
        name: "Verloren",
        zweck: "Abgelehnte Angebote mit Lernpunkt",
        einzug: "Nach Absage",
        ausgang: "Nach Analyse → Archiv",
      },
      {
        name: "Übergabe ausstehend",
        zweck: "Gewonnene Aufträge warten auf Übergabe an Delivery",
        einzug: "Aus Gewonnen",
        ausgang: "Übergabe done → Archiv",
      },
    ],
    guteAufgabe: [
      "Titel enthält: Kundenname + Leistungstyp (z.B. 'Bosch – Agile Coach Ausbildung 2026')",
      "Kundenkontakt und Ansprechpartner sind notiert",
      "Angebotswert (auch geschätzt) ist eingetragen",
      "Angebotstyp (Beratung / Ausbildung / Workshop) ist gesetzt",
      "Nächste Aktion mit Datum ist als Subtask angelegt",
      "SharePoint-Link zum Angebotsdokument ist vorhanden",
    ],
    customFields: [
      {
        name: "Angebotstyp",
        typ: "Dropdown",
        werte: "Beratungsmandat, Ausbildung/IHK, Workshop, Webinar, Sonstiges",
        pflicht: true,
      },
      {
        name: "Angebotswert (€)",
        typ: "Zahl",
        pflicht: false,
        hinweis: "Auch grobe Schätzung eintragen hilft bei Priorisierung",
      },
      {
        name: "Priorität",
        typ: "Dropdown",
        werte: "Hoch, Mittel, Niedrig",
        pflicht: true,
      },
      {
        name: "Nächster Schritt",
        typ: "Text",
        pflicht: true,
        hinweis: "Was ist die nächste Aktion und wann?",
      },
      {
        name: "Entscheidungsdatum",
        typ: "Datum",
        pflicht: false,
        hinweis: "Wann entscheidet der Kunde?",
      },
      {
        name: "SharePoint-Link",
        typ: "URL",
        pflicht: false,
        hinweis: "Link zum Angebotsdokument",
      },
    ],
    ownerRoutine: [
      {
        rhythmus: "täglich",
        aufgabe: "Neue Anfragen prüfen und sofort qualifizieren",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Alle offenen Angebote in 'Verhandlung' reviewen — nächster Schritt aktuell?",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Follow-up-Erinnerungen für Wiedervorlagen prüfen",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Verluste analysieren: Was war der Ablehnungsgrund?",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Pipeline-Übersicht erstellen: Wie viele Angebote laufen, welcher Gesamtwert?",
      },
    ],
    uebergaben: [
      "Sales to Service → Client Delivery: Bei gewonnenem Beratungsmandat",
      "Sales to Service → Ausbildung & Training: Bei gewonnener Ausbildung oder Kohorte",
      "Sales to Service → Content-Pipeline: Wenn gewonnener Auftrag Content-Potenzial hat (Case Study)",
    ],
    painPointRegeln: [
      {
        painPoint: "Anfragen verschwinden im E-Mail-Postfach",
        symptom: "Keine Anfrage wird je vergessen, aber niemand weiß welche offen sind",
        regel: "Jede Anfrage — egal per welchem Kanal — innerhalb von 24h als Task in 'Neue Anfragen' anlegen.",
      },
      {
        painPoint: "Angebote dauern zu lange",
        symptom: "Kunden warten 2+ Wochen auf ein Angebot",
        regel: "Angebotserstellung: maximal 5 Werktage von Qualifizierung bis Versand. Vorlage aus SharePoint verwenden.",
      },
      {
        painPoint: "Kein einheitliches Angebotsformat",
        symptom: "Jedes Angebot sieht anders aus, Preise inkonsistent",
        regel: "Angebotsvorlage in SharePoint ist Pflicht. Abweichungen nur mit Begründung und P01-Freigabe.",
      },
      {
        painPoint: "Verlustgründe werden nie analysiert",
        symptom: "Gleiche Fehler wiederholen sich",
        regel: "Jedes verlorene Angebot bekommt einen Lernpunkt-Kommentar. Monatliche Analyse.",
      },
    ],
    automatisierungen: [
      "Task landet in 'Neue Anfragen' → Automatische Zuweisung an P01",
      "Task ist seit 5 Tagen in 'Angebote in Arbeit' ohne Änderung → Erinnerung an Owner",
      "Entscheidungsdatum überschritten → Board Owner wird benachrichtigt",
      "Task geht zu 'Gewonnen' → Subtask 'Übergabe an Delivery vorbereiten' wird erstellt",
      "Task geht zu 'Verloren' → Subtask 'Lernpunkt eintragen' wird erstellt",
    ],
    kiArbeitsweisen: [
      "Angebotsstruktur: KI erstellt Gliederung für Angebot basierend auf Kundenanfrage",
      "Preiskalkulation: KI hilft Aufwände schätzen — aber finale Entscheidung bei P01",
      "Briefing-Zusammenfassung: Langes Anfrage-E-Mail in 5 Punkte kondensieren",
      "Follow-up-Formulierung: KI entwirft höfliche Nachfass-Nachricht",
      "NIEMALS: Echte Kundennamen, Preise oder Vertragsdetails in öffentliche KI-Tools",
      "NIEMALS: Angebote ohne P01-Prüfung versenden, auch wenn KI geholfen hat",
    ],
    doDont: {
      dos: [
        "Jede Anfrage innerhalb von 24h als Task anlegen",
        "Angebotsvorlage aus SharePoint nutzen",
        "'Nächster Schritt' immer aktuell halten",
        "Verluste analysieren und Lernpunkt eintragen",
        "Übergabe an Delivery sauber dokumentieren",
        "Wiedervorlagetermine als Fälligkeitsdatum setzen",
      ],
      donts: [
        "Anfragen im E-Mail-Postfach vergessen",
        "Angebote ohne Vorlage erstellen",
        "Kundennamen in KI-Tools eingeben",
        "Gewonnene Aufträge ohne Übergabe-Task weitergeben",
        "Tasks ohne 'Nächsten Schritt' stehen lassen",
        "Angebotswert leer lassen",
      ],
    },
    erste14Tage: [
      "Tag 1: Alle aktuell offenen Angebote und Anfragen im Board erfassen",
      "Tag 2: SharePoint-Angebotsvorlage lokalisieren und testen",
      "Tag 3: Alle Custom Fields auf Vollständigkeit prüfen",
      "Tag 5: Mit P02 klären: Wie kalkulieren wir Beratungsleistungen?",
      "Tag 7: Erste eigene Anfrage vollständig durch den Lifecycle führen",
      "Tag 10: Weekly-Review-Routine im Kalender blocken",
      "Tag 14: Rückblick mit P01: Pipeline realistisch? Angebotsprozess zu lang?",
    ],
    offeneFragen: [
      "Wann wird ein dediziertes CRM (z.B. HubSpot) eingeführt?",
      "Gibt es ein Preishandbuch mit Standardpreisen pro Leistungstyp?",
      "Wie werden Empfehlungsanfragen von Bestandskunden priorisiert?",
      "Welche Informationen braucht Delivery mindestens bei Übergabe?",
    ],
  },
  {
    id: "client-delivery",
    slug: "client-delivery",
    titel: "Client Delivery",
    board: "Client Delivery Cockpit",
    bereich: "Beratung",
    farbe: "green",
    kurzfassung:
      "Steuert alle laufenden Beratungsmandate von Kickoff bis Abschluss. Macht Projektstatus, Meilensteine und Übergaben für das gesamte Team sichtbar.",
    boardZweck:
      "Das Client Delivery Cockpit ist die operative Zentrale für alle aktiven Kundenprojekte. Es verhindert den CEO-Flaschenhals bei der Projektsteuerung, sorgt für klare Verantwortlichkeiten und stellt sicher, dass kein Mandat ohne saubere Dokumentation endet.",
    rollen: [
      {
        kuerzel: "P01",
        name: "CEO / Strategie",
        verantwortung: "Finale Verantwortung, Eskalationen, strategische Entscheidungen",
      },
      {
        kuerzel: "P02",
        name: "Beratung / OKR-Coach",
        verantwortung: "Operativer Projektleiter, Kundenbeziehung, Meilensteindurchführung",
      },
      {
        kuerzel: "P03",
        name: "Marketing / Backoffice",
        verantwortung: "Administrative Unterstützung, Terminkoordination, Rechnungsstellung",
      },
    ],
    lifecycle: [
      {
        label: "Übergabe von Sales",
        description: "Gewonnener Auftrag kommt als Task mit Briefing von Sales to Service.",
        asanaSection: "In Vorbereitung",
      },
      {
        label: "Kickoff-Vorbereitung",
        description: "Projektplan, Teilnehmer, Zeitplan, Materialien werden vorbereitet.",
        asanaSection: "In Vorbereitung",
      },
      {
        label: "Kickoff",
        description: "Auftaktgespräch mit dem Kunden. Erwartungen, Ziele, Rhythmus klären.",
        asanaSection: "Aktive Mandate",
      },
      {
        label: "Durchführung",
        description: "Laufende Beratungsarbeit: Workshops, Coachings, Retrospektiven.",
        asanaSection: "Aktive Mandate",
      },
      {
        label: "Meilenstein-Review",
        description: "Zwischenstand mit Kunden prüfen. Kurskorrekturen wenn nötig.",
        asanaSection: "Review / Meilenstein",
      },
      {
        label: "Abschluss",
        description: "Letztes Kundengespräch, Abschlussdokumentation, Lessons Learned.",
        asanaSection: "Abschluss ausstehend",
      },
      {
        label: "Dokumentation & Ablage",
        description: "Alle Materialien in SharePoint, Case Study überlegen, Rechnung stellen.",
        asanaSection: "Abgeschlossen",
      },
    ],
    sections: [
      {
        name: "In Vorbereitung",
        zweck: "Mandate die vorbereitet werden, noch nicht gestartet",
        einzug: "Übergabe aus Sales to Service",
        ausgang: "Kickoff abgeschlossen → Aktive Mandate",
      },
      {
        name: "Aktive Mandate",
        zweck: "Laufende Projekte in Durchführung",
        einzug: "Nach Kickoff",
        ausgang: "Meilenstein erreicht → Review | Projektende → Abschluss ausstehend",
      },
      {
        name: "Review / Meilenstein",
        zweck: "Meilensteine und Zwischenreviews mit Kunden",
        einzug: "Aus Aktive Mandate bei Meilenstein",
        ausgang: "Zurück zu Aktive Mandate oder zu Abschluss",
      },
      {
        name: "Abschluss ausstehend",
        zweck: "Projekte kurz vor Abschluss, Doku fehlt noch",
        einzug: "Nach letztem Meilenstein",
        ausgang: "Doku fertig → Abgeschlossen",
      },
      {
        name: "Abgeschlossen",
        zweck: "Beendete Mandate mit vollständiger Dokumentation",
        einzug: "Nach Abschlussdoku",
        ausgang: "Kein weiterer Ausgang",
      },
    ],
    guteAufgabe: [
      "Titel: Kundenname + Projekttyp + Jahr (z.B. 'Pharma-Kunde – OKR-Beratung Q2 2026')",
      "Start- und Enddatum sind gesetzt",
      "Owner ist P02 oder P01",
      "SharePoint-Link zum Projektordner ist vorhanden",
      "Nächster Meilenstein ist als Subtask mit Datum angelegt",
      "Rechnungsstatus ist als Custom Field gepflegt",
    ],
    customFields: [
      {
        name: "Projekttyp",
        typ: "Dropdown",
        werte: "OKR-Beratung, Agile Transformation, Coaching, Workshop-Serie, Sonstiges",
        pflicht: true,
      },
      {
        name: "Projektstatus",
        typ: "Dropdown",
        werte: "Vorbereitung, Aktiv, Meilenstein, Abschluss, Fertig",
        pflicht: true,
      },
      {
        name: "Rechnungsstatus",
        typ: "Dropdown",
        werte: "Ausstehend, Gestellt, Bezahlt, Mahnung",
        pflicht: true,
      },
      {
        name: "SharePoint-Link",
        typ: "URL",
        pflicht: true,
        hinweis: "Link zum Projektordner, nicht zu einzelnen Dateien",
      },
      {
        name: "Nächster Meilenstein",
        typ: "Datum",
        pflicht: false,
      },
    ],
    ownerRoutine: [
      {
        rhythmus: "täglich",
        aufgabe: "Aktive Mandate checken — gibt es Blockaden oder Eskalationsbedarf?",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Status aller aktiven Mandate in 5-Minuten-Übersicht mit P01 besprechen",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Abschluss-Checkliste für Mandate in 'Abschluss ausstehend' abarbeiten",
      },
      {
        rhythmus: "quartalsweise",
        aufgabe: "Abgeschlossene Mandate auf Case-Study-Potenzial prüfen",
      },
    ],
    uebergaben: [
      "Client Delivery → Internal Operations: Rechnungsstellung und Buchhaltung",
      "Client Delivery → Sales to Service: Verlängerungsangebote für Bestandskunden",
      "Client Delivery → Content-Pipeline: Case Studies und Erfolgsgeschichten",
    ],
    painPointRegeln: [
      {
        painPoint: "P01-Flaschenhals bei Projektentscheidungen",
        symptom: "Jede Entscheidung braucht CEO-OK, Projekte stocken",
        regel: "P02 hat klare Entscheidungskompetenz für operative Projektentscheidungen. P01 nur bei: Budget >X, Scope-Änderung, Eskalation.",
      },
      {
        painPoint: "Keine Dokumentation nach Projektende",
        symptom: "Was haben wir gelernt? Was lief gut? Niemand weiß es mehr.",
        regel: "Kein Projekt endet ohne Abschlussdokumentation in SharePoint. 'Abschluss ausstehend' bleibt offen bis Doku fertig.",
      },
      {
        painPoint: "Übergabe von Sales ist unvollständig",
        symptom: "Delivery startet ohne ausreichend Kundenkontext",
        regel: "Übergabe-Task aus Sales muss: Kundenbriefing, Angebot-Link, Ansprechpartner, Budget und Scope enthalten.",
      },
    ],
    automatisierungen: [
      "Task in 'Abschluss ausstehend' seit > 14 Tagen → Erinnerung an P02",
      "Meilenstein-Datum erreicht → Kommentar 'Meilenstein-Review durchgeführt?' automatisch",
      "Rechnungsstatus auf 'Ausstehend' seit > 30 Tagen → Erinnerung an P03",
      "Task geht zu 'Abgeschlossen' → Subtask 'Case Study prüfen?' wird erstellt",
    ],
    kiArbeitsweisen: [
      "Projektplan-Entwurf: KI erstellt ersten Meilensteinplan basierend auf Leistungsumfang",
      "Meilenstein-Zusammenfassung: KI kondensiert Workshop-Notizen in strukturiertes Protokoll",
      "Abschlussbericht: KI hilft bei Struktur und Erstformulierung",
      "NIEMALS: Echte Kundendaten, Projektzahlen oder vertrauliche Inhalte in KI-Tools",
    ],
    doDont: {
      dos: [
        "SharePoint-Link ab Tag 1 in den Task eintragen",
        "Meilensteine als Subtasks mit Datum anlegen",
        "Rechnungsstatus aktuell halten",
        "Lessons Learned bei jedem Projektabschluss notieren",
        "P01 nur bei echten Eskalationen einbeziehen",
        "Übergabe-Qualität aus Sales prüfen und rückfragen wenn nötig",
      ],
      donts: [
        "Projekte ohne Abschlussdokumentation schließen",
        "Kundendaten in KI-Tools eingeben",
        "P01 für operative Kleinstentscheidungen fragen",
        "Rechnungsstellung vergessen (Rechnungsstatus leer lassen)",
        "Mandate ohne Meilensteine führen",
        "Übergaben mündlich machen — immer in Asana dokumentieren",
      ],
    },
    erste14Tage: [
      "Tag 1: Alle aktiven Mandate erfassen und in Board eintragen",
      "Tag 2: SharePoint-Projektordner-Struktur verstehen",
      "Tag 3: Mit P02 klären: Wer hat aktuell welche Projekte?",
      "Tag 5: Entscheidungsmatrix mit P01 klären (was kann P02 alleine entscheiden?)",
      "Tag 7: Übergabe-Checkliste aus Sales mit P01 absprechen",
      "Tag 10: Erstes Mandat vollständig durch Lifecycle führen",
      "Tag 14: Lessons Learned aus den ersten 2 Wochen mit P01 besprechen",
    ],
    offeneFragen: [
      "Wie genau ist die Entscheidungskompetenz zwischen P01 und P02 abgegrenzt?",
      "Welche Projekte laufen gerade, welche sind in Abschluss?",
      "Wie werden Verlängerungen oder Folgeprojekte ausgelöst?",
      "Gibt es ein Standardprotokoll-Format für Meilenstein-Reviews?",
    ],
  },
  {
    id: "ausbildung-training",
    slug: "ausbildung-training",
    titel: "Ausbildung & Training",
    board: "Academy & Ausbildungen",
    bereich: "Bildung",
    farbe: "purple",
    kurzfassung:
      "Koordiniert alle Ausbildungsprogramme, IHK-Kurse und Trainingsformate von der Jahresplanung bis zur Auswertung. Reduziert Wiederholungsarbeit durch Templates und klare Routinen.",
    boardZweck:
      "Der Academy & Ausbildungen-Board macht das gesamte Bildungsangebot steuerbar. Er verhindert Seminar-Chaos durch konsequente Vorlagen, macht Anmeldestatus und Kapazitäten sichtbar und sorgt dafür, dass Wissen aus Durchführungen für die nächste Kohorte erhalten bleibt.",
    rollen: [
      {
        kuerzel: "P04",
        name: "Backoffice / Seminarorganisation",
        verantwortung: "Board Owner, Anmeldungen, Logistik, Teilnehmerkommunikation, Abrechnung",
      },
      {
        kuerzel: "P02",
        name: "Beratung / OKR-Coach",
        verantwortung: "Inhaltliche Verantwortung, Durchführung, Qualitätssicherung",
      },
      {
        kuerzel: "P01",
        name: "CEO / Strategie",
        verantwortung: "Jahresplanung, Preisgestaltung, Strategische Entscheidungen",
      },
    ],
    lifecycle: [
      {
        label: "Jahresplanung",
        description: "Welche Ausbildungen und Kohorten finden in diesem Jahr statt? Termine grob festlegen.",
        asanaSection: "Jahresübersicht",
      },
      {
        label: "Kohorte anlegen",
        description: "Template für neue Kohorte verwenden. Alle Subtasks werden automatisch erstellt.",
        asanaSection: "Planungsphase",
      },
      {
        label: "Anmeldephase",
        description: "Marketing informiert, Anmeldungen gehen ein, Teilnehmer werden bestätigt.",
        asanaSection: "Anmeldungen offen",
      },
      {
        label: "Vorbereitung",
        description: "Materialien, Räume, Technik, Teilnehmerunterlagen vorbereiten.",
        asanaSection: "In Vorbereitung",
      },
      {
        label: "Durchführung",
        description: "Ausbildung läuft. Anwesenheit, Fragen und Auffälligkeiten dokumentieren.",
        asanaSection: "Laufend",
      },
      {
        label: "Auswertung",
        description: "Feedback sammeln, Evaluationsbögen auswerten, Zertifikate ausstellen.",
        asanaSection: "Abschluss & Auswertung",
      },
      {
        label: "Archivierung",
        description: "Kohorte wird archiviert, Learnings für nächste Kohorte festgehalten.",
        asanaSection: "Archiv",
      },
    ],
    sections: [
      {
        name: "Jahresübersicht",
        zweck: "Grobe Jahresplanung aller Formate und Kohorten",
        einzug: "Einmal jährlich, Januar",
        ausgang: "Kohorte wird konkret → Planungsphase",
      },
      {
        name: "Planungsphase",
        zweck: "Kohorte im Aufbau, noch nicht zur Anmeldung offen",
        einzug: "Aus Jahresübersicht",
        ausgang: "Alles vorbereitet → Anmeldungen offen",
      },
      {
        name: "Anmeldungen offen",
        zweck: "Öffentliche Ausschreibung läuft, Anmeldungen werden gesammelt",
        einzug: "Aus Planungsphase",
        ausgang: "Mindest-TN-Zahl erreicht → In Vorbereitung | Nicht erreicht → Entscheidung",
      },
      {
        name: "In Vorbereitung",
        zweck: "Kohorte ist bestätigt, operative Vorbereitung läuft",
        einzug: "Aus Anmeldungen offen",
        ausgang: "Startdatum → Laufend",
      },
      {
        name: "Laufend",
        zweck: "Ausbildung ist in aktiver Durchführung",
        einzug: "Am Startdatum",
        ausgang: "Letzter Termin → Abschluss & Auswertung",
      },
      {
        name: "Abschluss & Auswertung",
        zweck: "Feedback, Zertifikate, Abrechnung",
        einzug: "Nach letztem Ausbildungstermin",
        ausgang: "Alles abgeschlossen → Archiv",
      },
      {
        name: "Archiv",
        zweck: "Abgeschlossene Kohorten mit Learnings",
        einzug: "Nach vollständigem Abschluss",
        ausgang: "Kein weiterer Ausgang",
      },
    ],
    guteAufgabe: [
      "Titel: Formatname + Kohorte + Jahr (z.B. 'IHK Ausbilderschein – KH-03 2026')",
      "Start- und Endtermin der Ausbildung sind gesetzt",
      "Maximale Teilnehmeranzahl ist notiert",
      "Template wurde als Basis verwendet",
      "SharePoint-Link zum Kohorte-Ordner ist vorhanden",
      "Verantwortliche (P04 operativ, P02 inhaltlich) sind klar getrennt",
    ],
    customFields: [
      {
        name: "Format",
        typ: "Dropdown",
        werte: "IHK Ausbilderschein, Inhouse-Training, Webinar-Reihe, Agile Coach, Sonstiges",
        pflicht: true,
      },
      {
        name: "Kohorte-Status",
        typ: "Dropdown",
        werte: "Planung, Anmeldung offen, Bestätigt, Laufend, Abschluss, Archiviert",
        pflicht: true,
      },
      {
        name: "Teilnehmer (aktuell / max)",
        typ: "Text",
        pflicht: false,
        hinweis: "z.B. '12/16' — hilft Kapazitätsplanung",
      },
      {
        name: "Location / Format",
        typ: "Dropdown",
        werte: "Präsenz Hamburg, Online, Hybrid, Inhouse beim Kunden",
        pflicht: true,
      },
      {
        name: "Inhaltlicher Owner",
        typ: "Person",
        pflicht: true,
        hinweis: "Wer trägt fachliche Verantwortung?",
      },
    ],
    ownerRoutine: [
      {
        rhythmus: "täglich",
        aufgabe: "Eingehende Anmeldungen prüfen und bestätigen",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Anmeldestatus aller offenen Kohorten prüfen — Zielzahl erreicht?",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Jahresplanung aktualisieren: Neue Termine, Ausfälle, Kapazitäten",
      },
      {
        rhythmus: "quartalsweise",
        aufgabe: "Evaluationsbögen auswerten und Learnings für nächste Kohorte dokumentieren",
      },
    ],
    uebergaben: [
      "Ausbildung & Training → Sales to Service: Wenn Inhouse-Anfragen entstehen",
      "Ausbildung & Training → Internal Operations: Abrechnungen, Zertifikatsdruck",
      "Ausbildung & Training → Content-Pipeline: Learnings aus Ausbildungen als Content",
    ],
    painPointRegeln: [
      {
        painPoint: "Seminar-Organisation-Chaos: Alles in E-Mails",
        symptom: "Wer hat sich angemeldet? Welche Räume sind gebucht? Niemand weiß es.",
        regel: "Jede Kohorte hat einen eigenen Task mit Template. Alle Infos in Asana und SharePoint — nicht in E-Mails.",
      },
      {
        painPoint: "Wiederholungsarbeit bei neuer Kohorte",
        symptom: "Jedes Mal von vorne anfangen, gleiches Material suchen",
        regel: "Template für Kohorte verwenden. Template wird nach jeder Durchführung aktualisiert.",
      },
      {
        painPoint: "Zu wenig Teilnehmer, zu spät reagiert",
        symptom: "Ausbildung muss kurzfristig abgesagt werden",
        regel: "Mindest-TN-Zahl als Custom Field. Wenn 4 Wochen vor Start nicht erreicht: Entscheidung mit P01.",
      },
    ],
    automatisierungen: [
      "Startdatum einer Kohorte in 4 Wochen + TN-Zahl < Minimum → Alert an P04 und P01",
      "Kohorte wechselt zu 'Laufend' → Subtask 'Feedback-Bögen vorbereiten' wird erstellt",
      "Kohorte geht zu 'Abschluss' → Subtask 'Zertifikate ausstellen' + 'Rechnung stellen' automatisch",
      "Anmeldestatus-Feld: 10 Einträge → Subtask 'Bestätigung versenden' erinnern",
    ],
    kiArbeitsweisen: [
      "Ausbildungsplan-Entwurf: KI erstellt Tagesagenda für neues Format",
      "Teilnehmer-Kommunikation: KI formuliert Einladungs- und Erinnerungsemails",
      "Feedback-Auswertung: KI fasst Evaluationsbögen in strukturierter Übersicht zusammen",
      "NIEMALS: Echte Teilnehmerdaten in KI-Tools eingeben",
    ],
    doDont: {
      dos: [
        "Immer Template für neue Kohorte verwenden",
        "Anmeldestatus täglich aktualisieren",
        "SharePoint-Ordner pro Kohorte anlegen",
        "Mindest-TN-Zahl im Custom Field eintragen",
        "Learnings nach jeder Durchführung dokumentieren",
        "Zertifikate und Abrechnung als separate Subtasks führen",
      ],
      donts: [
        "Teilnehmerdaten in KI-Tools eingeben",
        "Anmeldungen in E-Mails verwalten statt in Asana",
        "Template nach Kohorte nicht aktualisieren",
        "Zu spät reagieren wenn TN-Zahl zu niedrig ist",
        "Lessons Learned vergessen",
        "Rechnungsstellung nicht mit Internal Operations koordinieren",
      ],
    },
    erste14Tage: [
      "Tag 1: Alle laufenden und geplanten Kohorten im Board erfassen",
      "Tag 2: Template für Kohorte in Asana verstehen und ggf. anpassen",
      "Tag 3: SharePoint-Ordnerstruktur für Ausbildungen lokalisieren",
      "Tag 5: Mit P02 klären: Welche Inhalte brauchen welche Vorlaufzeit?",
      "Tag 7: Anmeldeformular-Prozess von Anfang bis Ende durchspielen",
      "Tag 10: Jahresplanung mit P01 abstimmen",
      "Tag 14: Erste Kohorte komplett mit Template angelegt und gepflegt",
    ],
    offeneFragen: [
      "Welche Mindest-TN-Zahlen gelten für welche Formate?",
      "Wie wird die externe Buchhaltung über Teilnahmegebühren informiert?",
      "Gibt es ein zentrales Anmeldesystem oder läuft alles über E-Mail?",
      "Wie werden IHK-relevante Dokumentationspflichten aktuell erfüllt?",
    ],
  },
  {
    id: "internal-operations",
    slug: "internal-operations",
    titel: "Internal Operations",
    board: "Recurring Ops & Admin",
    bereich: "Intern",
    farbe: "gray",
    kurzfassung:
      "Steuert alle wiederkehrenden internen Aufgaben — wöchentlich, monatlich, quartalsweise, jährlich. Verhindert, dass Routineaufgaben vergessen werden und macht interne Abhängigkeiten sichtbar.",
    boardZweck:
      "Der Recurring Ops & Admin-Board ist das Rückgrat des internen Betriebs. Er macht alle Routineaufgaben sichtbar, verhindert durch klare Rhythmen das Vergessen kritischer Fristen und entlastet P01 von Koordinationsaufwand für interne Abläufe.",
    rollen: [
      {
        kuerzel: "P03",
        name: "Backoffice / Marketing",
        verantwortung: "Board Owner, wöchentliche und monatliche Routinen, Koordination",
      },
      {
        kuerzel: "P04",
        name: "Backoffice / Seminarorganisation",
        verantwortung: "Buchhaltung, Abrechnungen, Compliance-Fristen",
      },
      {
        kuerzel: "P01",
        name: "CEO / Strategie",
        verantwortung: "Freigaben, strategische Entscheidungen, Eskalationen",
      },
    ],
    lifecycle: [
      {
        label: "Wiederkehrend fällig",
        description: "Eine Routineaufgabe wird durch Fälligkeitsdatum oder Asana-Wiederholung ausgelöst.",
        asanaSection: "Wöchentlich / Monatlich / Quartalsweise",
      },
      {
        label: "In Bearbeitung",
        description: "Owner übernimmt Task und arbeitet ihn ab.",
        asanaSection: "Ad hoc",
      },
      {
        label: "Wartet auf Extern",
        description: "Task hängt von externer Person (Steuerberater, Buchhaltung) ab.",
        asanaSection: "Wartet auf Input",
      },
      {
        label: "Blockiert",
        description: "Interne Blockade — P01-Entscheidung oder fehlende Info.",
        asanaSection: "Blockiert",
      },
      {
        label: "Erledigt",
        description: "Task ist vollständig abgeschlossen und dokumentiert.",
        asanaSection: "Erledigt",
      },
    ],
    sections: [
      {
        name: "Wöchentlich",
        zweck: "Aufgaben die jede Woche fällig sind",
        einzug: "Festes Setup — nicht spontan hinzufügen",
        ausgang: "Nach Erledigung → Erledigt (Wiederholung automatisch)",
      },
      {
        name: "Monatlich",
        zweck: "Aufgaben die monatlich fällig sind (Buchhaltung, Tools, Newsletter)",
        einzug: "Festes Setup — nicht spontan hinzufügen",
        ausgang: "Nach Erledigung → Erledigt",
      },
      {
        name: "Quartalsweise",
        zweck: "Quartalsaufgaben (USt-Voranmeldung, Reviews, Lizenzen)",
        einzug: "Festes Setup",
        ausgang: "Nach Erledigung → Erledigt",
      },
      {
        name: "Jährlich",
        zweck: "Jahresaufgaben (Jahresabschluss, Domains, Versicherungen)",
        einzug: "Festes Setup",
        ausgang: "Nach Erledigung → Erledigt",
      },
      {
        name: "Ad hoc",
        zweck: "Nicht-wiederkehrende interne Aufgaben",
        einzug: "Spontane interne Aufgaben ohne Heimat in anderen Boards",
        ausgang: "Nach Erledigung → Erledigt",
      },
      {
        name: "Wartet auf Input",
        zweck: "Blockiert durch externe Abhängigkeit",
        einzug: "Wenn externer Input nötig ist",
        ausgang: "Input erhalten → zurück in Bearbeitung",
      },
      {
        name: "Blockiert",
        zweck: "Interne Blocker — P01-Entscheidung nötig",
        einzug: "Wenn interner Blocker identifiziert",
        ausgang: "Blocker aufgelöst → zurück in Bearbeitung",
      },
    ],
    guteAufgabe: [
      "Titel beschreibt genau was zu tun ist (nicht 'Buchhaltung' sondern 'Rechnungen Juni an Steuerberater senden')",
      "Rhythmus ist als Custom Field gesetzt",
      "Wiederholungs-Funktion ist in Asana aktiv",
      "Fristtyp (intern vs. extern/Compliance) ist gesetzt",
      "Verantwortliche Person ist eindeutig",
      "Link zu relevanten Dokumenten oder Accounts ist im Task",
    ],
    customFields: [
      {
        name: "Wiederholung",
        typ: "Dropdown",
        werte: "Täglich, Wöchentlich, Monatlich, Quartalsweise, Jährlich, Einmalig",
        pflicht: true,
      },
      {
        name: "Bereich",
        typ: "Dropdown",
        werte: "Vertrieb, Beratung, Bildung, Marketing, Intern",
        pflicht: true,
      },
      {
        name: "Fristtyp",
        typ: "Dropdown",
        werte: "Intern, Extern / Compliance, Gesetzlich",
        pflicht: true,
        hinweis: "Compliance-Fristen haben höchste Priorität",
      },
      {
        name: "Extern abhängig?",
        typ: "Checkbox",
        pflicht: false,
        hinweis: "Ja = externer Partner involviert (Steuerberater, Behörde etc.)",
      },
      {
        name: "Compliance-relevant?",
        typ: "Checkbox",
        pflicht: false,
        hinweis: "Ja = gesetzliche oder vertragliche Pflicht",
      },
    ],
    ownerRoutine: [
      {
        rhythmus: "täglich",
        aufgabe: "Heute fällige Tasks prüfen und sofort bearbeiten",
      },
      {
        rhythmus: "wöchentlich",
        aufgabe: "Tactical-Meeting-Vorbereitung: Was ist diese Woche fällig?",
      },
      {
        rhythmus: "monatlich",
        aufgabe: "Monats-Closing: Buchhaltung, Rechnungen, Tool-Kosten überprüfen",
      },
      {
        rhythmus: "quartalsweise",
        aufgabe: "USt-Voranmeldung vorbereiten, Quartals-Review durchführen",
      },
    ],
    uebergaben: [
      "Internal Operations → alle Boards: Rechnungsstellung nach Projektabschluss",
      "Internal Operations → Knowledge Management: Aktualisierte SOPs und Working Agreements",
    ],
    painPointRegeln: [
      {
        painPoint: "Routineaufgaben werden vergessen",
        symptom: "Steuerfristen verpasst, Rechnungen vergessen, Lizenzen abgelaufen",
        regel: "Alle Routineaufgaben haben aktivierte Wiederholung in Asana. Compliance-Fristen haben 'Hoch'-Priorität und 7-Tage-Vorwarnung.",
      },
      {
        painPoint: "Steuerungsvakuum: Niemand weiß was intern zu tun ist",
        symptom: "P01 wird für interne Fragen angerufen, die das Backoffice eigenständig lösen kann",
        regel: "Board Owner (P03) hat volle Entscheidungskompetenz für alle Standard-Routineaufgaben ohne P01-Einbezug.",
      },
      {
        painPoint: "Blockierte Tasks verschwinden in 'Wartet auf Input'",
        symptom: "Tasks blockieren monatelang ohne Lösung",
        regel: "Jeder blockierte Task hat ein Eskalations-Datum. Nach 7 Tagen ohne Fortschritt: P01-Hinweis.",
      },
    ],
    automatisierungen: [
      "Compliance-Task ist 7 Tage vor Fälligkeit → Hohe Priorität automatisch + Benachrichtigung",
      "Task seit > 7 Tagen in 'Blockiert' → P01 wird benachrichtigt",
      "Monatsbeginn → Monatliche Subtask-Liste automatisch aktiviert",
      "Task in 'Wartet auf Input' seit > 14 Tagen → Erinnerung an Owner: 'Follow-up nötig?'",
    ],
    kiArbeitsweisen: [
      "Prozessdokumentation: KI hilft SOPs aus bestehenden E-Mail-Abläufen zu strukturieren",
      "Checklisten-Erstellung: KI erstellt vollständige Checklisten für neue Routinen",
      "NIEMALS: Steuerliche Daten, Kontodaten oder Mitarbeiterdaten in KI-Tools",
    ],
    doDont: {
      dos: [
        "Wiederholungs-Funktion für alle Routinen aktivieren",
        "Compliance-Fristen mit hoher Priorität und Vorwarnung versehen",
        "Board Owner hat eigenständige Entscheidungskompetenz",
        "Blockierte Tasks mit Eskalations-Datum versehen",
        "Working Agreements im Board pflegen",
        "Neue Routinen erst testen dann als Wiederholung einrichten",
      ],
      donts: [
        "Steuerliche oder Finanzdaten in KI-Tools eingeben",
        "Tasks ohne Wiederholung für echte Routinen anlegen",
        "P01 für Standard-Entscheidungen konsultieren",
        "Blockierte Tasks monatelang ignorieren",
        "Ad hoc-Aufgaben als Routinen deklarieren",
        "Compliance-Fristen niedrig priorisieren",
      ],
    },
    erste14Tage: [
      "Tag 1: Alle bestehenden Routineaufgaben im Board erfassen",
      "Tag 2: Custom Fields für alle Tasks prüfen und ausfüllen",
      "Tag 3: Wiederholungs-Funktion für alle Routine-Tasks aktivieren",
      "Tag 5: Compliance-Fristen identifizieren und hohe Priorität setzen",
      "Tag 7: Entscheidungsmatrix mit P01 klären",
      "Tag 10: Ersten Monatsclosing-Zyklus vollständig abarbeiten",
      "Tag 14: Working Agreements im Board dokumentieren",
    ],
    offeneFragen: [
      "Welche Aufgaben übergibt die externe Buchhaltung, welche macht P04?",
      "Wie wird die Steuerberater-Übergabe aktuell organisiert?",
      "Gibt es eine vollständige Liste aller laufenden Tool-Lizenzen?",
      "Wie werden neue Routineaufgaben in den Board aufgenommen?",
    ],
  },
];

export function getPlaybookBySlug(slug: string): Playbook | undefined {
  return playbooks.find((p) => p.slug === slug);
}
