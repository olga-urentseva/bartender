import { act, render, screen, fireEvent } from "@testing-library/react";
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

  describe("error", () => {
    let p: Promise<unknown> | undefined;

    beforeEach(() => {
      p = undefined;
      mockedLoader = vi.fn(() => {
        console.log("this is mocked loader inside before each");

        const promise = Promise.reject(new Error());
        p = promise;
        return promise;
      });
    });

    it("shows error page", async () => {
      render(<RouterProvider router={getMockedRouter()} />);

      await act(async () => {
        // we should wait untill promise resolve, because only then react will rerender the page with expected message

        try {
          await p;
        } catch (error) {
          // i had to write this comment because if catch is empty I'll get the error and component won't be rendered
        }
      });

      expect(
        screen.getByText("🗿 Error: Something went wrong 🗿")
      ).toBeInTheDocument();
    });
  });

  describe("successfully loaded with NO cocktails", () => {
    let p: Promise<any> | undefined;

    beforeEach(() => {
      p = undefined;
      mockedLoader = vi.fn(() => {
        const promise = Promise.resolve([]);
        p = promise;
        return promise;
      });
    });

    it("should show 'no cocktails' message", async () => {
      render(<RouterProvider router={getMockedRouter()} />);

      // act is required here to wait till the page will be rerendered after promise (p) resolved
      await act(async () => {
        // we should wait untill promise resolve, because only then react will rerender the page with expected message
        await p;
      });

      expect(
        screen.getByText("There are no cocktails with your ingredients 😭")
      ).toBeInTheDocument();
    });
  });
  // describe("successfully loaded with SOME cocktails", () => {});
});
