import type { Prompt } from "./types";

export const prompts: Prompt[] = [
  // Content-Pipeline
  {
    id: "cp-01",
    board: "Content-Pipeline",
    titel: "10 LinkedIn-Themen generieren",
    kontext: "Du willst neue Content-Ideen für LinkedIn finden, basierend auf dem Beratungsthema von Agile X.",
    prompt: `Ich arbeite für ein Beratungsunternehmen das sich auf agile Transformation, OKR-Einführung und Ausbilder-Entwicklung spezialisiert hat.

Generiere 10 konkrete LinkedIn-Post-Ideen die:
- Eine praktische Frage oder ein typisches Missverständnis aus dem Alltag von Führungskräften aufgreifen
- In 3-5 Sätzen erklärbar sind
- Einen klaren Mehrwert für HR-Verantwortliche oder mittlere Führungskräfte bieten

Formatiere als nummerierte Liste mit: Titel | Kernaussage (1 Satz) | Zielgruppe`,
    hinweis: "Kein Unternehmensname, keine Kundendaten eingeben. Nur generische Branchenthemen.",
    tags: ["content", "linkedin", "ideenfindung"],
  },
  {
    id: "cp-02",
    board: "Content-Pipeline",
    titel: "LinkedIn-Post aus Stichworten schreiben",
    kontext: "Du hast eine Idee und möchtest daraus einen fertigen Post-Entwurf generieren.",
    prompt: `Schreibe einen LinkedIn-Post basierend auf diesen Stichworten:
[THEMA HIER EINFÜGEN]

Der Post soll:
- Mit einer Frage oder einer überraschenden Aussage starten (kein "Ich finde..." oder "Heute möchte ich...")
- 150-250 Wörter lang sein
- 3-5 konkrete, umsetzbare Punkte enthalten
- Mit einem Call-to-Action enden (Frage an die Community)
- Professionell aber persönlich klingen — kein Corporate-Sprech

Schreibe 2 Varianten: eine sachlich-strukturiert, eine persönlich-erzählend.`,
    hinweis: "Entwurf muss immer von P03 redigiert werden. Nie ungeprüft veröffentlichen.",
    tags: ["content", "linkedin", "textentwurf"],
  },
  {
    id: "cp-03",
    board: "Content-Pipeline",
    titel: "Newsletter-Artikel zusammenfassen",
    kontext: "Ein langer Artikel soll als Newsletter-Intro (3 Sätze) zusammengefasst werden.",
    prompt: `Fasse den folgenden Text in genau 3 Sätzen zusammen:
[TEXT HIER EINFÜGEN]

Anforderungen:
- Satz 1: Das wichtigste Thema oder Problem
- Satz 2: Die zentrale Erkenntnis oder Lösung
- Satz 3: Warum das für den Leser relevant ist

Ton: professionell, klar, nicht werblich.`,
    hinweis: "Keine vertraulichen Kundenprojekte zusammenfassen.",
    tags: ["content", "newsletter", "zusammenfassung"],
  },
  {
    id: "cp-04",
    board: "Content-Pipeline",
    titel: "5 Überschriften-Varianten generieren",
    kontext: "Du brauchst eine starke Überschrift für einen Artikel oder Post.",
    prompt: `Generiere 5 verschiedene Überschriften für folgenden Inhalt:
[THEMA / KERNAUSSAGE HIER EINFÜGEN]

Varianten:
1. Frage-Überschrift
2. Zahl + Versprechen (z.B. "3 Wege wie...")
3. Kontrast oder Überraschung
4. Direkter Nutzen für den Leser
5. Provokative These

Zielgruppe: Führungskräfte und HR-Verantwortliche in mittelständischen Unternehmen.`,
    tags: ["content", "headlines", "textentwurf"],
  },

  // Sales to Service
  {
    id: "ss-01",
    board: "Sales to Service",
    titel: "Angebotsstruktur erstellen",
    kontext: "Du hast eine Kundenanfrage erhalten und willst eine Angebotsstruktur entwickeln.",
    prompt: `Erstelle eine Angebotsstruktur für folgende Leistungsanfrage:
[ANFRAGE KURZ BESCHREIBEN — KEIN KUNDENNAME]

Die Struktur soll enthalten:
1. Ausgangssituation und Problemverständnis (2-3 Sätze)
2. Unser Lösungsansatz (Vorgehen in Phasen)
3. Erwartete Ergebnisse / Deliverables
4. Zeitrahmen und grober Meilensteinplan
5. Nächste Schritte

Schreibe professionell und kundenorientiert. Kein Fachjargon ohne Erklärung.`,
    hinweis: "Keinen echten Kundennamen verwenden. Nur anonymisierte Anfragebeschreibung eingeben.",
    tags: ["sales", "angebot", "struktur"],
  },
  {
    id: "ss-02",
    board: "Sales to Service",
    titel: "Follow-up E-Mail nach Angebots-Versand",
    kontext: "Du hast ein Angebot geschickt und nach einer Woche noch keine Rückmeldung.",
    prompt: `Schreibe eine freundliche Follow-up-E-Mail nach Angebotsversand.

Situation: Angebot vor [ZEITRAUM] verschickt, noch keine Rückmeldung.
Ansprechpartner: [Anrede und Funktion — kein Name nötig]

Die E-Mail soll:
- Kurz sein (max. 5 Sätze)
- Nicht drängend wirken
- Eine konkrete Frage stellen die eine einfache Antwort ermöglicht
- Gesprächsbereitschaft signalisieren

Ton: professionell, entspannt, partnerschaftlich.`,
    hinweis: "Echte Namen oder Angebotsdetails bitte aus Entwurf entfernen bevor versenden.",
    tags: ["sales", "follow-up", "kommunikation"],
  },
  {
    id: "ss-03",
    board: "Sales to Service",
    titel: "Anfrage zusammenfassen und qualifizieren",
    kontext: "Du hast eine lange E-Mail-Anfrage erhalten und willst sie strukturiert aufbereiten.",
    prompt: `Fasse folgende Kundenanfrage strukturiert zusammen:
[E-MAIL-TEXT HIER EINFÜGEN — alle Namen und Firma durch 'Kunde' ersetzen]

Ausgabe als:
1. Was wird gesucht? (1-2 Sätze)
2. Welche Rahmenbedingungen werden genannt? (Budget, Zeit, Ort)
3. Was ist unklar oder fehlt noch?
4. Passt das zu unseren Leistungen? (Ja / Nein / Teilweise — kurze Begründung)
5. Empfohlener nächster Schritt`,
    hinweis: "Vor dem Einfügen: alle Kundennamen und Firmenbezeichnungen anonymisieren.",
    tags: ["sales", "qualifizierung", "analyse"],
  },

  // Client Delivery
  {
    id: "cd-01",
    board: "Client Delivery",
    titel: "Workshop-Agenda erstellen",
    kontext: "Du planst einen Workshop und brauchst eine strukturierte Agenda.",
    prompt: `Erstelle eine detaillierte Workshop-Agenda für:
Thema: [THEMA]
Dauer: [DAUER]
Teilnehmerzahl: [ANZAHL]
Ziel des Workshops: [ZIEL IN 1 SATZ]

Format der Agenda:
- Zeitblöcke mit Puffer
- Methode pro Block (z.B. Input, Gruppenarbeit, Plenum)
- Material das benötigt wird
- Erwartetes Ergebnis pro Block

Wichtig: Energiekurve beachten — nach Mittagspause interaktiven Block einplanen.`,
    hinweis: "Kundennamen nicht nennen, nur anonymisiert arbeiten.",
    tags: ["delivery", "workshop", "planung"],
  },
  {
    id: "cd-02",
    board: "Client Delivery",
    titel: "Meilenstein-Zusammenfassung schreiben",
    kontext: "Ein Meilenstein wurde erreicht und soll für das interne Review kurz dokumentiert werden.",
    prompt: `Schreibe eine kurze Meilenstein-Zusammenfassung basierend auf diesen Stichpunkten:
[STICHPUNKTE HIER EINFÜGEN]

Format:
- Was wurde erreicht? (2-3 Sätze)
- Was lief besonders gut?
- Was war herausfordernd?
- Nächster Meilenstein und Vorbereitung

Max. 200 Wörter. Interner Gebrauch, kein Marketingsprech.`,
    hinweis: "Keine echten Kundennamen oder vertraulichen Projektdetails verwenden.",
    tags: ["delivery", "dokumentation", "meilenstein"],
  },
  {
    id: "cd-03",
    board: "Client Delivery",
    titel: "Abschlussbericht-Struktur erstellen",
    kontext: "Ein Mandat endet und du brauchst eine Struktur für den Abschlussbericht.",
    prompt: `Erstelle eine Gliederung für einen Projekt-Abschlussbericht:
Projekttyp: [BERATUNG / AUSBILDUNG / WORKSHOP-SERIE]
Laufzeit: [ZEITRAUM]

Die Gliederung soll enthalten:
1. Executive Summary (für Entscheider)
2. Ausgangssituation und Auftrag
3. Vorgehen und Meilensteine
4. Ergebnisse und Deliverables
5. Lessons Learned
6. Empfehlungen für Folgeschritte

Pro Abschnitt: 2-3 Leitfragen die beim Schreiben helfen.`,
    tags: ["delivery", "abschluss", "dokumentation"],
  },

  // Ausbildung & Training
  {
    id: "at-01",
    board: "Ausbildung & Training",
    titel: "Einladungs-E-Mail für Kohorte",
    kontext: "Eine neue Kohorte startet und Teilnehmer sollen eingeladen werden.",
    prompt: `Schreibe eine Einladungs-E-Mail für eine Ausbildungs-Kohorte:
Format: [IHK AUSBILDERSCHEIN / AGILE COACH / WEBINAR]
Startdatum: [DATUM]
Dauer: [ZEITRAUM]
Location: [ORT / ONLINE]

Die E-Mail soll:
- Herzlich und professionell sein
- Das Wichtigste in den ersten 2 Sätzen nennen (Was, Wann, Wo)
- Nächste Schritte für den Teilnehmer klar benennen
- Kontakt für Rückfragen nennen
- Max. 200 Wörter

Kein Teilnehmername nötig — Platzhalter [ANREDE] verwenden.`,
    hinweis: "Echte Teilnehmerdaten nie in KI-Tools eingeben.",
    tags: ["ausbildung", "kommunikation", "einladung"],
  },
  {
    id: "at-02",
    board: "Ausbildung & Training",
    titel: "Feedback-Auswertung zusammenfassen",
    kontext: "Evaluationsbögen einer Kohorte sollen ausgewertet werden.",
    prompt: `Fasse folgende Feedback-Antworten aus einer Ausbildungs-Evaluation zusammen:
[ANONYMISIERTE ANTWORTEN HIER EINFÜGEN]

Erstelle:
1. Top 3 Stärken (was lief besonders gut)
2. Top 3 Verbesserungspotenziale
3. Auffällige Einzelmeinungen die beachtet werden sollten
4. Empfehlung für nächste Kohorte (1-2 Maßnahmen)

Ton: konstruktiv, sachlich, lernorientiert.`,
    hinweis: "Nur anonymisierte Antworten eingeben. Keine Namen, Arbeitgeber oder persönlichen Daten.",
    tags: ["ausbildung", "feedback", "auswertung"],
  },

  // Internal Operations
  {
    id: "io-01",
    board: "Internal Operations",
    titel: "SOP aus E-Mail-Ablauf erstellen",
    kontext: "Ein Prozess läuft bisher informell über E-Mails und soll als SOP dokumentiert werden.",
    prompt: `Erstelle eine SOP (Standard Operating Procedure) basierend auf dieser Beschreibung eines Ablaufs:
[ABLAUF HIER BESCHREIBEN — KEIN KUNDENNAME, KEINE KONTONUMMERN]

Format der SOP:
1. Zweck (1 Satz: Warum gibt es diesen Prozess?)
2. Zuständigkeit (Wer macht was?)
3. Auslöser (Was startet den Prozess?)
4. Schritt-für-Schritt-Anleitung (nummeriert, konkret)
5. Wichtige Hinweise / Fehlerquellen
6. Verwandte Dokumente (Platzhalter)

Sprache: klar, direkt, kein Passiv.`,
    hinweis: "Keine Kontodaten, Steuernummern oder persönliche Mitarbeiterdaten eingeben.",
    tags: ["operations", "dokumentation", "sop"],
  },
  {
    id: "io-02",
    board: "Internal Operations",
    titel: "Routine-Checkliste erstellen",
    kontext: "Eine neue Routineaufgabe soll als Checkliste in Asana aufgenommen werden.",
    prompt: `Erstelle eine vollständige Checkliste für folgende Routineaufgabe:
Aufgabe: [AUFGABE BESCHREIBEN]
Rhythmus: [WÖCHENTLICH / MONATLICH / QUARTALSWEISE]
Durchführungszeit: ca. [X MINUTEN]

Die Checkliste soll:
- Jeden Schritt als Checkbox-Punkt formulieren
- Keine Schritte weglassen die vergessen werden könnten
- Bei kritischen Schritten einen Hinweis in Klammern geben
- Am Ende einen "Fertig-Check" enthalten

Format: - [ ] Schritt`,
    tags: ["operations", "checkliste", "routinen"],
  },

  // Allgemein
  {
    id: "gen-01",
    board: "Allgemein",
    titel: "Besprechungsprotokoll strukturieren",
    kontext: "Du hast Stichpunkte aus einem Meeting und willst ein sauberes Protokoll.",
    prompt: `Erstelle ein strukturiertes Besprechungsprotokoll aus folgenden Stichpunkten:
[STICHPUNKTE HIER EINFÜGEN]

Format:
**Datum:** [DATUM]
**Teilnehmer:** [Funktionen, keine Namen nötig]
**Themen:**
- [Thema 1]
  - Diskussion: [kurz]
  - Ergebnis / Entscheidung: [konkret]
  - Nächste Schritte: [Wer macht was bis wann?]

**Offene Punkte für nächste Sitzung:**
- [ ] ...`,
    hinweis: "Keine vertraulichen Personalentscheidungen oder Kundennamen in KI eingeben.",
    tags: ["allgemein", "protokoll", "meeting"],
  },
  {
    id: "gen-02",
    board: "Allgemein",
    titel: "E-Mail professionell formulieren",
    kontext: "Du willst eine wichtige E-Mail schreiben und brauchst Unterstützung bei der Formulierung.",
    prompt: `Formuliere eine professionelle E-Mail basierend auf diesen Infos:
Anlass: [WAS WILLST DU ERREICHEN?]
Ton: [FREUNDLICH / DIREKT / FORMAL]
Kernpunkte: [STICHPUNKTE]

Anforderungen:
- Betreffzeile vorschlagen
- Max. 150 Wörter
- Klar strukturiert: Anlass → Kern → Nächster Schritt
- Kein Konjunktiv wenn es nicht nötig ist`,
    tags: ["allgemein", "kommunikation", "email"],
  },
];

export function getPromptsByBoard(board: string): Prompt[] {
  return prompts.filter((p) => p.board === board);
}

export const promptBoards = [
  "Content-Pipeline",
  "Sales to Service",
  "Client Delivery",
  "Ausbildung & Training",
  "Internal Operations",
  "Allgemein",
];
