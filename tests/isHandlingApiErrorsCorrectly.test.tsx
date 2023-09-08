/* eslint-disable no-undef */
import { fireEvent, render, screen, } from "@testing-library/react";
import { expect, test, afterEach, afterAll, beforeAll } from "vitest";
import userEvent from '@testing-library/user-event'
import React from "react";
import Grid from "../src/components/Grid/grid";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const sudokuOkHandler = rest.post(
    "http://0.0.0.0:5000/",
    async (req, res, ctx) => {
        const body = await req.json();
        const p = body.sudoku[0];

        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        puzzle: p,
                        solution: null,
                        status: "error",
                        message: "2 appears 2x in row 1",
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

test("Is handling api errors correctly", async () => {
    // Arrange
    const { container } = render(<Grid />);
    const cells = container.getElementsByTagName("input");

    const r1c1 = cells.item(0)!;
    const r1c2 = cells.item(1)!;

    fireEvent.keyDown(r1c1, { key: "2" });
    fireEvent.keyDown(r1c2, { key: "2" });

    await userEvent.click(screen.getByText('SOLVE'));

    // Expect visual changes
    expect(r1c1).toHaveClass("!bg-poppy")
    expect(r1c2).toHaveClass("!bg-poppy")
    const errDisplay = screen.getByText('2 APPEARS 2X IN ROW 1')

    expect(errDisplay).toBeVisible();
});

