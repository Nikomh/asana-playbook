import type { Metadata } from "next";
import { salesToServiceV2 } from "@/data/salesToServiceV2";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import {
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  Info,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Sales-Prozess — Übersicht" };

const { overview, workflow } = salesToServiceV2;

const SOLUTION_ICONS = [GitBranch, Info, CheckCircle, Sparkles];

export default function SalesProzessOverviewPage() {
  return (
    <div className="space-y-10">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className="rounded-xl border-l-4 border-l-amber-500 bg-amber-50 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge label="Vertrieb" variant="amber" />
          <Badge label="Leitfaden" variant="gray" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {salesToServiceV2.page.title}
        </h1>
        <p className="text-sm text-gray-600 mb-3">
          {salesToServiceV2.page.subtitle}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
          {overview.intro.body}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/playbooks/sales-prozess/workflow"
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Workflow ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <span className="self-center text-xs text-amber-700">
            {workflow.length} Schritte
          </span>
        </div>
      </header>

      {/* ── Key message ───────────────────────────────────────── */}
      <Callout variant="warning" title="Grundsatz">
        {overview.intro.keyMessage}
      </Callout>

      {/* ── Goals ─────────────────────────────────────────────── */}
      <section aria-labelledby="goals-heading">
        <h2
          id="goals-heading"
          className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
          {overview.goal.title}
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {overview.goal.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-[9px] font-bold text-green-600">
                  {i + 1}
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pain Points ───────────────────────────────────────── */}
      <section aria-labelledby="pain-heading">
        <h2
          id="pain-heading"
          className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden="true" />
          Top Pain Points &amp; Lösungen
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {overview.topPainPoints.map((pp) => (
            <div
              key={pp.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              {/* Card title */}
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {pp.title}
                </p>
              </div>
              {/* Split: pain | solution */}
              <div className="flex flex-1 flex-col divide-y divide-gray-100">
                <div className="px-4 py-3 flex-1">
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-red-400">
                    <AlertTriangle className="h-2.5 w-2.5" aria-hidden="true" />
                    Problem
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pp.pain}
                  </p>
                </div>
                <div className="px-4 py-3 flex-1 bg-green-50/50">
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-green-600">
                    <CheckCircle className="h-2.5 w-2.5" aria-hidden="true" />
                    Lösung
                  </p>
                  <p className="text-xs text-green-800 leading-relaxed">
                    {pp.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Solution Approach ─────────────────────────────────── */}
      <section aria-labelledby="approach-heading">
        <h2
          id="approach-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          {overview.solutionApproach.title}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {overview.solutionApproach.items.map((item, i) => {
            const Icon = SOLUTION_ICONS[i] ?? Info;
            return (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                  <Icon className="h-4 w-4 text-amber-600" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          Häufige Fragen
        </h2>
        <div className="space-y-1.5">
          {overview.faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden open:border-amber-200"
            >
              <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 list-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                <p className="text-sm font-medium text-gray-900">
                  {faq.question}
                </p>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="border-t border-gray-100 px-5 py-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA to workflow ───────────────────────────────────── */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-900">
            Bereit für den Workflow?
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            {workflow.length} Schritte vom Lead bis zur Archivierung — jeder
            Schritt mit konkreten Handlungsanweisungen.
          </p>
        </div>
        <Link
          href="/playbooks/sales-prozess/workflow"
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 shrink-0"
        >
          Workflow öffnen
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
