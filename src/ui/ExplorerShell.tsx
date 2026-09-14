"use client";

import { useMemo, useState } from "react";
import { ArchitectureExperience } from "@/scene/ArchitectureExperience";
import { Navigation, type ExplorerMode } from "./Navigation";
import { ElementPicker } from "./ElementPicker";
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
import { stageRelevance, stageCameraId } from "@/interaction/stageFocus";
import { tourSteps } from "@/interaction/tour";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureElementId } from "@/data/architecture";
import type { LifecycleStepId } from "@/data/lifecycle";

const VERIFICATION_FOCUS: ArchitectureElementId[] = [
  "runtime",
  "evidence",
  "contract",
  "outcome",
  "humanAuthority",
];

/**
 * Owns all Explorer state and composes the 3D scene with the DOM UI.
 * The 3D world is persistent across modes — modes change what's
 * highlighted and where the camera looks, not the page.
 */
export function ExplorerShell() {
  const [mode, setMode] = useState<ExplorerMode>("overview");
  const [selectedId, setSelectedId] = useState<ArchitectureElementId | null>(null);
  const [activeStage, setActiveStage] = useState<LifecycleStepId>("inspect");
  const [scenarioId, setScenarioId] = useState<VerificationScenarioId>("green-pending");
  const [tourActive, setTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  const changeMode = (next: ExplorerMode) => {
    setMode(next);
    setSelectedId(null);
    setTourActive(false);
  };

  const startTour = () => {
    setMode("overview");
    setSelectedId(null);
    setTourActive(true);
    setTourStepIndex(0);
  };

  const exitTour = () => setTourActive(false);

  const { highlightIds, cameraId } = useMemo(() => {
    if (tourActive) {
      const step = tourSteps[tourStepIndex];
      return { highlightIds: step.focus, cameraId: step.cameraId };
    }
    if (mode === "workitem") {
      return { highlightIds: stageRelevance[activeStage], cameraId: stageCameraId[activeStage] };
    }
    if (mode === "verification") {
      return { highlightIds: VERIFICATION_FOCUS, cameraId: "runtime" as ArchitectureElementId };
    }
    return {
      highlightIds: selectedId ? [selectedId] : null,
      cameraId: selectedId,
    };
  }, [tourActive, tourStepIndex, mode, activeStage, selectedId]);

  return (
    <div className="relative h-dvh w-full overflow-hidden" style={{ backgroundColor: colors.background }}>
      <div className="absolute inset-0">
        <ArchitectureExperience
          highlightIds={highlightIds}
          selectedId={selectedId}
          cameraId={cameraId}
          onSelect={setSelectedId}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-4 p-4 md:p-6"
        style={{ color: colors.textPrimary }}
      >
        <header className="pointer-events-auto flex flex-col gap-3">
          <div>
            <h1 className="text-lg font-semibold">AI Cockpit Explorer</h1>
            <p style={{ color: colors.textSecondary }} className="text-sm">
              Evidence-based repository governance
            </p>
          </div>
          <Navigation mode={mode} onChange={changeMode} />
        </header>

        {mode === "overview" && !tourActive && (
          <div className="pointer-events-auto flex flex-col gap-3">
            {selectedId && <DetailPanel selected={selectedId} onClose={() => setSelectedId(null)} />}
            <p className="max-w-md text-sm" style={{ color: colors.textSecondary }}>
              AI agents can execute. Evidence determines what is verified. Humans determine what is
              authorized.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <GuidedTour
                stepIndex={tourStepIndex}
                active={false}
                onStart={startTour}
                onStepChange={setTourStepIndex}
                onExit={exitTour}
              />
              <p style={{ color: colors.textMuted }} className="text-xs">
                Drag to orbit · Scroll to zoom · Click to explore
              </p>
            </div>
            <ElementPicker selected={selectedId} onSelect={setSelectedId} />
          </div>
        )}

        {tourActive && (
          <div className="pointer-events-auto flex justify-center">
            <GuidedTour
              stepIndex={tourStepIndex}
              active
              onStart={startTour}
              onStepChange={setTourStepIndex}
              onExit={exitTour}
            />
          </div>
        )}

        {mode === "workitem" && !tourActive && (
          <div
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="pointer-events-auto flex flex-col gap-3 rounded border p-4"
          >
            <h2 className="text-sm font-semibold">Work Item lifecycle</h2>
            <LifecycleFlow activeStepId={activeStage} onSelectStep={setActiveStage} />
          </div>
        )}

        {mode === "verification" && !tourActive && (
          <div
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="pointer-events-auto flex flex-col gap-3 rounded border p-4 md:max-w-md"
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
          </div>
        )}
      </div>
    </div>
  );
}
