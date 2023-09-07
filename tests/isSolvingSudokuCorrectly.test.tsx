/* eslint-disable no-undef */
import { fireEvent, render, screen, } from "@testing-library/react";
import { expect, test, afterEach, afterAll, beforeAll } from "vitest";
import userEvent from '@testing-library/user-event'
import React from "react";
import Grid from "../src/components/Grid/grid";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const puzzle =
  "9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7254";
export const solution =
  "971536842286974513354812679563421798497658321128793465732145986645289137819367254";

export const sudokuOkHandler = rest.post(
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


const server = setupServer(sudokuOkHandler);
// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
});

test("Is solving sudoku correctly", async () => {
  // Arrange
  const { container } = render(<Grid />);
  const cells = container.getElementsByTagName("input");

  // Expecting grid to reflect input changes
  puzzle.split("").forEach((v, i) => {
    fireEvent.change(cells.item(i)!, { target: { value: v === "." ? "0" : v } });
    expect(cells.item(i)!.value).toBe(v === "." ? "" : v);
  });

  await userEvent.click(screen.getByText('Solve'));

  // Expecting grid to recieve and set solution correctly
  solution.split("").forEach((v, i) => {
    expect(cells.item(i)!.value).toBe(v);
  })

});

