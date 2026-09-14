/**
 * Semantic color tokens for the Explorer visualization.
 * These govern presentation only — never AI Cockpit domain behavior.
 */
export const colors = {
  background: "#0B0D10",
  /** Vertical backdrop gradient stops — subtle, dark, never a spotlight. */
  backgroundGradientTop: "#050608",
  backgroundGradientBottom: "#171C24",
  surface: "#15191F",
  surfaceRaised: "#1C222A",
  border: "#303843",
  textPrimary: "#F2F4F7",
  textSecondary: "#A7B0BC",
  textMuted: "#707A87",
  informationFlow: "#6EA8FE",
  stateGreen: "#59C786",
  stateYellow: "#E5B94C",
  stateRed: "#E76767",
  stateUnknown: "#7E8794",
  humanAuthority: "#F2F4F7",
} as const;

export type SemanticColorToken = keyof typeof colors;

/**
 * Status semantics used across DOM UI, Three.js materials, and labels.
 * GREEN describes evidence-supported verification. APPROVED is a
 * separate, explicit human decision — the two must never be conflated.
 */
export type VerificationStatus = "GREEN" | "YELLOW" | "RED" | "UNKNOWN";
export type HumanDecisionStatus = "PENDING" | "APPROVED" | "REJECTED";

export const verificationStatusColor: Record<VerificationStatus, string> = {
  GREEN: colors.stateGreen,
  YELLOW: colors.stateYellow,
  RED: colors.stateRed,
  UNKNOWN: colors.stateUnknown,
};

export const humanDecisionColor: Record<HumanDecisionStatus, string> = {
  PENDING: colors.stateYellow,
  APPROVED: colors.humanAuthority,
  REJECTED: colors.stateRed,
};
