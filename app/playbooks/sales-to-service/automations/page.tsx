import type { Metadata } from "next";
import { automations } from "@/data/sales-to-service";
import { Callout } from "@/components/ui/Callout";
import { AutomationExplorer } from "@/components/sales-to-service/AutomationExplorer";

export const metadata: Metadata = { title: "Automationen" };

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Automationen &amp; Rules
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {automations.length} vorgeschlagene Asana-Rules. Nutzeransicht zeigt
          was automatisch passiert — Adminansicht zeigt die technische
          Konfiguration.
        </p>
      </div>

      <Callout variant="info" title="Grundprinzip">
        Jede Automation wird vor Einrichtung auf eine Frage geprüft:{" "}
        <strong>Schafft das Klarheit oder erzeugt es Lärm?</strong> Im Zweifel:
        keine Rule einrichten.
      </Callout>

      <AutomationExplorer />
    </div>
  );
}
