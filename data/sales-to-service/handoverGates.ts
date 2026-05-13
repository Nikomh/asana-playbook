import type { HandoverGate } from "./types";

// NOTE: "Projektanlage-Rolle: TBD" — bleibt als TBD bis final definiert.

export const handoverGates: readonly HandoverGate[] = [
  {
    id: "project-setup",
    title: "Projektanlage",
    trigger: "Angebot angenommen und Projektanlage nötig.",
    owner: "Karten-Owner",
    participants: [
      "Management bei strategischen Projekten",
      "Projektanlage-Rolle: TBD",
    ],
    minimumInfo: [
      "Projektname",
      "Kunde",
      "Zeitraum",
      "Leistung",
      "Owner",
      "Angebotslink",
    ],
    checklist: [
      "Projektname definieren",
      "Scope prüfen",
      "Owner setzen",
      "Projektlink ergänzen",
    ],
    aiSupport: "Projektanlage-Briefing erstellen.",
    notAutomatic: ["kein Projekt ohne Prüfung automatisch anlegen"],
    doneWhen: "Projekt ist angelegt oder Anlage bestätigt.",
  },
  {
    id: "delivery",
    title: "Delivery / Durchführung",
    trigger: "Angebot angenommen und Delivery-Übergabe nötig.",
    owner: "Karten-Owner",
    participants: [
      "Delivery-Owner",
      "Trainer/Berater",
      "Management bei kritischen Kunden",
    ],
    minimumInfo: [
      "Ziel",
      "Scope",
      "Termine",
      "Teilnehmende",
      "Besonderheiten",
      "Angebotslink",
    ],
    checklist: [
      "Briefing erstellen",
      "offene Fragen markieren",
      "Owner informieren",
      "Bestätigung einholen",
    ],
    aiSupport: "Delivery-Briefing erstellen.",
    notAutomatic: [
      "Delivery nicht automatisch starten",
      "Scope nicht von KI festlegen",
    ],
    doneWhen: "Delivery bestätigt ausreichenden Kontext.",
  },
  {
    id: "invoice-admin",
    title: "Rechnung / Admin",
    trigger: "Angebot angenommen und Rechnungsübergabe nötig.",
    owner: "Karten-Owner",
    participants: [
      "Admin/Rechnung",
      "Management bei Sonderkonditionen",
    ],
    minimumInfo: [
      "Preis",
      "Rechnungsempfänger",
      "Adresse",
      "Zahlungsbedingungen",
      "PO",
      "Leistungsdatum",
    ],
    checklist: [
      "Rechnungsinfos prüfen",
      "Lücken markieren",
      "Admin informieren",
    ],
    aiSupport: "Rechnungsinformationen extrahieren.",
    notAutomatic: [
      "keine Rechnung automatisch erstellen",
      "keine Rechnung automatisch versenden",
    ],
    doneWhen: "Admin bestätigt Rechnungsfähigkeit.",
  },
  {
    id: "archive-reactivation",
    title: "Archiv / Reaktivierung",
    trigger: "Chance ist verloren, geparkt oder später relevant.",
    owner: "Karten-Owner",
    participants: ["Management bei wichtigen Lost Deals"],
    minimumInfo: [
      "Archivgrund",
      "Learning",
      "Reaktivierungsdatum falls geparkt",
    ],
    checklist: ["Grund setzen", "Learning notieren", "Wiedervorlage setzen"],
    aiSupport: "Archivnotiz vorschlagen.",
    notAutomatic: [
      "nicht ohne Grund archivieren",
      "nicht automatisch reaktivieren",
    ],
    doneWhen: "Karte ist archiviert oder hat Wiedervorlage.",
  },
] as const;
