import type { Automation } from "@/data/types";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/data/types";

const statusLabel: Record<string, string> = {
  sofort: "Sofort umsetzbar",
  spaeter: "Später",
  "plan-abhaengig": "Plan-abhängig",
};

const statusVariant: Record<string, BadgeVariant> = {
  sofort: "green",
  spaeter: "amber",
  "plan-abhaengig": "blue",
};

const prioritaetVariant: Record<string, BadgeVariant> = {
  hoch: "red",
  mittel: "amber",
  niedrig: "gray",
};

export function AutomationTable({ items }: { items: Automation[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700">Trigger</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Aktion</th>
            <th className="hidden lg:table-cell px-4 py-3 font-semibold text-gray-700">Pain Point</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Priorität</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((a, i) => (
            <tr key={i} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700 text-xs">{a.trigger}</td>
              <td className="px-4 py-3 text-gray-600 text-xs">{a.aktion}</td>
              <td className="hidden lg:table-cell px-4 py-3 text-gray-500 text-xs italic">{a.painPoint}</td>
              <td className="px-4 py-3">
                <Badge label={a.prioritaet} variant={prioritaetVariant[a.prioritaet]} size="sm" />
              </td>
              <td className="px-4 py-3">
                <Badge label={statusLabel[a.status]} variant={statusVariant[a.status]} size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
