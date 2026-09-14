"use client";

import { useState } from "react";
import { colors } from "@/design-system/semanticColors";
import { traceEvents, sampleWorkItemId } from "@/data/workItem";
import type { ExplorerMessages } from "@/i18n/types";

interface TraceTimelineProps {
  messages: ExplorerMessages;
}

/**
 * A single timeline through one Work Item's lifecycle events —
 * Traceability/Audit is a UI trail, not a new architecture object.
 * The resource-finalize/finalize/close cleanup sub-steps stay
 * collapsed by default so they never compete with the primary
 * 30-second comprehension flow; they only appear once a user
 * explicitly asks to see the advanced detail.
 */
export function TraceTimeline({ messages }: TraceTimelineProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const copy = messages.trace;
  const visibleEvents = traceEvents.filter((event) => !event.advanced || showAdvanced);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
          {copy.heading} — {sampleWorkItemId}
        </h3>
        <button
          type="button"
          onClick={() => setShowAdvanced((value) => !value)}
          className="text-xs underline"
          style={{ color: colors.informationFlow }}
          aria-expanded={showAdvanced}
        >
          {showAdvanced ? copy.advancedToggleHide : copy.advancedToggleShow}
        </button>
      </div>
      <ol className="flex flex-col gap-1.5" aria-label={copy.ariaLabel}>
        {visibleEvents.map((event) => (
          <li key={event.id} className="flex items-center gap-2 text-xs" style={{ color: colors.textSecondary }}>
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: event.advanced ? colors.textMuted : colors.informationFlow }}
            />
            <span>{copy.events[event.id]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
