import type { ArchitectureElementId } from "@/data/architecture";
import type { LifecycleStepId } from "@/data/lifecycle";
import type { VerificationScenarioId } from "@/data/verificationDemo";
import type { TraceEventId } from "@/data/workItem";

export interface ArchitectureCopy {
  label: string;
  what: string;
  inputs: string[];
  outputs: string[];
  boundary: string;
}

export interface LifecycleStepCopy {
  label: string;
  summary: string;
}

export interface TourStepCopy {
  title: string;
  narration: string;
}

export interface VerificationScenarioCopy {
  label: string;
  narrative: string;
}

/**
 * One shared shape per locale. Internal semantic IDs (architecture
 * element ids, lifecycle step ids, verification status words like
 * GREEN/PENDING) are never part of this interface — only the display
 * copy that renders alongside them. A locale file that omits a key is
 * a TypeScript error, not a silent runtime fallback.
 */
export interface ExplorerMessages {
  html: {
    lang: "en" | "ja" | "zh-CN";
    title: string;
    description: string;
  };
  app: {
    title: string;
    subtitle: string;
    /** The single simple sentence shown before any technical term. */
    openingExplanation: string;
    /** The three-sentence core distinction (agents / evidence / humans). */
    coreDistinction: string;
    interactionHint: string;
    canvasAriaLabel: string;
    /** Shown once on touch/no-hover viewports, since the hover cue below never fires there. */
    touchHint: string;
  };
  navigation: {
    ariaLabel: string;
    overview: string;
    workItem: string;
    verification: string;
  };
  languageSelector: {
    ariaLabel: string;
  };
  elementPicker: {
    ariaLabel: string;
  };
  architecture: Record<ArchitectureElementId, ArchitectureCopy>;
  lifecycle: {
    heading: string;
    ariaLabel: string;
    current: string;
    steps: Record<LifecycleStepId, LifecycleStepCopy>;
  };
  tour: {
    start: string;
    next: string;
    previous: string;
    exit: string;
    done: string;
    ariaLabel: string;
    /** Template with {current} and {total} placeholders. */
    sceneOfTotal: string;
    /** Same length and order as interaction/tour.ts's tourSteps. */
    steps: TourStepCopy[];
  };
  verification: {
    title: string;
    verificationLabel: string;
    humanDecisionLabel: string;
    verifiedNotApproved: string;
    scenarioGreenLabel: string;
    scenarioRedLabel: string;
    evidenceLabels: Record<"build" | "tests" | "scope", string>;
    scenarios: Record<VerificationScenarioId, VerificationScenarioCopy>;
  };
  detailPanel: {
    whatLabel: string;
    inputsLabel: string;
    outputsLabel: string;
    boundaryLabel: string;
    closeLabel: string;
    aboutSource: string;
    hideSource: string;
    upstreamLabel: string;
  };
  statusLegend: {
    explanations: Record<"GREEN" | "YELLOW" | "RED" | "UNKNOWN", string>;
    humanDecisionExplanation: string;
  };
  workItemEnvelope: {
    /** Rendered as `"{label}: WI-123"` above the envelope. */
    label: string;
    /** Shown above the collapsed envelope once the sample Work Item is closed. */
    closedLabel: string;
  };
  trace: {
    heading: string;
    ariaLabel: string;
    advancedToggleShow: string;
    advancedToggleHide: string;
    show3dTrail: string;
    hide3dTrail: string;
    events: Record<TraceEventId, string>;
  };
}
