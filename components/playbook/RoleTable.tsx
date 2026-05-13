import type { Role } from "@/data/types";

export function RoleTable({ rollen }: { rollen: Role[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700 w-16">Kürzel</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Person / Funktion</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Verantwortung</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rollen.map((r, i) => (
            <tr key={i} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3">
                <span className="inline-flex h-7 w-10 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-700">
                  {r.kuerzel}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
              <td className="px-4 py-3 text-gray-600">{r.verantwortung}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
