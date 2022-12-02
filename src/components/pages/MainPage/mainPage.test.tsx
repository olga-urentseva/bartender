import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MainPage from "./index";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../ErrorPage";

describe("MainPage", () => {
  let mockedLoader: () => Promise<any>;

  // wrap in function to use in lazyEvaluation
  function getMockedRouter() {
    return createMemoryRouter(
      [
        {
          path: "/",
          element: <MainPage />,
          loader: mockedLoader,
          errorElement: <ErrorPage />,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );
  }

  describe("successfully loaded with NO cocktails", () => {
    let p: Promise<any> | undefined;
    mockedLoader = vi.fn(() => {
      const promise = Promise.resolve([]);
      p = promise;
      return promise;
    });

    beforeEach(() => {
      p = undefined;
    });

    it("should show 'no cocktails' message", async () => {
      render(<RouterProvider router={getMockedRouter()} />);

      await act(async () => {
        await p;
      });

      expect(
        screen.getByText("There are no cocktails with your ingredients 😭")
      ).toBeInTheDocument();
    });
  });
  describe("successfully loaded with SOME cocktails", () => {});
});
