"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { playbooks } from "@/data/playbooks";
import { prompts } from "@/data/prompts";
import { automations } from "@/data/automations";
import { glossaryEntries } from "@/data/glossary";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  playbooks.forEach((pb) => {
    results.push({
      title: pb.titel,
      description: pb.kurzfassung,
      href: `/playbooks/${pb.slug}`,
      type: "Playbook",
    });
    pb.painPointRegeln.forEach((r) => {
      results.push({
        title: r.painPoint,
        description: r.regel,
        href: `/playbooks/${pb.slug}#pain-points`,
        type: "Regel",
      });
    });
  });

  prompts.forEach((p) => {
    results.push({
      title: p.titel,
      description: p.kontext,
      href: `/prompts#${p.id}`,
      type: "Prompt",
    });
  });

  automations.forEach((a) => {
    results.push({
      title: `${a.board}: ${a.trigger}`,
      description: a.aktion,
      href: `/automations`,
      type: "Automation",
    });
  });

  glossaryEntries.forEach((g) => {
    results.push({
      title: g.term,
      description: g.definition,
      href: `/glossar#${g.term.toLowerCase().replace(/\s+/g, "-")}`,
      type: "Glossar",
    });
  });

  return results;
}

const searchIndex = buildSearchIndex();

const typeColors: Record<string, string> = {
  Playbook: "text-blue-600 bg-blue-50",
  Regel: "text-amber-600 bg-amber-50",
  Prompt: "text-purple-600 bg-purple-50",
  Automation: "text-green-600 bg-green-50",
  Glossar: "text-gray-600 bg-gray-50",
};

export function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = "search-listbox";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = open && results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          placeholder="Suchen… (⌘K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-9 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Suche"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          role="combobox"
          aria-autocomplete="list"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Suche leeren"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id={listboxId}
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          role="listbox"
          aria-label="Suchergebnisse"
        >
          {results.map((result, i) => (
            <Link
              key={i}
              href={result.href}
              role="option"
              aria-selected={false}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  typeColors[result.type] ?? "text-gray-600 bg-gray-50"
                }`}
              >
                {result.type}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{result.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
