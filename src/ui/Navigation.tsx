import { colors } from "@/design-system/semanticColors";
import type { ExplorerMessages } from "@/i18n/types";

export type ExplorerMode = "overview" | "workitem" | "verification";

interface NavigationProps {
  mode: ExplorerMode;
  onChange: (mode: ExplorerMode) => void;
  messages: ExplorerMessages;
}

/**
 * Exactly three modes — no per-element button row. Keyboard/DOM
 * accessible so 3D interaction is never required to use the Explorer.
 */
export function Navigation({ mode, onChange, messages }: NavigationProps) {
  const modes: Array<{ id: ExplorerMode; label: string }> = [
    { id: "overview", label: messages.navigation.overview },
    { id: "workitem", label: messages.navigation.workItem },
    { id: "verification", label: messages.navigation.verification },
  ];

  return (
    <div role="tablist" aria-label={messages.navigation.ariaLabel} className="flex gap-1">
      {modes.map((entry) => {
        const isActive = mode === entry.id;
        return (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(entry.id)}
            style={{
              borderColor: isActive ? colors.informationFlow : colors.border,
              color: colors.textPrimary,
              backgroundColor: isActive ? colors.surfaceRaised : "transparent",
            }}
            className="rounded border px-3 py-1.5 text-sm transition-colors"
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
