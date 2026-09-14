"use client";

import { useState } from "react";
import { architectureElements, type ArchitectureElementId } from "@/data/architecture";
import { colors } from "@/design-system/semanticColors";
import type { ExplorerMessages } from "@/i18n/types";

interface DetailPanelProps {
  selected: ArchitectureElementId | null;
  onClose: () => void;
  messages: ExplorerMessages;
}

/**
 * Answers three questions someone scanning an architecture diagram
 * actually asks — WHAT / INPUTS / OUTPUTS / BOUNDARY — not a prose
 * summary. Upstream provenance is a secondary "About / Source"
 * disclosure, not part of the primary interaction path. Display copy
 * comes from src/i18n/*; only the upstream provenance record itself
 * (stable across locales) comes from the data layer.
 */
export function DetailPanel({ selected, onClose, messages }: DetailPanelProps) {
  const [showSource, setShowSource] = useState(false);

  if (!selected) return null;

  const provenance = architectureElements[selected].provenance;
  const copy = messages.architecture[selected];
  const panelCopy = messages.detailPanel;

  return (
    <div
      style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.textPrimary }}
      className="flex w-full max-w-sm flex-col gap-3 rounded border p-4 shadow-lg md:w-80"
      role="region"
      aria-label={copy.label}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold">{copy.label}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={panelCopy.closeLabel}
          style={{ color: colors.textMuted }}
          className="text-sm"
        >
          ✕
        </button>
      </div>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide">
          {panelCopy.whatLabel}
        </p>
        <p className="text-sm">{copy.what}</p>
      </section>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide">
          {panelCopy.inputsLabel}
        </p>
        <ul className="text-sm">
          {copy.inputs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide">
          {panelCopy.outputsLabel}
        </p>
        <ul className="text-sm">
          {copy.outputs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-1">
        <p style={{ color: colors.stateRed }} className="text-xs font-semibold uppercase tracking-wide">
          {panelCopy.boundaryLabel}
        </p>
        <p className="text-sm">{copy.boundary}</p>
      </section>

      <button
        type="button"
        onClick={() => setShowSource((value) => !value)}
        style={{ color: colors.informationFlow }}
        className="w-fit text-xs underline"
        aria-expanded={showSource}
      >
        {showSource ? panelCopy.hideSource : panelCopy.aboutSource}
      </button>
      {showSource && (
        <p style={{ color: colors.textMuted }} className="text-xs">
          {panelCopy.upstreamLabel}: {provenance.upstreamRepository} @ {provenance.upstreamRevision.slice(0, 12)}
        </p>
      )}
    </div>
  );
}
