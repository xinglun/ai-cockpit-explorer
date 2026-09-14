import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ElementPicker } from "@/ui/ElementPicker";
import { en } from "@/i18n/en";

describe("ElementPicker", () => {
  it("lets a keyboard/mouse user select every Governance Loop element without 3D interaction", () => {
    const onSelect = vi.fn();
    render(<ElementPicker selected={null} onSelect={onSelect} messages={en} />);

    const runtimeButton = screen.getByRole("button", { name: "AI Cockpit Runtime" });
    fireEvent.click(runtimeButton);

    expect(onSelect).toHaveBeenCalledWith("runtime");
  });

  it("marks the selected element as pressed for assistive technology", () => {
    render(<ElementPicker selected="humanAuthority" onSelect={() => {}} messages={en} />);
    const button = screen.getByRole("button", { name: "Human Authority" });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
