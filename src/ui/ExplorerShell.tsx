"use client";

import { useState } from "react";
import { ArchitectureExperience } from "@/scene/ArchitectureExperience";
import { Navigation } from "./Navigation";
import { DetailPanel } from "./DetailPanel";
import { GuidedTour } from "./GuidedTour";
import { StatusLegend } from "./StatusLegend";
import { LifecycleFlow } from "@/lifecycle/LifecycleFlow";
import { VerificationGraph } from "@/verification/VerificationGraph";
import {
  verificationScenarioOrder,
  verificationScenarios,
  type VerificationScenarioId,
} from "@/data/verificationDemo";
import { initialSelectionState, select } from "@/interaction/selection";
import { tourSteps } from "@/interaction/tour";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureElementId } from "@/data/architecture";

/**
 * Owns all Explorer state and composes the 3D scene with the DOM UI.
 * app/page.tsx stays a thin composition root by delegating here.
 */
export function ExplorerShell() {
  const [selection, setSelection] = useState(initialSelectionState);
  const [tourActive, setTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [scenarioId, setScenarioId] = useState<VerificationScenarioId>("green-pending");

  const handleSelect = (id: ArchitectureElementId) => {
    setSelection(select(id));
  };

  const startTour = () => {
    setTourActive(true);
    setTourStepIndex(0);
    handleSelect(tourSteps[0].id);
  };

  const changeTourStep = (index: number) => {
    setTourStepIndex(index);
    handleSelect(tourSteps[index].id);
  };

  const exitTour = () => {
    setTourActive(false);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden" style={{ backgroundColor: colors.background }}>
      <div className="absolute inset-0">
        <ArchitectureExperience selection={selection} onSelect={handleSelect} />
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-4 p-4 md:p-6"
        style={{ color: colors.textPrimary }}
      >
        <header className="pointer-events-auto flex flex-col gap-3">
          <div>
            <h1 className="text-lg font-semibold">AI Cockpit — Interactive Architecture</h1>
            <p style={{ color: colors.textSecondary }} className="text-sm">
              Repository-changing authority stays bounded, evidence-based, and reviewable.
            </p>
          </div>
          <Navigation selected={selection.selected} onSelect={handleSelect} />
        </header>

        <div className="pointer-events-auto grid gap-4 md:grid-cols-3">
          <section
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="flex flex-col gap-3 rounded border p-4"
          >
            <DetailPanel selected={selection.selected} />
            <GuidedTour
              stepIndex={tourStepIndex}
              active={tourActive}
              onStart={startTour}
              onStepChange={changeTourStep}
              onExit={exitTour}
            />
          </section>

          <section
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="flex flex-col gap-3 rounded border p-4"
          >
            <h2 className="text-sm font-semibold">Work Item lifecycle</h2>
            <LifecycleFlow activeStepId="verify" />
          </section>

          <section
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="flex flex-col gap-3 rounded border p-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Verification</h2>
              <div className="flex gap-1">
                {verificationScenarioOrder.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setScenarioId(id)}
                    aria-pressed={scenarioId === id}
                    style={{
                      borderColor: scenarioId === id ? colors.informationFlow : colors.border,
                    }}
                    className="rounded border px-2 py-0.5 text-xs"
                  >
                    {id === "green-pending" ? "GREEN" : "RED"}
                  </button>
                ))}
              </div>
            </div>
            <VerificationGraph scenario={verificationScenarios[scenarioId]} />
            <StatusLegend />
          </section>
        </div>
      </div>
    </div>
  );
}
