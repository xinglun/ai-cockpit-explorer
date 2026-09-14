/**
 * Provenance boundary: architecture semantics rendered by the Explorer
 * must trace back to a specific upstream AI Cockpit revision, so the
 * visualization never becomes its own source of truth.
 */
export interface ExplorerModelMetadata {
  upstreamRepository: string;
  upstreamRevision: string;
}

export const modelMetadata: ExplorerModelMetadata = {
  upstreamRepository: "https://github.com/xinglun/ai-cockpit",
  upstreamRevision: "9403265d61f0b9d22ad0beb564561921d2b3b967",
};
