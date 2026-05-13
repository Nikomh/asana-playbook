import type { Metadata } from "next";
import { allRules, mustHaveRules } from "@/data/salesToServiceAutomations";
import { Callout } from "@/components/ui/Callout";
import { AutomationsV2 } from "@/components/sales-prozess/AutomationsV2";

export const metadata: Metadata = { title: "Sales-Prozess — Automationen" };

export default function AutomationenPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Automationen — {allRules.length} Rules
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Workshop-priorisierte Asana-Rules für den Sales-to-Service-Workflow.{" "}
          {mustHaveRules.length} Must-Have-Rules für den Start, danach schrittweise
          erweitern.
        </p>
      </div>

      <Callout variant="info" title="Grundprinzip">
        Automatisierung soll wie ein gutes Geländer wirken: Sie verhindert
        Abstürze, aber sie fährt nicht selbst das Rad.{" "}
        <strong>Startet mit wenigen Rules, die Lücken sichtbar machen</strong>,
        nicht mit Rules, die Entscheidungen treffen.
      </Callout>

      <AutomationsV2 />
    </div>
  );
}
