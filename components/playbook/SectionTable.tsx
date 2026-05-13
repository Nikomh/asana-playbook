import type { Section } from "@/data/types";

export function SectionTable({ sections }: { sections: Section[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700">Section</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Zweck</th>
            <th className="hidden md:table-cell px-4 py-3 font-semibold text-gray-700">Einzug</th>
            <th className="hidden md:table-cell px-4 py-3 font-semibold text-gray-700">Ausgang</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sections.map((s, i) => (
            <tr key={i} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{s.name}</td>
              <td className="px-4 py-3 text-gray-600">{s.zweck}</td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-500 text-xs">{s.einzug}</td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-500 text-xs">{s.ausgang}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
