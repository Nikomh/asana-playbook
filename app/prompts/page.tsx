import type { Metadata } from "next";
import { prompts, promptBoards } from "@/data/prompts";
import { PromptBlock } from "@/components/playbook/PromptBlock";
import { Callout } from "@/components/ui/Callout";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Prompt-Bibliothek" };

const datenschutzHinweise = [
  "Kundennamen, Firmennamen und Ansprechpartner → niemals in externe KI-Tools",
  "Angebotspreise und Vertragsinhalte → niemals in externe KI-Tools",
  "Mitarbeiterdaten, Gehälter, persönliche Infos → niemals in externe KI-Tools",
  "Steuernummern, Kontodaten, Rechnungsdaten → niemals in externe KI-Tools",
  "Interne strategische Entscheidungen und Planungen → anonymisieren bevor KI-Nutzung",
];

export default function PromptsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900">Prompt-Bibliothek</h1>
        </div>
        <p className="text-sm text-gray-500">
          Getestete KI-Prompts nach Board gruppiert. Jeden Prompt per Button kopieren und in ChatGPT, Claude oder ein anderes KI-Tool einfügen.
        </p>
      </div>

      <Callout variant="warning" title="Datenschutz-Hinweis: Was nicht in KI-Tools gehört">
        <ul className="mt-2 space-y-1">
          {datenschutzHinweise.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </Callout>

      {promptBoards.map((board) => {
        const boardPrompts = prompts.filter((p) => p.board === board);
        if (boardPrompts.length === 0) return null;
        return (
          <section key={board} aria-labelledby={`board-${board}`}>
            <h2
              id={`board-${board}`}
              className="mb-4 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2"
            >
              {board}
            </h2>
            <div className="space-y-4">
              {boardPrompts.map((p) => (
                <PromptBlock key={p.id} prompt={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
