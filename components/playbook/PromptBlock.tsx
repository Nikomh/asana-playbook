import type { Prompt } from "@/data/types";
import { CopyButton } from "@/components/ui/CopyButton";
import { Callout } from "@/components/ui/Callout";

export function PromptBlock({ prompt }: { prompt: Prompt }) {
  return (
    <div id={prompt.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{prompt.titel}</h3>
          <p className="mt-0.5 text-xs text-gray-500">{prompt.kontext}</p>
        </div>
        <div className="shrink-0">
          <CopyButton text={prompt.prompt} />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50">
        <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono leading-relaxed">
          {prompt.prompt}
        </pre>
      </div>
      {prompt.hinweis && (
        <div className="px-4 py-3">
          <Callout variant="warning">{prompt.hinweis}</Callout>
        </div>
      )}
      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-4 py-2">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
