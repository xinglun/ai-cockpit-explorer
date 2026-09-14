import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailPanel } from "@/ui/DetailPanel";

describe("DetailPanel", () => {
  it("renders nothing when there is no selection", () => {
    const { container } = render(<DetailPanel selected={null} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows WHAT/INPUTS/OUTPUTS/BOUNDARY and hides upstream source until expanded", () => {
    render(<DetailPanel selected="humanAuthority" onClose={() => {}} />);
    expect(screen.getByText("Human Authority")).toBeInTheDocument();
    expect(screen.getByText("What")).toBeInTheDocument();
    expect(screen.getByText("Inputs")).toBeInTheDocument();
    expect(screen.getByText("Outputs")).toBeInTheDocument();
    expect(screen.getByText("Boundary")).toBeInTheDocument();
    expect(screen.queryByText(/upstream:/i)).not.toBeInTheDocument();
  });

  it("calls onClose when the close control is used", () => {
    const onClose = vi.fn();
    render(<DetailPanel selected="runtime" onClose={onClose} />);
    screen.getByLabelText(/close details/i).click();
    expect(onClose).toHaveBeenCalled();
  });
});
