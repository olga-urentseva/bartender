import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CocktailsByIngredientMock } from "../../../__mocks__/CocktailsByIngredientMock";
import MainPage from "./index";
import { BrowserRouter } from "react-router-dom";

describe("MainPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    vi.mock("../../../hooks/useAsync", () => {
      return {
        default: () => [
          vi.fn(),
          {
            data: CocktailsByIngredientMock,
            status: "success",
            error: "false",
          },
        ],
        Status: {
          IDLE: "IDLE",
          IN_PROGRESS: "IN_PROGRESS",
          SUCCESS: "SUCCESS",
          FAILURE: "FAILURE",
        },
      };
    });
  });

  describe("if status = Success", () => {
    it("should show search bar", () => {
      render(
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      );

      expect(
        screen.getByText("What do you have in your bar?")
      ).toBeInTheDocument();
    });
  });
});
