/* eslint-disable no-undef */
import { render, screen, } from "@testing-library/react";
import { expect, test, afterEach, afterAll, beforeAll } from "vitest";
import userEvent from '@testing-library/user-event'
import React from "react";
import Grid from "../src/components/Grid/grid";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const sudokuOkHandler = rest.post(
    "http://0.0.0.0:5000/",
    async (req, res, ctx) => {
        return res(
            ctx.status(404),
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

test("Is handling network errors correctly", async () => {
    // Arrange
    const { container } = render(<Grid />);

    await userEvent.click(screen.getByText('Solve'));

    // Expect visual changes


});

