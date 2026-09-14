import { architectureElements, architectureOrder, type ArchitectureElementId } from "@/data/architecture";
import { colors } from "@/design-system/semanticColors";

interface NavigationProps {
  selected: ArchitectureElementId | null;
  onSelect: (id: ArchitectureElementId) => void;
}

/**
 * Keyboard/DOM-accessible navigation into the same selection state the
 * 3D scene uses, so 3D interaction is never required to explore the
 * architecture.
 */
export function Navigation({ selected, onSelect }: NavigationProps) {
  return (
    <nav aria-label="Architecture layers" className="flex flex-wrap gap-2">
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
              color: colors.textPrimary,
              backgroundColor: isActive ? colors.surfaceRaised : "transparent",
            }}
            className="rounded border px-3 py-1.5 text-sm transition-colors"
          >
            {architectureElements[id].label}
          </button>
        );
      })}
    </nav>
  );
}
