import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import MainPage from "./index";

describe("MainPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const mockedRunAsync = vi.fn();
  const mockedState = {
    data: [{}],
    status: "success",
    error: false,
  };
  vi.mock("../../../hooks/useAsync", () => {
    return [mockedRunAsync, mockedState];
  });
  describe("should show searched cocktails", () => {
    it("should show all matched cocktails with searched ingredients", () => {
      render(<MainPage />);
      expect(
        screen.getByText("What do you have in your bar?")
      ).toBeInTheDocument();
    });
  });
});
