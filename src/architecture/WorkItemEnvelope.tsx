"use client";

import { workItemEnvelopeBounds } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { WorkItemEnvelopeStage } from "@/data/workItem";
import type { ArchitectureElementId } from "@/data/architecture";

interface WorkItemEnvelopeProps {
  stage: WorkItemEnvelopeStage;
  workItemId: string;
  isDimmed: boolean;
  isSelected: boolean;
  onSelect: (id: ArchitectureElementId) => void;
  label: string;
  closedLabel: string;
}

const COLLAPSED_STAGES: WorkItemEnvelopeStage[] = ["archived", "closed"];

/**
 * A bounded, evolving envelope around whatever the in-flight Work Item
 * currently touches — not a UI-only highlight. It does not exist
 * before start (stage "none"), expands through checkpoint/verify/finish,
 * and collapses into Repository Protocol at archive/close. This is the
 * spatial answer to "where is the Work Item" rather than a dashboard
 * label with nothing behind it. Stage-to-stage changes are discrete
 * greybox presets, not a smooth morph — that is later visual polish.
 */
export function WorkItemEnvelope({
  stage,
  workItemId,
  isDimmed,
  isSelected,
  onSelect,
  label,
  closedLabel,
}: WorkItemEnvelopeProps) {
  if (stage === "none") return null;

  const bounds = workItemEnvelopeBounds[stage];
  const collapsed = COLLAPSED_STAGES.includes(stage);

  return (
    <group
      position={bounds.center}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("workItem");
      }}
    >
      <mesh>
        <boxGeometry args={bounds.size} />
        <meshStandardMaterial
          color={colors.informationFlow}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.25 : 0.05}
          opacity={isDimmed ? 0.04 : collapsed ? 0.18 : 0.08}
          transparent
          wireframe={!collapsed}
          depthWrite={false}
        />
      </mesh>
      <Label
        position={[0, bounds.size[1] / 2 + 0.3, 0]}
        text={`${label}: ${workItemId}`}
        size={0.18}
        dimmed={isDimmed}
      />
      {stage === "closed" && (
        <Label
          position={[0, bounds.size[1] / 2 + 0.55, 0]}
          text={closedLabel}
          size={0.2}
          dimmed={isDimmed}
        />
      )}
    </group>
  );
}
