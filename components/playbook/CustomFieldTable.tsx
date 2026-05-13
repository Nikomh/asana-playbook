import type { CustomField } from "@/data/types";
import { Badge } from "@/components/ui/Badge";

export function CustomFieldTable({ fields }: { fields: CustomField[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700">Feldname</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Typ</th>
            <th className="hidden sm:table-cell px-4 py-3 font-semibold text-gray-700">Werte / Hinweis</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">Pflicht</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {fields.map((f, i) => (
            <tr key={i} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{f.name}</td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.typ}</td>
              <td className="hidden sm:table-cell px-4 py-3 text-gray-500 text-xs">
                {f.werte && <span className="block">{f.werte}</span>}
                {f.hinweis && <span className="block italic text-gray-400 mt-0.5">{f.hinweis}</span>}
              </td>
              <td className="px-4 py-3 text-center">
                {f.pflicht ? (
                  <Badge label="Ja" variant="green" size="sm" />
                ) : (
                  <Badge label="Nein" variant="gray" size="sm" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
