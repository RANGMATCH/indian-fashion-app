import React from "react";
import { render, screen } from "@testing-library/react";
import { ConfidenceIndicator } from "@/components/ConfidenceIndicator";

describe("ConfidenceIndicator", () => {
  it("renders Safe level with Hindi label", () => {
    render(<ConfidenceIndicator level="Safe" showHindi />);
    expect(screen.getByText(/Safe/)).toBeInTheDocument();
    expect(screen.getByText(/शुरुआत के लिए perfect/)).toBeInTheDocument();
  });

  it("renders Moderate level", () => {
    render(<ConfidenceIndicator level="Moderate" />);
    expect(screen.getByText(/Moderate/)).toBeInTheDocument();
  });

  it("renders Bold level", () => {
    render(<ConfidenceIndicator level="Bold" />);
    expect(screen.getByText(/Bold/)).toBeInTheDocument();
  });

  it("returns null for null level", () => {
    const { container } = render(<ConfidenceIndicator level={null} />);
    expect(container.firstChild).toBeNull();
  });
});
