import type { Metadata } from "next";
import { PainPointMap } from "@/components/content-pipeline/PainPointMap";
import { cpPainPoints } from "@/data/contentPipeline";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = { title: "Pain Points" };

export default function PainPointsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Pain Points &amp; Lösungen</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {cpPainPoints.length} dokumentierte Pain Points — nach Kategorie filterbar. Jeder Punkt zeigt das Problem, den Need, die Arbeitsregel und den Asana-Hebel.
        </p>
      </div>

      <Callout variant="info" title="Wie nutze ich diese Seite?">
        Filter nach der Kategorie die gerade am relevantesten ist. Klicke einen Pain Point an um die vollständige Problem-to-Solution-Map zu sehen — inklusive Automation und KI-Hebel.
      </Callout>

      <PainPointMap />
    </div>
  );
}
