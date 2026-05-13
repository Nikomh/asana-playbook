import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ArrowRightLeft,
  BookMarked,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { playbooks } from "@/data/playbooks";
import type { BoardColor } from "@/data/types";

export const metadata: Metadata = {
  title: "Dashboard · Agile X Playbooks",
};

const boardColorBorder: Record<BoardColor, string> = {
  blue: "border-blue-200 hover:border-blue-400",
  amber: "border-amber-200 hover:border-amber-400",
  green: "border-green-200 hover:border-green-400",
  purple: "border-purple-200 hover:border-purple-400",
  gray: "border-gray-200 hover:border-gray-400",
};

const boardColorBg: Record<BoardColor, string> = {
  blue: "bg-blue-50",
  amber: "bg-amber-50",
  green: "bg-green-50",
  purple: "bg-purple-50",
  gray: "bg-gray-50",
};

const whenThenItems = [
  {
    condition: "Du eine neue Kundenanfrage erhältst",
    action: "Sales to Service",
    href: "/playbooks/sales-to-service",
    color: "amber" as BoardColor,
  },
  {
    condition: "Ein Angebot gewonnen wurde",
    action: "Übergabe zu Client Delivery",
    href: "/handoffs#sales-to-service-client-delivery",
    color: "green" as BoardColor,
  },
  {
    condition: "Du Content freigeben lassen willst",
    action: "Content-Pipeline → Review / Freigabe",
    href: "/playbooks/content-pipeline#sections",
    color: "blue" as BoardColor,
  },
  {
    condition: "Eine Ausbildungskohorte startet",
    action: "Ausbildung & Training",
    href: "/playbooks/ausbildung-training",
    color: "purple" as BoardColor,
  },
  {
    condition: "Du einen Workshop abgeschlossen hast",
    action: "Client Delivery → Dokumentation",
    href: "/playbooks/client-delivery#sections",
    color: "green" as BoardColor,
  },
  {
    condition: "Du eine wiederkehrende interne Aufgabe hast",
    action: "Internal Operations",
    href: "/playbooks/internal-operations",
    color: "gray" as BoardColor,
  },
  {
    condition: "Eine Vorlage dauerhaft gebraucht wird",
    action: "Knowledge Management / SharePoint",
    href: "/glossar#knowledge-management",
    color: "gray" as BoardColor,
  },
  {
    condition: "Du einen KI-Prompt brauchst",
    action: "Prompt-Bibliothek",
    href: "/prompts",
    color: "blue" as BoardColor,
  },
];

const roles = [
  {
    kuerzel: "P01",
    name: "Strategie & Freigaben",
    boards: ["Sales to Service", "Client Delivery"],
    color: "amber" as BoardColor,
  },
  {
    kuerzel: "P02",
    name: "Beratung & Delivery",
    boards: ["Client Delivery", "Ausbildung & Training"],
    color: "green" as BoardColor,
  },
  {
    kuerzel: "P03",
    name: "Marketing & Content",
    boards: ["Content-Pipeline", "Internal Operations"],
    color: "blue" as BoardColor,
  },
  {
    kuerzel: "P04",
    name: "Operations & Ausbildung",
    boards: ["Ausbildung & Training", "Internal Operations"],
    color: "purple" as BoardColor,
  },
];

const quickLinks = [
  { label: "Prompt-Bibliothek", href: "/prompts", icon: Sparkles },
  { label: "Automations & Rules", href: "/automations", icon: Zap },
  { label: "Board-Übergaben", href: "/handoffs", icon: ArrowRightLeft },
  { label: "Glossar & Regeln", href: "/glossar", icon: BookMarked },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Asana Playbooks</h1>
        <p className="mt-1 text-gray-500 text-sm">
          Arbeitsweisen, Regeln und Prompts für das Agile X Team.
        </p>
      </div>

      {/* Boards */}
      <section aria-labelledby="boards-heading">
        <h2 id="boards-heading" className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Playbooks
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((pb) => (
            <Link
              key={pb.id}
              href={`/playbooks/${pb.slug}`}
              className={`group flex flex-col gap-2 rounded-xl border-2 bg-white p-4 transition ${boardColorBorder[pb.farbe]}`}
            >
              <div className="flex items-center justify-between">
                <Badge label={pb.bereich} variant={pb.farbe} />
                <ArrowRight
                  className="h-4 w-4 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{pb.titel}</p>
                <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{pb.kurzfassung}</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-auto">{pb.board}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Wenn-Dann */}
      <section aria-labelledby="when-then-heading">
        <h2 id="when-then-heading" className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Wenn du … dann …
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-100">
          {whenThenItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50 group"
            >
              <div className="text-sm">
                <span className="text-gray-500">Wenn </span>
                <span className="text-gray-900 font-medium">{item.condition}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`hidden sm:block text-xs font-medium rounded-full px-2.5 py-0.5 ${boardColorBg[item.color]} text-gray-700`}>
                  → {item.action}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 transition" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Rollen */}
      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400 flex items-center gap-2">
          <Users className="h-4 w-4" aria-hidden="true" />
          Einstieg nach Rolle
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {roles.map((role) => (
            <div
              key={role.kuerzel}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex h-7 w-10 items-center justify-center rounded font-bold text-xs ${boardColorBg[role.color]} text-gray-700`}>
                  {role.kuerzel}
                </span>
                <span className="text-sm font-medium text-gray-900">{role.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {role.boards.map((board) => {
                  const pb = playbooks.find((p) => p.titel === board);
                  if (!pb) return null;
                  return (
                    <Link
                      key={board}
                      href={`/playbooks/${pb.slug}`}
                      className="text-xs rounded-full border border-gray-200 px-2.5 py-1 text-gray-600 hover:bg-gray-50 transition"
                    >
                      {board}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section aria-labelledby="quicklinks-heading">
        <h2 id="quicklinks-heading" className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Schnellzugriff
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center hover:bg-gray-50 transition"
            >
              <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="text-xs font-medium text-gray-700">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Grundregeln */}
      <section aria-labelledby="rules-heading">
        <h2 id="rules-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Die 3 wichtigsten Grundregeln
        </h2>
        <div className="space-y-2">
          <Callout variant="info" title="Keine Aufgabe ohne Owner.">
            Tasks ohne Owner werden nie erledigt. Wenn unklar ist wer zuständig ist, sofort klären.
          </Callout>
          <Callout variant="warning" title="Keine vertraulichen Daten in externe KI-Tools.">
            Kundennamen, Preise, Mitarbeiterdaten — niemals in ChatGPT oder andere externe Dienste.
          </Callout>
          <Callout variant="success" title="Links statt Sucharbeit.">
            Jeder Asana-Task der auf ein Dokument verweist, enthält den direkten SharePoint-Link.
          </Callout>
        </div>
        <div className="mt-3">
          <Link
            href="/glossar#arbeitsregeln"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            Alle 10 Arbeitsregeln lesen
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
