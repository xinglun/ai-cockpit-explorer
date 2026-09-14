import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "@/ui/Navigation";
import { en } from "@/i18n/en";

describe("Navigation", () => {
  it("exposes exactly three modes", () => {
    render(<Navigation mode="overview" onChange={() => {}} messages={en} />);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Work Item" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Verification" })).toBeInTheDocument();
  });

  it("lets a keyboard/mouse user switch modes", () => {
    const onChange = vi.fn();
    render(<Navigation mode="overview" onChange={onChange} messages={en} />);
    fireEvent.click(screen.getByRole("tab", { name: "Work Item" }));
    expect(onChange).toHaveBeenCalledWith("workitem");
  });

  it("marks the active mode as selected for assistive technology", () => {
    render(<Navigation mode="verification" onChange={() => {}} messages={en} />);
    expect(screen.getByRole("tab", { name: "Verification" })).toHaveAttribute("aria-selected", "true");
  });
});
