"use client";

import { useState } from "react";
import { architectureElements, type ArchitectureElementId } from "@/data/architecture";
import { colors } from "@/design-system/semanticColors";

interface DetailPanelProps {
  selected: ArchitectureElementId | null;
  onClose: () => void;
}

/**
 * Answers three questions someone scanning an architecture diagram
 * actually asks — WHAT / INPUTS / OUTPUTS / BOUNDARY — not a prose
 * summary. Upstream provenance is a secondary "About / Source"
 * disclosure, not part of the primary interaction path.
 */
export function DetailPanel({ selected, onClose }: DetailPanelProps) {
  const [showSource, setShowSource] = useState(false);

  if (!selected) return null;

  const element = architectureElements[selected];

  return (
    <div
      style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.textPrimary }}
      className="flex w-full max-w-sm flex-col gap-3 rounded border p-4 shadow-lg md:w-80"
      role="region"
      aria-label={`${element.label} details`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold">{element.label}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          style={{ color: colors.textMuted }}
          className="text-sm"
        >
          ✕
        </button>
      </div>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide">
          What
        </p>
        <p className="text-sm">{element.what}</p>
      </section>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide">
          Inputs
        </p>
        <ul className="text-sm">
          {element.inputs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide">
          Outputs
        </p>
        <ul className="text-sm">
          {element.outputs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.stateRed }} className="text-xs font-semibold uppercase tracking-wide">
          Boundary
        </p>
        <p className="text-sm">{element.boundary}</p>
      </section>

      <button
        type="button"
        onClick={() => setShowSource((value) => !value)}
        style={{ color: colors.informationFlow }}
        className="w-fit text-xs underline"
        aria-expanded={showSource}
      >
        {showSource ? "Hide source" : "About / Source"}
      </button>
      {showSource && (
        <p style={{ color: colors.textMuted }} className="text-xs">
          Upstream: {element.provenance.upstreamRepository} @{" "}
          {element.provenance.upstreamRevision.slice(0, 12)}
        </p>
      )}
    </div>
  );
}
