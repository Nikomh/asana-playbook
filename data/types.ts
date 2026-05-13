export type BoardColor = "blue" | "amber" | "green" | "purple" | "gray";
export type StatusLevel = "sofort" | "spaeter" | "plan-abhaengig";
export type BadgeVariant = "blue" | "amber" | "green" | "purple" | "gray" | "red" | "orange";

export interface Role {
  kuerzel: string;
  name: string;
  verantwortung: string;
}

export interface LifecycleStep {
  label: string;
  description: string;
  asanaSection?: string;
}

export interface Section {
  name: string;
  zweck: string;
  einzug: string;
  ausgang: string;
}

export interface CustomField {
  name: string;
  typ: string;
  werte?: string;
  pflicht: boolean;
  hinweis?: string;
}

export interface OwnerRoutineItem {
  rhythmus: "täglich" | "wöchentlich" | "monatlich" | "quartalsweise";
  aufgabe: string;
  hinweis?: string;
}

export interface PainPointRule {
  painPoint: string;
  symptom: string;
  regel: string;
}

export interface Automation {
  board: string;
  trigger: string;
  aktion: string;
  painPoint: string;
  prioritaet: "hoch" | "mittel" | "niedrig";
  status: StatusLevel;
}

export interface Prompt {
  id: string;
  board: string;
  titel: string;
  kontext: string;
  prompt: string;
  hinweis?: string;
  tags: string[];
}

export interface Handoff {
  von: string;
  nach: string;
  ausloeser: string;
  mindestInfos: string[];
  verantwortlich: string;
  pflichtFelder: string[];
  hinweis?: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  beispiel?: string;
}

export interface WorkingRule {
  nr: number;
  regel: string;
  begruendung: string;
}

export interface Playbook {
  id: string;
  slug: string;
  titel: string;
  board: string;
  bereich: string;
  farbe: BoardColor;
  kurzfassung: string;
  boardZweck: string;
  rollen: Role[];
  lifecycle: LifecycleStep[];
  sections: Section[];
  guteAufgabe: string[];
  customFields: CustomField[];
  ownerRoutine: OwnerRoutineItem[];
  uebergaben: string[];
  painPointRegeln: PainPointRule[];
  automatisierungen: string[];
  kiArbeitsweisen: string[];
  doDont: { dos: string[]; donts: string[] };
  erste14Tage: string[];
  offeneFragen: string[];
}
