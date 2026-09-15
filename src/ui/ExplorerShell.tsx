"use client";

import { useMemo, useState } from "react";
import { ArchitectureExperience } from "@/scene/ArchitectureExperience";
import { Navigation, type ExplorerMode } from "./Navigation";
import { ElementPicker } from "./ElementPicker";
import { DetailPanel } from "./DetailPanel";
import { GuidedTour } from "./GuidedTour";
import { StatusLegend } from "./StatusLegend";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FadeIn } from "./FadeIn";
import { TraceTimeline } from "./TraceTimeline";
import { LifecycleFlow } from "@/lifecycle/LifecycleFlow";
import { VerificationGraph } from "@/verification/VerificationGraph";
import {
  verificationScenarioOrder,
  verificationScenarios,
  type VerificationScenarioId,
} from "@/data/verificationDemo";
import { sampleWorkItemId } from "@/data/workItem";
import { stageRelevance, stageCameraId, stageFlowIds, stageEnvelope, elementFlowRelevance } from "@/interaction/stageFocus";
import { tourSteps } from "@/interaction/tour";
import { parseExplorerUrlState } from "@/interaction/explorerUrlState";
import { colors } from "@/design-system/semanticColors";
import { architectureOrder, type ArchitectureElementId } from "@/data/architecture";
import type { LifecycleStepId } from "@/data/lifecycle";
import type { FlowId } from "@/architecture/types";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/getMessages";

const VERIFICATION_FOCUS: ArchitectureElementId[] = [
  "runtime",
  "evidence",
  "contract",
  "outcome",
  "humanAuthority",
  "humanControlInterface",
  "workItem",
];

const VERIFICATION_FLOW_IDS: Record<VerificationScenarioId, FlowId[]> = {
  "green-pending": ["evidence", "outcome"],
  "red-fail-closed": ["evidence"],
};

interface ExplorerShellProps {
  locale: Locale;
}

/**
 * Owns all Explorer state and composes the 3D scene with the DOM UI.
 * The 3D world is persistent across modes — modes change what's
 * highlighted and where the camera looks, not the page. Mode,
 * selection, and guided-tour step are handed to the LanguageSwitcher
 * directly (not round-tripped through the URL on every change — that
 * caused router navigations to race with rapid tour-step keypresses)
 * so it can carry them into the sibling-locale link it builds; the URL
 * itself is only touched by an actual navigation (arriving via such a
 * link, or a reload of a previously-shared URL), which this component
 * reads once on mount via parseExplorerUrlState.
 */
