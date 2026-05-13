import type { Metadata } from "next";
import { prompts } from "@/data/sales-to-service";
import { Callout } from "@/components/ui/Callout";
import { PromptLibrary } from "@/components/sales-to-service/PromptLibrary";

export const metadata: Metadata = { title: "Prompts" };

export default function PromptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Prompt Library — {prompts.length} Prompts
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Getestete Prompts nach Rolle und Phase filterbar. Platzhalter in{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px]">
            [GROSSBUCHSTABEN]
          </code>{" "}
          vor dem Kopieren ersetzen.
        </p>
      </div>

      <Callout variant="warning" title="Datenschutz-Grundregel">
        Keine echten Kundennamen, Preise, Adressen oder Vertragsdetails in
        externe KI-Tools eingeben. Anonymisiert arbeiten.
      </Callout>

      <PromptLibrary />
    </div>
  );
}
