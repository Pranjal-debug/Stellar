import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Frontend Basic UI Unit Tests", () => {
  it("renders a simple button and verifies text", () => {
    render(<button>Donate Now</button>);
    expect(screen.getByText("Donate Now")).toBeInTheDocument();
  });

  it("calculates campaign progress percentage correctly", () => {
    const goal = 1000;
    const raised = 250;
    const percentage = Math.min(Math.round((raised / goal) * 100), 100);
    expect(percentage).toBe(25);
  });

  it("formats Stellar balance correctly", () => {
    const amountInStroops = 10000000; // 1 XLM = 10^7 stroops or raw amount
    const formatted = (amountInStroops / 10000000).toFixed(2);
    expect(formatted).toBe("1.00");
  });
});
