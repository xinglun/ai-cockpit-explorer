import type { ExplorerMode } from "@/ui/Navigation";
import type { ArchitectureElementId } from "@/data/architecture";
import type { Locale } from "@/i18n/locales";

const modeValues: readonly ExplorerMode[] = ["overview", "workitem", "verification"];

export interface ExplorerUrlState {
  mode: ExplorerMode;
  selectedId: ArchitectureElementId | null;
  /** null means the guided tour is not active. */
  tourStepIndex: number | null;
}

export const defaultExplorerUrlState: ExplorerUrlState = {
  mode: "overview",
  selectedId: null,
  tourStepIndex: null,
};

/**
 * Reads mode/selection/tour-step from the URL so switching language
 * (a full route change to a sibling [locale] path) can preserve them,
 * per the "language switch must not reset the experience" requirement.
 * Unknown/invalid values fall back to defaults rather than throwing.
 */
export function parseExplorerUrlState(
  params: URLSearchParams,
  validElementIds: readonly ArchitectureElementId[],
): ExplorerUrlState {
  const modeParam = params.get("mode");
  const mode = modeValues.includes(modeParam as ExplorerMode) ? (modeParam as ExplorerMode) : "overview";

  const selectedParam = params.get("selected");
  const selectedId =
    selectedParam && (validElementIds as readonly string[]).includes(selectedParam)
      ? (selectedParam as ArchitectureElementId)
      : null;

  const tourParam = params.get("tour");
  const tourStepIndex = tourParam !== null && /^\d+$/.test(tourParam) ? Number(tourParam) : null;

  return { mode, selectedId, tourStepIndex };
}

export function explorerStateToSearchParams(state: ExplorerUrlState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.mode !== "overview") params.set("mode", state.mode);
  if (state.selectedId) params.set("selected", state.selectedId);
  if (state.tourStepIndex !== null) params.set("tour", String(state.tourStepIndex));
  return params;
}

/**
 * Builds the sibling path for another locale, replacing only the
 * locale segment (the first path segment — every route lives under
 * /{locale}/) and carrying the current search params along.
 */
export function buildLocalePath(pathname: string, targetLocale: Locale, search: URLSearchParams): string {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = targetLocale;
  const query = search.toString();
  return `/${segments.join("/")}${query ? `?${query}` : ""}`;
}