export function ExplorerShell({ locale }: ExplorerShellProps) {
  const messages = useMemo(() => getMessages(locale), [locale]);
  const labels = useMemo(() => {
    const entries = architectureOrder.map((id) => [id, messages.architecture[id].label] as const);
    return Object.fromEntries(entries) as Record<ArchitectureElementId, string>;
  }, [messages]);

  // Read via window.location rather than next/navigation's useSearchParams()
  // so this component has no dynamic-hook dependency: it stays fully
  // static-prerenderable (canvas, copy, and all) instead of being deferred
  // behind a Suspense fallback until hydration. This is only the *initial*
  // read, on mount — after that this component owns state itself.
  const [initial] = useState(() =>
    parseExplorerUrlState(
      typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams(),
      architectureOrder,
    ),
  );

  const [mode, setMode] = useState<ExplorerMode>(initial.mode);
  const [selectedId, setSelectedId] = useState<ArchitectureElementId | null>(initial.selectedId);
  const [activeStage, setActiveStage] = useState<LifecycleStepId>("inspect");
  const [scenarioId, setScenarioId] = useState<VerificationScenarioId>("green-pending");
  const [tourActive, setTourActive] = useState(initial.tourStepIndex !== null);
  const [tourStepIndex, setTourStepIndex] = useState(initial.tourStepIndex ?? 0);
  const [showTraceTrail, setShowTraceTrail] = useState(false);

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

  const blocked = mode === "verification" && !tourActive && scenarioId === "red-fail-closed";

  const { highlightIds, cameraId, activeFlowIds, workItemStage } = useMemo(() => {
    if (tourActive) {
      const step = tourSteps[tourStepIndex];
      return {
        highlightIds: step.focus,
        cameraId: step.cameraId,
        activeFlowIds: step.activeFlowIds,
        workItemStage: step.envelopeStage,
      };
    }
    if (mode === "workitem") {
      return {
        highlightIds: stageRelevance[activeStage],
        cameraId: stageCameraId[activeStage],
        activeFlowIds: stageFlowIds[activeStage],
        workItemStage: stageEnvelope[activeStage],
      };
    }
    if (mode === "verification") {
      return {
        highlightIds: VERIFICATION_FOCUS,
        cameraId: "runtime" as ArchitectureElementId,
        activeFlowIds: VERIFICATION_FLOW_IDS[scenarioId],
        workItemStage: "finished" as const,
      };
    }
    return {
      highlightIds: selectedId ? [selectedId] : null,
      cameraId: selectedId,
      activeFlowIds: selectedId ? elementFlowRelevance[selectedId] : null,
      workItemStage: selectedId === "workItem" ? ("active" as const) : ("none" as const),
    };
  }, [tourActive, tourStepIndex, mode, activeStage, selectedId, scenarioId]);

  return (
    <div className="relative h-dvh w-full overflow-hidden" style={{ backgroundColor: colors.background }}>
      <div className="absolute inset-0">
        <ArchitectureExperience
          highlightIds={highlightIds}
          selectedId={selectedId}
          cameraId={cameraId}
          onSelect={setSelectedId}
          labels={labels}
          ariaLabel={messages.app.canvasAriaLabel}
          activeFlowIds={activeFlowIds}
          workItemStage={workItemStage}
          workItemId={sampleWorkItemId}
          workItemClosedLabel={messages.workItemEnvelope.closedLabel}
          blocked={blocked}
          showTraceTrail={mode === "workitem" && !tourActive && showTraceTrail}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-4 p-4 md:p-6"
        style={{ color: colors.textPrimary }}
      >
        <header className="pointer-events-auto flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold">{messages.app.title}</h1>
              <p style={{ color: colors.textSecondary }} className="text-sm">
                {messages.app.subtitle}
              </p>
            </div>
            <LanguageSwitcher
              locale={locale}
              ariaLabel={messages.languageSelector.ariaLabel}
              currentState={{ mode, selectedId, tourStepIndex: tourActive ? tourStepIndex : null }}
            />
          </div>
          <Navigation mode={mode} onChange={changeMode} messages={messages} />
        </header>

        {mode === "overview" && !tourActive && (
          <div className="pointer-events-auto flex flex-col gap-3">
            {selectedId && (
              <FadeIn key={selectedId}>
                <DetailPanel selected={selectedId} onClose={() => setSelectedId(null)} messages={messages} />
              </FadeIn>
            )}
            <p className="max-w-md text-sm" style={{ color: colors.textSecondary }}>
              {messages.app.openingExplanation}
            </p>
            <p className="max-w-md text-sm" style={{ color: colors.textSecondary }}>
              {messages.app.coreDistinction}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <GuidedTour
                stepIndex={tourStepIndex}
                active={false}
                onStart={startTour}
                onStepChange={setTourStepIndex}
                onExit={exitTour}
                messages={messages}
              />
              <p style={{ color: colors.textMuted }} className="text-xs">
                {messages.app.interactionHint}
              </p>
            </div>
            <ElementPicker selected={selectedId} onSelect={setSelectedId} messages={messages} />
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
              messages={messages}
            />
          </div>
        )}

        {mode === "workitem" && !tourActive && (
          <FadeIn className="pointer-events-auto self-start">
          <div
            style={{ backgroundColor: colors.surface, borderColor: colors.border, opacity: 0.94 }}
            className="flex max-h-[42dvh] flex-col gap-4 overflow-y-auto rounded border p-4 md:max-w-xl"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold">{messages.lifecycle.heading}</h2>
              <LifecycleFlow activeStepId={activeStage} onSelectStep={setActiveStage} messages={messages} />
            </div>
            <div style={{ borderColor: colors.border }} className="border-t pt-3">
              <TraceTimeline
                messages={messages}
                showTrail={showTraceTrail}
                onToggleTrail={() => setShowTraceTrail((value) => !value)}
              />
            </div>
          </div>
          </FadeIn>
        )}

        {mode === "verification" && !tourActive && (
          <FadeIn className="pointer-events-auto">
          <div
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="flex flex-col gap-3 rounded border p-4 md:max-w-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{messages.verification.title}</h2>
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
                    {id === "green-pending"
                      ? messages.verification.scenarioGreenLabel
                      : messages.verification.scenarioRedLabel}
                  </button>
                ))}
              </div>
            </div>
            <VerificationGraph key={scenarioId} scenario={verificationScenarios[scenarioId]} messages={messages} />
            <StatusLegend messages={messages} />
          </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
