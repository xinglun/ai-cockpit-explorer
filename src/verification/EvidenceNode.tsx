import { verificationStatusColor } from "@/design-system/semanticColors";
import type { EvidenceItem } from "@/data/verificationDemo";

interface EvidenceNodeProps {
  evidence: EvidenceItem;
}

export function EvidenceNode({ evidence }: EvidenceNodeProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        style={{ backgroundColor: verificationStatusColor[evidence.status] }}
        className="h-2.5 w-2.5 rounded-sm"
        aria-hidden
      />
      <span>{evidence.label}</span>
      <span className="text-xs opacity-70">{evidence.status}</span>
    </div>
  );
}
