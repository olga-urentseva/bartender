import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { fetch } from 'cross-fetch';
import mswServer from "./msw-server";

global.fetch = fetch;

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: "error" });
});
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());
