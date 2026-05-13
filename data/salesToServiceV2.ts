// ── Sales to Service V2 — Prozessleitfaden ──────────────────
// Vollständiger Schritt-für-Schritt-Leitfaden mit Übersicht und Workflow.
// Daten aus dem Codex-Content-Paket v2 (Mai 2026).

export interface V2PainPoint {
  id: string;
  title: string;
  pain: string;
  solution: string;
}

export interface V2SolutionItem {
  title: string;
  text: string;
}

export interface V2WorkflowStep {
  id: string;
  step: number;
  title: string;
  shortDescription: string;
  roles: readonly string[];
  mainPainPoint: string;
  painPoints: readonly string[];
  workflowSteps: readonly string[];
  asanaFields: readonly string[];
  linksAndAssets: readonly string[];
  aiSupport: readonly string[];
  doneWhen: string;
  commonMistakes: readonly string[];
}

export const salesToServiceV2 = {
  page: {
    id: "sales-to-service-v2",
    title: "Sales to Service",
    subtitle:
      "Von der Kundenchance bis zur sauberen Übergabe in Delivery und Rechnung/Admin.",
    tabs: [
      { id: "overview", label: "Übersicht" },
      { id: "workflow", label: "Workflow" },
    ],
  },

  overview: {
    intro: {
      title: "Worum geht es?",
      body: "Sales to Service ist der gemeinsame Asana-Workflow für alle Kundenchancen: von Lead, Erstgespräch und Angebot bis zur Übergabe in Projektanlage, Delivery und Rechnung/Admin.",
      keyMessage:
        "Das Board ist kein Ablageort für Vorlagen. Es steuert echte Verkaufsfälle und sorgt dafür, dass kein Follow-up und keine Übergabe verloren geht.",
    },

    goal: {
      title: "Ziel des Boards",
      bullets: [
        "Jede aktive Kundenchance ist sichtbar.",
        "Jede Karte hat eine verantwortliche Person.",
        "Jede Karte hat einen nächsten Schritt.",
        "Angebote haben Status, Link und Follow-up-Datum.",
        "Angenommene Angebote lösen Projektanlage, Delivery und Rechnung/Admin aus.",
        "Verlorene oder geparkte Chancen werden bewusst archiviert.",
      ],
    },

    topPainPoints: [
      {
        id: "leads-disappear",
        title: "Leads verschwinden in E-Mail, Kopf oder Chat",
        pain: "Neue Chancen entstehen oft informell und werden nicht sofort als bearbeitbare Sales-Karte sichtbar.",
        solution:
          "Jede konkrete Chance wird als Karte erfasst: Kunde, Lead-Typ, Owner, nächster Schritt.",
      },
      {
        id: "followups-forgotten",
        title: "Follow-ups werden vergessen",
        pain: "Angebote oder Gespräche bleiben offen, ohne dass klar ist, wann wer nachfasst.",
        solution:
          "Ab Angebotsversand braucht jede Karte ein Follow-up-Datum und eine verantwortliche Person.",
      },
      {
        id: "offer-context-missing",
        title: "Angebotsinput ist unvollständig",
        pain: "Bedarf, Scope, Ziel, Termine oder Preisfragen sind nicht ausreichend dokumentiert.",
        solution:
          "Vor Angebotserstellung wird der Bedarf geklärt und Angebotsinput strukturiert in der Karte ergänzt.",
      },
      {
        id: "won-not-handed-over",
        title: "Gewonnen wird mit fertig verwechselt",
        pain: "Nach Zusage fehlen häufig Projektanlage, Delivery-Briefing oder Rechnungsinfos.",
        solution:
          "Eine gewonnene Karte ist erst erledigt, wenn alle relevanten Übergabe-Gates abgeschlossen sind.",
      },
      {
        id: "tools-in-wrong-place",
        title: "Vorlagen landen als Aufgaben im Sales-Board",
        pain: "Sales-Werkzeuge, Textbausteine und Angebotsvorlagen verstopfen den operativen Workflow.",
        solution:
          "Vorlagen bleiben in Knowledge & Templates und werden in Sales-Karten nur verlinkt.",
      },
    ] satisfies V2PainPoint[],

    solutionApproach: {
      title: "Lösungsansatz",
      items: [
        {
          title: "Ein gemeinsamer Workflow",
          text: "Geschäftsführung und Trainer/Berater nutzen dieselbe Logik, auch wenn sie unterschiedliche Rollen haben.",
        },
        {
          title: "Wenige Pflichtinformationen",
          text: "Nur Informationen, die für Steuerung, Angebot, Follow-up oder Übergabe nötig sind, werden gepflegt.",
        },
        {
          title: "Übergaben als Gates",
          text: "Projektanlage, Delivery und Rechnung/Admin werden nach Annahme sichtbar geprüft.",
        },
        {
          title: "KI als Unterstützung",
          text: "KI hilft bei Notizen, Angebotsinput, Follow-ups und Übergaben, entscheidet aber nichts final.",
        },
      ] satisfies V2SolutionItem[],
    },

    faqs: [
      {
        question: "Wann lege ich eine Sales-Karte an?",
        answer:
          "Sobald es einen konkreten Kontakt, Anlass oder eine reaktivierbare Kundenchance gibt.",
      },
      {
        question: "Gehören Angebotsvorlagen ins Sales-to-Service-Board?",
        answer:
          "Nein. Vorlagen liegen in Knowledge & Templates und werden in der Sales-Karte nur verlinkt.",
      },
      {
        question: "Wer darf eigene Leads eintragen?",
        answer:
          "Geschäftsführung und Trainer/Berater dürfen eigene Kundenchancen eintragen und führen.",
      },
      {
        question: "Ist eine Karte erledigt, wenn das Angebot angenommen wurde?",
        answer:
          "Nein. Erst müssen Projektanlage, Delivery-Übergabe und Rechnung/Admin geprüft oder abgeschlossen sein.",
      },
      {
        question: "Was ist die wichtigste Follow-up-Regel?",
        answer:
          "Follow-up ohne Datum ist kein Follow-up. Jede offene Rückmeldung braucht ein Datum und einen Owner.",
      },
      {
        question: "Was darf KI in diesem Workflow tun?",
        answer:
          "KI darf strukturieren, zusammenfassen und Vorschläge machen. Sie darf keine Preise entscheiden, keine Angebote freigeben und keine Kundennachrichten ungeprüft senden.",
      },
    ],
  },

  workflow: [
    {
      id: "step-01-tools",
      step: 1,
      title: "Sales-Werkzeuge / Vorlagen nutzen",
      shortDescription:
        "Vorlagen, Textbausteine und Preislogiken aus Knowledge & Templates verwenden.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Vorlagen werden gesucht, kopiert oder als Aufgaben im Sales-Board abgelegt.",
      painPoints: [
        "Vorlagen liegen verstreut oder werden dupliziert.",
        "Alte Angebotsversionen werden wiederverwendet.",
        "Das Sales-Board wird zur Materialablage.",
      ],
      workflowSteps: [
        "Prüfe, ob du für die Karte eine Vorlage brauchst.",
        "Öffne Knowledge & Templates.",
        "Wähle passende Angebotsvorlage, Textbaustein oder Checkliste.",
        "Kopiere die Vorlage nicht ins Sales-Board.",
        "Setze den Link in der Sales-Karte.",
        "Notiere kurz, wofür die Vorlage genutzt wird.",
      ],
      asanaFields: ["Dokument-Link", "Angebotstyp, falls Angebot relevant ist"],
      linksAndAssets: [
        "Link zur Angebotsvorlage",
        "Link zu Preislogik",
        "Link zu Textbausteinen",
        "Link zu Checkliste",
      ],
      aiSupport: [
        "KI kann passende Vorlage vorschlagen, wenn der Bedarf beschrieben ist.",
      ],
      doneWhen:
        "Die relevante Vorlage ist verlinkt oder bewusst als nicht nötig markiert.",
      commonMistakes: [
        "Vorlagen als Aufgaben im Sales-Board anlegen.",
        "Alte lokale Angebotsdateien weiterverwenden.",
      ],
    },
    {
      id: "step-02-lead",
      step: 2,
      title: "Anfrage / Lead erfassen",
      shortDescription: "Neue Kundenchance als Karte sichtbar machen.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Leads bleiben in E-Mail, Kopf, Chat oder Notizbuch hängen.",
      painPoints: [
        "Neue Chancen sind für andere nicht sichtbar.",
        "Es gibt keinen klaren Owner.",
        "Der nächste Schritt ist nicht dokumentiert.",
        "Inbound, Outbound und Empfehlungen werden nicht unterschieden.",
      ],
      workflowSteps: [
        "Lege eine neue Karte an, sobald es eine konkrete Chance gibt.",
        "Trage Kunde oder Organisation ein.",
        "Trage Ansprechpartner ein, falls bekannt.",
        "Setze Lead-Typ: Inbound, Outbound, Empfehlung, Bestandskunde oder Reaktivierung.",
        "Setze genau eine verantwortliche Person.",
        "Formuliere den nächsten Schritt.",
        "Setze ein Fälligkeits- oder Follow-up-Datum.",
        "Füge relevante E-Mail oder Notiz als Link oder Kurztext hinzu.",
      ],
      asanaFields: [
        "Kunde / Organisation",
        "Ansprechpartner",
        "Lead-Typ",
        "Verantwortliche Person",
        "Priorität / Potenzial",
        "Nächster Schritt",
        "Follow-up-Datum",
      ],
      linksAndAssets: [
        "E-Mail-Link oder kurze Zusammenfassung",
        "Kontaktlink, falls vorhanden",
      ],
      aiSupport: [
        "KI kann aus einer E-Mail eine Kartenbeschreibung erstellen.",
        "KI kann Lead-Typ und nächste Schritte vorschlagen.",
      ],
      doneWhen: "Die Karte hat Owner, Lead-Typ, nächsten Schritt und Datum.",
      commonMistakes: [
        "Lead nur im Chat erwähnen.",
        "Karte ohne nächsten Schritt anlegen.",
        "Mehrere Personen als faktische Owner behandeln.",
      ],
    },
    {
      id: "step-03-call-prep",
      step: 3,
      title: "Erstgespräch vorbereiten",
      shortDescription:
        "Gespräch mit Ziel, Hypothese und Leitfragen vorbereiten.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Erstgespräche laufen aus Erfahrung, aber ohne sichtbare Struktur.",
      painPoints: [
        "Gesprächsziel ist unklar.",
        "Wichtige Fragen zu Budget, Timing oder Entscheidern fehlen.",
        "Trainer/Berater wissen nicht, wann Management einzubinden ist.",
      ],
      workflowSteps: [
        "Prüfe die Lead-Karte.",
        "Formuliere das Ziel des Erstgesprächs.",
        "Notiere eine Bedarfshypothese.",
        "Ergänze 3 bis 5 Kernfragen.",
        "Markiere offene Preis-, Scope- oder Strategiefragen.",
        "Setze Unterstützungsbedarf, wenn Management eingebunden werden soll.",
      ],
      asanaFields: ["Unterstützungsbedarf", "Priorität / Potenzial", "Termin"],
      linksAndAssets: [
        "Link zur Gesprächscheckliste",
        "Link zu relevanter Vorlage aus Knowledge & Templates",
      ],
      aiSupport: [
        "KI kann eine Gesprächsagenda erstellen.",
        "KI kann Fragen aus dem Lead-Kontext ableiten.",
      ],
      doneWhen:
        "Ziel, Kernfragen und offene Punkte sind in der Karte sichtbar.",
      commonMistakes: [
        "Gespräch ohne klares Ziel führen.",
        "Strategische Fragen erst nach dem Gespräch klären.",
      ],
    },
    {
      id: "step-04-call",
      step: 4,
      title: "Erstgespräch führen",
      shortDescription:
        "Bedarf, Ziel, Timing und Entscheidungslogik verstehen.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Wichtige Gesprächsinhalte bleiben mündlich und gehen später verloren.",
      painPoints: [
        "Bedarf wird nicht konkret genug dokumentiert.",
        "Kundenziele bleiben allgemein.",
        "Nächster Schritt wird nicht verbindlich vereinbart.",
      ],
      workflowSteps: [
        "Kläre Kundensituation und konkreten Anlass.",
        "Kläre gewünschtes Ergebnis.",
        "Kläre Formatidee: Workshop, Training, Beratung oder Ausbildung.",
        "Kläre Timing und Entscheidungsprozess.",
        "Kläre offene Risiken oder Abhängigkeiten.",
        "Vereinbare nächsten Schritt.",
        "Notiere direkt nach dem Gespräch die wichtigsten Punkte.",
      ],
      asanaFields: ["Angebotstyp", "Unterstützungsbedarf", "Follow-up-Datum"],
      linksAndAssets: [
        "Gesprächsnotizen",
        "ggf. Meeting-Link oder Transkript",
      ],
      aiSupport: [
        "KI kann Rohnotizen strukturieren.",
        "KI kann nächste Schritte extrahieren.",
      ],
      doneWhen:
        "Gesprächsergebnis und nächster Schritt sind in der Karte dokumentiert.",
      commonMistakes: [
        "Notizen erst Tage später ergänzen.",
        "Kundenzusage oder Bedarf aus Erinnerung rekonstruieren.",
      ],
    },
    {
      id: "step-05-need",
      step: 5,
      title: "Bedarf klären",
      shortDescription:
        "Gesprächsergebnis in angebotsfähigen Bedarf übersetzen.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint: "Angebotsinput ist oft unvollständig oder zu vage.",
      painPoints: [
        "Es steht nur: Kunde braucht Angebot.",
        "Ziel, Umfang oder Format sind unklar.",
        "Preis- und Scope-Fragen werden zu spät sichtbar.",
        "Management muss Kontext nachfragen.",
      ],
      workflowSteps: [
        "Strukturiere die Gesprächsnotiz.",
        "Formuliere den Bedarf in 2 bis 4 Sätzen.",
        "Ergänze Ziel und gewünschtes Ergebnis.",
        "Wähle wahrscheinlichen Angebotstyp.",
        "Notiere Timing und bekannte Termine.",
        "Markiere offene Fragen.",
        "Setze Unterstützungsbedarf, wenn Preis oder Scope unklar sind.",
      ],
      asanaFields: [
        "Angebotstyp",
        "Unterstützungsbedarf",
        "Priorität / Potenzial",
        "Follow-up-Datum",
      ],
      linksAndAssets: [
        "Gesprächsnotiz",
        "Relevante Kundenmail",
        "Link zur passenden Angebotsvorlage",
      ],
      aiSupport: [
        "KI kann Bedarf und Ziel aus Notizen extrahieren.",
        "KI kann fehlende Angebotsinformationen markieren.",
      ],
      doneWhen:
        "Die Karte enthält genug Kontext, um Angebotserstellung zu starten oder bewusst zu parken.",
      commonMistakes: [
        "Angebot starten, obwohl Scope unklar ist.",
        "Unterstützungsbedarf nicht markieren.",
      ],
    },
    {
      id: "step-06-offer-draft",
      step: 6,
      title: "Angebot in Erstellung",
      shortDescription:
        "Angebot mit Vorlage, Briefing und geklärtem Scope erstellen.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Angebote starten zu oft bei null oder mit fehlendem Kontext.",
      painPoints: [
        "Angebotsvorlage ist nicht verlinkt.",
        "Preislogik ist nicht nachvollziehbar.",
        "Trainerinput fehlt oder ist zu unkonkret.",
        "Freigabe passiert informell im Chat.",
      ],
      workflowSteps: [
        "Öffne passende Vorlage aus Knowledge & Templates.",
        "Setze Link zur Angebotsdatei in der Karte.",
        "Ergänze Angebotsbriefing.",
        "Ergänze vorgeschlagenen Scope.",
        "Markiere offene Preis- oder Umfangsfragen.",
        "Hole Review oder Freigabe ein, falls nötig.",
        "Dokumentiere finale Angebotsversion.",
      ],
      asanaFields: [
        "Angebotstyp",
        "Angebotsstatus",
        "Dokument-Link",
        "Unterstützungsbedarf",
      ],
      linksAndAssets: [
        "Angebotsdokument",
        "Angebotsvorlage",
        "Preislogik",
        "Textbausteine",
      ],
      aiSupport: [
        "KI kann Angebotsbriefing erstellen.",
        "KI kann Angebotsinput strukturieren.",
        "KI darf keinen Preis final entscheiden.",
      ],
      doneWhen: "Angebot ist final, geprüft und bereit zum Versand.",
      commonMistakes: [
        "Angebot ohne Dokument-Link bearbeiten.",
        "Preisentscheidung nicht dokumentieren.",
        "Finale Freigabe nur mündlich einholen.",
      ],
    },
    {
      id: "step-07-offer-send",
      step: 7,
      title: "Angebot versenden",
      shortDescription: "Angebot senden und verbindliches Follow-up setzen.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint: "Angebote werden versendet, aber nicht aktiv nachverfolgt.",
      painPoints: [
        "Versanddatum fehlt.",
        "Follow-up-Datum fehlt.",
        "Angebotslink fehlt.",
        "Kundenkommunikation bleibt nur in E-Mail.",
      ],
      workflowSteps: [
        "Prüfe finale Angebotsversion.",
        "Versende Angebot manuell an den Kunden.",
        "Dokumentiere Versanddatum in der Karte.",
        "Setze Angebotsstatus auf versendet.",
        "Setze Follow-up-Datum.",
        "Notiere geplante Follow-up-Aktion.",
        "Verlinke die finale Angebotsdatei.",
      ],
      asanaFields: ["Angebotsstatus", "Follow-up-Datum", "Dokument-Link"],
      linksAndAssets: ["Finales Angebot", "Versendete E-Mail oder Kurznotiz"],
      aiSupport: [
        "KI kann Begleitmail oder Follow-up-Text vorschlagen.",
        "Kundennachricht muss immer manuell geprüft werden.",
      ],
      doneWhen:
        "Angebot ist versendet, verlinkt und Follow-up ist terminiert.",
      commonMistakes: [
        "Angebot ohne Follow-up senden.",
        "Kundennachricht ungeprüft aus KI übernehmen.",
      ],
    },
    {
      id: "step-08-follow-up",
      step: 8,
      title: "Follow-up steuern",
      shortDescription:
        "Rückmeldung aktiv einholen und Status aktuell halten.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Offene Angebote versanden oder bleiben mental beim Owner.",
      painPoints: [
        "Follow-up-Datum wird nicht eingehalten.",
        "Kundenantwort bleibt im Postfach.",
        "Status ist für andere nicht sichtbar.",
        "Geparkte Chancen bekommen keine Wiedervorlage.",
      ],
      workflowSteps: [
        "Prüfe fällige Follow-ups.",
        "Formuliere kurze Nachfassnachricht.",
        "Sende Follow-up manuell.",
        "Dokumentiere Rückmeldung oder ausbleibende Antwort.",
        "Setze neues Follow-up-Datum oder entscheide Status.",
        "Verschiebe zu gewonnen, archiviert oder geparkt, wenn passend.",
      ],
      asanaFields: [
        "Follow-up-Datum",
        "Priorität / Potenzial",
        "Angebotsstatus",
        "Archivgrund",
        "Reaktivierungsdatum",
      ],
      linksAndAssets: ["Letzte Kundenmail", "Angebotslink"],
      aiSupport: [
        "KI kann Follow-up-Mail formulieren.",
        "KI kann Kundenrückmeldung zusammenfassen.",
      ],
      doneWhen:
        "Es gibt eine Rückmeldung, einen neuen nächsten Schritt oder einen bewussten Archivstatus.",
      commonMistakes: [
        "Follow-up nur im Kalender führen.",
        "Keinen neuen nächsten Schritt setzen.",
      ],
    },
    {
      id: "step-09-won",
      step: 9,
      title: "Angebot angenommen",
      shortDescription: "Zusage dokumentieren und Übergabe-Gates starten.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint: "Gewonnen wird mit abgeschlossen verwechselt.",
      painPoints: [
        "Kundenzusage bleibt in E-Mail.",
        "Projektanlage wird nicht angestoßen.",
        "Delivery bekommt keinen Kontext.",
        "Rechnungsinformationen fehlen.",
      ],
      workflowSteps: [
        "Dokumentiere Annahmedatum.",
        "Verlinke finales Angebot.",
        "Bestätige finalen Scope.",
        "Ergänze Preis und Konditionen.",
        "Setze Projektanlage nötig: Ja/Nein.",
        "Setze Delivery-Übergabe nötig: Ja/Nein.",
        "Setze Rechnungsübergabe nötig: Ja/Nein.",
        "Starte die relevanten Übergabe-Subtasks.",
      ],
      asanaFields: [
        "Projektanlage nötig",
        "Delivery-Übergabe nötig",
        "Rechnungsübergabe nötig",
        "Dokument-Link",
      ],
      linksAndAssets: [
        "Finales Angebot",
        "Zusage des Kunden",
        "Relevante Gesprächsnotizen",
      ],
      aiSupport: [
        "KI kann fehlende Übergabeinformationen markieren.",
        "KI darf unklare Kundenzusagen nicht final interpretieren.",
      ],
      doneWhen:
        "Alle relevanten Übergabe-Gates sind angelegt und bearbeitbar.",
      commonMistakes: [
        "Karte direkt schließen.",
        "Delivery und Admin nur mündlich informieren.",
      ],
    },
    {
      id: "step-10-project",
      step: 10,
      title: "Projektanlage vorbereiten",
      shortDescription:
        "Alle Informationen für ein startfähiges Kundenprojekt sammeln.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Projekte werden ohne vollständigen Sales-Kontext angelegt.",
      painPoints: [
        "Projektname oder Zeitraum ist unklar.",
        "Angebotslink fehlt.",
        "Interner Owner ist nicht definiert.",
        "Scope wird erst später gesucht.",
      ],
      workflowSteps: [
        "Definiere Projektname.",
        "Ergänze Kunde und Zeitraum.",
        "Ergänze Format oder Leistung.",
        "Setze internen Projekt-Owner.",
        "Verlinke finales Angebot.",
        "Ergänze Projektlink, sobald angelegt.",
        "Markiere offene Punkte.",
      ],
      asanaFields: ["Projektanlage nötig", "Dokument-Link"],
      linksAndAssets: [
        "Finales Angebot",
        "Projektlink",
        "Projektvorlage, falls relevant",
      ],
      aiSupport: ["KI kann Projektanlage-Briefing erstellen."],
      doneWhen: "Projekt ist angelegt oder zuständige Person bestätigt Anlage.",
      commonMistakes: [
        "Projekt ohne Scope anlegen.",
        "Projektlink nicht in Sales-Karte zurückführen.",
      ],
    },
    {
      id: "step-11-delivery",
      step: 11,
      title: "Übergabe an Delivery",
      shortDescription: "Durchführung mit klarem Kontext vorbereiten.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Delivery startet mit zu wenig Kontext oder informeller Übergabe.",
      painPoints: [
        "Ziele und Scope sind nicht klar.",
        "Besonderheiten aus Sales gehen verloren.",
        "Termine oder Teilnehmende fehlen.",
        "Materialbedarf ist unklar.",
      ],
      workflowSteps: [
        "Erstelle Delivery-Briefing.",
        "Ergänze Ziel und Scope.",
        "Ergänze Termine und Teilnehmende.",
        "Notiere Besonderheiten und Risiken.",
        "Verlinke Angebot und relevante Notizen.",
        "Informiere Delivery-Owner.",
        "Hole Bestätigung ein, dass Kontext reicht.",
      ],
      asanaFields: ["Delivery-Übergabe nötig", "Dokument-Link"],
      linksAndAssets: [
        "Delivery-Briefing",
        "Finales Angebot",
        "Gesprächsnotizen",
        "Workshop- oder Projektmaterialien",
      ],
      aiSupport: [
        "KI kann Delivery-Briefing erstellen.",
        "Scope muss menschlich gegen Angebot geprüft werden.",
      ],
      doneWhen:
        "Delivery bestätigt, dass die Informationen für Start oder Durchführung reichen.",
      commonMistakes: [
        "Übergabe nur im Chat.",
        "Offene Fragen nicht markieren.",
      ],
    },
    {
      id: "step-12-invoice",
      step: 12,
      title: "Übergabe an Rechnung/Admin",
      shortDescription: "Rechnungsstellung ohne Rückfragen ermöglichen.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint: "Admin muss Preis, Adresse oder Konditionen nachfragen.",
      painPoints: [
        "Rechnungsempfänger fehlt.",
        "Preis oder Konditionen fehlen.",
        "PO oder Bestellnummer ist unklar.",
        "Leistungsdatum fehlt.",
      ],
      workflowSteps: [
        "Prüfe Preis und Konditionen.",
        "Ergänze Rechnungsempfänger.",
        "Ergänze Rechnungsadresse.",
        "Ergänze Zahlungsbedingungen.",
        "Ergänze PO oder Bestellnummer, falls nötig.",
        "Ergänze Leistungsdatum oder Zeitraum.",
        "Informiere Admin/Rechnung.",
      ],
      asanaFields: ["Rechnungsübergabe nötig", "Dokument-Link"],
      linksAndAssets: [
        "Finales Angebot",
        "Rechnungsinformationen",
        "Kundenmail mit Rechnungsdaten",
      ],
      aiSupport: [
        "KI kann Rechnungsinformationen extrahieren.",
        "KI darf keine Rechnung automatisch erstellen oder senden.",
      ],
      doneWhen:
        "Admin bestätigt, dass Rechnung erstellt oder angestoßen werden kann.",
      commonMistakes: [
        "Admin ohne vollständige Angaben markieren.",
        "Preis nur aus Erinnerung eintragen.",
      ],
    },
    {
      id: "step-13-close",
      step: 13,
      title: "Sales-Karte abschließen",
      shortDescription:
        "Sales-Fall schließen, wenn alle relevanten Übergaben erledigt sind.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Karten bleiben offen oder werden zu früh geschlossen.",
      painPoints: [
        "Abschluss erfolgt vor Übergabe.",
        "Folgeprojekt ist nicht verlinkt.",
        "Admin- oder Delivery-Status ist unklar.",
      ],
      workflowSteps: [
        "Prüfe Projektanlage.",
        "Prüfe Delivery-Übergabe.",
        "Prüfe Rechnungsübergabe.",
        "Setze Abschlussnotiz.",
        "Verlinke Folgeprojekt oder relevante Übergaben.",
        "Schließe Karte erst nach Gate-Prüfung.",
      ],
      asanaFields: ["Angebotsstatus", "Dokument-Link"],
      linksAndAssets: ["Projektlink", "Delivery-Briefing", "Admin-Übergabe"],
      aiSupport: ["KI kann kurze Abschlussnotiz erstellen."],
      doneWhen:
        "Karte ist abgeschlossen und alle relevanten Links sind vorhanden.",
      commonMistakes: [
        "Karte zu früh schließen.",
        "Erledigte Karten unnötig offen lassen.",
      ],
    },
    {
      id: "step-14-archive",
      step: 14,
      title: "Archiv / Parken",
      shortDescription:
        "Chancen bewusst schließen, parken oder später reaktivieren.",
      roles: ["Geschäftsführung", "Trainer / Berater"],
      mainPainPoint:
        "Verlorene oder geparkte Chancen erzeugen kein Learning.",
      painPoints: [
        "Karten werden gelöscht statt archiviert.",
        "Archivgrund fehlt.",
        "Geparkte Chancen haben kein Reaktivierungsdatum.",
        "Lost Reasons werden nicht ausgewertet.",
      ],
      workflowSteps: [
        "Entscheide Archivgrund: verloren, geparkt, erledigt oder später wieder aufnehmen.",
        "Notiere kurzes Learning.",
        "Setze Reaktivierungsdatum, falls geparkt.",
        "Dokumentiere letzten Stand.",
        "Schließe oder archiviere die Karte bewusst.",
      ],
      asanaFields: ["Archivgrund", "Reaktivierungsdatum"],
      linksAndAssets: [
        "Letzte Kundenrückmeldung",
        "Angebotslink, falls relevant",
      ],
      aiSupport: [
        "KI kann Archivnotiz oder Reaktivierungsvorschlag formulieren.",
      ],
      doneWhen: "Karte hat Archivgrund und ggf. Wiedervorlage.",
      commonMistakes: [
        "Karte löschen.",
        "Geparkt ohne Datum.",
        "Kein Learning notieren.",
      ],
    },
  ] satisfies V2WorkflowStep[],
} as const;
