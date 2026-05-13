import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ArrowRightLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Callout } from "@/components/ui/Callout";
import { Badge } from "@/components/ui/Badge";
import {
  cpGrundregeln,
  cpWennDann,
  cpRoles,
  cpLifecycle,
  cpPainPoints,
} from "@/data/contentPipeline";

export const metadata: Metadata = { title: "Überblick" };

const subPages = [
  { label: "Lifecycle", href: "/playbooks/content-pipeline/lifecycle", icon: BookOpen, desc: "10 Phasen interaktiv erkunden" },
  { label: "Pain Points", href: "/playbooks/content-pipeline/pain-points", icon: AlertTriangle, desc: "Filterbare Problem-to-Solution-Map" },
  { label: "Workflow", href: "/playbooks/content-pipeline/workflow", icon: ArrowRightLeft, desc: "Sections + Task-Vorlagen" },
  { label: "Prompts", href: "/playbooks/content-pipeline/prompts", icon: Sparkles, desc: "Situationsbasiertes Prompt Studio" },
  { label: "Automations", href: "/playbooks/content-pipeline/automations", icon: Zap, desc: "6 Asana Rules mit Setup-Schritten" },
  { label: "Übergaben", href: "/playbooks/content-pipeline/handoffs", icon: ArrowRightLeft, desc: "Zu/von anderen Boards" },
  { label: "Onboarding", href: "/playbooks/content-pipeline/onboarding", icon: CheckCircle, desc: "14-Tage-Checkliste mit Fortschritt" },
];

export default function ContentPipelineDashboard() {
  const topPainPoints = cpPainPoints.slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-xl border-l-4 border-l-blue-500 bg-blue-50 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge label="Marketing" variant="blue" />
          <span className="text-xs text-gray-500">Content &amp; Marketing Kalender</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Content-Pipeline</h1>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          Dieses Board steuert Content von der Idee bis zum Performance-Learning. Es verhindert, dass Content ad hoc, ohne Strategie, ohne klare Freigabe oder ohne Auswertung entsteht.
        </p>
      </div>

      {/* Wenn-Dann */}
      <section aria-labelledby="wenn-dann-heading">
        <h2 id="wenn-dann-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Was willst du tun?
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
          {cpWennDann.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50 group"
            >
              <div className="text-sm">
                <span className="text-gray-500">Wenn </span>
                <span className="font-medium text-gray-900">{item.wenn}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden sm:block text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5 font-medium">
                  → {item.dann}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 transition" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lifecycle-Übersicht */}
      <section aria-labelledby="lifecycle-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="lifecycle-heading" className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Lifecycle auf einen Blick
          </h2>
          <Link href="/playbooks/content-pipeline/lifecycle" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            Interaktiv erkunden <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-1 gap-1">
          {cpLifecycle.map((phase) => (
            <Link
              key={phase.nr}
              href="/playbooks/content-pipeline/lifecycle"
              className="flex flex-col items-center shrink-0 w-24 rounded-lg border border-gray-200 bg-white px-2 py-3 hover:border-blue-300 hover:bg-blue-50 transition"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                {phase.nr}
              </span>
              <span className="mt-1.5 text-center text-[11px] font-medium text-gray-700 leading-tight">
                {phase.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sub-Pages Grid */}
      <section aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Bereiche
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subPages.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-300 hover:bg-blue-50 transition group"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-400 group-hover:text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <ArrowRight className="ml-auto mt-0.5 h-3.5 w-3.5 text-gray-300 group-hover:text-blue-400 transition" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* Top Pain Points */}
      <section aria-labelledby="painpoints-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="painpoints-heading" className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Häufigste Pain Points
          </h2>
          <Link href="/playbooks/content-pipeline/pain-points" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            Alle {cpPainPoints.length} ansehen <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {topPainPoints.map((pp) => (
            <div key={pp.id} className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-amber-900">{pp.painPoint}</p>
                <p className="text-xs text-amber-700 mt-0.5">→ {pp.regel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rollen */}
      <section aria-labelledby="rollen-heading">
        <h2 id="rollen-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Rollen &amp; Routinen
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cpRoles.map((r) => (
            <div key={r.kuerzel} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-10 items-center justify-center rounded bg-blue-50 text-xs font-bold text-blue-700">
                  {r.kuerzel}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.hauptverantwortung}</p>
                </div>
              </div>
              <ul className="space-y-0.5 ml-1">
                {r.routine.map((item, i) => (
                  <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Grundregeln */}
      <section aria-labelledby="regeln-heading">
        <h2 id="regeln-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          10 Grundregeln
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {cpGrundregeln.map((regel, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white px-4 py-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 font-medium">{regel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Callout */}
      <Callout variant="info" title="Dieses Playbook als Template nutzen">
        Die Struktur dieser Content-Pipeline-Seite (Lifecycle, Pain Points, Workflow, Prompts, Automations, Übergaben, Onboarding) ist das Referenz-Template für alle anderen Board-Playbooks.
      </Callout>
    </div>
  );
}
