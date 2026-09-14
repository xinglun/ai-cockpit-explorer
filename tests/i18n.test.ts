import { describe, expect, it } from "vitest";
import { en } from "@/i18n/en";
import { ja } from "@/i18n/ja";
import { zhCN } from "@/i18n/zh-CN";
import { supportedLocales, defaultLocale, isSupportedLocale, toSupportedLocale } from "@/i18n/locales";
import { getMessages } from "@/i18n/getMessages";
import type { ExplorerMessages } from "@/i18n/types";
import {
  parseExplorerUrlState,
  explorerStateToSearchParams,
  buildLocalePath,
} from "@/interaction/explorerUrlState";
import { architectureOrder } from "@/data/architecture";

const locales: Record<(typeof supportedLocales)[number], ExplorerMessages> = {
  en,
  ja,
  "zh-CN": zhCN,
};

/** Flattens an ExplorerMessages tree into dot-paths pointing at leaf strings. */
function flattenKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenKeys(item, `${prefix}.${index}`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      flattenKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

function flattenValues(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(flattenValues);
  if (value && typeof value === "object") return Object.values(value).flatMap(flattenValues);
  return [];
}

describe("locale completeness", () => {
  it("declares exactly en, ja, and zh-CN", () => {
    expect(supportedLocales).toEqual(["en", "ja", "zh-CN"]);
  });

  it("gives every locale the identical set of translation key paths", () => {
    const [first, ...rest] = supportedLocales;
    const referenceKeys = flattenKeys(locales[first]).sort();
    for (const locale of rest) {
      expect(flattenKeys(locales[locale]).sort()).toEqual(referenceKeys);
    }
  });

  it("has no empty required string value in any locale", () => {
    for (const locale of supportedLocales) {
      for (const value of flattenValues(locales[locale])) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("gives every locale the same tour length as the semantic tour data", () => {
    for (const locale of supportedLocales) {
      expect(locales[locale].tour.steps).toHaveLength(8);
    }
  });

  it("renders the same 'Verified ≠ Approved' distinction in every locale", () => {
    expect(en.verification.verifiedNotApproved).toMatch(/verified.*approved/i);
    expect(ja.verification.verifiedNotApproved).toBe("検証済み ≠ 承認済み。");
    expect(zhCN.verification.verifiedNotApproved).toBe("已验证 ≠ 已批准。");
  });

  it("never translates internal semantic ids like architecture element keys", () => {
    for (const locale of supportedLocales) {
      expect(Object.keys(locales[locale].architecture).sort()).toEqual([...architectureOrder].sort());
    }
  });
});

describe("getMessages", () => {
  it("returns the matching locale's messages", () => {
    expect(getMessages("ja")).toBe(ja);
    expect(getMessages("zh-CN")).toBe(zhCN);
  });

  it("falls back to the default locale for an unsupported value", () => {
    expect(getMessages("fr")).toBe(locales[defaultLocale]);
    expect(toSupportedLocale("fr")).toBe(defaultLocale);
    expect(isSupportedLocale("fr")).toBe(false);
  });
});

describe("explorer URL state", () => {
  it("round-trips mode, selection, and tour step through search params", () => {
    const params = explorerStateToSearchParams({
      mode: "workitem",
      selectedId: "runtime",
      tourStepIndex: 3,
    });
    const parsed = parseExplorerUrlState(params, architectureOrder);
    expect(parsed).toEqual({ mode: "workitem", selectedId: "runtime", tourStepIndex: 3 });
  });

  it("falls back to overview/no-selection/no-tour for an empty or invalid URL", () => {
    const parsed = parseExplorerUrlState(new URLSearchParams("mode=bogus&selected=bogus"), architectureOrder);
    expect(parsed).toEqual({ mode: "overview", selectedId: null, tourStepIndex: null });
  });

  it("omits default values from the generated query string", () => {
    const params = explorerStateToSearchParams({ mode: "overview", selectedId: null, tourStepIndex: null });
    expect(params.toString()).toBe("");
  });

  it("builds a sibling locale path that only swaps the locale segment and keeps the query", () => {
    const params = new URLSearchParams({ mode: "verification" });
    expect(buildLocalePath("/en", "ja", params)).toBe("/ja?mode=verification");
    expect(buildLocalePath("/ja/", "zh-CN", new URLSearchParams())).toBe("/zh-CN");
  });
});
