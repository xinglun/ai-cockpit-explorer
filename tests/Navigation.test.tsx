import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "@/ui/Navigation";

describe("Navigation", () => {
  it("lets a keyboard/mouse user select every architecture layer without 3D interaction", () => {
    const onSelect = vi.fn();
    render(<Navigation selected={null} onSelect={onSelect} />);

    const runtimeButton = screen.getByRole("button", { name: "AI Cockpit Runtime" });
    fireEvent.click(runtimeButton);

    expect(onSelect).toHaveBeenCalledWith("runtime");
  });

  it("marks the selected layer as pressed for assistive technology", () => {
    render(<Navigation selected="humanAuthority" onSelect={() => {}} />);
    const button = screen.getByRole("button", { name: "Human Authority" });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
