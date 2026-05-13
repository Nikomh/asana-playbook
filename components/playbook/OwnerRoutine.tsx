import type { OwnerRoutineItem } from "@/data/types";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/data/types";

const rhythmusColor: Record<string, BadgeVariant> = {
  täglich: "blue",
  wöchentlich: "green",
  monatlich: "purple",
  quartalsweise: "amber",
};

export function OwnerRoutine({ items }: { items: OwnerRoutineItem[] }) {
  const grouped = items.reduce<Record<string, OwnerRoutineItem[]>>((acc, item) => {
    if (!acc[item.rhythmus]) acc[item.rhythmus] = [];
    acc[item.rhythmus].push(item);
    return acc;
  }, {});

  const order = ["täglich", "wöchentlich", "monatlich", "quartalsweise"];

  return (
    <div className="space-y-4">
      {order
        .filter((r) => grouped[r])
        .map((rhythmus) => (
          <div key={rhythmus}>
            <div className="mb-2">
              <Badge
                label={rhythmus.charAt(0).toUpperCase() + rhythmus.slice(1)}
                variant={rhythmusColor[rhythmus] ?? "gray"}
              />
            </div>
            <ul className="space-y-1.5 ml-1">
              {grouped[rhythmus].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
                  <span className="text-gray-700">
                    {item.aufgabe}
                    {item.hinweis && (
                      <span className="ml-1 text-xs text-gray-400 italic">({item.hinweis})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
