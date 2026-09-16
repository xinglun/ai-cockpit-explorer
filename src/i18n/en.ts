import type { ExplorerMessages } from "./types";

export const en = {
  html: {
    lang: "en",
    title: "AI Cockpit Explorer — Interactive Repository Governance Architecture",
    description:
      "Explore AI Cockpit's architecture, governance lifecycle, evidence model, and human-authority boundary interactively.",
  },
  app: {
    title: "AI Cockpit Explorer",
    subtitle: "Evidence-based repository governance",
    openingExplanation: "AI Cockpit governs repository-changing work performed with AI.",
    coreDistinction:
      "AI agents can execute. Evidence determines what is verified. Humans determine what is authorized.",
    interactionHint: "Drag to orbit · Scroll to zoom · Click to explore",
    canvasAriaLabel: "Interactive 3D AI Cockpit governance loop",
    touchHint: "Tap any shape to see what it means",
  },
  navigation: {
    ariaLabel: "Explorer mode",
    overview: "Overview",
    workItem: "Work Item",
    verification: "Verification",
  },
  languageSelector: {
    ariaLabel: "Language",
  },
  elementPicker: {
    ariaLabel: "Governance Loop elements",
  },
  architecture: {
    agents: {
      label: "Agents",
      what: "External actors (e.g. Codex, Claude, Gemini, Grok) that perform AI-assisted execution.",
      inputs: ["An active Work Item Contract"],
      outputs: ["Execution requests at the entry gate"],
      boundary: "Cannot execute outside a bounded Work Item, and hold no repository authority.",
    },
    entrySurface: {
      label: "Entry Gate",
      what: "Where execution requests enter the governed lifecycle, accepted via a CLI or an MCP interface (stdio transport).",
      inputs: ["Agent execution requests"],
      outputs: ["Bounded start / checkpoint / finish calls"],
      boundary: "Cannot be bypassed to mutate the repository directly and invisibly.",
    },
    contract: {
      label: "Contract",
      what: "The human-defined boundary for a Work Item: intent, scope, and acceptance criteria.",
      inputs: ["Intent", "Scope", "Acceptance criteria", "Authority"],
      outputs: ["The bounds Runtime evaluates every action against"],
      boundary: "Cannot be satisfied by inference — only by evidence checked against its own text.",
    },
    workItem: {
      label: "Work Item",
      what: "The bounded, evolving envelope everything above happens inside: one Contract, its execution, its evidence, and its Outcome, tracked as a single governed unit from start to close.",
      inputs: ["A Contract (intent, scope, acceptance criteria)", "Repository facts", "Evidence collected during execution"],
      outputs: ["An Outcome for Human Authority to decide on", "A durable trace once archived"],
      boundary: "Does not exist before start, and cannot outlive its own Contract's scope.",
    },
    runtime: {
      label: "AI Cockpit Runtime",
      what: "The engine that evaluates the Contract against repository facts and evidence. AI Cockpit's own release artifacts ship with a dependency SBOM (SPDX), SHA-256 checksums, and build provenance attestations.",
      inputs: ["Contract", "Repository facts", "Evidence"],
      outputs: ["Verification result", "Outcome"],
      boundary: "Cannot grant human approval — it computes verification, not authorization.",
    },
    repository: {
      label: "Software Repository",
      what: "The thing being governed — source of truth for code and history.",
      inputs: ["Commits", "Working tree state"],
      outputs: ["Git HEAD", "Changed paths", "Snapshot digests"],
      boundary: "Is not replaced or owned by AI Cockpit — Runtime only observes it.",
    },
    repositoryProtocol: {
      label: "Repository Protocol",
      what: "A persistent, repository-owned layer (.ai/) storing Contracts, evidence, decisions, and derived Knowledge.",
      inputs: ["Lifecycle events"],
      outputs: [
        "Durable governance history versioned with the code",
        "SHA-256 manifest-based integrity verification of the stored state (repositoryId / profileDigest)",
      ],
      boundary: "Cannot be evaluated as evidence by itself — it stores state, Runtime evaluates it.",
    },
    knowledge: {
      label: "Knowledge",
      what: "A projection of completed repository facts, made available for later lookup once a Work Item is done.",
      inputs: ["Completed, archived Work Item facts"],
      outputs: ["Lookups a future Work Item's Runtime can consult"],
      boundary: "Derived from completed repository facts — it is not a source of authority.",
    },
    evidence: {
      label: "Evidence",
      what: "Observable, structured facts produced by execution: tests, git state, digests, artifacts.",
      inputs: ["Test results", "Git state", "Digests", "Artifacts"],
      outputs: ["A verification-ready evidence packet"],
      boundary: "Cannot substitute for a human decision, no matter how complete it is.",
    },
    outcome: {
      label: "Outcome",
      what: "What Runtime produced after verification: a result plus what remains unknown.",
      inputs: ["Verification result", "Unresolved unknowns"],
      outputs: ["A record Human Authority can decide on"],
      boundary: "Cannot authorize itself — GREEN outcome is not an APPROVED decision.",
    },
    humanControlInterface: {
      label: "Human Control",
      what: "The Explorer's presentation of Human-Computer Interaction with AI Cockpit — how a human directs and receives status from it, in three channels: Define (Intent, Scope, Acceptance Criteria, Authority), Understand (Outcome, Evidence Summary, Unknowns, Risk/Status, Next Action), and Decide (Approve, Reject, Recover, Continue).",
      inputs: ["Intent, Scope, Acceptance Criteria, Authority (Define)", "Outcome, Evidence Summary, Unknowns, Risk/Status, Next Action (Understand)"],
      outputs: ["Approve / Reject / Recover / Continue (Decide)"],
      boundary: "Is a concept the Explorer uses to present human/Runtime interaction — not a literal Runtime service.",
    },
    humanAuthority: {
      label: "Human Authority",
      what: "The separate, explicit boundary where humans approve or reject outcomes.",
      inputs: ["Outcome", "Verification result"],
      outputs: ["Contract (defines what is allowed)", "Decision: APPROVE / REJECT"],
      boundary: "Is never inferred from verification — approval is always an explicit, separate act.",
    },
  },
  lifecycle: {
    heading: "Work Item lifecycle",
    ariaLabel: "Work Item lifecycle",
    current: "Current",
    steps: {
      inspect: {
        label: "Inspect",
        summary: "Read repository state without writing governance evidence.",
      },
      attach: {
        label: "Attach",
        summary: "Bind the Repository Protocol to this repository.",
      },
      start: {
        label: "Start",
        summary: "Open a Work Item with an intent, goal, scope, and Contract.",
      },
      preflight: {
        label: "Preflight",
        summary: "Evaluate the Contract against current repository facts before execution.",
      },
      checkpoint: {
        label: "Checkpoint",
        summary: "Record incremental, evidence-backed progress during execution.",
      },
      verify: {
        label: "Verify",
        summary: "Evaluate evidence against the Contract and produce a verification outcome.",
      },
      finish: {
        label: "Finish",
        summary: "Confirm lifecycle gates are satisfied before the Work Item can close.",
      },
      archive: {
        label: "Archive",
        summary: "Move the completed Work Item's evidence into durable history.",
      },
      close: {
        label: "Close",
        summary: "Finalize the Work Item; the governance record becomes immutable.",
      },
    },
  },
  tour: {
    start: "Understand AI Cockpit in 30 seconds",
    next: "Next",
    previous: "Back",
    exit: "Exit tour",
    done: "Done",
    ariaLabel: "Guided architecture tour",
    sceneOfTotal: "Scene {current} of {total}",
    steps: [
      {
        title: "Request",
        narration:
          "AI agents can execute work. They do not automatically own repository authority — execution stops at the AI Cockpit gate.",
      },
      {
        title: "Work Item",
        narration:
          "That request becomes a Work Item: a bounded envelope that will hold this change's Contract, execution, evidence, and Outcome from here until it closes.",
      },
      {
        title: "Contract",
        narration:
          "Before anything runs, a human defines what's allowed inside that envelope: intent, scope, and acceptance criteria.",
      },
      {
        title: "Governed Execution",
        narration:
          "The repository feeds Runtime with Git HEAD, changed paths, snapshot, and digests — observed, not assumed — and execution proceeds bounded by that Work Item, through checkpoints rather than silent writes.",
      },
      {
        title: "Evidence",
        narration:
          "Tests, git state, digests, and artifacts converge into an Evidence packet that flows back to Runtime, still inside the same Work Item.",
      },
      {
        title: "Verification",
        narration: "Verification is GREEN. Human decision: PENDING. Verified ≠ Approved.",
      },
      {
        title: "HCI / Human Decision",
        narration:
          "The Outcome rises to Human Authority through the Human Control layer; the human decides: approve or reject. Nothing is authorized until they do.",
      },
      {
        title: "Archive → Trace → Knowledge",
        narration:
          "Once decided, the Work Item archives into the Repository Protocol, its full trace stays reviewable, and its completed facts become Knowledge for the next Work Item to consult.",
      },
    ],
  },
  verification: {
    title: "Verification",
    verificationLabel: "Verification",
    humanDecisionLabel: "Human decision",
    verifiedNotApproved: "Verified ≠ Approved.",
    scenarioGreenLabel: "GREEN",
    scenarioRedLabel: "RED",
    evidenceLabels: {
      build: "Build evidence",
      tests: "Test evidence",
      scope: "Scope conformance",
    },
    scenarios: {
      "green-pending": {
        label: "Verification passed, decision pending",
        narrative:
          "All required evidence is present and consistent with the Contract. Verification is GREEN. This is not approval — a human still holds the decision.",
      },
      "red-fail-closed": {
        label: "Verification failed, fail-closed",
        narrative:
          "Required evidence is missing or contradicts the Contract. Verification is RED and the lifecycle gate blocks progression by default — execution fails closed rather than proceeding on assumption.",
      },
    },
  },
  detailPanel: {
    whatLabel: "What",
    inputsLabel: "Inputs",
    outputsLabel: "Outputs",
    boundaryLabel: "Boundary",
    closeLabel: "Close details",
    aboutSource: "About / Source",
    hideSource: "Hide source",
    upstreamLabel: "Upstream",
  },
  statusLegend: {
    explanations: {
      GREEN: "verification passed",
      YELLOW: "partial evidence",
      RED: "verification failed (fail-closed)",
      UNKNOWN: "not evaluated (never approval)",
    },
    humanDecisionExplanation: "human decision, separate from verification",
  },
  workItemEnvelope: {
    label: "Work Item",
    closedLabel: "CLOSED",
  },
  trace: {
    heading: "Trace / Audit",
    ariaLabel: "Work Item trace timeline",
    advancedToggleShow: "Show advanced (finalize / close cleanup)",
    advancedToggleHide: "Hide advanced",
    show3dTrail: "Show in 3D",
    hide3dTrail: "Hide 3D trail",
    events: {
      intent: "Intent recorded",
      contract: "Contract bound",
      snapshot: "Repository snapshot digest recorded",
      checkpoint: "Checkpoint receipt recorded",
      verificationReceipt: "Verification receipt recorded",
      outcome: "Outcome recorded",
      humanDecision: "Human decision recorded",
      archive: "Archived into Repository Protocol",
      finalizePlan: "Finalize plan bound (branch / worktree / provider)",
      finalize: "Provider finalization receipt recorded",
      finalizeVerify: "Finalization receipt revalidated",
      close: "Work Item closed; record made immutable",
    },
  },
} satisfies ExplorerMessages;
