import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  GitBranch,
  CalendarClock,
  Sparkles,
  ArrowRightLeft,
  Zap,
  CircleHelp,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import {
  workflowPhases,
  prompts,
  quickActions,
  roles,
  automations,
  routines,
} from "@/data/sales-to-service";

export const metadata: Metadata = { title: "Überblick" };

const BASE = "/playbooks/sales-to-service";

const sections = [
  {
    label: "Workflow",
    href: `${BASE}/workflow`,
    icon: GitBranch,
    desc: `${workflowPhases.length} Phasen vom Lead bis zum Abschluss`,
    color: "amber",
  },
  {
    label: "Routinen",
    href: `${BASE}/routines`,
    icon: CalendarClock,
    desc: `${routines.length} Routinen — täglich, wöchentlich, monatlich`,
    color: "amber",
  },
  {
    label: "Prompts",
    href: `${BASE}/prompts`,
    icon: Sparkles,
    desc: `${prompts.length} KI-Prompts mit Copy-Funktion`,
    color: "amber",
  },
  {
    label: "Übergaben",
    href: `${BASE}/handoffs`,
    icon: ArrowRightLeft,
    desc: "Gates für Projektanlage, Delivery und Admin",
    color: "amber",
  },
  {
    label: "Automationen",
    href: `${BASE}/automations`,
    icon: Zap,
    desc: `${automations.length} Asana-Rules mit Setup-Hinweisen`,
    color: "amber",
  },
  {
    label: "FAQ",
    href: `${BASE}/faq`,
    icon: CircleHelp,
    desc: "Häufige Fragen zum Board und zu den Regeln",
    color: "amber",
  },
] as const;

// Phase-Label-Lookup für Quick Actions
const phaseLabels = Object.fromEntries(
  workflowPhases.map((p) => [p.id, p.title])
);

export default function SalesToServiceDashboard() {
  const mustHavePrompts = prompts.filter((p) => p.priority === "must-have");
  const sofortAutomations = automations.filter(
    (a) => a.recommendedStage === "sofort"
  );

  return (
    <div className="space-y-10">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className="rounded-xl border-l-4 border-l-amber-500 bg-amber-50 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge label="Vertrieb" variant="amber" />
          <span className="text-xs text-gray-500">
            Sales Operations &amp; Angebotsarbeit
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Sales to Service
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-2xl text-sm">
          Vom ersten Lead bis zur sauberen Übergabe. Klare Rollen, strukturierte
          Phasen, copybare Prompts und automatisierte Gates — damit keine Chance
          verloren geht und jede Annahme sauber weitergegeben wird.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Users
            className="h-3.5 w-3.5 text-amber-600"
            aria-hidden="true"
          />
          <span className="text-xs text-amber-700 font-medium">
            Für Geschäftsführung und Trainer / Berater
          </span>
        </div>
      </header>

      {/* ── Quick Actions ──────────────────────────────────────── */}
      <section aria-labelledby="qa-heading">
        <h2
          id="qa-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          Was möchtest du tun?
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((qa) => (
            <Link
              key={qa.id}
              href={`${BASE}/prompts#${qa.relatedPrompt}`}
              className="group flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {qa.label}
                </p>
                <ArrowRight
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300 transition group-hover:text-amber-500"
                  aria-hidden="true"
                />
              </div>
              {/* Phase badge */}
              <div>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10">
                  {phaseLabels[qa.phase] ?? qa.phase}
                </span>
              </div>
              {/* Goal */}
              <p className="text-xs text-gray-500 leading-relaxed">{qa.goal}</p>
              {/* Steps */}
              <ol className="mt-auto space-y-0.5">
                {qa.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-xs text-gray-500"
                  >
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bereiche ───────────────────────────────────────────── */}
      <section aria-labelledby="sections-heading">
        <h2
          id="sections-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          Bereiche
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              <Icon
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-400 group-hover:text-amber-600 transition"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
              </div>
              <ArrowRight
                className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300 transition group-hover:text-amber-400"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Rollen ─────────────────────────────────────────────── */}
      <section aria-labelledby="roles-heading">
        <h2
          id="roles-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400 flex items-center gap-2"
        >
          <Users className="h-4 w-4" aria-hidden="true" />
          Rollen auf einen Blick
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-900">
                  {role.label}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                  {role.coreNeed}
                </p>
              </div>
              <ul className="space-y-1 border-t border-gray-100 pt-2">
                {role.responsibilities.slice(0, 3).map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-xs text-gray-600"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                      aria-hidden="true"
                    />
                    {r}
                  </li>
                ))}
                {role.responsibilities.length > 3 && (
                  <li className="text-[10px] text-gray-400 ml-2.5">
                    +{role.responsibilities.length - 3} weitere
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wichtigste Regeln (sofort-Automationen als Orientierung) */}
      <section aria-labelledby="rules-heading">
        <h2
          id="rules-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400 flex items-center gap-2"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Sofort-Automationen ({sofortAutomations.length})
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {sofortAutomations.slice(0, 6).map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3"
            >
              <Zap
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900">
                  {a.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{a.benefit}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link
            href={`${BASE}/automations`}
            className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Alle {automations.length} Automationen ansehen
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Must-have Prompts ──────────────────────────────────── */}
      <section aria-labelledby="prompts-heading">
        <h2
          id="prompts-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400 flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Must-have Prompts ({mustHavePrompts.length})
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {mustHavePrompts.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              href={`${BASE}/prompts#${p.id}`}
              className="group flex items-start gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3 transition hover:border-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              <Sparkles
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300 group-hover:text-amber-500 transition"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {p.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                  {p.useWhen}
                </p>
              </div>
              <ArrowRight
                className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300 group-hover:text-amber-400 transition"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
        <div className="mt-3">
          <Link
            href={`${BASE}/prompts`}
            className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Alle {prompts.length} Prompts ansehen
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Schlüsselregel ─────────────────────────────────────── */}
      <Callout variant="warning" title="Die eine Regel, die alles hält">
        Gewonnen ist nicht erledigt. Erst wenn Projektanlage, Delivery und
        Rechnung/Admin geprüft sind, ist eine Karte wirklich abgeschlossen.
      </Callout>
    </div>
  );
}
