"use client";

import { useState } from "react";
import { architectureElements, type ArchitectureElementId } from "@/data/architecture";
import { colors } from "@/design-system/semanticColors";

interface DetailPanelProps {
  selected: ArchitectureElementId | null;
}

/**
 * Progressive disclosure: summary is always visible; full detail and
 * upstream provenance are revealed on demand to avoid overload.
 */
export function DetailPanel({ selected }: DetailPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (!selected) {
    return (
      <p style={{ color: colors.textMuted }} className="text-sm">
        Select an architecture element to see details.
      </p>
    );
  }

  const element = architectureElements[selected];

  return (
    <div style={{ color: colors.textPrimary }} className="flex flex-col gap-2">
      <p style={{ color: colors.textSecondary }} className="text-xs uppercase tracking-wide">
        {element.role}
      </p>
      <h2 className="text-lg font-semibold">{element.label}</h2>
      <p className="text-sm">{element.summary}</p>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        style={{ color: colors.informationFlow }}
        className="w-fit text-xs underline"
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Show more"}
      </button>
      {expanded && (
        <div className="flex flex-col gap-1 text-sm" style={{ color: colors.textSecondary }}>
          <p>{element.detail}</p>
          <p style={{ color: colors.textMuted }} className="text-xs">
            Upstream: {element.provenance.upstreamRepository} @{" "}
            {element.provenance.upstreamRevision.slice(0, 12)}
          </p>
        </div>
      )}
    </div>
  );
}
