import type { PainPointRule } from "@/data/types";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function PainPointRuleTable({ items }: { items: PainPointRule[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="flex items-start gap-3 border-b border-gray-100 bg-amber-50 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-amber-800">{item.painPoint}</p>
              <p className="text-xs text-amber-700 mt-0.5">
                <span className="font-medium">Symptom:</span> {item.symptom}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 px-4 py-3">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">Regel: </span>
              {item.regel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
