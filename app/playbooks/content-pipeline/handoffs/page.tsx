import type { Metadata } from "next";
import { HandoffChecklist } from "@/components/content-pipeline/HandoffChecklist";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = { title: "Übergaben" };

export default function HandoffsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Board-Übergaben</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Wann verlässt ein Thema die Content-Pipeline — und was muss dabei übergeben werden? Und was kommt von anderen Boards herein?
        </p>
      </div>

      <Callout variant="info" title="Grundsatz">
        Board-Wechsel ist immer eine strukturierte Übergabe. Kein mündliches Weiterleiten — alle nötigen Infos landen im Asana-Task. Die Übergabe-Checkliste per Button kopieren und in den neuen Task einfügen.
      </Callout>

      <HandoffChecklist />
    </div>
  );
}
