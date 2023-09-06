import { expect, afterEach, afterAll, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
import { setupServer } from "msw/node";

expect.extend(matchers);

export const puzzle =
  "9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7254";
export const solution =
  "971536842286974513354812679563421798497658321128793465732145986645289137819367254";

export const restHandler = rest.post(
  "http://0.0.0.0:5000/",
  async (req, res, ctx) => {
    const body = await req.json();
    const p = body.sudoku[0];

    // Expecting to recieve correct puzzle
    expect(p).toBe(puzzle);

    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            puzzle: p,
            solution: solution,
            status: "OK",
            message: null,
          },
        ],
      })
    );
  }
);

const server = setupServer(restHandler);
// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
