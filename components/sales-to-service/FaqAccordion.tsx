"use client";

import { useState, useEffect } from "react";
import { faqs } from "@/data/sales-to-service";
import { ChevronDown } from "lucide-react";

// ── Category config (UI structure, not content) ───────────────

const CATEGORIES = [
  { id: "all", label: "Alle" },
  { id: "board", label: "Board & Karten" },
  { id: "prozess", label: "Prozess & Übergaben" },
  { id: "ki", label: "KI & Follow-up" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const FAQ_CATEGORY: Record<string, CategoryId> = {
  "what-belongs-here": "board",
  "where-templates-live": "board",
  "when-create-card": "board",
  "inbound-outbound": "board",
  "who-owns-card": "board",
  "won-is-done": "prozess",
  "chat-vs-asana": "prozess",
  "archive-use": "prozess",
  "follow-up-rule": "ki",
  "ki-decisions": "ki",
};

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Auto-open FAQ when navigated via hash link (e.g. from Search results)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    setOpenIds((prev) => new Set([...prev, hash]));
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => FAQ_CATEGORY[f.id] === activeCategory);

  return (
    <div>
      {/* Category filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
              activeCategory === id
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            {label}
            {id !== "all" && (
              <span
                className={`ml-1.5 text-[10px] ${
                  activeCategory === id ? "text-amber-100" : "text-gray-400"
                }`}
              >
                {faqs.filter((f) => FAQ_CATEGORY[f.id] === id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div className="space-y-1.5">
        {filtered.map((faq) => {
          const isOpen = openIds.has(faq.id);
          return (
            <div
              key={faq.id}
              id={faq.id}
              className={`rounded-xl border overflow-hidden ${
                isOpen ? "border-amber-200" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isOpen ? "bg-amber-50/50" : "bg-white hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-medium text-gray-900">
                  {faq.question}
                </p>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-5 py-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
