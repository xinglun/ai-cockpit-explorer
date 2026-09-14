import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailPanel } from "@/ui/DetailPanel";

describe("DetailPanel", () => {
  it("prompts for a selection when nothing is selected", () => {
    render(<DetailPanel selected={null} />);
    expect(screen.getByText(/select an architecture element/i)).toBeInTheDocument();
  });

  it("shows the summary but hides detail until expanded", () => {
    render(<DetailPanel selected="humanAuthority" />);
    expect(screen.getByText("Human Authority")).toBeInTheDocument();
    expect(screen.queryByText(/upstream:/i)).not.toBeInTheDocument();
  });
});
