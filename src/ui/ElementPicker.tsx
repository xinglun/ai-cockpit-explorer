import { architectureOrder, type ArchitectureElementId } from "@/data/architecture";
import { colors } from "@/design-system/semanticColors";
import type { ExplorerMessages } from "@/i18n/types";

interface ElementPickerProps {
  selected: ArchitectureElementId | null;
  onSelect: (id: ArchitectureElementId) => void;
  messages: ExplorerMessages;
}

/**
 * A small, secondary index of labels — not a prominent nav bar — so
 * keyboard users can reach every element without 3D interaction while
 * the default screen stays restrained.
 */
export function ElementPicker({ selected, onSelect, messages }: ElementPickerProps) {
  return (
    <nav aria-label={messages.elementPicker.ariaLabel} className="flex flex-wrap gap-1.5">
      {architectureOrder.map((id) => {
        const isActive = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={isActive}
            style={{
              borderColor: isActive ? colors.informationFlow : colors.border,
              color: isActive ? colors.textPrimary : colors.textMuted,
            }}
            className="rounded border px-2 py-0.5 text-xs transition-colors"
          >
            {messages.architecture[id].label}
          </button>
        );
      })}
    </nav>
  );
}
