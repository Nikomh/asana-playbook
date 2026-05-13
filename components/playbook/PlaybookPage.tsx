import type { Playbook } from "@/data/types";
import { PlaybookHeader } from "./PlaybookHeader";
import { RoleTable } from "./RoleTable";
import { Lifecycle } from "./Lifecycle";
import { SectionTable } from "./SectionTable";
import { CustomFieldTable } from "./CustomFieldTable";
import { OwnerRoutine } from "./OwnerRoutine";
import { PainPointRuleTable } from "./PainPointRuleTable";
import { DoDontTable } from "./DoDontTable";
import { PromptBlock } from "./PromptBlock";
import { Callout } from "@/components/ui/Callout";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getPromptsByBoard } from "@/data/prompts";
import { automations } from "@/data/automations";
import { AutomationTable } from "./AutomationTable";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">{title}</h2>
      {children}
    </section>
  );
}

export function PlaybookPage({ playbook }: { playbook: Playbook }) {
  const boardPrompts = getPromptsByBoard(playbook.titel);
  const boardAutomations = automations.filter((a) => a.board === playbook.titel);

  return (
    <div className="space-y-10">
      <PlaybookHeader
        titel={playbook.titel}
        board={playbook.board}
        bereich={playbook.bereich}
        farbe={playbook.farbe}
        kurzfassung={playbook.kurzfassung}
      />

      <Section id="board-zweck" title="Board-Zweck">
        <p className="text-sm text-gray-700 leading-relaxed">{playbook.boardZweck}</p>
        <Callout variant="info" title="Asana-Board">
          Dieses Playbook beschreibt das Board: <strong>{playbook.board}</strong>
        </Callout>
      </Section>

      <Section id="rollen" title="Rollen & Verantwortlichkeiten">
        <RoleTable rollen={playbook.rollen} />
      </Section>

      <Section id="lifecycle" title="Lifecycle">
        <p className="text-sm text-gray-500">Der typische Weg eines Tasks von der Entstehung bis zum Abschluss.</p>
        <div className="overflow-x-auto pb-2">
          <Lifecycle steps={playbook.lifecycle} />
        </div>
      </Section>

      <Section id="sections" title="Sections & Arbeitslogik">
        <SectionTable sections={playbook.sections} />
      </Section>

      <Section id="gute-aufgabe" title="Was ist eine gute Aufgabe?">
        <ul className="space-y-2">
          {playbook.guteAufgabe.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="custom-fields" title="Custom Fields">
        <CustomFieldTable fields={playbook.customFields} />
      </Section>

      <Section id="owner-routine" title="Owner-Routine">
        <OwnerRoutine items={playbook.ownerRoutine} />
      </Section>

      <Section id="uebergaben" title="Übergaben zu anderen Boards">
        <ul className="space-y-2">
          {playbook.uebergaben.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/handoffs"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2"
        >
          Alle Board-Übergaben im Detail
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Link>
      </Section>

      <Section id="pain-points" title="Pain Points → Arbeitsregeln">
        <PainPointRuleTable items={playbook.painPointRegeln} />
      </Section>

      <Section id="automatisierungen" title="Automatisierungen & Rules">
        {boardAutomations.length > 0 ? (
          <AutomationTable items={boardAutomations} />
        ) : (
          <p className="text-sm text-gray-500">Keine spezifischen Automationen für dieses Board dokumentiert.</p>
        )}
        <div className="mt-3 space-y-1">
          {playbook.automatisierungen.map((a, i) => (
            <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
              <span className="mt-1 shrink-0 h-1 w-1 rounded-full bg-gray-300" />
              {a}
            </p>
          ))}
        </div>
        <Link
          href="/automations"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2"
        >
          Alle Automationen ansehen
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Link>
      </Section>

      <Section id="ki-arbeitsweisen" title="KI-Arbeitsweisen">
        <ul className="space-y-2">
          {playbook.kiArbeitsweisen.map((item, i) => {
            const isWarning = item.startsWith("NIEMALS");
            return (
              <li
                key={i}
                className={`flex items-start gap-2 text-sm rounded-md px-3 py-2 ${
                  isWarning
                    ? "bg-red-50 text-red-800"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isWarning ? "bg-red-400" : "bg-blue-400"
                  }`}
                  aria-hidden="true"
                />
                {item}
              </li>
            );
          })}
        </ul>
        <Link
          href="/prompts"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2"
        >
          Alle Prompts für dieses Board
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Link>
      </Section>

      {boardPrompts.length > 0 && (
        <Section id="prompts" title="Prompts">
          <div className="space-y-4">
            {boardPrompts.map((p) => (
              <PromptBlock key={p.id} prompt={p} />
            ))}
          </div>
        </Section>
      )}

      <Section id="do-dont" title="Do / Don't">
        <DoDontTable dos={playbook.doDont.dos} donts={playbook.doDont.donts} />
      </Section>

      <Section id="erste-14-tage" title="Erste 14 Tage als Board Owner">
        <div className="space-y-1.5">
          {playbook.erste14Tage.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white px-4 py-2.5"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="offene-fragen" title="Offene Fragen / Annahmen">
        <Callout variant="warning" title="Noch zu validieren">
          Die folgenden Punkte basieren auf dem aktuellen Kenntnisstand und sollten im Team geklärt werden.
        </Callout>
        <ul className="mt-3 space-y-2">
          {playbook.offeneFragen.map((frage, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1 shrink-0 text-gray-400">?</span>
              {frage}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
